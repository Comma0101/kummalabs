# CLAUDE.md — kummalabs (local folder: korami-site)

One Next.js app serving **two sites**, routed by host in `src/middleware.ts`:
- **kummalabs.com** (+ `www`) → KummaLabs studio site: AI agent engineering services.
  Code: `src/app/studio/`, `src/components/studio/`, `src/lib/studio-*.ts`.
- **kota.kummalabs.com** and every other host (incl. `localhost`, Vercel previews) → KOTA product
  site (AI phone ordering for restaurants). Code: `src/app/[lang]/`, `src/components/`, `src/dictionaries/`.

GitHub: `Comma0101/kummalabs` — **this repo is public.**

## Public-repo rules

- Tracked files must contain nothing private: business strategy, pricing, leads, client details,
  or personal information about the owner. Private context loads from the gitignored `CLAUDE.local.md`.
- No `git push`, deploy, or publishing without explicit approval. Commit only when asked.
- Never commit `.env*` (gitignored) or real customer data. Demo content must be synthetic and labeled.

## Commands (checked 2026-11-12, Node 22)

| Task | Command | Status |
|---|---|---|
| Dev server | `npm run dev` → KOTA at http://localhost:3000, studio at http://studio.localhost:3000 | — |
| Type check | `npx tsc --noEmit` | passes |
| Tests | `node --test tests/*.test.mjs` (set `TEST_DATABASE_URL` to a scratch Postgres to include the store tests; skipped otherwise) | passes. `node --test tests/` fails on Node 22 (treats the dir as a file) |
| Build | `npm run build` | passes; warns `middleware` → `proxy` rename |
| Lint | `npm run lint` | **broken** — `next lint` was removed in Next 16, and ESLint 8 + legacy `.eslintrc.json` can't load `eslint-config-next@16`. Not a gate; a fix needs ESLint 9 + flat config |

**Verification gate for any change:** type check + tests + build.

`.npmrc` sets `legacy-peer-deps=true` (React 19 RC is pinned). Keep it for installs.

## Architecture

### Host routing (both sites)
- `src/lib/studio-host.ts` decides the site (`isStudioHost`); tested in `tests/studio-host.test.mjs`.
  On the studio host, the middleware rewrites `/x` → `/studio/x` and passes `/_next`, `/api`, and any
  path with a file extension through untouched. Other hosts fall through to the unchanged KOTA logic.
- Studio pages have their own root layout and CSS (`src/app/studio/layout.tsx`, `studio.css`, Archivo
  font); they never load KOTA's `globals.css`. Studio color tokens (`paper`, `ink`, `graphite`, `rule`,
  `pass`, `hold`, `sheet`) live in `tailwind.config.ts` next to the `korami` namespace.
- `src/app/robots.ts` and `src/app/sitemap.ts` describe the studio site only.
- Studio pages: `/` (home + project-brief form at `#brief`), `/work`, `/work/kota`,
  `/work/menu-validation` (recorded run), `/work/sample-diagnostic` (real diagnostic of KOTA's order
  path; evidence strings are verbatim test output), `/services/integration`, `/agencies`.
- Public commercial terms (diagnostic price, delivery days, credit window, reply time) live only in
  `src/lib/studio-offer.ts`. They are commitments: never change them without the owner's approval.
- Studio design language ("inspect the engineering"): mineral-white paper, deep ink, wide Archivo
  headlines; vermilion (`mark`) is the annotation colour only (selected value and its path);
  green/amber are status only; IBM Plex Mono only for code output. Show artifacts over prose, label
  each one recorded or illustrative, keep everything readable without animation and usable by keyboard.
- Home hero: `src/components/studio/Inspector.tsx`, an inspectable view of the recorded validation
  run (same data as `/work/menu-validation`; `message` strings are verbatim code output).
- Phone demo (Retell): `/demo` page + `src/components/studio/DemoFeed.tsx`. Retell's agent calls
  `POST /api/retell/tool` (signature verified in `src/lib/retell/signature.ts`); ordering rules,
  menu, and storage are in `src/lib/demo-order/` (pure `engine.ts`, `tools.ts`, memory store,
  `store-postgres.ts`). `GET /api/demo/orders` is the public feed (no caller data). The agent's
  prompt and tools are code: `scripts/retell/agent-config.mjs`, applied with
  `RETELL_API_KEY=... node scripts/retell/setup.mjs <https tool url>` (creates/updates; buys nothing).
  Env: `RETELL_API_KEY`, `DATABASE_URL` (or `DEMO_DATABASE_URL`), `NEXT_PUBLIC_DEMO_PHONE`. In
  production there is no in-memory fallback: without a database the endpoints return 503.
  Rules: the prompt never contains menu items or prices; "placed" is returned only with the row the
  database gave back; event summaries never contain caller- or model-supplied text.
- Files under `src/lib/demo-order/` and `src/lib/retell/` import each other with explicit `.ts`
  extensions so `node --test` can load them (`allowImportingTsExtensions` is on).
- Project brief: `src/components/studio/BriefForm.tsx` → `POST /api/brief` → email via Resend.
  Validation and spam rules are in `src/lib/brief.ts` (tested in `tests/brief.test.mjs`). The route
  returns success only when the provider accepts the email; otherwise the form shows an error with
  the email fallback. Env: `RESEND_API_KEY`, `BRIEF_NOTIFICATION_EMAIL` (falls back to
  `NOTIFICATION_EMAIL`), optional `BRIEF_FROM_EMAIL`. No rate limiting yet beyond honeypot + timing.
- `/work/menu-validation` shows verbatim output of `scripts/menu_grounding.py` from the KOTA repo
  (commit d15e5d7, synthetic input). Re-run and paste; never hand-edit the reported messages.
- `/studio/*` URLs are not reachable on the KOTA host (the locale redirect sends them to `/en/...`).

### KOTA site
- Next.js 16 App Router, React 19 RC, TypeScript, Tailwind 3 (theme tokens under `korami` in
  `tailwind.config.ts`), framer-motion, lucide-react. Alias `@/*` → `src/*`.
- `src/middleware.ts` redirects locale-less paths to `/en` or `/zh` by `Accept-Language`.
  Next 16 deprecates `middleware` for `proxy` — rename only as a deliberate change.
- `src/app/[lang]/layout.tsx` renders `Header` + `Footer`; `page.tsx` composes the landing
  sections; plus `privacy-policy/`, `terms/`, `sms-disclosure/`.
- **All copy lives in `src/dictionaries/en.json` and `zh.json`**, loaded via `getDictionary(locale)`;
  components take a `dict` prop. Every copy change updates **both** locales with matching keys.
- Components not rendered anywhere: Architecture, DemoPreview, FeaturesGrid, Integrations,
  ProblemOpportunity, SampleCall, Showcase, SocialProof, Solution. Don't revive one without
  checking its claims (see below).
- `src/app/api/contact/route.ts` — demo-request form → email via Resend. Env: `RESEND_API_KEY`,
  `NOTIFICATION_EMAIL` (template: `env.local.example`). With no key it returns success and logs the submission.
- `README.md` and `analysis_summary.md` are stale (Next 15, old component list). Trust the code.

## Compliance pages — handle with care

`privacy-policy`, `terms`, and `sms-disclosure` support Twilio A2P 10DLC / carrier opt-in review.
`tests/sms-disclosure-content.test.mjs` pins exact strings (opt-in message, phone number,
START/STOP language) and the footer/layout links. Don't change that wording, the number, or the
links unless explicitly asked — and then update the test in the same change.

## Claims discipline (all public copy)

Every product claim must trace to verified KOTA behavior. Classify evidence as: implemented and
demonstrated / implemented but unverified / documented only / planned / commercially validated.
Never add invented customers, testimonials, metrics (accuracy, uptime, latency, conversion,
volume), certifications, compliance claims, or integrations.

KOTA copy was reconciled with the backend on 2026-11-12 (both locales): KOTA is described as a
tested prototype in pilot; verified = EN/Mandarin calls, menu Q&A from menu data, order capture,
caller SMS confirmation, press-0 handoff, call transcripts. Marked "coming soon"/not built: kitchen
delivery (printer, tablet, staff text), reservations, hours/location Q&A, catering, order status,
Spanish. Don't reintroduce printing, "any language", capacity, uptime, or go-live-time claims.
Still unverified:
- `support@kummalabs.com` on the privacy/terms pages; the confirmed business address is
  `info@kummalabs.com`. Confirm support@ is a working mailbox before relying on it.

KOTA's backend is a separate repo (`Comma0101/Servio`; local `../korami-voice-agent`). Verify feature claims there.

Studio site claims: every entry in `src/lib/studio-work.ts` and every artifact on the studio home page was checked against the source repo on 2026-11-12
(`korami-voice-agent`, `kumma-outreach`, `Product_Lab`, `archon`). Re-verify before changing a claim.
Quote a test count only when that project's full suite passes. Label every example with where it
comes from; only illustrative examples may describe systems we haven't built, and they must say so.

## Scope

- Keep the two sites separate: KOTA keeps its product identity on kota.kummalabs.com; the studio
  site on kummalabs.com covers agent building across all channels, not just voice. Keep both
  distinct from the personal site kumma.me.
- No redesigns unless asked. Smallest useful change, existing conventions, no new dependencies without a reason.

## Known issues (not yet fixed)

`src/app/api/contact/route.ts`:
- No rate limiting or bot protection.
- Sender is Resend's sandbox `onboarding@resend.dev`, which only delivers to the Resend account
  owner until a domain is verified.
- A personal address is hardcoded as the fallback recipient; the recipient should come only from `NOTIFICATION_EMAIL`.
- Logs submission PII to the console when the API key is missing.
