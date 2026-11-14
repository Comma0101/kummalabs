import Link from "next/link";
import { Code, NoteShell, Recorded, noteMetadata } from "@/components/studio/Note";

const SLUG = "verify-retell-signature-nextjs";

export const metadata = noteMetadata(SLUG);

const DOCS_FUNCTION = "https://docs.retellai.com/build/single-multi-prompt/custom-function";
const DOCS_WEBHOOK = "https://docs.retellai.com/features/secure-webhook";
const THREAD_VERIFY = "https://community.retellai.com/t/webhook-signature-verification/252";
const SCRIPT = "https://github.com/Comma0101/kummalabs/blob/master/scripts/retell/check-endpoint.mjs";

// Recorded strings are verbatim, from 2026-11-13: `node --test tests/retell-signature.test.mjs`;
// `scripts/retell/check-endpoint.mjs` against a production build of this site running locally with a
// test key and a scratch Postgres; and one unsigned POST to the deployed endpoint. Do not edit them
// by hand; re-run and paste.
// Code blocks are checked against the files they name by tests/studio-notes.test.mjs.
// What Retell's documentation says was read on 2026-11-13 (the two DOCS_ pages above). The forum
// thread is someone else's report and Retell's reply to it; we did not reproduce their failure.
export default function Note() {
  return (
    <NoteShell
      slug={SLUG}
      record={[
        { label: "Based on", value: "One Next.js route handler: the endpoint a Retell agent calls in our ordering demo." },
        {
          label: "Evidence",
          value: "Unit tests, six requests to the built route, and Retell’s own calls to the deployed one. Quoted exactly.",
        },
        { label: "Not tested", value: "Live phone calls, the Edge runtime, and whether Retell follows a redirect." },
        {
          label: "Sources",
          value: (
            <>
              Retell’s documentation on{" "}
              <a href={DOCS_FUNCTION} className="link">
                custom functions
              </a>{" "}
              and{" "}
              <a href={DOCS_WEBHOOK} className="link">
                webhooks
              </a>
              , read on November 13, 2026.
            </>
          ),
        },
      ]}
    >
      <h2>Anyone can call it</h2>
      <p>
        A custom function is a web address. During a call, Retell posts to it, and your code looks something up or
        writes something down. The address is on the public internet, so anything else can post to it as well. If the
        function places an order or books an appointment, a request made up by a stranger does the same.
      </p>
      <p>
        Retell signs every request so that you can tell the difference. Its{" "}
        <a href={DOCS_WEBHOOK}>documentation</a> describes an <code>X-Retell-Signature</code> header of the form{" "}
        <code>{"v={timestamp},d={digest}"}</code>. The digest is an HMAC-SHA256, keyed with your API key, of the raw
        request body followed by the timestamp. The timestamp has to be within five minutes of now.
      </p>

      <h2>The check</h2>
      <Code file="src/lib/retell/signature.ts">{`const WINDOW_MS = 5 * 60 * 1000;

export function verifyRetellSignature(
  rawBody: string,
  signature: string | null | undefined,
  apiKey: string | null | undefined,
  now: number,
): boolean {
  if (!apiKey || !signature) return false;
  const match = /^v=(\\d+),d=([0-9a-f]+)$/i.exec(signature.trim());
  if (!match) return false;

  const timestamp = Number(match[1]);
  if (!Number.isFinite(timestamp) || Math.abs(now - timestamp) > WINDOW_MS) return false;

  const expected = createHmac("sha256", apiKey).update(rawBody + match[1]).digest();
  const given = Buffer.from(match[2], "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}`}</Code>
      <p>Four decisions are in there.</p>
      <ul>
        <li>
          <strong>No key means no.</strong> A missing key or a missing header is a refusal, never a skipped check.
        </li>
        <li>
          <strong>The header has to match exactly.</strong> Anything that isn’t a timestamp and a hex digest is refused
          before any arithmetic.
        </li>
        <li>
          <strong>Five minutes, in both directions.</strong> The timestamp is part of what is signed, so it can’t be
          moved without breaking the digest. A timestamp from the future is as wrong as an old one.
        </li>
        <li>
          <strong>Compare in constant time, lengths first.</strong> <code>timingSafeEqual</code> throws when the
          lengths differ, so the length is checked before it.
        </li>
      </ul>
      <p>
        Retell’s SDK ships a <code>verify</code> function, and the documentation shows how to call it. We wrote the
        check out instead. It is short, it has no dependency, and it takes the current time as an argument, so a test
        can move the clock.
      </p>

      <h2>In a Next.js route</h2>
      <Code file="src/app/api/retell/tool/route.ts">{`export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CALL_ID = /^[A-Za-z0-9_-]{1,128}$/;

export async function POST(request: NextRequest) {
  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    console.error("retell tool: RETELL_API_KEY is not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  // Verify against the raw body, before parsing anything.
  const raw = await request.text();
  if (!verifyRetellSignature(raw, request.headers.get("x-retell-signature"), apiKey, Date.now())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let payload: { name?: unknown; args?: unknown; call?: { call_id?: unknown } };
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name : "";
  const callId = typeof payload.call?.call_id === "string" ? payload.call.call_id : "";
  if (!name || !CALL_ID.test(callId)) {
    return NextResponse.json({ error: "missing_name_or_call_id" }, { status: 400 });
  }`}</Code>
      <ul>
        <li>
          <strong>Read the body once, as text.</strong> <code>request.text()</code> returns what Retell signed.{" "}
          <code>request.json()</code> returns an object, and turning an object back into a string does not promise the
          same characters. A request body can only be read once, so the order is: read the text, check it, then parse
          that same string.
        </li>
        <li>
          <strong>Refuse when the key is missing.</strong> An unset environment variable must not switch the check
          off. Ours answers 503 and runs nothing. Retell’s documentation adds that only the API key marked with a
          webhook badge verifies signatures.
        </li>
        <li>
          <strong>Use the Node.js runtime.</strong> The check uses Node’s crypto module, so the route says so. We have
          not tried it on the Edge runtime.
        </li>
        <li>
          <strong>Give Retell the address that answers.</strong> Our bare domain answers a POST with a 308 redirect to{" "}
          <code>www</code>. We did not test whether Retell follows a redirect. We gave it the <code>www</code> address,
          so the question doesn’t come up. For the same reason, middleware that redirects by language or rewrites
          paths has to leave <code>/api</code> alone.
        </li>
        <li>
          <strong>A valid signature is not valid input.</strong> The signature says Retell sent the request. The
          arguments inside were written by a language model, from what a caller said. After the check, the route still
          validates the function name and the call id, and the ordering code validates every argument.
        </li>
      </ul>

      <h2>Why “parse, then stringify” fails</h2>
      <p>
        In <a href={THREAD_VERIFY}>a 2025 thread on Retell’s forum</a>, someone wrote that they could not get
        verification to pass at all. The sample code in the reply from Retell’s support account verified{" "}
        <code>JSON.stringify(req.body)</code>. Retell’s <a href={DOCS_FUNCTION}>documentation</a> now says to use the
        raw body, because serialising again can reorder keys or change whitespace. We don’t know what was wrong in
        that person’s case.
      </p>
      <p>
        We also don’t know how Retell writes its JSON, so we can’t say which requests would survive a round trip.
        This test shows that one can fail: the same value, written with one extra space and <code>2.0</code> for{" "}
        <code>2</code>.
      </p>
      <Code file="tests/retell-signature.test.mjs">{`test("a body that was parsed and serialized again is not the body that was signed", () => {
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
});`}</Code>
      <Recorded label="Result" tone="pass">{`ok 1 - accepts a correctly signed, fresh request
ok 2 - rejects a missing, malformed, or wrong-key signature
ok 3 - rejects a tampered body
ok 4 - a body that was parsed and serialized again is not the body that was signed
ok 5 - rejects a replayed request outside the 5-minute window
ok 6 - rejects everything when no key is configured`}</Recorded>

      <h2>Forged requests against the running route</h2>
      <p>
        Unit tests check the function. <a href={SCRIPT}>A short script</a> checks the route: it sends one request six
        ways and prints what came back. Five are forgeries. Here it is against a production build of this site,
        running locally with a test key.
      </p>
      <Recorded label="Six requests to the built route" tone="pass">{`401  no signature
401  signed with another key
401  signed ten minutes ago
401  one space added to the body after signing
401  digest only, no timestamp
200  correctly signed
Forged requests refused, signed request accepted.`}</Recorded>
      <p>Afterwards the database held one event, from the one signed request.</p>
      <p>
        The deployed route gets the real thing. On November 13, Retell’s playground called it three times with
        Retell’s own signature, and each call was accepted and answered. The same address, sent a request with no
        signature:
      </p>
      <Recorded label="An unsigned request to the deployed endpoint: the response, then the status" tone="pass">{`{"error":"unauthorized"}
401`}</Recorded>

      <h2>What a failing check looks like</h2>
      <p>
        When the check is wrong, every function call gets a 401. The wrong key in production does it, and so does a
        body that was serialised again. Retell’s <a href={DOCS_FUNCTION}>documentation</a> says a failed request,
        including a 4xx, reaches the agent as an error, and the agent carries on as its prompt tells it to. So nothing
        crashes. The agent can’t do anything, on every call, and says so politely. If yours has started apologising,
        look for 401s in the function’s logs before you touch the prompt.
      </p>

      <h2>What the signature does not do</h2>
      <p>
        Inside the five minutes, the same signed request can be sent again and will pass. The signature says where a
        request came from. It does not make the request safe to run twice. The write behind it has to be safe to
        repeat, and that is <Link href="/notes/duplicate-tool-calls">a separate note</Link>.
      </p>

      <h2>Check your own endpoint</h2>
      <ul>
        <li>Post to it with no signature. Any answer other than a refusal is the finding.</li>
        <li>
          Run <a href={SCRIPT}>the script</a> against it with your key and a request body that is safe to run. It
          should refuse five and accept one.
        </li>
        <li>
          Find where the body is read. If the code verifies a body that was parsed and turned back into a string,
          change it to the raw text.
        </li>
        <li>
          In a test environment, remove the key and call the endpoint. It should refuse everything, not accept
          everything.
        </li>
        <li>Check the address Retell has for the function. It should answer directly, with no redirect.</li>
        <li>Send a correctly signed request with nonsense arguments, and see what your code does with them.</li>
      </ul>

      <h2>What this note does not show</h2>
      <p>
        The check was tested by unit tests, by forged requests to a local production build, and by Retell’s playground
        calling the deployed route. It has not been tested on live phone calls. It covers custom functions sent as a
        POST with a JSON body. Retell’s documentation describes the same header on its webhooks, which our demo
        doesn’t consume, and an IP address you can restrict your server to, which we don’t use.
      </p>
    </NoteShell>
  );
}
