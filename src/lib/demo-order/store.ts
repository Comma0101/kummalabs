// Storage contract for the phone demo, plus an in-memory implementation for tests and local
// development. Production uses store-postgres.ts.
import { totalCents } from "./engine.ts";
import type { Cart, CartLine } from "./engine.ts";

export type StoredOrder = {
  reference: string;
  callId: string;
  lines: CartLine[];
  totalCents: number;
  /** Optional first name for pickup. Never included in public feeds or event text. */
  pickupName: string | null;
  createdAt: string;
};

export type StoredEvent = { callId: string; tool: string; ok: boolean; summary: string; createdAt: string };

export type PlaceResult = { status: "placed" | "already_placed"; order: StoredOrder };

export interface DemoStore {
  getCart(callId: string): Promise<Cart>;
  saveCart(callId: string, cart: Cart): Promise<void>;
  /**
   * Stores the order and clears the cart. One order per call: a repeat returns the existing
   * order with status "already_placed". Must throw if the order could not be stored.
   */
  placeOrder(callId: string, cart: Cart, pickupName: string | null): Promise<PlaceResult>;
  getOrder(callId: string): Promise<StoredOrder | null>;
  recentOrders(limit: number): Promise<StoredOrder[]>;
  logEvent(callId: string, tool: string, ok: boolean, summary: string): Promise<void>;
  recentEvents(limit: number): Promise<StoredEvent[]>;
  /** Test support: forget one call's cart and order so it can be reused. */
  resetCall(callId: string): Promise<void>;
}

/** Five digits, easy to read aloud. Uniqueness is enforced by the store, not by this function. */
export function newReference(): string {
  return String(Math.floor(10000 + Math.random() * 90000));
}

/** Accepts a short name made of letters (any script), spaces, hyphens, apostrophes. Else null. */
export function cleanPickupName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const name = value.trim().replace(/\s+/g, " ");
  return /^[\p{L}][\p{L} '’-]{0,39}$/u.test(name) ? name : null;
}

export function createMemoryStore(): DemoStore {
  const carts = new Map<string, Cart>();
  const orders = new Map<string, StoredOrder>();
  const events: StoredEvent[] = [];
  return {
    async getCart(callId) {
      return carts.get(callId) ?? { lines: [] };
    },
    async saveCart(callId, cart) {
      carts.set(callId, cart);
    },
    async placeOrder(callId, cart, pickupName) {
      const existing = orders.get(callId);
      if (existing) return { status: "already_placed", order: existing };
      let reference = newReference();
      while ([...orders.values()].some((o) => o.reference === reference)) reference = newReference();
      const order: StoredOrder = { reference, callId, lines: cart.lines, totalCents: totalCents(cart), pickupName, createdAt: new Date().toISOString() };
      orders.set(callId, order);
      carts.delete(callId);
      return { status: "placed", order };
    },
    async getOrder(callId) {
      return orders.get(callId) ?? null;
    },
    async recentOrders(limit) {
      return [...orders.values()].reverse().slice(0, limit);
    },
    async logEvent(callId, tool, ok, summary) {
      events.push({ callId, tool, ok, summary, createdAt: new Date().toISOString() });
    },
    async recentEvents(limit) {
      return [...events].reverse().slice(0, limit);
    },
    async resetCall(callId) {
      carts.delete(callId);
      orders.delete(callId);
    },
  };
}
