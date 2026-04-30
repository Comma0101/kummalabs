# SMS Disclosure Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a carrier-review-friendly SMS opt-in disclosure page and ensure linked policy pages contain the required mobile data sharing language.

**Architecture:** Add a static server-rendered page under the existing localized App Router segment. Keep the page independent from dictionary files because compliance copy must remain exact and easy to inspect. Add a Node content test that validates the proof-of-consent route and linked policies.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Node built-in test runner.

---

### Task 1: Add Content Test

**Files:**
- Create: `tests/sms-disclosure-content.test.mjs`

**Step 1: Write the failing test**

Create a Node test that asserts:
- `src/app/[lang]/sms-disclosure/page.tsx` exists.
- The page contains `SMS Messaging Terms & Opt-In Disclosure`.
- The page contains `START`, `7473468149`, the welcome message, and the exact disclosure sentence.
- Privacy and terms pages contain mobile marketing non-sharing language.

**Step 2: Run test to verify it fails**

Run: `node --test tests/sms-disclosure-content.test.mjs`

Expected: fail because the disclosure route does not exist yet.

### Task 2: Implement Disclosure Page

**Files:**
- Create: `src/app/[lang]/sms-disclosure/page.tsx`

**Step 1: Add static page**

Build a responsive, white-space-forward compliance page with:
- Hero area
- Phone UI mockup
- In-restaurant signage mockup
- Dedicated disclosure block
- Privacy Policy and Terms links based on the current locale

**Step 2: Run content test**

Run: `node --test tests/sms-disclosure-content.test.mjs`

Expected: fail until policy wording is updated.

### Task 3: Update Linked Policies

**Files:**
- Modify: `src/app/[lang]/privacy-policy/page.tsx`
- Modify: `src/app/[lang]/terms/page.tsx`

**Step 1: Add mobile information sharing language**

Add clear wording that mobile opt-in information is not shared with third parties for marketing or promotional purposes.

**Step 2: Run content test**

Run: `node --test tests/sms-disclosure-content.test.mjs`

Expected: pass.

### Task 4: Verify, Commit, Push

**Files:**
- Modify: `package.json` only if adding a reusable test script is useful.

**Step 1: Run project verification**

Run:
- `node --test tests/sms-disclosure-content.test.mjs`
- `npm run build`

**Step 2: Commit**

Run:
- `git add docs/plans/2026-04-30-sms-disclosure-design.md docs/plans/2026-04-30-sms-disclosure-implementation.md tests/sms-disclosure-content.test.mjs 'src/app/[lang]/sms-disclosure/page.tsx' 'src/app/[lang]/privacy-policy/page.tsx' 'src/app/[lang]/terms/page.tsx' package.json package-lock.json`
- `git commit -m "feat: add sms opt-in disclosure page"`

**Step 3: Push**

Run:
- `git push origin master`
