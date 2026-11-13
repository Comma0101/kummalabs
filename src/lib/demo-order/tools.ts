// The tools the voice agent can call. Each returns a small JSON object for the model, built only
// from server-side data. Arguments from the model are untrusted input: everything is validated
// by engine.ts, and event summaries never contain model- or caller-supplied text.
import { addItem, describeCart, describeLine, searchMenu, setQuantity } from "./engine.ts";
import { MENU, formatCents } from "./menu.ts";
import { cleanPickupName } from "./store.ts";
import type { DemoStore } from "./store.ts";

type Args = Record<string, unknown>;
export type ToolResult = Record<string, unknown> & { status: string };

export const TOOL_NAMES = ["search_menu", "add_item", "change_quantity", "view_cart", "place_order"] as const;

export async function handleTool(store: DemoStore, callId: string, name: string, args: Args): Promise<ToolResult> {
  const log = (ok: boolean, summary: string) => store.logEvent(callId, name, ok, summary).catch(() => undefined);

  if (name === "search_menu") {
    const items = searchMenu(args.query);
    await log(true, `${items.length} menu item${items.length === 1 ? "" : "s"} returned`);
    if (items.length === 0) {
      return {
        status: "nothing_found",
        menu_sections: [...new Set(MENU.map((i) => i.section))],
        instruction: "Nothing on the menu matches. Say so. Only these sections exist; do not offer any other kind of food.",
      };
    }
    return {
      status: "found",
      items: items.map((i) => ({
        name: i.name,
        chinese_name: i.nameZh,
        section: i.section,
        price: formatCents(i.priceCents),
        ...(i.note ? { note: i.note } : {}),
        required_choices: i.slots.map((s) => ({ choice: s.name, options: s.options.map((o) => o.name) })),
      })),
    };
  }

  if (name === "add_item") {
    if (await store.getOrder(callId)) {
      await log(false, "refused: order already placed");
      return { status: "order_already_placed", instruction: "The order for this call is already placed and cannot be changed." };
    }
    const cart = await store.getCart(callId);
    const result = addItem(cart, args);
    if (!result.ok) {
      if (result.reason === "needs_choice" || result.reason === "unknown_choice") {
        await log(true, `needs choice: ${result.slot} for ${result.item}`);
        return {
          status: "needs_choice",
          item: result.item,
          choice: result.slot,
          options: result.options,
          instruction: "Nothing was added. Ask the caller to pick one option, then call add_item again with it.",
        };
      }
      if (result.reason === "not_on_menu") {
        await log(true, "refused: item not on the menu");
        return { status: "not_on_menu", suggestions: result.suggestions, instruction: "Nothing was added. This item is not on the menu." };
      }
      await log(false, `refused: ${result.reason}`);
      return { status: result.reason, instruction: "Nothing was added. Quantity must be a whole number from 1 to 20." };
    }
    await store.saveCart(callId, result.cart);
    await log(true, `added ${describeLine({ ...result.line, quantity: typeof args.quantity === "number" ? args.quantity : 1 })}`);
    return { status: "added", added: describeLine(result.line), cart: describeCart(result.cart) };
  }

  if (name === "change_quantity") {
    if (await store.getOrder(callId)) {
      await log(false, "refused: order already placed");
      return { status: "order_already_placed", instruction: "The order for this call is already placed and cannot be changed." };
    }
    const cart = await store.getCart(callId);
    const result = setQuantity(cart, args.line, args.quantity);
    if (!result.ok) {
      await log(false, `refused: ${result.reason}`);
      return { status: result.reason, cart: describeCart(cart), instruction: "Nothing was changed. Call view_cart to get the line numbers." };
    }
    await store.saveCart(callId, result.cart);
    await log(true, args.quantity === 0 ? `removed line ${String(args.line)}` : `line ${String(args.line)} set to ${String(args.quantity)}`);
    return { status: "changed", cart: describeCart(result.cart) };
  }

  if (name === "view_cart") {
    const existing = await store.getOrder(callId);
    if (existing) {
      await log(true, `order ${existing.reference} already placed`);
      return { status: "order_already_placed", reference: existing.reference, ...describeCart({ lines: existing.lines }) };
    }
    const cart = await store.getCart(callId);
    await log(true, `${cart.lines.length} line${cart.lines.length === 1 ? "" : "s"} in cart`);
    return { status: cart.lines.length ? "cart" : "empty_cart", ...describeCart(cart) };
  }

  if (name === "place_order") {
    const existing = await store.getOrder(callId);
    if (existing) {
      await log(true, `already placed as ${existing.reference}`);
      return { status: "already_placed", reference: existing.reference, total: formatCents(existing.totalCents) };
    }
    const cart = await store.getCart(callId);
    if (cart.lines.length === 0) {
      await log(false, "refused: cart is empty");
      return { status: "empty_cart", instruction: "Nothing was placed. The cart is empty." };
    }
    try {
      // "placed" is only ever returned with the row the database gave back.
      const { status, order } = await store.placeOrder(callId, cart, cleanPickupName(args.pickup_name));
      await log(true, `${status === "placed" ? "placed" : "already placed as"} ${order.reference}, total ${formatCents(order.totalCents)}`);
      return { status, reference: order.reference, total: formatCents(order.totalCents) };
    } catch {
      await log(false, "FAILED: order could not be stored; cart kept");
      return {
        status: "failed",
        instruction: "The order was NOT saved. Tell the caller it could not be placed, nothing was ordered, and they can try again.",
      };
    }
  }

  await log(false, "refused: unknown tool");
  return { status: "unknown_tool" };
}
