import Link from "next/link";
import { BriefForm } from "@/components/studio/BriefForm";
import { Inspector } from "@/components/studio/Inspector";
import { STUDIO_EMAIL } from "@/lib/studio-site";
import { work } from "@/lib/studio-work";

const hire = [
  {
    verb: "Build",
    situation: "“We have a defined process and need a system for it.”",
    first: "One process, end to end, with a person approving anything that matters.",
    get: "A working agent in your accounts, its tests, and a handover.",
  },
  {
    verb: "Integrate",
    situation: "“We have an agent, but it isn’t connected to our tools.”",
    first: "One agent or workflow connected to one business system.",
    get: "The integration, duplicate and failure handling, a readable log, acceptance tests.",
    link: { href: "/services/integration", label: "What an integration project includes" },
  },
  {
    verb: "Improve",
    situation: "“We have something running, but it behaves unreliably.”",
    first: "A fixed-scope audit against scripted failure cases.",
    get: "A written list of what failed, why, and what each fix involves.",
  },
];

const agents = [
  { name: "Inbox and email", writes: "Email, CRM, help desk" },
  { name: "Leads and CRM", writes: "CRM, calendar, Slack", proof: { id: "outreach-pipeline", label: "Outreach pipeline" } },
  { name: "Documents and data", writes: "Database, spreadsheet, review queue", proof: { id: "menu-onboarding", label: "Menu onboarding" } },
  { name: "Phone and messaging", writes: "Order system, database, SMS", proof: { id: "kota", label: "KOTA" } },
  { name: "Internal tools and MCP", writes: "Your internal systems", proof: { id: "archon", label: "ARCHON" } },
  { name: "Research and monitoring", writes: "Reports, database, alerts", proof: { id: "research-agent", label: "Research agent" } },
];

// Each principle sits next to output from something we built. `mono` lines are verbatim.
const reliability = [
  {
    principle: "The same event twice is handled once",
    body: "A retried webhook or a double click must not create a second record or a second message.",
    source: "Raised by our outreach pipeline when a send is repeated",
    mono: ["AlreadySentError: lead 14 already sent"],
  },
  {
    principle: "A person approves what matters",
    body: "Payments, deletions, and anything sent to a customer wait for a person. If nobody can confirm, the action doesn’t run.",
    source: "ARCHON refusing a shell write it couldn’t get confirmed",
    mono: ["BLOCKED: echo alpha > /tmp/subagent-smoke.txt", "Cannot confirm in non-interactive mode."],
  },
  {
    principle: "Unsupported claims are caught before they’re saved",
    body: "Names, tags, and suggestions a model produces are checked against your own records. What can’t be checked that way, like a misread price, goes to a person.",
    source: "KOTA’s menu validation step",
    mono: ["Upsell note references unknown item(s): \"Mango Pudding\"."],
  },
  {
    principle: "You can run it without us",
    body: "Every project ends with a handover, and everything runs in your own accounts.",
    source: "What a handover contains",
    list: ["Setup notes", "The acceptance tests and how to run them", "A sample of the action log", "Support terms from the scope"],
  },
];

const otherWork = work.filter((w) => !["kota", "menu-onboarding"].includes(w.id));

export default function StudioHome() {
  return (
    <>
      <section className="mx-auto grid max-w-[88rem] gap-x-16 gap-y-8 px-4 pb-12 pt-14 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:pb-16 lg:pt-24">
        <h1 className="display text-[2.9rem] sm:text-7xl lg:text-[5.6rem]">
          AI agents.
          <br />
          Built into your business.
        </h1>
        <div className="max-w-md lg:pb-3">
          <p className="text-lg leading-relaxed">
            We build, connect, and improve agents that work inside your existing tools: email, CRM,
            documents, phone, and internal systems.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/#brief" className="rounded-full bg-ink px-5 py-3 font-semibold text-paper hover:bg-ink/90">
              Describe your project
            </Link>
            <Link href="/work" className="link font-semibold">
              See the work
            </Link>
          </div>
          <p className="mt-5 text-[15px] text-graphite">An engineering studio. English and 中文.</p>
        </div>
      </section>

      <Inspector />

      <section id="work" className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:py-28">
        <h2 className="display max-w-3xl text-3xl sm:text-5xl">Two pieces of work, in detail</h2>

        <div className="mt-14 grid gap-10 border-t border-ink pt-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-[15px] text-graphite">Prototype. Documents and data.</p>
            <h3 className="display mt-2 text-3xl sm:text-4xl">Document extraction that checks itself</h3>
            <p className="mt-5 max-w-prose text-lg leading-relaxed">
              Our menu pipeline turns photos into structured data. Before anything is saved, item
              names, aliases, dietary tags, and serving suggestions are checked against the menu’s
              own catalog. What the menu doesn’t support is removed and reported.
            </p>
            <p className="mt-4 max-w-prose leading-relaxed text-graphite">
              The surface above is the validation step’s real output on a synthetic input. It
              can’t catch a misread price, so a person reviews those. The same pattern fits invoices
              and intake forms; we have built it for menus so far.
            </p>
            <Link href="/work/menu-validation" className="link mt-6 inline-block font-semibold">
              Read the recorded run
            </Link>
          </div>
          <figure className="border border-rule bg-sheet">
            <figcaption className="border-b border-rule px-5 py-3 text-[14px] text-graphite">
              From the recorded run: one field, before and after
            </figcaption>
            <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-rule">
              <div className="px-5 py-5">
                <p className="text-[14px] text-graphite">Synthetic input</p>
                <p className="mt-2 font-mono text-[14px] leading-relaxed">
                  aliases: beef noodles, Beef Noodle Soup, <span className="annot bg-mark-soft">wonton soup</span>
                </p>
                <p className="mt-3 font-mono text-[14px] leading-relaxed">
                  dietary_tags: contains_beef, contains_wheat, <span className="annot bg-mark-soft">keto_friendly</span>
                </p>
                <p className="mt-3 font-mono text-[14px] leading-relaxed">price: 13.95</p>
              </div>
              <div className="border-t border-rule px-5 py-5 sm:border-t-0">
                <p className="text-[14px] text-graphite">After validation</p>
                <p className="mt-2 font-mono text-[14px] leading-relaxed">aliases: beef noodles</p>
                <p className="mt-3 font-mono text-[14px] leading-relaxed">dietary_tags: contains_beef, contains_wheat</p>
                <p className="mt-3 font-mono text-[14px] leading-relaxed">price: 13.95</p>
              </div>
            </div>
          </figure>
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink pt-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <figure className="order-2 border border-rule bg-sheet lg:order-1">
            <figcaption className="border-b border-rule px-5 py-3 text-[14px] text-graphite">
              Illustration of one KOTA call and the record it leaves. Synthetic call; the steps are
              the ones the code performs.
            </figcaption>
            <div className="grid sm:grid-cols-[1.1fr_1fr] sm:divide-x sm:divide-rule">
              <ol className="space-y-3 px-5 py-5 text-[15px]">
                <li>
                  <span className="text-graphite">Caller</span>
                  <br />
                  “Two beef noodle soups and a jasmine tea.”
                </li>
                <li className="font-mono text-[14px] text-graphite">menu lookup: 2 items found</li>
                <li>
                  <span className="annot">Required choice missing.</span> Agent asks: thin or wide?
                </li>
                <li className="font-mono text-[14px] text-graphite">item confirmed by read-back</li>
                <li className="font-mono text-[14px] text-graphite">order saved</li>
                <li className="font-mono text-[14px] text-graphite">sms accepted by provider</li>
                <li>Only now does the agent say “I texted you your order.”</li>
              </ol>
              <div className="border-t border-rule px-5 py-5 sm:border-t-0">
                <p className="text-[14px] text-graphite">Order record</p>
                <dl className="mt-3 space-y-2 text-[15px]">
                  <div className="flex justify-between gap-4">
                    <dt>2 × Beef Noodle Soup</dt>
                    <dd className="text-graphite">wide</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>1 × Jasmine Tea</dt>
                    <dd />
                  </div>
                  <div className="flex justify-between gap-4 border-t border-rule pt-2 font-semibold">
                    <dt>Total</dt>
                    <dd>30.40</dd>
                  </div>
                </dl>
                <p className="mt-4 inline-block rounded-sm bg-pass-soft px-2 py-0.5 text-[14px] font-semibold text-pass">
                  Placed, confirmation sent
                </p>
              </div>
            </div>
          </figure>
          <div className="order-1 lg:order-2">
            <p className="text-[15px] text-graphite">Prototype. Phone and messaging.</p>
            <h3 className="display mt-2 text-3xl sm:text-4xl">KOTA: phone orders in English and 中文</h3>
            <p className="mt-5 max-w-prose text-lg leading-relaxed">
              A voice agent that takes restaurant orders against the restaurant’s own menu database,
              saves each one as a structured record, and texts the caller a confirmation.
            </p>
            <p className="mt-4 max-w-prose leading-relaxed text-graphite">
              111 automated tests pass. Built against real menus; not used in production, and we say
              so.
            </p>
            <Link href="/work/kota" className="link mt-6 inline-block font-semibold">
              Read the KOTA case study
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-ink pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="text-xl font-bold">Also built</h3>
            <Link href="/work" className="link font-semibold">
              All work, with details
            </Link>
          </div>
          <ul className="mt-4">
            {otherWork.map((w) => (
              <li key={w.id} className="grid gap-x-8 gap-y-1 border-b border-rule py-4 md:grid-cols-[18rem_1fr_8rem]">
                <Link href={`/work#${w.id}`} className="font-semibold hover:underline">
                  {w.name}
                </Link>
                <span className="text-graphite">{w.kind}</span>
                <span className="text-[15px] text-graphite md:text-right">{w.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:py-28">
          <h2 className="display max-w-3xl text-3xl sm:text-5xl">Three ways to start. Most first projects are small.</h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-paper/20">
            {hire.map((h, i) => (
              <article key={h.verb} className={`flex flex-col ${i === 0 ? "lg:pr-10" : i === 1 ? "lg:px-10" : "lg:pl-10"}`}>
                <h3 className="display text-5xl sm:text-6xl">{h.verb}</h3>
                <p className="mt-5 text-xl leading-snug">{h.situation}</p>
                <dl className="mt-8 space-y-5 border-t border-paper/20 pt-6">
                  <div>
                    <dt className="text-[14px] text-paper/60">First project</dt>
                    <dd className="mt-1 leading-relaxed">{h.first}</dd>
                  </div>
                  <div>
                    <dt className="text-[14px] text-paper/60">You get</dt>
                    <dd className="mt-1 leading-relaxed">{h.get}</dd>
                  </div>
                </dl>
                {"link" in h && h.link && (
                  <Link href={h.link.href} className="link mt-6 font-semibold">
                    {h.link.label}
                  </Link>
                )}
              </article>
            ))}
          </div>
          <p className="mt-14 max-w-3xl border-t border-paper/20 pt-6 leading-relaxed text-paper/80">
            Every project starts with a written scope: deliverables, exclusions, acceptance tests,
            milestones, and a fixed price, agreed before any work begins. You pay by milestone.
          </p>
          <div id="agencies" className="mt-10 grid gap-4 md:grid-cols-[14rem_1fr]">
            <h3 className="text-xl font-bold">For agencies</h3>
            <p className="max-w-prose leading-relaxed text-paper/80">
              If you sell agents or automations to your own clients, we take on project-based
              delivery: the functions, webhooks, and integrations behind an agent, failure-case
              testing, and Mandarin conversation flows. Same written scope and handover. You keep
              the client relationship.
            </p>
          </div>
        </div>
      </section>

      <section id="agents" className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_2fr] lg:py-24">
          <div>
            <h2 className="display text-3xl sm:text-4xl">Not only voice</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-graphite">
              An agent is only useful if its result lands in a system you already use.
            </p>
          </div>
          <ul className="border-t border-ink">
            {agents.map((a) => (
              <li key={a.name} className="grid gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[14rem_1fr_10rem]">
                <span className="font-semibold">{a.name}</span>
                <span className="text-graphite">
                  <span className="sm:hidden">Writes to: </span>
                  {a.writes}
                </span>
                <span className="text-[15px] sm:text-right">
                  {a.proof ? (
                    <Link href={`/work#${a.proof.id}`} className="link">
                      {a.proof.label}
                    </Link>
                  ) : (
                    <span className="text-graphite">Not built yet</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="border-t border-rule bg-sheet">
        <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:py-28">
          <h2 className="display max-w-3xl text-3xl sm:text-5xl">Reliability, with the receipts</h2>
          <div className="mt-14 border-t border-ink">
            {reliability.map((r) => (
              <div key={r.principle} className="grid gap-x-16 gap-y-4 border-b border-rule py-8 lg:grid-cols-[1fr_1.1fr]">
                <div>
                  <h3 className="text-xl font-bold">{r.principle}</h3>
                  <p className="mt-2 max-w-prose leading-relaxed text-graphite">{r.body}</p>
                </div>
                <div className="border-l-2 border-mark pl-5">
                  <p className="text-[14px] text-graphite">{r.source}</p>
                  {r.mono?.map((line) => (
                    <p key={line} className="mt-1.5 break-words font-mono text-[14px] leading-relaxed">
                      {line}
                    </p>
                  ))}
                  {r.list && (
                    <ul className="mt-1.5 space-y-1 text-[15px]">
                      {r.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl leading-relaxed text-graphite">
            We don’t take on guaranteed revenue or accuracy numbers, outbound calls or texts to people
            who haven’t agreed to them, or fully automatic financial, medical, or legal decisions.
          </p>
        </div>
      </section>

      <section id="brief" className="scroll-mt-4 border-t border-rule bg-ink text-paper">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:py-28">
          <div>
            <h2 className="display text-4xl sm:text-6xl">Describe your project</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
              Tell us about the process you want to automate, connect, or fix. You’ll get back
              questions or a proposed scope by email.
            </p>
            <p className="mt-6 leading-relaxed text-paper/80">
              Prefer email? Write to{" "}
              <a href={`mailto:${STUDIO_EMAIL}`} className="link text-paper">
                {STUDIO_EMAIL}
              </a>
              .
            </p>
          </div>
          <BriefForm />
        </div>
      </section>
    </>
  );
}
