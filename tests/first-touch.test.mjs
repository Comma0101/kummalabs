import assert from "node:assert/strict";
import test from "node:test";
import { describeVisit, readFirstTouch } from "../src/lib/first-touch.ts";

const ORIGIN = "https://www.kummalabs.com";

test("a visit records its landing page, utm tags, and outside referrer", () => {
  assert.deepEqual(
    describeVisit("?utm_source=reddit&utm_campaign=note1&other=x", "/notes/duplicate-tool-calls", "https://www.reddit.com/", ORIGIN),
    { landing: "/notes/duplicate-tool-calls", utm_source: "reddit", utm_campaign: "note1", referrer: "https://www.reddit.com/" },
  );
});

test("no tags and no referrer leaves only the landing page", () => {
  assert.deepEqual(describeVisit("", "/", "", ORIGIN), { landing: "/" });
});

test("a referrer from our own site is not recorded", () => {
  assert.deepEqual(describeVisit("", "/work", `${ORIGIN}/notes`, ORIGIN), { landing: "/work" });
  assert.deepEqual(describeVisit("", "/work", ORIGIN, ORIGIN), { landing: "/work" });
  // A look-alike host is an outside referrer.
  assert.equal(describeVisit("", "/", "https://www.kummalabs.com.evil.example/x", ORIGIN).referrer, "https://www.kummalabs.com.evil.example/x");
});

test("outside a browser there is nothing to read", () => {
  assert.deepEqual(readFirstTouch(), {});
});
