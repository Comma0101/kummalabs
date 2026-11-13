import Link from "next/link";
import { AgentRuns } from "@/components/studio/AgentRuns";
import { INQUIRY_MAILTO, STUDIO_EMAIL } from "@/lib/studio-site";
import { work } from "@/lib/studio-work";

const agents = [
  {
    name: "Inbox and email",
    reads: "Customer emails and attachments",
    does: "Sorts them, looks up the customer, drafts replies for a person to approve",
    writes: "Email, CRM, help desk",
  },
  {
    name: "Leads and CRM",
    reads: "Form fills, inquiries, lead lists",
    does: "Researches, qualifies, drafts follow-ups, routes to the right person",
    writes: "CRM, calendar, Slack",
    proof: { id: "outreach-pipeline", label: "Outreach pipeline" },
  },
  {
    name: "Documents and data",
    reads: "PDFs, photos, spreadsheets",
    does: "Extracts the fields, checks them against your records, flags what doesn’t match",
    writes: "Database, spreadsheet, review queue",
    proof: { id: "menu-onboarding", label: "Menu onboarding" },
  },
  {
    name: "Phone and messaging",
    reads: "Calls, SMS, WhatsApp",
    does: "Answers, takes orders or requests, confirms by text, transfers to staff",
    writes: "Order system, database, SMS",
    proof: { id: "kota", label: "KOTA" },
  },
  {
    name: "Internal tools and MCP",
    reads: "Your APIs, databases, and MCP servers",
    does: "Runs tasks through scoped tools and asks before risky actions",
    writes: "Your internal systems",
    proof: { id: "archon", label: "ARCHON" },
  },
  {
    name: "Research and monitoring",
    reads: "Websites, search results, feeds",
    does: "Collects and grades sources, and rejects citations it didn’t actually read",
    writes: "Reports, database, alerts",
    proof: { id: "research-agent", label: "Research agent" },
  },
];

const services = [
  {
    verb: "Build",
    summary: "A new AI agent for one business process.",
    examples: [
      "Inbox sorting and reply drafts",
      "Lead intake and qualification",
      "Pulling data out of documents, with review",
      "Phone reception and ordering",
      "Research and monitoring with sources",
    ],
    first: "One process, end to end, with a person approving anything that matters.",
  },
  {
    verb: "Integrate",
    summary: "Connect an agent you already have to the tools you already use.",
    examples: [
      "CRM and calendar",
      "Databases and internal APIs",
      "Email, SMS, and notifications",
      "MCP tools with scoped permissions",
      "Approval screens and dashboards",
    ],
    first: "One integration, with duplicate and failure handling, tested on your edge cases.",
  },
  {
    verb: "Improve",
    summary: "Find out why an agent or automation misbehaves, and fix it.",
    examples: [
      "Webhooks that fail or fire twice",
      "Duplicate records or actions",
      "Wrong tool arguments and failed API calls",
      "Unreliable data extraction",
      "Missing logs, alerts, or hand-offs",
    ],
    first: "A fixed-scope audit: we run scripted failure cases and give you a written fix list.",
  },
];

const process = [
  {
    title: "You describe the process",
    body: "What happens today, which systems are involved, and what a good result looks like. A few lines by email is enough to start.",
  },
  {
    title: "We send a fixed scope",
    body: "Deliverables, exclusions, acceptance tests, milestones, and price, agreed in writing before any work starts.",
  },
  {
    title: "We build in milestones",
    body: "You see working pieces in your own systems and pay milestone by milestone.",
  },
  {
    title: "We hand it over",
    body: "Documentation, tests, and everything running in your accounts. Support terms are agreed up front, not open-ended.",
  },
];

const builtIn = [
  "A person approves actions that matter: payments, deletions, anything sent to customers.",
  "The same event arriving twice is handled once.",
  "Every action leaves a log you can read.",
  "Failures are caught, named, and retried within limits instead of silently dropped.",
  "Access is limited to what the job needs.",
  "Instructions hidden in emails, documents, or tool output can’t grant new permissions.",
  "API, phone, and hosting usage runs on your own vendor accounts, so costs stay visible.",
];

const notAFit = [
  "Guaranteed revenue, booking rates, or accuracy percentages. We test and report what we measure.",
  "Outbound calls or texts to people who haven’t agreed to receive them.",
  "Fully automatic financial, medical, or legal decisions.",
  "Open-ended “automate everything” projects. We start with one process.",
];

export default function StudioHome() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:pt-20">
        <div className="max-w-xl">
          <h1 className="display text-[2.6rem] sm:text-6xl">
            AI agents that do real work inside your business systems.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-graphite">
            KummaLabs builds, connects, and fixes AI agents for email, leads, documents, phone, and
            internal tools. Each one reads the request, uses your data, takes the action, checks that
            it worked, and hands off to a person when it should.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={INQUIRY_MAILTO} className="rounded-full bg-ink px-5 py-3 font-semibold text-paper hover:bg-ink/90">
              Describe your project
            </a>
            <Link href="/work" className="link font-semibold">
              See the work
            </Link>
          </div>
          <p className="mt-8 text-[15px] text-graphite">We work in English and 中文.</p>
        </div>
        <AgentRuns />
      </section>

      <section id="agents" className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="display max-w-3xl text-3xl sm:text-4xl">Agents we build, and where their work lands</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-graphite">
            An agent is only useful if the result shows up in a system you already use. The last
            column links to something we’ve built that does the same kind of work.
          </p>
          <div className="mt-10 border-t border-ink">
            <div className="hidden gap-6 border-b border-rule py-3 text-[14px] text-graphite md:grid md:grid-cols-[11rem_1fr_1.4fr_1fr_9rem]">
              <span>Agent</span>
              <span>Reads</span>
              <span>Does</span>
              <span>Writes to</span>
              <span>Built before</span>
            </div>
            <ul>
              {agents.map((a) => (
                <li
                  key={a.name}
                  className="grid gap-x-6 gap-y-2 border-b border-rule py-5 md:grid-cols-[11rem_1fr_1.4fr_1fr_9rem]"
                >
                  <h3 className="text-lg font-bold leading-snug">{a.name}</h3>
                  <p className="text-[15px] leading-snug">
                    <span className="text-graphite md:hidden">Reads: </span>
                    {a.reads}
                  </p>
                  <p className="text-[15px] leading-snug">
                    <span className="text-graphite md:hidden">Does: </span>
                    {a.does}
                  </p>
                  <p className="text-[15px] leading-snug">
                    <span className="text-graphite md:hidden">Writes to: </span>
                    {a.writes}
                  </p>
                  <p className="text-[15px] leading-snug">
                    {a.proof ? (
                      <Link href={`/work#${a.proof.id}`} className="link">
                        {a.proof.label}
                      </Link>
                    ) : (
                      <span className="text-graphite">Not yet</span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="display max-w-2xl text-3xl sm:text-4xl">Three kinds of work. Most first projects are small.</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {services.map((s) => (
              <article key={s.verb} className="flex flex-col">
                <h3 className="display text-4xl sm:text-5xl">{s.verb}</h3>
                <p className="mt-3 text-lg leading-snug">{s.summary}</p>
                <ul className="mt-5 space-y-2 border-t border-rule pt-5 text-[15px] text-graphite">
                  {s.examples.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <p className="mt-6 text-[15px] leading-snug">
                  <span className="font-semibold">Typical first project: </span>
                  {s.first}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-rule bg-sheet">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-3xl sm:text-4xl">Work</h2>
            <Link href="/work" className="link font-semibold">
              Details on every project
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-graphite">
            Prototypes, internal tools, and open source we’ve built. Each one is labeled for what it
            is. None is presented as a client deployment.
          </p>
          <ul className="mt-10 border-t border-ink">
            {work.map((w) => (
              <li key={w.id} className="grid gap-x-6 gap-y-2 border-b border-rule py-6 md:grid-cols-[14rem_1fr_8rem]">
                <div>
                  <h3 className="text-lg font-bold">
                    <Link href={`/work#${w.id}`} className="hover:underline">
                      {w.name}
                    </Link>
                  </h3>
                  <p className="text-[15px] text-graphite">{w.kind}</p>
                </div>
                <p className="leading-relaxed">{w.shows}</p>
                <p className="text-[15px] text-graphite md:text-right">{w.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl sm:text-4xl">How a project runs</h2>
            <ol className="mt-10 space-y-8">
              {process.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4">
                  <span className="display text-3xl text-graphite/60" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-graphite">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-bold">Built into every system</h2>
              <ul className="mt-5 space-y-3">
                {builtIn.map((item) => (
                  <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-x-3 leading-relaxed">
                    <svg viewBox="0 0 16 16" className="mt-1.5 size-4 text-pass" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold">Not a good fit</h2>
              <ul className="mt-5 space-y-3 text-graphite">
                {notAFit.map((item) => (
                  <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-x-3 leading-relaxed">
                    <span className="mt-[0.7rem] h-0.5 w-3 bg-graphite/60" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="display text-3xl sm:text-5xl">Describe your project</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80">
              Email a few lines about the process you want to automate, connect, or fix. You’ll get
              back questions or a proposed scope. Agencies that need delivery help are welcome too.
            </p>
            <a
              href={INQUIRY_MAILTO}
              className="mt-8 inline-block rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90"
            >
              Email {STUDIO_EMAIL}
            </a>
          </div>
          <div>
            <h3 className="font-semibold">Helpful to include</h3>
            <ul className="mt-4 space-y-2 text-paper/80">
              <li>What happens today, step by step</li>
              <li>Which tools and systems are involved</li>
              <li>Rough volume: calls, emails, or documents per week</li>
              <li>What a good result looks like</li>
              <li>Timeline and budget range, if you have one</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
