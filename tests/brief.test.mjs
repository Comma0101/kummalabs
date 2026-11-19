import assert from "node:assert/strict";
import test from "node:test";
import { escapeHtml, MIN_FILL_MS, validateBrief } from "../src/lib/brief.ts";

const good = {
  email: " Buyer@Example.com ",
  today: "Leads arrive by email and we copy them into the CRM by hand.",
  result: "New leads appear in the CRM with the right owner.",
  systems: "Gmail, HubSpot",
  timeline: "",
  website: "",
  elapsedMs: 20_000,
  source: { utm_source: "newsletter", referrer: "https://example.com/x", path: "/services/integration" },
};

test("accepts a valid brief and normalizes it", () => {
  const r = validateBrief(good);
  assert.equal(r.ok, true);
  assert.equal(r.spam, false);
  assert.equal(r.brief.email, "buyer@example.com");
  assert.equal(r.brief.source.utm_source, "newsletter");
});

test("rejects missing or malformed required fields with per-field errors", () => {
  const r = validateBrief({ ...good, email: "not-an-email", today: "  ", result: "" });
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ["email", "result", "today"]);
});

test("rejects non-object and oversized input", () => {
  assert.equal(validateBrief(null).ok, false);
  assert.equal(validateBrief("x").ok, false);
  const r = validateBrief({ ...good, today: "a".repeat(5001) });
  assert.equal(r.ok, false);
  assert.ok(r.errors.today);
});

test("a filled honeypot is silently discarded regardless of timing", () => {
  const r = validateBrief({ ...good, website: "https://example.org", elapsedMs: 0 });
  assert.equal(r.ok, true);
  assert.equal(r.spam, true);
});

test("a brief at the minimum elapsed time is accepted and an early or invalid interval can be retried", () => {
  for (const elapsedMs of [MIN_FILL_MS - 1, -1, null, undefined, Infinity, "3000"]) {
    const r = validateBrief({ ...good, elapsedMs });
    assert.equal(r.ok, false);
    assert.ok(r.errors.form);
  }
  const r = validateBrief({ ...good, elapsedMs: MIN_FILL_MS });
  assert.equal(r.ok, true);
  assert.equal(r.spam, false);
});

test("a cached form's device clock can be ahead or behind", () => {
  const legacy = { ...good };
  delete legacy.elapsedMs;
  const now = Date.now();
  for (const startedAt of [now - 60_000, now + 60_000]) {
    const r = validateBrief({ ...legacy, startedAt });
    assert.equal(r.ok, true);
    assert.equal(r.spam, false);
  }
  assert.equal(validateBrief({ ...legacy, startedAt: now, elapsedMs: 0 }).ok, false);
});

test("source fields are optional, trimmed, and length-limited", () => {
  const r = validateBrief({ ...good, source: { utm_source: "x".repeat(500), bogus: "y" } });
  assert.equal(r.ok, true);
  assert.equal(r.brief.source.utm_source.length, 200);
  assert.equal("bogus" in r.brief.source, false);
  const landed = validateBrief({ ...good, source: { landing: "/notes/duplicate-tool-calls", path: "/" } });
  assert.equal(landed.brief.source.landing, "/notes/duplicate-tool-calls");
  assert.equal(landed.brief.source.path, "/");
  assert.equal(validateBrief({ ...good, source: undefined }).ok, true);
});

test("escapeHtml neutralizes markup", () => {
  assert.equal(escapeHtml(`<img src=x onerror="a('b')">&`), "&lt;img src=x onerror=&quot;a(&#39;b&#39;)&quot;&gt;&amp;");
});
