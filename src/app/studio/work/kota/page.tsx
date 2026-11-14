import type { Metadata } from "next";
import Link from "next/link";
import { KOTA_URL } from "@/lib/studio-site";

export const metadata: Metadata = {
  title: "KOTA case study: bilingual AI phone ordering",
  description:
    "How KOTA turns restaurant phone calls into confirmed, structured orders in English and Mandarin: streaming speech, typed tools against Postgres, verified confirmations, and a human hand-off.",
  alternates: { canonical: "/work/kota" },
};

const flow = [
  ["Understand the input", "Streaming speech-to-text on Twilio media streams: Deepgram for English, ByteDance for Mandarin."],
  ["Retrieve information", "Menu, prices, options, and combos come from PostgreSQL. Exact answers must come from tool calls."],
  ["Apply business rules", "Required options, combo structure, and cart changes are enforced in code, not by prompt."],
  ["Call the right tools", "Typed tool calls: menu search, option selection, cart edit and remove, order summary, menu-link SMS, place order."],
  ["Check the action worked", "The agent only says “I texted your order” if the messaging API reports success."],
  ["Handle the unexpected", "No exact menu match? It offers real menu items instead of guessing. Messaging failures are caught and logged without losing the order."],
  ["Leave a record", "Every call, utterance, and placed order is stored with the call ID."],
  ["Hand off to a person", "Pressing 0 redirects the live call to a staff phone."],
];

const stack = [
  "Twilio voice and media streams, SMS, WhatsApp",
  "Deepgram streaming agent for English",
  "ByteDance speech-to-text and text-to-speech, with OpenAI tool calling, for Mandarin",
  "Python and FastAPI WebSocket runtime, one handler per call",
  "PostgreSQL for restaurants, menus, calls, utterances, and orders",
  "Docker Compose for development, Kubernetes manifests for Google Cloud",
];

export default function KotaCaseStudy() {
  return (
    <article>
      <header className="mx-auto max-w-[88rem] px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
        <p className="text-[15px] text-graphite">Case study</p>
        <h1 className="display mt-3 max-w-4xl text-[2.4rem] sm:text-6xl">
          KOTA: restaurant phone calls in, confirmed orders out. In English and 中文.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          A real-time voice agent that answers the call, takes the order against the restaurant’s
          own menu data, records it, and confirms it to the caller.
        </p>
        <div className="mt-8 max-w-2xl rounded-md border border-hold/40 bg-hold-soft px-4 py-3 leading-relaxed">
          <span className="font-semibold">Status: </span>KOTA began as a paid project under the
          name Serviio. We built the first working version for a US restaurant point-of-sale
          company, which we don’t name. The code has been reworked since, and this page describes
          the current version, tested against real restaurant menus (combos, required options,
          bilingual item names). We don’t run a deployment of it ourselves, and we make no claims
          about that company’s deployment, call volume, accuracy, latency, or uptime.
        </div>
      </header>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">The problem</h2>
          <p className="max-w-prose text-lg leading-relaxed">
            Restaurants take phone orders at the moments staff are busiest. Many serve
            Mandarin-speaking callers whom an English-only answering service can’t help. A missed
            or garbled order is lost revenue and a frustrated customer.
          </p>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">What it does</h2>
          <p className="max-w-prose text-lg leading-relaxed">
            The caller presses 1 for English or 2 for Chinese. The agent answers menu questions
            from the menu database and takes the order: standard items, combos, required options,
            quantity changes, removals, and cart review. It texts a menu link on request, places the
            order as a structured record, and texts the caller a confirmation. Pressing 0 at any
            time transfers the call to a staff phone.
          </p>
        </div>
      </section>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6">
          <h2 className="display text-3xl">How a call becomes an order</h2>
          <ol className="mt-10 divide-y divide-rule border-y border-rule">
            {flow.map(([step, how], i) => (
              <li key={step} className="grid gap-2 py-4 sm:grid-cols-[2.5rem_14rem_1fr] sm:gap-6">
                <span className="text-graphite" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="font-semibold">{step}</h3>
                <p className="leading-relaxed text-graphite">{how}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl">Engineering decisions</h2>
            <div className="mt-8 space-y-7">
              <div>
                <h3 className="font-semibold">The model is never the source of truth</h3>
                <p className="mt-2 leading-relaxed text-graphite">
                  Prices, items, and order state are reached only through deterministic tools
                  against Postgres. A compact menu summary orients the model; anything price-sensitive
                  must come from a tool call.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Menu onboarding is validated extraction</h3>
                <p className="mt-2 leading-relaxed text-graphite">
                  Menu photos or text go through LLM extraction, then grounding checks remove
                  pairings, recommendations, or aliases that point at items not on the menu. A
                  refinement step must preserve item sets, option structure, prices, and
                  availability before anything reaches the database.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Multi-restaurant by design</h3>
                <p className="mt-2 leading-relaxed text-graphite">
                  Each call carries a restaurant ID. Prompt, persona, and menu are assembled per
                  restaurant from the database.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Tested where it breaks</h3>
                <p className="mt-2 leading-relaxed text-graphite">
                  111 automated tests cover the tool contract, language routing, order options,
                  menu grounding, schema and search, recommendations, and WhatsApp messaging.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-12">
            <div>
              <h2 className="display text-3xl">Stack</h2>
              <ul className="mt-8 space-y-2 leading-relaxed text-graphite">
                {stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display text-3xl">Not in the current version</h2>
              <p className="mt-6 leading-relaxed text-graphite">
                POS integration, kitchen printing, a restaurant-side order dashboard, staff
                notification, payments, calendar booking, and CRM sync. The first version included
                an integration with that company’s ordering API; it is not part of the current
                code. Each one is a bounded integration on top of the structured order record, the
                same kind of work we do for clients.
              </p>
            </div>
            <div>
              <h2 className="display text-3xl">Known defects</h2>
              <p className="mt-6 leading-relaxed text-graphite">
                Our own diagnostic of the current code’s order flow found five issues, including
                that a failed database write is still announced to the caller as a confirmed order.
                They are open, and we fix them before we deploy it. The public report shows three in
                full and withholds two security findings until they are fixed.{" "}
                <Link href="/work/sample-diagnostic" className="link text-ink">
                  Read the report
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Have a process like this?</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              Phone, inbox, leads, or documents: tell us what happens today and what a good result
              looks like.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/#brief" className="rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90">
            Describe your project
          </Link>
            <a href="/KummaLabs-KOTA-case-study.pdf" className="link text-paper">
              Download the one-page PDF
            </a>
            <a href={KOTA_URL} className="link text-paper/80">
              KOTA product site
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
