import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample diagnostic report: a phone-order flow",
  description:
    "What you receive from a KummaLabs integration diagnostic. A real report on our own phone-ordering system: five findings, three published in full with reproduced evidence, proposed fixes, and acceptance tests.",
  alternates: { canonical: "/work/sample-diagnostic" },
};

// Evidence strings are verbatim output of the reproduction tests run on 2026-11-12 against the
// KOTA repo (commit d15e5d7 plus uncommitted changes in one audited file), with a synthetic
// restaurant and caller. Do not edit them by hand; re-run and paste.
type Finding = {
  id: string;
  title: string;
  severity: "High" | "Medium";
  basis: string;
  what: string;
  evidence: { label: string; text: string }[];
  why: string;
  fix: string;
  accept: string;
};

// Findings 3 and 4 are security findings. Their details stay out of the public copy until the
// owner confirms they are fixed. Do not restore them from git history before then.
type Withheld = { id: string; withheld: true };

const findings: (Finding | Withheld)[] = [
  {
    id: "1",
    title: "A failed save is announced as a confirmed order",
    severity: "High",
    basis: "Reproduced",
    what: "When the database write fails, the save function hides the error and returns nothing. The order step doesn’t check the result, so it marks the order as placed, clears the cart, texts the caller, and says the order is confirmed.",
    evidence: [
      { label: "Save function, with the database write forced to fail", text: "save_order_details on DB error -> None" },
      {
        label: "What the agent then said",
        text: "Perfect, your order at Golden Bowl Noodle House is confirmed for $30.40 and I just texted your order details. Thank you for calling.",
      },
      {
        label: "The text it sent",
        text: "Golden Bowl Noodle House: your pickup order is confirmed (#N/A). 2x Beef Noodle Soup, 1x Jasmine Tea. Total $30.40. Thank you.",
      },
    ],
    why: "The caller arrives to collect an order that doesn’t exist. The “#N/A” in the text is the only trace that something went wrong.",
    fix: "Treat a missing order number as a failure: keep the cart, tell the caller there was a problem, offer the transfer to staff, and raise an alert.",
    accept: "With the database write forced to fail, the agent does not say “confirmed”, no confirmation text is sent, the cart is unchanged, and an alert is logged.",
  },
  {
    id: "2",
    title: "An order number can be issued for an order that was never stored",
    severity: "High",
    basis: "Reproduced",
    what: "Orders are saved by updating a row created at the start of the call. If that row is missing, the update changes nothing, the database reports zero rows, and the function still returns a new order number.",
    evidence: [
      { label: "The statement", text: "UPDATE calls SET order_id = $1, metadata = $2 WHERE call_sid" },
      { label: "The database’s answer, and what the function returned anyway", text: "DB said: UPDATE 0 | function returned: 'ORD-CA_SYNTHETIC-17...'" },
    ],
    why: "The outcome is the same as finding 1, but with a believable reference number, so it is harder to notice. The row it depends on is written by a separate step that can fail on its own.",
    fix: "Store each order as its own record, and return an order number only when exactly one record was written.",
    accept: "With no call row present, placing an order either creates a complete order record or fails as in finding 1. An order number is never returned without a stored record.",
  },
  { id: "3 and 4", withheld: true },
  {
    id: "5",
    title: "Every restaurant’s “press 0” transfers to the same phone number",
    severity: "Medium",
    basis: "Read from the code, not run",
    what: "The transfer number is a single setting for the whole system, while menus and prompts are stored per restaurant.",
    evidence: [],
    why: "With more than one restaurant, a caller asking for staff reaches the wrong business.",
    fix: "Store the transfer number per restaurant, and define what happens when one isn’t set.",
    accept: "A call for restaurant A transfers to A’s number. A restaurant with no number set gets a spoken apology, never another restaurant’s staff.",
  },
];

const passed = [
  {
    title: "Placing the same order twice in one call",
    text: "SECOND place_order -> Your order has already been placed. | confirmations sent: 1",
    note: "The second attempt is refused and only one confirmation goes out.",
  },
  {
    title: "A failed text is not reported as sent",
    text: "Perfect, your order at Golden Bowl Noodle House is confirmed for $30.40 (reference TEST_1-1). Thank you for calling.",
    note: "With the messaging provider returning a failure, the agent confirms the order and makes no claim about a text.",
  },
];

const notChecked = [
  "The Mandarin order path, which has its own code.",
  "Two order requests arriving at the same instant.",
  "Behaviour under load, and against the real phone and messaging providers.",
  "Hosting and deployment settings.",
];

export default function SampleDiagnostic() {
  return (
    <article>
      <header className="mx-auto max-w-[88rem] px-4 pb-12 pt-14 sm:px-6 lg:pt-20">
        <p className="text-[15px] text-graphite">Sample diagnostic report</p>
        <h1 className="display mt-3 max-w-4xl text-[2.2rem] sm:text-5xl">
          Phone-order flow: what breaks between “that’s everything” and a saved order
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          This is what you receive at the end of an integration diagnostic. It is a real one. We ran
          it on our own system, KOTA, on November 12, 2026, and it found defects we hadn’t known
          about. The only thing missing is the fixed price and delivery time for each fix, which a
          client report includes.
        </p>
      </header>

      <section className="border-y border-ink bg-sheet">
        <dl className="mx-auto grid max-w-[88rem] gap-x-10 gap-y-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <div>
            <dt className="text-[14px] text-graphite">Findings</dt>
            <dd className="mt-1 text-lg font-semibold">5: three high, two medium</dd>
            <dd className="mt-1 text-[14px] text-graphite">Two are withheld from this public copy</dd>
          </div>
          <div>
            <dt className="text-[14px] text-graphite">Checks that passed</dt>
            <dd className="mt-1 text-lg font-semibold">2</dd>
          </div>
          <div>
            <dt className="text-[14px] text-graphite">How it was tested</dt>
            <dd className="mt-1 leading-snug">
              Seven targeted tests against the real code, with the database and messaging provider
              replaced by controlled fakes
            </dd>
          </div>
          <div>
            <dt className="text-[14px] text-graphite">Status</dt>
            <dd className="mt-1 leading-snug">
              Open in our code. We don’t run a deployment of it, and these are fixed before we do.
            </dd>
          </div>
        </dl>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">Scope</h2>
          <div className="grid max-w-3xl gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-bold">Looked at</h3>
              <p className="mt-2 leading-relaxed text-graphite">
                The English order path from the caller finishing an order to a stored order record
                and a confirmation text, plus the two web entry points that path depends on.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Not looked at</h3>
              <ul className="mt-2 space-y-1.5 leading-relaxed text-graphite">
                {notChecked.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6">
          <h2 className="display text-3xl">Findings</h2>
          <ol className="mt-10 border-t border-ink">
            {findings.map((f) =>
              "withheld" in f ? (
              <li key={f.id} className="grid gap-x-16 gap-y-6 border-b border-rule py-10 lg:grid-cols-[1fr_1.15fr]">
                <div>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]">
                    <span className="rounded-sm bg-mark-soft px-2 py-0.5 font-semibold text-mark">High</span>
                    <span className="rounded-sm bg-hold-soft px-2 py-0.5 font-semibold text-hold">Medium</span>
                    <span className="text-graphite">Reproduced</span>
                  </p>
                  <h3 className="mt-3 text-2xl font-bold leading-snug">
                    {f.id}. Two security findings, withheld from this copy
                  </h3>
                  <p className="mt-4 max-w-prose leading-relaxed">
                    Both are open, so their details stay out of the public copy until they are fixed.
                  </p>
                </div>
                <p className="max-w-prose leading-relaxed text-graphite">
                  A client report withholds nothing. Every finding comes with its evidence, a proposed
                  fix, and an acceptance test, and the report goes only to the client.
                </p>
              </li>
              ) : (
              <li key={f.id} className="grid gap-x-16 gap-y-6 border-b border-rule py-10 lg:grid-cols-[1fr_1.15fr]">
                <div>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]">
                    <span
                      className={`rounded-sm px-2 py-0.5 font-semibold ${
                        f.severity === "High" ? "bg-mark-soft text-mark" : "bg-hold-soft text-hold"
                      }`}
                    >
                      {f.severity}
                    </span>
                    <span className="text-graphite">{f.basis}</span>
                  </p>
                  <h3 className="mt-3 text-2xl font-bold leading-snug">
                    {f.id}. {f.title}
                  </h3>
                  <p className="mt-4 max-w-prose leading-relaxed">{f.what}</p>
                  <p className="mt-3 max-w-prose leading-relaxed text-graphite">{f.why}</p>
                </div>
                <div className="space-y-6">
                  {f.evidence.length > 0 && (
                    <div className="space-y-4 border-l-2 border-mark pl-5">
                      {f.evidence.map((e) => (
                        <div key={e.label}>
                          <p className="text-[14px] text-graphite">{e.label}</p>
                          <p className="mt-1 break-words font-mono text-[14px] leading-relaxed">{e.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <dl className="space-y-4">
                    <div>
                      <dt className="font-bold">Proposed fix</dt>
                      <dd className="mt-1 leading-relaxed text-graphite">{f.fix}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">Done when</dt>
                      <dd className="mt-1 leading-relaxed text-graphite">{f.accept}</dd>
                    </div>
                  </dl>
                </div>
              </li>
              ),
            )}
          </ol>
        </div>
      </section>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">What held up</h2>
          <ul className="max-w-3xl space-y-8">
            {passed.map((p) => (
              <li key={p.title}>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1 leading-relaxed text-graphite">{p.note}</p>
                <p className="mt-3 break-words border-l-2 border-pass pl-5 font-mono text-[14px] leading-relaxed">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">Recommendation</h2>
          <div className="max-w-prose space-y-4 leading-relaxed">
            <p>
              Fix findings 1 and 2 together, since they share one code path and decide whether a
              confirmed order is real. Then the two security findings, 3 and 4. Then 5.
            </p>
            <p className="text-graphite">
              Separately, and not a defect: nothing in the system tells the restaurant that an order
              arrived. That is a new piece of work, scoped on its own.
            </p>
            <p className="text-graphite">
              In a client report, each group of fixes carries a fixed price and a delivery time, and
              you choose which to go ahead with. If the right answer is to stop, or to use an
              existing product instead, the report says that.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Want this for your agent or automation?</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              Tell us what it does today and where it goes wrong.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/#brief" className="rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90">
              Describe your project
            </Link>
            <Link href="/services/integration" className="link text-paper">
              What a diagnostic includes
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
