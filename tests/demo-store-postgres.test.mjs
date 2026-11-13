// Runs against a real Postgres when TEST_DATABASE_URL is set (see CLAUDE.md); skipped otherwise.
import assert from "node:assert/strict";
import test from "node:test";
import pg from "pg";
import { createPostgresStore } from "../src/lib/demo-order/store-postgres.ts";
import { handleTool } from "../src/lib/demo-order/tools.ts";

const url = process.env.TEST_DATABASE_URL;
const opts = { skip: url ? false : "TEST_DATABASE_URL not set" };

test("postgres store", opts, async (t) => {
  const pool = new pg.Pool({ connectionString: url, max: 4 });
  t.after(() => pool.end());
  await pool.query("drop table if exists demo_carts, demo_orders, demo_events");
  const store = createPostgresStore(pool);
  const cart = { lines: [{ itemId: "spring-rolls", name: "Spring Rolls", quantity: 2, options: {}, unitCents: 595 }] };

  await t.test("cart round-trips and is per call", async () => {
    await store.saveCart("pg_A", cart);
    assert.deepEqual(await store.getCart("pg_A"), cart);
    assert.deepEqual(await store.getCart("pg_other"), { lines: [] });
  });

  await t.test("placing stores exactly one row, returns it, and clears the cart", async () => {
    const r = await store.placeOrder("pg_A", cart, "Alex");
    assert.equal(r.status, "placed");
    assert.equal(r.order.totalCents, 1190);
    assert.equal(r.order.pickupName, "Alex");
    const { rows } = await pool.query("select reference, total_cents from demo_orders where call_id = 'pg_A'");
    assert.deepEqual(rows, [{ reference: r.order.reference, total_cents: 1190 }]);
    assert.deepEqual(await store.getCart("pg_A"), { lines: [] });
  });

  await t.test("a repeat for the same call returns the same order", async () => {
    const first = await store.getOrder("pg_A");
    const again = await store.placeOrder("pg_A", cart, null);
    assert.equal(again.status, "already_placed");
    assert.equal(again.order.reference, first.reference);
    assert.equal((await pool.query("select count(*)::int as n from demo_orders")).rows[0].n, 1);
  });

  await t.test("ten simultaneous place requests for one call still store one order", async () => {
    await store.saveCart("pg_race", cart);
    const results = await Promise.all(Array.from({ length: 10 }, () => store.placeOrder("pg_race", cart, null)));
    assert.equal(results.filter((r) => r.status === "placed").length, 1);
    assert.equal(new Set(results.map((r) => r.order.reference)).size, 1);
    assert.equal((await pool.query("select count(*)::int as n from demo_orders where call_id = 'pg_race'")).rows[0].n, 1);
  });

  await t.test("a write the database rejects throws, and the tool reports failed", async () => {
    await store.saveCart("pg_bad", cart);
    await pool.query("alter table demo_orders add constraint demo_block check (call_id <> 'pg_bad')");
    await assert.rejects(store.placeOrder("pg_bad", cart, null));
    const r = await handleTool(store, "pg_bad", "place_order", {});
    assert.equal(r.status, "failed");
    assert.equal((await pool.query("select count(*)::int as n from demo_orders where call_id = 'pg_bad'")).rows[0].n, 0);
    assert.equal((await store.getCart("pg_bad")).lines.length, 1);
    await pool.query("alter table demo_orders drop constraint demo_block");
  });

  await t.test("full tool flow against the database", async () => {
    await handleTool(store, "pg_flow", "add_item", { item: "Kung Pao Chicken", quantity: 2, options: { "Spice level": "Medium" } });
    await handleTool(store, "pg_flow", "add_item", { item: "Hot Jasmine Tea", quantity: 1 });
    const placed = await handleTool(store, "pg_flow", "place_order", {});
    assert.equal(placed.status, "placed");
    assert.equal(placed.total, "$32.85");
    const events = await store.recentEvents(50);
    assert.ok(events.some((e) => e.callId === "pg_flow" && e.tool === "place_order" && e.ok));
  });
});
