import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { verifyRetellSignature } from "../src/lib/retell/signature.ts";

const key = "key_test_0000";
const body = JSON.stringify({ name: "view_cart", args: {}, call: { call_id: "c1" } });
const now = 1_800_000_000_000;
const sign = (b, ts, k = key) => `v=${ts},d=${createHmac("sha256", k).update(b + ts).digest("hex")}`;

test("accepts a correctly signed, fresh request", () => {
  assert.equal(verifyRetellSignature(body, sign(body, now), key, now), true);
  assert.equal(verifyRetellSignature(body, sign(body, now - 4 * 60_000), key, now), true);
});

test("rejects a missing, malformed, or wrong-key signature", () => {
  assert.equal(verifyRetellSignature(body, null, key, now), false);
  assert.equal(verifyRetellSignature(body, "", key, now), false);
  assert.equal(verifyRetellSignature(body, "garbage", key, now), false);
  assert.equal(verifyRetellSignature(body, `v=${now},d=zz`, key, now), false);
  assert.equal(verifyRetellSignature(body, sign(body, now, "key_other"), key, now), false);
});

test("rejects a tampered body", () => {
  assert.equal(verifyRetellSignature(body.replace("view_cart", "place_order"), sign(body, now), key, now), false);
});

test("a body that was parsed and serialized again is not the body that was signed", () => {
  // The same JSON value in different bytes: a space after a colon, and 2.0 for 2.
  const raw = '{"name":"add_item","args":{"item":"Spring Rolls","quantity": 2.0},"call":{"call_id":"c1"}}';
  const header = sign(raw, now);
  assert.equal(verifyRetellSignature(raw, header, key, now), true);
  const again = JSON.stringify(JSON.parse(raw));
  assert.notEqual(again, raw);
  assert.equal(verifyRetellSignature(again, header, key, now), false);
});

test("rejects a replayed request outside the 5-minute window", () => {
  assert.equal(verifyRetellSignature(body, sign(body, now - 6 * 60_000), key, now), false);
  assert.equal(verifyRetellSignature(body, sign(body, now + 6 * 60_000), key, now), false);
});

test("rejects everything when no key is configured", () => {
  assert.equal(verifyRetellSignature(body, sign(body, now, ""), "", now), false);
});
