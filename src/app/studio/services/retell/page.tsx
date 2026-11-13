import type { Metadata } from "next";
import Link from "next/link";
import { DIAGNOSTIC } from "@/lib/studio-offer";
import { notePath } from "@/lib/studio-notes";

export const metadata: Metadata = {
  title: "Retell AI integration: the backend your voice agent calls",
  description:
    "KummaLabs builds and fixes the server side of Retell AI agents: signed custom functions, webhooks, and database writes that hold up when calls repeat or fail. Tested code, public source, and a fixed-price diagnostic to start.",
  alternates: { canonical: "/services/retell" },
};

const REPO = "https://github.com/Comma0101/kummalabs/blob/master/";

// Every row describes code in this repository (src/lib/retell, src/lib/demo-order,
// scripts/retell) and how it was tested. Re-verify against the code before changing a claim.
const built: { term: string; detail: string; link?: { href: string; label: string } }[] = [
  {
    term: "Signed function calls",
    detail:
      "Every request from Retell is checked against its signature over the raw body, inside a five-minute window. Unsigned, altered, and replayed requests are rejected.",
    link: { href: `${REPO}src/lib/retell/signature.ts`, label: "The check" },
  },
  {
    term: "Facts come from tools",
    detail:
      "The agent’s prompt holds no menu and no prices. It can only say what a lookup returned, and when nothing matches, the tool tells it not to improvise.",
    link: { href: `${REPO}src/lib/demo-order/tools.ts`, label: "The tools" },
  },
  {
    term: "Rules live in code",
    detail:
      "Required choices, choices that depend on another choice, and quantity limits are enforced by the server, so the model cannot talk its way past them.",
    link: { href: `${REPO}src/lib/demo-order/engine.ts`, label: "The rules" },
  },
  {
    term: "Writes that are safe to repeat",
    detail:
      "One order per call, enforced by the database. Ten simultaneous requests for one call store one order and all get the same reference.",
    link: { href: notePath("duplicate-tool-calls"), label: "How, with the test" },
  },
  {
    term: "Results the agent cannot misread",
    detail:
      "“Placed” is returned only with the row the database gave back. A failed write returns “failed” with the sentence the agent should say, and the caller’s cart is kept.",
    link: { href: notePath("agent-said-confirmed-nothing-saved"), label: "Why it matters" },
  },
  {
    term: "The agent as code",
    detail:
      "The prompt, tool schemas, voice, and language settings live in the repository and are applied through Retell’s API, so a change is reviewed like any other change.",
    link: { href: `${REPO}scripts/retell/agent-config.mjs`, label: "The definition" },
  },
  {
    term: "English and Mandarin",
    detail: "One agent takes an order in either language, and the order is stored the same way.",
  },
];

const notDone = [
  "Tested this agent on live phone calls. So far it has run in typed conversations in Retell’s playground.",
  "Built a Conversation Flow agent. Ours is a single prompt with custom functions.",
  "Connected a calendar, a CRM, or call transfer on Retell.",
  "Delivered a Retell agent for a paying client.",
];

const fits: { text: string; href?: string }[] = [
  { text: "The agent tells callers something is confirmed, and the record isn’t there.", href: notePath("agent-said-confirmed-nothing-saved") },
  { text: "One call creates several bookings or orders.", href: notePath("duplicate-tool-calls") },
  { text: "The prompt has grown to hold prices, hours, or policies that should be looked up." },
  { text: "A signature check that never passes, or a function endpoint anyone can call." },
  { text: "The same webhook arrives twice and is processed twice." },
  { text: "A custom function has to read from or write to your own database or API during the call." },
];

export default function RetellService() {
  return (
    <>
      <header className="mx-auto max-w-[88rem] px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
        <p className="text-[15px] text-graphite">For teams building on Retell AI</p>
        <h1 className="display mt-3 max-w-4xl text-[2.3rem] sm:text-6xl">The code behind your Retell agent</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          Custom functions, webhooks, and the database writes behind them: built, tested for the cases where calls
          repeat or fail, and handed over. We work on the server your agent calls. The conversation design stays with
          you.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/#brief" className="rounded-full bg-ink px-5 py-3 font-semibold text-paper hover:bg-ink/90">
            Describe your project
          </Link>
          <Link href="/work/sample-diagnostic" className="link font-semibold">
            Read a sample report
          </Link>
        </div>
      </header>

      <section className="border-t border-ink bg-sheet">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6">
          <h2 className="display text-3xl">What we have built and tested on Retell</h2>
          <p className="mt-4 max-w-prose leading-relaxed text-graphite">
            One agent of our own: a phone-ordering line for a fictional restaurant. The source is public, and each row
            links to the part it describes.
          </p>
          <dl className="mt-10 border-t border-ink">
            {built.map(({ term, detail, link }) => (
              <div key={term} className="grid gap-x-10 gap-y-1 border-b border-rule py-5 md:grid-cols-[18rem_1fr]">
                <dt className="font-bold">{term}</dt>
                <dd className="max-w-prose leading-relaxed text-graphite">
                  {detail}{" "}
                  {link &&
                    (link.href.startsWith("/") ? (
                      <Link href={link.href} className="link whitespace-nowrap text-ink">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="link whitespace-nowrap text-ink">
                        {link.label}
                      </a>
                    ))}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-prose leading-relaxed text-graphite">
            How it was tested: an automated suite that includes a real Postgres, and typed conversations in Retell’s
            playground against the deployed server.
          </p>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">What we have not done on Retell</h2>
          <div className="max-w-prose">
            <ul className="space-y-3">
              {notDone.map((item) => (
                <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-x-3 leading-relaxed">
                  <span className="mt-[0.7rem] h-0.5 w-3 bg-graphite/60" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-graphite">
              If your project needs one of these, the written scope says so. Either you keep that part, or we price the
              time to learn it and you decide.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">Problems this fits</h2>
          <ul className="max-w-prose space-y-3">
            {fits.map(({ text, href }) => (
              <li key={text} className="grid grid-cols-[1.25rem_1fr] gap-x-3 leading-relaxed">
                <span className="mt-[0.7rem] h-0.5 w-3 bg-graphite/60" aria-hidden />
                <span>
                  {text}{" "}
                  {href && (
                    <Link href={href} className="link whitespace-nowrap">
                      Read the note
                    </Link>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">How to start</h2>
          <div className="max-w-prose space-y-4 leading-relaxed">
            <p>
              With an {DIAGNOSTIC.name.toLowerCase()}: {DIAGNOSTIC.price} fixed, paid up front. We test one agent and
              the system it writes to, against your own test data, and you get a written report within{" "}
              {DIAGNOSTIC.deliveryDays} business days of access being ready. The fee is credited toward the build if it
              starts within {DIAGNOSTIC.creditDays} days.
            </p>
            <p className="text-graphite">
              If the right answer is to leave it alone, or to use something Retell already provides, the report says
              that.
            </p>
            <p>
              <Link href="/services/integration#diagnostic" className="link font-semibold">
                What the diagnostic covers
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Tell us what your agent does today</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              And where it goes wrong. You’ll get questions or a written scope back.
            </p>
            <p className="mt-4 text-[14px] text-paper/60">KummaLabs is independent and is not affiliated with Retell AI.</p>
          </div>
          <Link href="/#brief" className="self-start rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90 lg:self-auto">
            Describe your project
          </Link>
        </div>
      </section>
    </>
  );
}
