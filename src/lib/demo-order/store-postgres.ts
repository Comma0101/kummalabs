// Postgres implementation of the demo store. An order exists only if its INSERT returned a row;
// the unique constraint on call_id makes placing an order idempotent per call.
import type { Pool } from "pg";
import { totalCents } from "./engine.ts";
import type { Cart } from "./engine.ts";
import { newReference } from "./store.ts";
import type { DemoStore, StoredEvent, StoredOrder } from "./store.ts";

export const SCHEMA_SQL = `
create table if not exists demo_carts (
  call_id text primary key,
  cart jsonb not null,
  updated_at timestamptz not null default now()
);
create table if not exists demo_orders (
  reference text primary key,
  call_id text not null unique,
  lines jsonb not null,
  total_cents integer not null check (total_cents >= 0),
  pickup_name text,
  created_at timestamptz not null default now()
);
create table if not exists demo_events (
  id bigserial primary key,
  call_id text not null,
  tool text not null,
  ok boolean not null,
  summary text not null,
  created_at timestamptz not null default now()
);
create index if not exists demo_events_created_at on demo_events (created_at desc);
`;

type OrderRow = { reference: string; call_id: string; lines: StoredOrder["lines"]; total_cents: number; pickup_name: string | null; created_at: Date };

const toOrder = (r: OrderRow): StoredOrder => ({
  reference: r.reference,
  callId: r.call_id,
  lines: r.lines,
  totalCents: r.total_cents,
  pickupName: r.pickup_name,
  createdAt: r.created_at.toISOString(),
});

export function createPostgresStore(pool: Pool): DemoStore {
  let schemaReady: Promise<unknown> | null = null;
  const ready = () => (schemaReady ??= pool.query(SCHEMA_SQL).catch((e) => {
    schemaReady = null;
    throw e;
  }));

  const getOrder = async (callId: string) => {
    await ready();
    const { rows } = await pool.query<OrderRow>("select * from demo_orders where call_id = $1", [callId]);
    return rows[0] ? toOrder(rows[0]) : null;
  };

  return {
    async getCart(callId) {
      await ready();
      const { rows } = await pool.query<{ cart: Cart }>("select cart from demo_carts where call_id = $1", [callId]);
      return rows[0]?.cart ?? { lines: [] };
    },

    async saveCart(callId, cart) {
      await ready();
      await pool.query(
        `insert into demo_carts (call_id, cart) values ($1, $2::jsonb)
         on conflict (call_id) do update set cart = excluded.cart, updated_at = now()`,
        [callId, JSON.stringify(cart)],
      );
    },

    async placeOrder(callId, cart, pickupName) {
      await ready();
      const client = await pool.connect();
      try {
        await client.query("begin");
        // A reference collision is astronomically unlikely per attempt; retry a few times anyway.
        for (let attempt = 0; attempt < 5; attempt++) {
          const { rows } = await client.query<OrderRow>(
            `insert into demo_orders (reference, call_id, lines, total_cents, pickup_name)
             values ($1, $2, $3::jsonb, $4, $5)
             on conflict do nothing
             returning *`,
            [newReference(), callId, JSON.stringify(cart.lines), totalCents(cart), pickupName],
          );
          if (rows.length === 1) {
            await client.query("delete from demo_carts where call_id = $1", [callId]);
            await client.query("commit");
            return { status: "placed", order: toOrder(rows[0]) };
          }
          const existing = await client.query<OrderRow>("select * from demo_orders where call_id = $1", [callId]);
          if (existing.rows[0]) {
            await client.query("commit");
            return { status: "already_placed", order: toOrder(existing.rows[0]) };
          }
        }
        throw new Error("could not allocate an order reference");
      } catch (e) {
        await client.query("rollback").catch(() => undefined);
        throw e;
      } finally {
        client.release();
      }
    },

    getOrder,

    async recentOrders(limit) {
      await ready();
      const { rows } = await pool.query<OrderRow>("select * from demo_orders order by created_at desc limit $1", [limit]);
      return rows.map(toOrder);
    },

    async logEvent(callId, tool, ok, summary) {
      await ready();
      await pool.query("insert into demo_events (call_id, tool, ok, summary) values ($1, $2, $3, $4)", [callId, tool, ok, summary.slice(0, 300)]);
    },

    async resetCall(callId) {
      await ready();
      await pool.query("delete from demo_carts where call_id = $1", [callId]);
      await pool.query("delete from demo_orders where call_id = $1", [callId]);
    },

    async recentEvents(limit) {
      await ready();
      const { rows } = await pool.query<{ call_id: string; tool: string; ok: boolean; summary: string; created_at: Date }>(
        "select call_id, tool, ok, summary, created_at from demo_events order by id desc limit $1",
        [limit],
      );
      return rows.map((r): StoredEvent => ({ callId: r.call_id, tool: r.tool, ok: r.ok, summary: r.summary, createdAt: r.created_at.toISOString() }));
    },
  };
}
