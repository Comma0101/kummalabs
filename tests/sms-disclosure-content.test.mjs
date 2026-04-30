import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const disclosurePath = join(root, "src/app/[lang]/sms-disclosure/page.tsx");
const privacyPath = join(root, "src/app/[lang]/privacy-policy/page.tsx");
const termsPath = join(root, "src/app/[lang]/terms/page.tsx");

test("sms disclosure page contains carrier proof-of-consent content", () => {
  assert.equal(existsSync(disclosurePath), true, "sms disclosure route is missing");

  const page = readFileSync(disclosurePath, "utf8");

  assert.match(page, /SMS Messaging Terms & Opt-In Disclosure/);
  assert.match(page, /START/);
  assert.match(page, /7473468149/);
  assert.match(
    page,
    /Welcome to KOTA by Kummalabs! You've opted in for order updates\. Msg & data rates may apply\. Reply STOP to end\./
  );
  assert.match(
    page,
    /By providing your phone number and texting 'START', you agree to receive automated transactional text messages/
  );
  assert.match(page, /Consent is not a condition of purchase\./);
});

test("linked policy pages include mobile marketing non-sharing language", () => {
  const privacy = readFileSync(privacyPath, "utf8");
  const terms = readFileSync(termsPath, "utf8");
  const requiredPhrase = /mobile (?:opt-in )?information is not shared with third parties for marketing or promotional purposes/i;

  assert.match(privacy, requiredPhrase);
  assert.match(terms, requiredPhrase);
});
