import assert from "node:assert/strict";
import test from "node:test";
import { escapeHtml, validateBrief } from "../src/lib/brief.ts";

const now = 1_000_000;
const good = {
  email: " Buyer@Example.com ",
  today: "Leads arrive by email and we copy them into the CRM by hand.",
  result: "New leads appear in the CRM with the right owner.",
  systems: "Gmail, HubSpot",
  timeline: "",
  website: "",
  startedAt: now - 20_000,
  source: { utm_source: "newsletter", referrer: "https://example.com/x", path: "/services/integration" },
};

test("accepts a valid brief and normalizes it", () => {
  const r = validateBrief(good, now);
  assert.equal(r.ok, true);
  assert.equal(r.spam, false);
  assert.equal(r.brief.email, "buyer@example.com");
  assert.equal(r.brief.source.utm_source, "newsletter");
});

test("rejects missing or malformed required fields with per-field errors", () => {
  const r = validateBrief({ ...good, email: "not-an-email", today: "  ", result: "" }, now);
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ["email", "result", "today"]);
});

test("rejects non-object and oversized input", () => {
  assert.equal(validateBrief(null, now).ok, false);
  assert.equal(validateBrief("x", now).ok, false);
  const r = validateBrief({ ...good, today: "a".repeat(5001) }, now);
  assert.equal(r.ok, false);
  assert.ok(r.errors.today);
});

test("flags honeypot and too-fast submissions as spam without errors", () => {
  assert.equal(validateBrief({ ...good, website: "http://spam" }, now).spam, true);
  assert.equal(validateBrief({ ...good, startedAt: now - 500 }, now).spam, true);
  assert.equal(validateBrief({ ...good, startedAt: undefined }, now).spam, true);
});

test("source fields are optional, trimmed, and length-limited", () => {
  const r = validateBrief({ ...good, source: { utm_source: "x".repeat(500), bogus: "y" } }, now);
  assert.equal(r.ok, true);
  assert.equal(r.brief.source.utm_source.length, 200);
  assert.equal("bogus" in r.brief.source, false);
  const landed = validateBrief({ ...good, source: { landing: "/notes/duplicate-tool-calls", path: "/" } }, now);
  assert.equal(landed.brief.source.landing, "/notes/duplicate-tool-calls");
  assert.equal(landed.brief.source.path, "/");
  assert.equal(validateBrief({ ...good, source: undefined }, now).ok, true);
});

test("escapeHtml neutralizes markup", () => {
  assert.equal(escapeHtml(`<img src=x onerror="a('b')">&`), "&lt;img src=x onerror=&quot;a(&#39;b&#39;)&quot;&gt;&amp;");
});
