import Link from "next/link";
import { Code, NoteShell, Recorded, noteMetadata } from "@/components/studio/Note";

const SLUG = "agent-said-confirmed-nothing-saved";

export const metadata = noteMetadata(SLUG);

// Recorded strings are verbatim. The first four come from the KOTA diagnostic run of 2026-11-12
// (same output as /work/sample-diagnostic). The test line and the conversation come from this
// repo: tests/demo-store-postgres.test.mjs, and a typed conversation in Retell's playground on
// 2026-11-12 with the database write forced to fail. Do not edit them by hand; re-run and paste.
// Code blocks are checked against the files they name by tests/studio-notes.test.mjs.
export default function Note() {
  return (
    <NoteShell
      slug={SLUG}
      record={[
        {
          label: "Based on",
          value: "A diagnostic of KOTA, our phone-ordering system, and the ordering backend we rebuilt afterwards.",
        },
        { label: "Evidence", value: "Test output and one typed conversation, quoted exactly. All data is synthetic." },
        {
          label: "Not tested",
          value: "Live phone calls. The two defects are still open in KOTA’s current code; we don’t run a deployment of it.",
        },
        {
          label: "Full report",
          value: (
            <Link href="/work/sample-diagnostic" className="link">
              Sample diagnostic
            </Link>
          ),
        },
      ]}
    >
      <h2>What happened</h2>
      <p>
        During a diagnostic of KOTA, our phone-ordering system, we made the database reject the write that stores an
        order. Then we placed an order.
      </p>
      <Recorded label="What the agent said">
        Perfect, your order at Golden Bowl Noodle House is confirmed for $30.40 and I just texted your order details.
        Thank you for calling.
      </Recorded>
      <Recorded label="The text it sent">
        Golden Bowl Noodle House: your pickup order is confirmed (#N/A). 2x Beef Noodle Soup, 1x Jasmine Tea. Total
        $30.40. Thank you.
      </Recorded>
      <p>
        No order was stored. The cart had been cleared, so the caller could not even try again. The only trace was
        “#N/A” where the order number should have been.
      </p>

      <h2>Two causes, both ordinary</h2>
      <p>
        The first: the function that saves the order caught its own error and returned nothing. The step that called it
        never looked at the result. It marked the order as placed and moved on to the text message.
      </p>
      <Recorded label="The save function, with the write forced to fail">save_order_details on DB error -&gt; None</Recorded>
      <p>
        The second was quieter. Orders were saved by updating a row created when the call started. When that row was
        missing, the update changed nothing, and the function still handed back an order number.
      </p>
      <Recorded label="The database’s answer, and what the function returned anyway">
        DB said: UPDATE 0 | function returned: &apos;ORD-CA_SYNTHETIC-17...&apos;
      </Recorded>
      <p>
        Neither is exotic. One is an error handler that logs and carries on. The other is an update nobody checked the
        row count of. The model did nothing wrong in either case. It was told the order went through, and it said so.
      </p>

      <h2>The rule</h2>
      <p>
        A language model will say whatever the tool result lets it say. So the tool result has to be true. Three things
        follow.
      </p>
      <ul>
        <li>
          <strong>Success needs proof from the system that holds the record.</strong> Return “placed” only together with
          the row the database gave back, never because no error was seen.
        </li>
        <li>
          <strong>Failure is a result, not an afterthought.</strong> Return a status the model cannot misread, with the
          sentence it should say.
        </li>
        <li>
          <strong>Keep the caller’s state when a write fails.</strong> The cart stays, so they can try again or be
          passed to a person.
        </li>
      </ul>

      <h2>What that looks like in code</h2>
      <p>
        After the diagnostic we rebuilt the ordering backend for a demo: a Retell agent that calls tools on our own
        server. This is the step that places the order.
      </p>
      <Code file="src/lib/demo-order/tools.ts">{`try {
  // "placed" is only ever returned with the row the database gave back.
  const { status, order } = await store.placeOrder(callId, cart, cleanPickupName(args.pickup_name));
  // …
  return { status, reference: order.reference, total: formatCents(order.totalCents) };
} catch {
  await log(false, "FAILED: order could not be stored; cart kept");
  return {
    status: "failed",
    instruction: "The order was NOT saved. Tell the caller it could not be placed, nothing was ordered, and they can try again.",
  };
}`}</Code>
      <p>
        <code>store.placeOrder</code> is one insert that asks the database to return the row it wrote. It reports
        “placed” only with that row, and it throws when the database rejects the write. The test makes the database
        reject it:
      </p>
      <Code file="tests/demo-store-postgres.test.mjs">{`await t.test("a write the database rejects throws, and the tool reports failed", async () => {
  await store.saveCart("pg_bad", cart);
  await pool.query("alter table demo_orders add constraint demo_block check (call_id <> 'pg_bad')");
  await assert.rejects(store.placeOrder("pg_bad", cart, null));
  const r = await handleTool(store, "pg_bad", "place_order", {});
  assert.equal(r.status, "failed");
  assert.equal((await pool.query("select count(*)::int as n from demo_orders where call_id = 'pg_bad'")).rows[0].n, 0);
  assert.equal((await store.getCart("pg_bad")).lines.length, 1);
  await pool.query("alter table demo_orders drop constraint demo_block");
});`}</Code>
      <Recorded label="Result, against a real Postgres" tone="pass">
        ok 5 - a write the database rejects throws, and the tool reports failed
      </Recorded>
      <p>
        We then ran the same forced failure through the agent itself, as a typed conversation in Retell’s playground
        rather than a phone call. The caller had asked for one item and said to go ahead.
      </p>
      <Recorded label="The tool call, the tool’s answer, and what the agent said">{`-> place_order({"pickup_name":"Sam"})
<- {"status":"failed","instruction":"The order was NOT saved. Tell the caller it could not be placed, nothing was ordered, and they can try again."}
AGENT: I couldn’t place the order, and nothing was ordered. You can try again.`}</Recorded>
      <p>Nothing was stored, and the cart was still there for a second attempt.</p>

      <h2>Check your own agent</h2>
      <ul>
        <li>List every tool that writes something: an order, a booking, a contact in the CRM, a ticket.</li>
        <li>
          For each one, read what it returns when the write throws, and what it returns when the write succeeds but
          changes zero rows.
        </li>
        <li>
          Look for any confirmation, spoken or sent by text or email, that goes out before the result of the write is
          known.
        </li>
        <li>
          In a test environment, make the write fail on purpose. A constraint that rejects the test record is enough.
          Go through the flow and listen to what the agent says.
        </li>
        <li>Check what the caller can do next. Is their order still there? Is there a way to reach a person?</li>
      </ul>

      <h2>What this note does not show</h2>
      <p>
        The diagnostic’s tests replaced the database and the messaging provider with controlled fakes. The rebuilt
        backend was tested against a real Postgres and in typed conversations. It has not been tested on live phone
        calls. The two defects are still open in KOTA’s current code, and we fix them before we deploy it.
      </p>
    </NoteShell>
  );
}
