// Picks the store for the running server. Production requires Postgres: there is no silent
// fallback, because serverless instances don't share memory and a cart would vanish mid-call.
import { Pool } from "pg";
import { createMemoryStore } from "./store.ts";
import type { DemoStore } from "./store.ts";
import { createPostgresStore } from "./store-postgres.ts";

const globalForStore = globalThis as unknown as { __demoStore?: DemoStore };

export function getDemoStore(): DemoStore | null {
  if (globalForStore.__demoStore) return globalForStore.__demoStore;
  const url = process.env.DEMO_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (url) {
    globalForStore.__demoStore = createPostgresStore(new Pool({ connectionString: url, max: 3, idleTimeoutMillis: 10_000 }));
  } else if (process.env.NODE_ENV !== "production") {
    globalForStore.__demoStore = createMemoryStore();
  } else {
    return null;
  }
  return globalForStore.__demoStore;
}
