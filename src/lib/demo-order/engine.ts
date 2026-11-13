// Pure ordering rules for the phone demo: what can be added, which choices are required,
// and what an order costs. No I/O. The caller (tools.ts) persists the returned cart.
import { MENU, formatCents } from "./menu.ts";
import type { MenuItem, MenuSlot } from "./menu.ts";

export type CartLine = {
  itemId: string;
  name: string;
  quantity: number;
  /** slot id -> option id */
  options: Record<string, string>;
  unitCents: number;
};
export type Cart = { lines: CartLine[] };

export const MAX_QUANTITY = 20;
export const MAX_LINES = 20;

export type AddRequest = { item?: unknown; quantity?: unknown; options?: unknown };

export type AddResult =
  | { ok: true; cart: Cart; line: CartLine }
  | { ok: false; reason: "not_on_menu"; suggestions: string[] }
  | { ok: false; reason: "needs_choice" | "unknown_choice"; item: string; slot: string; options: string[] }
  | { ok: false; reason: "bad_quantity" | "cart_full" };

export type QuantityResult = { ok: true; cart: Cart } | { ok: false; reason: "no_such_line" | "bad_quantity" };

export const emptyCart = (): Cart => ({ lines: [] });

const norm = (v: unknown) =>
  (typeof v === "string" ? v : "")
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

// A single Chinese character is a meaningful search word ("面", "饭"); a single Latin letter is not.
const CJK = /\p{Script=Han}/u;
const SECTION_ZH: Record<string, string> = {
  Appetizers: "开胃菜 小吃 前菜",
  Mains: "主菜 热菜",
  "Noodles and rice": "面 饭 主食",
  Combos: "套餐",
  Drinks: "饮料 饮品 喝的",
};

const itemNames = (item: MenuItem) => [item.id, item.name, item.nameZh, ...item.aliases].map(norm);

/** Menu search. An empty query returns the whole menu. Never returns anything not on the menu. */
export function searchMenu(query: unknown): MenuItem[] {
  const q = norm(query);
  if (!q) return [...MENU];
  const words = q.split(" ");
  const scored = MENU.map((item) => {
    const names = itemNames(item);
    const haystack = [...names, norm(item.section), norm(SECTION_ZH[item.section])].join(" | ");
    let score = 0;
    if (names.includes(q)) score = 100;
    else if (names.some((n) => n.includes(q) || q.includes(n))) score = 60;
    else score = words.filter((w) => (w.length > 1 || CJK.test(w)) && haystack.includes(w)).length * 10;
    return { item, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.item);
}

function resolveItem(name: unknown): MenuItem | null {
  const q = norm(name);
  if (!q) return null;
  const exact = MENU.filter((item) => itemNames(item).includes(q));
  if (exact.length === 1) return exact[0];
  const partial = MENU.filter((item) => itemNames(item).some((n) => n.includes(q) || q.includes(n)));
  return partial.length === 1 ? partial[0] : null;
}

function resolveChoice(slot: MenuSlot, given: Record<string, unknown>): string | null | undefined {
  // The request may key the choice by slot id, English name, or Chinese name.
  const slotKeys = [slot.id, slot.name, slot.nameZh].map(norm);
  const entry = Object.entries(given).find(([k]) => slotKeys.includes(norm(k)));
  if (!entry) return undefined; // not provided
  const wanted = norm(entry[1]);
  const option = slot.options.find((o) => [o.id, o.name, o.nameZh].map(norm).includes(wanted));
  return option ? option.id : null; // null = provided but not a valid choice
}

export function addItem(cart: Cart, request: AddRequest): AddResult {
  const item = resolveItem(request.item);
  if (!item) {
    return { ok: false, reason: "not_on_menu", suggestions: searchMenu(request.item).slice(0, 3).map((i) => i.name) };
  }

  const quantity = request.quantity === undefined ? 1 : request.quantity;
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    return { ok: false, reason: "bad_quantity" };
  }

  const given = request.options && typeof request.options === "object" ? (request.options as Record<string, unknown>) : {};
  const options: Record<string, string> = {};
  for (const slot of item.slots) {
    // A conditional choice (e.g. spice level for a combo) applies only for certain earlier choices.
    if (slot.onlyWhen && !slot.onlyWhen.in.includes(options[slot.onlyWhen.slot])) continue;
    const choice = resolveChoice(slot, given);
    if (choice === undefined || choice === null) {
      return {
        ok: false,
        reason: choice === undefined ? "needs_choice" : "unknown_choice",
        item: item.name,
        slot: slot.name,
        options: slot.options.map((o) => o.name),
      };
    }
    options[slot.id] = choice;
  }

  const sameLine = (l: CartLine) => l.itemId === item.id && JSON.stringify(l.options) === JSON.stringify(options);
  const existing = cart.lines.find(sameLine);
  if (existing) {
    if (existing.quantity + quantity > MAX_QUANTITY) return { ok: false, reason: "bad_quantity" };
    const line = { ...existing, quantity: existing.quantity + quantity };
    return { ok: true, line, cart: { lines: cart.lines.map((l) => (sameLine(l) ? line : l)) } };
  }
  if (cart.lines.length >= MAX_LINES) return { ok: false, reason: "cart_full" };
  const line: CartLine = { itemId: item.id, name: item.name, quantity, options, unitCents: item.priceCents };
  return { ok: true, line, cart: { lines: [...cart.lines, line] } };
}

/** Sets the quantity of a line by its 1-based number. Quantity 0 removes the line. */
export function setQuantity(cart: Cart, lineNumber: unknown, quantity: unknown): QuantityResult {
  if (typeof lineNumber !== "number" || !Number.isInteger(lineNumber) || lineNumber < 1 || lineNumber > cart.lines.length) {
    return { ok: false, reason: "no_such_line" };
  }
  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0 || quantity > MAX_QUANTITY) {
    return { ok: false, reason: "bad_quantity" };
  }
  const lines =
    quantity === 0
      ? cart.lines.filter((_, i) => i !== lineNumber - 1)
      : cart.lines.map((l, i) => (i === lineNumber - 1 ? { ...l, quantity } : l));
  return { ok: true, cart: { lines } };
}

export function totalCents(cart: Cart): number {
  return cart.lines.reduce((sum, l) => sum + l.quantity * l.unitCents, 0);
}

export function describeLine(line: CartLine): string {
  const item = MENU.find((i) => i.id === line.itemId);
  const choices = (item?.slots ?? [])
    .map((slot) => slot.options.find((o) => o.id === line.options[slot.id])?.name)
    .filter(Boolean);
  return `${line.quantity} × ${line.name}${choices.length ? ` (${choices.join(", ")})` : ""}`;
}

export function describeCart(cart: Cart) {
  return {
    lines: cart.lines.map((l, i) => ({
      line: i + 1,
      text: describeLine(l),
      line_total: formatCents(l.quantity * l.unitCents),
    })),
    total: formatCents(totalCents(cart)),
  };
}
