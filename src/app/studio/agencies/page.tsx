import type { Metadata } from "next";
import Link from "next/link";
import { REPLY_DAYS } from "@/lib/studio-offer";

export const metadata: Metadata = {
  title: "For agencies: project-based engineering delivery",
  description:
    "KummaLabs takes on scoped engineering work for agencies that sell AI agents and automations: the code behind an agent, integrations, failure-case testing, and Mandarin conversation flows, with documentation and handover.",
  alternates: { canonical: "/agencies" },
};

const handOver = [
  ["The code your agent calls", "Custom functions and webhook endpoints that look things up or write records in a CRM, calendar, database, or messaging service, with duplicate and failure handling."],
  ["A failure-case test pass", "We run scripted failure cases against an agent you’ve built and return a written list of what broke, with evidence and proposed fixes."],
  ["Document extraction with checks", "Turning PDFs or photos into structured records, with validation that removes what the source doesn’t support."],
  ["Mandarin conversation flows", "Conversation design in Mandarin and test calls by a native speaker, for agents that serve Chinese-speaking callers."],
];

const questions = [
  {
    q: "Which platforms do you work on?",
    a: "We write the code your platform calls, so the work fits any platform that can call a webhook or an API. On Retell we have built and tested the backend for one agent of our own, and it has not yet run on live calls. We have not delivered client agents on Retell, Vapi, Make, n8n, or GoHighLevel. If a project needs configuration inside one of them, you keep that part, or we scope the time to learn it and say so in writing.",
  },
  {
    q: "How is the work scoped and reviewed?",
    a: "You send the requirement. We reply with a written scope: deliverables, exclusions, acceptance tests, milestones, and a fixed price. You review each milestone against the acceptance tests before your client sees anything.",
  },
  {
    q: "Who talks to my client?",
    a: "You do. We work behind you and join a client call only if you ask us to.",
  },
  {
    q: "What do I receive?",
    a: "Source code in your repository or your client’s, the tests and how to run them, setup notes, and a sample of the action log. Ownership of the work and any reusable parts is written into the scope.",
  },
  {
    q: "What availability can you commit to?",
    a: `KummaLabs is one engineer. Work is asynchronous, with replies within ${REPLY_DAYS} business days and delivery dates agreed per milestone. We don’t offer on-call or round-the-clock support, and we’d rather tell you that now.`,
  },
  {
    q: "Have you done this for an agency before?",
    a: "Not yet. What we can show is the same kind of work in our own systems, including a diagnostic that found real defects in one of them.",
  },
];

export default function Agencies() {
  return (
    <>
      <header className="mx-auto max-w-[88rem] px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
        <p className="text-[15px] text-graphite">For agencies</p>
        <h1 className="display mt-3 max-w-4xl text-[2.3rem] sm:text-6xl">
          You sell the solution. We deliver the engineering piece.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          Project-based delivery for agencies that sell AI agents and automations: one scoped piece
          at a time, with acceptance tests, documentation, and a handover to your team.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/#brief" className="rounded-full bg-ink px-5 py-3 font-semibold text-paper hover:bg-ink/90">
            Send a requirement
          </Link>
          <Link href="/work/sample-diagnostic" className="link font-semibold">
            Read a sample diagnostic report
          </Link>
        </div>
      </header>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6">
          <h2 className="display text-3xl">What you can hand over</h2>
          <dl className="mt-10 border-t border-ink">
            {handOver.map(([term, detail]) => (
              <div key={term} className="grid gap-x-10 gap-y-1 border-b border-rule py-5 md:grid-cols-[18rem_1fr]">
                <dt className="font-bold">{term}</dt>
                <dd className="max-w-prose leading-relaxed text-graphite">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">The evidence</h2>
          <ul className="max-w-prose space-y-5 leading-relaxed">
            <li>
              <Link href="/work/sample-diagnostic" className="link font-semibold">
                A sample diagnostic report
              </Link>
              : five findings in a phone-order flow. Three are published in full, each with
              reproduced evidence, a proposed fix, and an acceptance test.
            </li>
            <li>
              <Link href="/work/menu-validation" className="link font-semibold">
                A recorded validation run
              </Link>
              : the real output of a document validation step on a synthetic input.
            </li>
            <li>
              <Link href="/services/retell" className="link font-semibold">
                The backend for a Retell agent
              </Link>
              : signed function calls, ordering rules in code, and writes that stay correct when a call is repeated.
              Public source, with what has and has not been tested.
            </li>
            <li>
              <Link href="/work/kota" className="link font-semibold">
                KOTA
              </Link>
              : a bilingual phone-ordering agent that began as a paid project, with typed tool calls
              against a database and 111 passing tests.
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">Questions agencies ask</h2>
          <dl className="max-w-prose space-y-8">
            {questions.map(({ q, a }) => (
              <div key={q}>
                <dt className="text-lg font-bold">{q}</dt>
                <dd className="mt-2 leading-relaxed text-graphite">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Have a piece you’d hand over?</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              Send the requirement as you have it. You’ll get questions or a written scope back.
            </p>
          </div>
          <Link href="/#brief" className="self-start rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90 lg:self-auto">
            Send a requirement
          </Link>
        </div>
      </section>
    </>
  );
}
