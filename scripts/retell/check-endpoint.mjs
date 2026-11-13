// Sends one custom-function request to an endpoint six ways and prints the HTTP status of each.
// Five are forgeries and must be refused. Only the correctly signed one may run.
//
//   RETELL_API_KEY=... node scripts/retell/check-endpoint.mjs <url> ['<json body>']
//
// The last request is correctly signed, so the endpoint will act on it. The default body asks our
// demo for an empty cart. Against your own endpoint, pass a body that is safe to run.
// Nothing is sent to Retell, and the key is never printed or sent: only signatures made with it.
import { createHmac } from "node:crypto";

const [url, body = JSON.stringify({ name: "view_cart", args: {}, call: { call_id: "signature_check" } })] = process.argv.slice(2);
const key = process.env.RETELL_API_KEY;
if (!url || !key) {
  console.error("usage: RETELL_API_KEY=... node scripts/retell/check-endpoint.mjs <url> ['<json body>']");
  process.exit(2);
}

const digest = (signedBody, timestamp, secret) => createHmac("sha256", secret).update(signedBody + timestamp).digest("hex");
const header = (signedBody, timestamp, secret = key) => `v=${timestamp},d=${digest(signedBody, timestamp, secret)}`;
const now = Date.now();

// [what is wrong with it, X-Retell-Signature header, body sent, should the endpoint accept it]
const cases = [
  ["no signature", null, body, false],
  ["signed with another key", header(body, now, "key_wrong"), body, false],
  ["signed ten minutes ago", header(body, now - 10 * 60_000), body, false],
  ["one space added to the body after signing", header(body, now), `${body} `, false],
  ["digest only, no timestamp", digest(body, now, key), body, false],
  ["correctly signed", header(body, now), body, true],
];

let wrong = 0;
for (const [label, signature, sent, shouldAccept] of cases) {
  const headers = { "content-type": "application/json" };
  if (signature) headers["x-retell-signature"] = signature;
  const res = await fetch(url, { method: "POST", headers, body: sent, redirect: "manual" });
  const accepted = res.status >= 200 && res.status < 300;
  const ok = accepted === shouldAccept;
  if (!ok) wrong++;
  console.log(`${res.status}  ${label}${ok ? "" : shouldAccept ? "   <- should have been accepted" : "   <- should have been refused"}`);
}
console.log(wrong === 0 ? "Forged requests refused, signed request accepted." : `${wrong} of ${cases.length} requests were handled wrongly.`);
process.exit(wrong === 0 ? 0 : 1);
