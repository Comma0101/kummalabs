# KummaLabs

Source for two sites served by one Next.js app, routed by host:

- **[www.kummalabs.com](https://www.kummalabs.com)**: KummaLabs, an AI agent engineering studio. We build, connect, and fix
  the code behind AI agents.
- **[kota.kummalabs.com](https://kota.kummalabs.com)**: the product site for KOTA, a phone-ordering prototype for restaurants.

## What is worth reading here

### A tool backend for a voice agent

A [Retell](https://www.retellai.com) agent takes a restaurant order by calling tools on this server. The agent's prompt
contains no menu and no prices; everything it can say about the order comes back from these tools.

| Part | Where | What it shows |
|---|---|---|
| Signature check | [`src/lib/retell/signature.ts`](src/lib/retell/signature.ts) | Verifying `X-Retell-Signature` over the raw body, with a five-minute replay window and a constant-time compare |
| Tool endpoint | [`src/app/api/retell/tool/route.ts`](src/app/api/retell/tool/route.ts) | Reads the raw body, rejects unsigned or stale requests, validates the call id |
| Ordering rules | [`src/lib/demo-order/engine.ts`](src/lib/demo-order/engine.ts) | Pure functions: menu search in English and Chinese, required choices, conditional choices, integer-cent totals |
| Tool results | [`src/lib/demo-order/tools.ts`](src/lib/demo-order/tools.ts) | "placed" is returned only with the row the database gave back; a failed write returns `failed` with the sentence the agent should say |
| Storage | [`src/lib/demo-order/store-postgres.ts`](src/lib/demo-order/store-postgres.ts) | One order per call, enforced by a unique constraint and `insert … on conflict do nothing returning *` |
| Agent definition | [`scripts/retell/agent-config.mjs`](scripts/retell/agent-config.mjs) | The prompt and tool schemas as code, applied with `scripts/retell/setup.mjs` |

Two write-ups explain the reasoning, with test output:

- [The agent said "confirmed". The database had nothing.](https://www.kummalabs.com/notes/agent-said-confirmed-nothing-saved)
- [One request, five bookings: making agent tool calls safe to repeat](https://www.kummalabs.com/notes/duplicate-tool-calls)

**Status.** This is demo code with a fictional restaurant. It is tested by the suite below and in typed conversations in
Retell's playground. It has not been tested on live phone calls, and it is not a client deployment.

### A form that only says "sent" when the email was accepted

[`src/lib/brief.ts`](src/lib/brief.ts) and [`src/app/api/brief/route.ts`](src/app/api/brief/route.ts): validation, a
honeypot and a minimum fill time for spam, HTML escaping, and a success response only when the email provider accepts
the message.

## Run it

Node 22 or later.

```bash
npm install
npm run dev
```

- KOTA site: http://localhost:3000
- Studio site: http://studio.localhost:3000

Checks:

```bash
npx tsc --noEmit
node --test tests/*.test.mjs
npm run build
```

The storage tests run against a real Postgres when `TEST_DATABASE_URL` points at a scratch database, and are skipped
otherwise. They drop and recreate the `demo_*` tables, so never point them at a database you care about.

## Environment

| Variable | Used for |
|---|---|
| `RESEND_API_KEY`, `BRIEF_NOTIFICATION_EMAIL` (or `NOTIFICATION_EMAIL`) | Delivering the project-brief and contact forms |
| `RETELL_API_KEY` | Verifying requests from Retell |
| `DATABASE_URL` (or `DEMO_DATABASE_URL`) | Postgres for the ordering demo. In production there is no in-memory fallback |
| `NEXT_PUBLIC_DEMO_PHONE` | The demo line's number, once there is one |

Never commit `.env*` files.

## Layout

- `src/middleware.ts` and `src/lib/studio-host.ts`: host routing.
- `src/app/studio/`, `src/components/studio/`, `src/lib/studio-*.ts`: the studio site.
- `src/app/[lang]/`, `src/components/`, `src/dictionaries/`: the KOTA site, in English and Chinese.
- `tests/`: `node --test` suites that import the TypeScript directly.

Contact: info@kummalabs.com
