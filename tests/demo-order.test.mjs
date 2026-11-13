import assert from "node:assert/strict";
import test from "node:test";
import { addItem, describeCart, describeLine, emptyCart, searchMenu, setQuantity, totalCents } from "../src/lib/demo-order/engine.ts";
import { cleanPickupName, createMemoryStore } from "../src/lib/demo-order/store.ts";
import { handleTool } from "../src/lib/demo-order/tools.ts";

test("search finds items by English name, Chinese name, and alias; empty query lists the menu", () => {
  assert.equal(searchMenu("kung pao")[0].id, "kung-pao-chicken");
  assert.equal(searchMenu("宫保鸡丁")[0].id, "kung-pao-chicken");
  assert.equal(searchMenu("potstickers")[0].id, "pork-dumplings");
  assert.equal(searchMenu("").length, 12);
  assert.deepEqual(searchMenu("面 饭").map((i) => i.id).sort(), ["beef-chow-mein", "yangzhou-fried-rice"]);
  assert.deepEqual(searchMenu("饮料").map((i) => i.id).sort(), ["hot-jasmine-tea", "soft-drink"]);
  assert.equal(searchMenu("a b c").length, 0);
  assert.deepEqual(searchMenu("lobster thermidor"), []);
});

test("an item that is not on the menu is refused, never invented", () => {
  const r = addItem(emptyCart(), { item: "Mango Pudding", quantity: 1 });
  assert.equal(r.ok, false);
  assert.equal(r.reason, "not_on_menu");
});

test("a required choice must be made before the item is added", () => {
  const missing = addItem(emptyCart(), { item: "Kung Pao Chicken", quantity: 2 });
  assert.equal(missing.ok, false);
  assert.equal(missing.reason, "needs_choice");
  assert.equal(missing.slot, "Spice level");
  assert.deepEqual(missing.options, ["Mild", "Medium", "Spicy"]);

  const bad = addItem(emptyCart(), { item: "Kung Pao Chicken", quantity: 2, options: { "Spice level": "Nuclear" } });
  assert.equal(bad.ok, false);
  assert.equal(bad.reason, "unknown_choice");

  const ok = addItem(emptyCart(), { item: "kung pao chicken", quantity: 2, options: { "spice level": "medium" } });
  assert.equal(ok.ok, true);
  assert.equal(ok.cart.lines.length, 1);
  assert.equal(totalCents(ok.cart), 2990);
});

test("choices can be given in Chinese", () => {
  const ok = addItem(emptyCart(), { item: "宫保鸡丁", quantity: 1, options: { 辣度: "中辣" } });
  assert.equal(ok.ok, true);
  assert.equal(ok.cart.lines[0].options.spice, "medium");
});

test("the combo requires a main, and a spice level only for the spicy mains", () => {
  const noMain = addItem(emptyCart(), { item: "Lunch Combo" });
  assert.equal(noMain.reason, "needs_choice");
  assert.equal(noMain.slot, "Main");
  assert.equal(noMain.options.length, 4);

  const plain = addItem(emptyCart(), { item: "Lunch Combo", options: { Main: "Beef with Broccoli" } });
  assert.equal(plain.ok, true);
  assert.equal(describeLine(plain.line), "1 × Lunch Combo (Beef with Broccoli)");

  const needsSpice = addItem(emptyCart(), { item: "Lunch Combo", options: { Main: "Mapo Tofu" } });
  assert.equal(needsSpice.reason, "needs_choice");
  assert.equal(needsSpice.slot, "Spice level");

  const spicy = addItem(emptyCart(), { item: "Lunch Combo", options: { Main: "Mapo Tofu", "Spice level": "Medium" } });
  assert.equal(spicy.ok, true);
  assert.equal(describeLine(spicy.line), "1 × Lunch Combo (Mapo Tofu, Medium)");
  assert.equal(totalCents(spicy.cart), 1795);
});

test("quantity is bounded and money is integer cents", () => {
  const drink = { item: "Soft Drink", options: { Drink: "Coke" } };
  assert.equal(addItem(emptyCart(), { ...drink, quantity: 0 }).reason, "bad_quantity");
  assert.equal(addItem(emptyCart(), { ...drink, quantity: 21 }).reason, "bad_quantity");
  assert.equal(addItem(emptyCart(), { ...drink, quantity: 1.5 }).reason, "bad_quantity");
  assert.equal(addItem(emptyCart(), { ...drink, quantity: "2" }).reason, "bad_quantity");
  let cart = addItem(emptyCart(), { item: "Kung Pao Chicken", quantity: 2, options: { "Spice level": "Medium" } }).cart;
  cart = addItem(cart, { item: "Hot Jasmine Tea", quantity: 1 }).cart;
  assert.equal(totalCents(cart), 3285);
  assert.equal(describeCart(cart).total, "$32.85");
});

test("adding the same item with the same choices merges lines; quantity 0 removes a line", () => {
  let cart = addItem(emptyCart(), { item: "Spring Rolls", quantity: 1 }).cart;
  cart = addItem(cart, { item: "Spring Rolls", quantity: 2 }).cart;
  assert.equal(cart.lines.length, 1);
  assert.equal(cart.lines[0].quantity, 3);
  const removed = setQuantity(cart, 1, 0);
  assert.equal(removed.ok, true);
  assert.equal(removed.cart.lines.length, 0);
  assert.equal(setQuantity(cart, 5, 1).reason, "no_such_line");
});

test("pickup names are accepted only when they look like a name", () => {
  assert.equal(cleanPickupName("  Alex "), "Alex");
  assert.equal(cleanPickupName("王小明"), "王小明");
  assert.equal(cleanPickupName("Mary-Anne O'Neil"), "Mary-Anne O'Neil");
  assert.equal(cleanPickupName("Alex 555-1234"), null);
  assert.equal(cleanPickupName("<script>"), null);
  assert.equal(cleanPickupName("a".repeat(41)), null);
  assert.equal(cleanPickupName(undefined), null);
});

test("tools: full order flow ends in one stored order", async () => {
  const store = createMemoryStore();
  const call = "call_A";
  const needs = await handleTool(store, call, "add_item", { item: "Kung Pao Chicken", quantity: 2 });
  assert.equal(needs.status, "needs_choice");
  const added = await handleTool(store, call, "add_item", { item: "Kung Pao Chicken", quantity: 2, options: { "Spice level": "Medium" } });
  assert.equal(added.status, "added");
  await handleTool(store, call, "add_item", { item: "Hot Jasmine Tea", quantity: 1 });
  const cart = await handleTool(store, call, "view_cart", {});
  assert.equal(cart.total, "$32.85");
  const placed = await handleTool(store, call, "place_order", { pickup_name: "Alex" });
  assert.equal(placed.status, "placed");
  assert.match(placed.reference, /^\d{5}$/);
  const orders = await store.recentOrders(10);
  assert.equal(orders.length, 1);
  assert.equal(orders[0].totalCents, 3285);
  assert.equal(orders[0].pickupName, "Alex");
});

test("tools: placing twice in one call returns the same order and stores only one", async () => {
  const store = createMemoryStore();
  await handleTool(store, "call_B", "add_item", { item: "Spring Rolls", quantity: 1 });
  const first = await handleTool(store, "call_B", "place_order", {});
  const second = await handleTool(store, "call_B", "place_order", {});
  assert.equal(second.status, "already_placed");
  assert.equal(second.reference, first.reference);
  assert.equal((await store.recentOrders(10)).length, 1);
  assert.equal((await handleTool(store, "call_B", "add_item", { item: "Spring Rolls" })).status, "order_already_placed");
});

test("tools: an empty cart cannot be placed", async () => {
  const store = createMemoryStore();
  assert.equal((await handleTool(store, "call_C", "place_order", {})).status, "empty_cart");
  assert.equal((await store.recentOrders(10)).length, 0);
});

test("tools: when the database write fails, the result says failed and the cart survives", async () => {
  const store = createMemoryStore();
  await handleTool(store, "call_D", "add_item", { item: "Spring Rolls", quantity: 1 });
  store.placeOrder = async () => {
    throw new Error("connection reset by peer");
  };
  const r = await handleTool(store, "call_D", "place_order", {});
  assert.equal(r.status, "failed");
  assert.equal("reference" in r, false);
  assert.match(r.instruction, /not saved/i);
  const cart = await handleTool(store, "call_D", "view_cart", {});
  assert.equal(cart.lines.length, 1);
});

test("tools: a search with no match lists the real sections and tells the model not to improvise", async () => {
  const store = createMemoryStore();
  const r = await handleTool(store, "call_H", "search_menu", { query: "mango pudding" });
  assert.equal(r.status, "nothing_found");
  assert.deepEqual(r.menu_sections, ["Appetizers", "Mains", "Noodles and rice", "Combos", "Drinks"]);
  assert.match(r.instruction, /do not offer/i);
});

test("tools: carts are separate per call, and unknown tools are refused", async () => {
  const store = createMemoryStore();
  await handleTool(store, "call_E", "add_item", { item: "Spring Rolls", quantity: 1 });
  assert.equal((await handleTool(store, "call_F", "view_cart", {})).lines.length, 0);
  assert.equal((await handleTool(store, "call_E", "drop_tables", {})).status, "unknown_tool");
});

test("tools: events contain server-derived text only, never caller text or the pickup name", async () => {
  const store = createMemoryStore();
  await handleTool(store, "call_G", "search_menu", { query: "my SSN is 123-45-6789, anything spicy?" });
  await handleTool(store, "call_G", "add_item", { item: "Spring Rolls", quantity: 1 });
  await handleTool(store, "call_G", "place_order", { pickup_name: "Zebediah" });
  const events = await store.recentEvents(10);
  assert.equal(events.length, 3);
  assert.ok(events.every((e) => !e.summary.includes("123-45-6789") && !e.summary.includes("Zebediah")));
  assert.match(events.find((e) => e.tool === "add_item").summary, /1 × Spring Rolls/);
});
