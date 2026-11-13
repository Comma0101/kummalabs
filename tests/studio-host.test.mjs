import assert from "node:assert/strict";
import test from "node:test";
import { isStaticFile, isStudioHost, studioPath } from "../src/lib/studio-host.ts";

test("studio site is served on kummalabs.com, www, and studio.localhost", () => {
  assert.equal(isStudioHost("kummalabs.com"), true);
  assert.equal(isStudioHost("www.kummalabs.com"), true);
  assert.equal(isStudioHost("KummaLabs.com"), true);
  assert.equal(isStudioHost("studio.localhost:3000"), true);
});

test("KOTA hosts and unknown hosts keep the KOTA site", () => {
  assert.equal(isStudioHost("kota.kummalabs.com"), false);
  assert.equal(isStudioHost("localhost:3000"), false);
  assert.equal(isStudioHost("korami-site.vercel.app"), false);
  assert.equal(isStudioHost("kummalabs.com.evil.example"), false);
  assert.equal(isStudioHost(null), false);
  assert.equal(isStudioHost(""), false);
});

test("studio paths map under /studio", () => {
  assert.equal(studioPath("/"), "/studio");
  assert.equal(studioPath("/work/kota"), "/studio/work/kota");
});

test("files with extensions pass through untouched", () => {
  assert.equal(isStaticFile("/og.png"), true);
  assert.equal(isStaticFile("/KummaLabs-KOTA-case-study.pdf"), true);
  assert.equal(isStaticFile("/robots.txt"), true);
  assert.equal(isStaticFile("/work/kota"), false);
  assert.equal(isStaticFile("/"), false);
});
