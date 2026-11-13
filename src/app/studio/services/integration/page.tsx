import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI agent integration: connect your agent to one business system",
  description:
    "A fixed-scope first project from KummaLabs: connect one existing AI agent or workflow to one business system (CRM, calendar, database, email, SMS), with acceptance tests, failure handling, and handover.",
  alternates: { canonical: "/services/integration" },
};

const fits = [
  "Your agent or chatbot answers well, but someone still copies its results into the CRM by hand.",
  "A voice or chat agent needs to look something up or write a record in your system during the conversation.",
  "You have an automation in Make, n8n, or Zapier that needs a custom step those tools can’t do.",
  "Your team uses Claude or ChatGPT and you want it to work with your own data through an MCP server.",
  "An existing integration works on a good day but creates duplicates or drops events on a bad one.",
];

const delivered = [
  ["The integration itself", "Code that reads from or writes to the agreed system, running in your accounts."],
  ["Duplicate and failure handling", "The same event arriving twice is handled once. Failed calls are retried within limits, then reported, not lost."],
  ["A log you can read", "Each action records what came in, what was done, and whether it worked."],
  ["Acceptance tests", "The cases we agreed in the scope, including failure cases, run against your test data."],
  ["Handover", "Setup notes, how to run the tests, and a walkthrough for whoever maintains it."],
];

const youProvide = [
  "Access to a test or sandbox account for the system, or a safe subset of production.",
  "API documentation, or permission to use the vendor’s public API.",
  "A few real examples of the inputs, with personal data removed.",
  "One person who can answer questions and confirm the acceptance tests.",
];

const excluded = [
  "Building a new agent from scratch. That is a Build project.",
  "More than one target system in the first milestone.",
  "Getting around a platform’s API limits or terms of service.",
  "Vendor, API, and hosting fees. Those stay on your own accounts.",
  "Open-ended support. What is included after delivery is written into the scope.",
];

const steps = [
  ["You send a brief", "The agent or workflow you have, the system it should connect to, and what should happen."],
  ["We reply with questions or a scope", "The scope lists deliverables, exclusions, acceptance tests, milestones, and a fixed price. Nothing starts until you agree to it in writing."],
  ["We build against your test data", "You see it working in your own system before the final milestone is due."],
  ["We hand it over", "With documentation, tests, and the support terms from the scope."],
];

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-x-3 leading-relaxed">
          <span className="mt-[0.7rem] h-0.5 w-3 bg-graphite/60" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function IntegrationService() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
        <p className="text-[15px] text-graphite">Integrate</p>
        <h1 className="display mt-3 max-w-4xl text-[2.3rem] sm:text-6xl">
          Connect your agent to the system where the work actually happens
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          A first project with a narrow shape: one existing agent or workflow, connected to one
          business system, with acceptance tests and a handover. Small enough to scope in writing
          and finish.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/#brief" className="rounded-full bg-ink px-5 py-3 font-semibold text-paper hover:bg-ink/90">
            Describe your project
          </Link>
          <Link href="/work" className="link font-semibold">
            See the work
          </Link>
        </div>
      </header>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">Good starting points</h2>
          <div className="max-w-prose">
            <List items={fits} />
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="display text-3xl">What the first milestone delivers</h2>
          <dl className="mt-10 border-t border-ink">
            {delivered.map(([term, detail]) => (
              <div key={term} className="grid gap-x-10 gap-y-1 border-b border-rule py-5 md:grid-cols-[16rem_1fr]">
                <dt className="font-bold">{term}</dt>
                <dd className="leading-relaxed text-graphite">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl">What we need from you</h2>
            <div className="mt-8">
              <List items={youProvide} />
            </div>
          </div>
          <div>
            <h2 className="display text-3xl">What’s not included</h2>
            <div className="mt-8 text-graphite">
              <List items={excluded} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">How scope and price are agreed</h2>
          <ol className="max-w-prose space-y-7">
            {steps.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-x-4">
                <span className="display text-3xl text-graphite/60" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 leading-relaxed text-graphite">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">What we’ve built that’s like this</h2>
          <div className="max-w-prose space-y-5 leading-relaxed">
            <p>
              We have not yet delivered an integration for a paying client, and we’d rather say so.
              What we can show is the same kind of work in our own systems:
            </p>
            <p>
              <Link href="/work/kota" className="link font-semibold">
                KOTA
              </Link>{" "}
              connects a live phone conversation to a Postgres database and to SMS through typed
              tool calls, and only tells the caller a text was sent when the messaging API confirms
              it.
            </p>
            <p>
              The{" "}
              <Link href="/work#outreach-pipeline" className="link font-semibold">
                outreach pipeline
              </Link>{" "}
              refuses duplicate sends and enforces a daily limit in the send step itself.
            </p>
            <p>
              <Link href="/work#archon" className="link font-semibold">
                ARCHON
              </Link>{" "}
              connects MCP servers and asks a person before running risky commands.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Start with a brief</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              A few lines about the agent you have and the system it should connect to. You’ll get
              back questions or a proposed scope.
            </p>
          </div>
          <Link href="/#brief" className="self-start rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90 lg:self-auto">
            Describe your project
          </Link>
        </div>
      </section>
    </>
  );
}
