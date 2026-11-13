import { Code, NoteShell, Recorded, noteMetadata } from "@/components/studio/Note";

const SLUG = "duplicate-tool-calls";

export const metadata = noteMetadata(SLUG);

const THREAD_BOOKINGS =
  "https://community.retellai.com/t/book-appointment-tool-calls-fired-in-a-single-llm-turn-after-streaming-timeout-resulted-in-multiple-appointments-booked-for-one-requested-slot/3301";
const THREAD_WEBHOOKS = "https://community.retellai.com/t/duplicate-webhook-payloads/2573";

// Recorded strings are verbatim output of `node --test tests/demo-store-postgres.test.mjs` against a
// real Postgres on 2026-11-12. Do not edit them by hand; re-run and paste.
// Code blocks are checked against the files they name by tests/studio-notes.test.mjs.
// The two forum threads are other people's reports and Retell's replies to them, read on 2026-11-12.
// We paraphrase them closely and say they are not our own tests.
export default function Note() {
  return (
    <NoteShell
      slug={SLUG}
      record={[
        { label: "Based on", value: "The ordering backend we built for a Retell agent: tools on our own server, with Postgres behind them." },
        { label: "Evidence", value: "Storage tests against a real Postgres, quoted exactly." },
        {
          label: "Not tested",
          value: "Live phone calls, and de-duplicating webhook deliveries. Our demo does not consume those webhooks.",
        },
      ]}
    >
      <h2>It happens</h2>
      <p>
        In July 2026 someone running a booking agent <a href={THREAD_BOOKINGS}>reported on Retell’s forum</a> that one
        caller had ended up with seven appointment records for a single request. Retell’s reply in the thread explains
        how: the model sent five identical booking calls in one response, all five reached the booking endpoint at the
        same moment, and all five were saved, because the endpoint’s “already booked” check ran before any of them had
        written. The agent’s normal behaviour then added two more.
      </p>
      <p>
        Retell’s first recommendation was a unique constraint in place of the read-then-write check. They also said
        they would change the platform to run identical parallel calls once. That is their account of someone else’s
        system, not something we tested, and we haven’t checked what has shipped since. The lesson doesn’t depend on
        it: nothing in a model’s output guarantees that a tool is called once.
      </p>
      <p>There are plainer routes to the same place. A caller says “yes, go ahead” twice. A turn is retried.</p>

      <h2>Why the prompt won’t fix it</h2>
      <p>
        “Call the booking tool only once” is a request, and the model usually honours it. The duplicate arrives on the
        day it doesn’t, or when the repeat comes from somewhere the prompt cannot reach. The write itself has to be safe
        to repeat.
      </p>

      <h2>The pattern</h2>
      <ol>
        <li>
          Decide what “the same action” means and name its key. In our ordering demo a call can place one order, so the
          key is the call id. For appointments it might be the patient and the slot.
        </li>
        <li>Put a unique constraint on that key.</li>
        <li>
          Insert with <code>on conflict do nothing returning *</code>. If a row comes back, this request created it. If
          none does, an earlier request did, so read that one.
        </li>
        <li>
          Return the same reference both times, with a status that says which happened. The agent then tells the caller
          the same thing whether this was the first call or the fifth.
        </li>
      </ol>
      <p>The table:</p>
      <Code file="src/lib/demo-order/store-postgres.ts">{`create table if not exists demo_orders (
  reference text primary key,
  call_id text not null unique,
  lines jsonb not null,
  total_cents integer not null check (total_cents >= 0),
  pickup_name text,
  created_at timestamptz not null default now()
);`}</Code>
      <p>And the write:</p>
      <Code file="src/lib/demo-order/store-postgres.ts">{`const { rows } = await client.query<OrderRow>(
  \`insert into demo_orders (reference, call_id, lines, total_cents, pickup_name)
   values ($1, $2, $3::jsonb, $4, $5)
   on conflict do nothing
   returning *\`,
  [newReference(), callId, JSON.stringify(cart.lines), totalCents(cart), pickupName],
);
if (rows.length === 1) {
  await client.query("delete from demo_carts where call_id = $1", [callId]);
  await client.query("commit");
  return { status: "placed", order: toOrder(rows[0]) };
}
const existing = await client.query<OrderRow>("select * from demo_orders where call_id = $1", [callId]);
if (existing.rows[0]) {
  await client.query("commit");
  return { status: "already_placed", order: toOrder(existing.rows[0]) };
}`}</Code>

      <h2>Why not check first, then insert?</h2>
      <p>
        “Look for an existing order, and insert if there isn’t one” passes a test that sends one request at a time. It
        fails under the one condition that matters: two requests arrive together, both see nothing, and both insert.
        The constraint makes the database the referee.
      </p>
      <p>
        Our tool does look for an existing order before it tries to place one, so it can answer quickly. That check is
        a shortcut. The constraint is the guard.
      </p>

      <h2>The test</h2>
      <Code file="tests/demo-store-postgres.test.mjs">{`await t.test("ten simultaneous place requests for one call still store one order", async () => {
  await store.saveCart("pg_race", cart);
  const results = await Promise.all(Array.from({ length: 10 }, () => store.placeOrder("pg_race", cart, null)));
  assert.equal(results.filter((r) => r.status === "placed").length, 1);
  assert.equal(new Set(results.map((r) => r.order.reference)).size, 1);
  assert.equal((await pool.query("select count(*)::int as n from demo_orders where call_id = 'pg_race'")).rows[0].n, 1);
});`}</Code>
      <p>
        Ten requests, one of them answered “placed”, one reference shared by all ten, one row in the table.
      </p>
      <Recorded label="Result, against a real Postgres" tone="pass">{`ok 3 - a repeat for the same call returns the same order
ok 4 - ten simultaneous place requests for one call still store one order`}</Recorded>

      <h2>Webhooks repeat too</h2>
      <p>
        Tool calls are not the only repeats. In{" "}
        <a href={THREAD_WEBHOOKS}>a thread about duplicate webhook deliveries</a>, Retell’s support replied that
        webhooks are retried up to three times on a non-2xx response or a timeout, with the same body and signature,
        and that there is no delivery id, so removing duplicates is up to the receiver. The reply suggested a hash of
        the raw body as the key.
      </p>
      <p>
        Our demo doesn’t consume those webhooks, so we haven’t tested that part. The pattern is the one above: a unique
        key, and an insert that is allowed to lose quietly.
      </p>

      <h2>Check your own agent</h2>
      <ul>
        <li>For each tool that creates something, call it twice with the same arguments and count the records.</li>
        <li>Then call it several times at once. A few lines of script against a test database will do.</li>
        <li>
          Find the unique constraint that stops the duplicate. If there isn’t one, the protection lives in application
          code, and it has a race.
        </li>
        <li>
          Check what the agent hears on the repeat. An error makes it apologise for a booking that succeeded. “Already
          done, same reference” lets it carry on.
        </li>
        <li>For webhooks, answer quickly, do the work afterwards, and store a key for each delivery.</li>
      </ul>

      <h2>What this note does not show</h2>
      <p>
        The ten simultaneous requests were sent to the storage layer, against a real Postgres. They were not sent
        through live phone calls. One order per call is a rule of our demo. Your key will be different, and choosing it
        is most of the work: a caller who really does want two appointments must still be able to book them.
      </p>
    </NoteShell>
  );
}
