import type { Metadata } from "next";
import Link from "next/link";
import { DemoFeed } from "@/components/studio/DemoFeed";

export const metadata: Metadata = {
  title: "Phone demo: order from a restaurant that doesn’t exist",
  description:
    "Call KummaLabs’ demo line and order from a fictional restaurant in English or Mandarin. A Retell voice agent calls signed tools on our backend, and your order appears on this page from the database.",
  alternates: { canonical: "/demo" },
  // Out of search results until the phone line is switched on (see NEXT_PUBLIC_DEMO_PHONE).
  robots: { index: false, follow: true },
};

// Set NEXT_PUBLIC_DEMO_PHONE (display form, e.g. "+1 (555) 010-0000") once the line is live.
const phone = process.env.NEXT_PUBLIC_DEMO_PHONE;
const SOURCE = "https://github.com/Comma0101/kummalabs/tree/master";

const tryThese = [
  {
    say: "“A lunch combo with mapo tofu.”",
    does: "It asks for a spice level, because the combo only needs one for the two spicy mains. That rule is in code, not in the prompt.",
  },
  {
    say: "“Do you have mango pudding?”",
    does: "It says no. The agent can only name what the menu lookup returns, and nothing on the menu matches.",
  },
  {
    say: "“来一份扬州炒饭，两份猪肉饺子。”",
    does: "It switches to Mandarin, asks steamed or pan-fried, and the order is stored the same way.",
  },
  {
    say: "“Actually, make that one Coke.”",
    does: "It changes the quantity in the cart on the server and reads the new total back from it.",
  },
];

const real = [
  "The voice agent, running on Retell.",
  "Every tool call, signed by Retell and verified by our server before anything runs.",
  "The order record, written to Postgres. The agent says “placed” only when the database returns the stored row.",
  "The feed above, read from that database.",
];

const notReal = [
  "The restaurant. Golden Lotus Kitchen is fictional and its menu is made up.",
  "The food. Nothing is cooked and nobody is waiting for you.",
  "Staff. The line can’t transfer you to a person.",
];

export default function Demo() {
  return (
    <>
      <header className="mx-auto max-w-[88rem] px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
        <p className="text-[15px] text-graphite">Phone demo</p>
        <h1 className="display mt-3 max-w-4xl text-[2.3rem] sm:text-6xl">Order from a restaurant that doesn’t exist</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          Call the line and place a pickup order with KOTA, an AI ordering assistant, in English or
          Mandarin. Then watch your order appear on this page, straight from the database.
        </p>
        {phone ? (
          <p className="mt-8">
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="display text-4xl hover:underline sm:text-5xl">
              {phone}
            </a>
          </p>
        ) : (
          <p className="mt-8 max-w-xl rounded-md border border-hold/40 bg-hold-soft px-4 py-3 leading-relaxed">
            The phone line isn’t switched on yet. The backend below is live.
          </p>
        )}
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-graphite">
          Calls end after five minutes. Our database stores your order and the first name you give,
          and nothing else. The voice platform is set to keep no recording or transcript, only
          basic call records.
        </p>
      </header>

      <section className="border-y border-ink bg-sheet">
        <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6">
          <h2 className="display text-3xl">What the line has done</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-graphite">
            Live from the demo database, updated every few seconds. Includes our own test orders.
          </p>
          <div className="mt-10">
            <DemoFeed />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6">
          <h2 className="display text-3xl">Things to try</h2>
          <dl className="mt-10 border-t border-ink">
            {tryThese.map((t) => (
              <div key={t.say} className="grid gap-x-12 gap-y-2 border-b border-rule py-6 md:grid-cols-[1fr_1.4fr]">
                <dt className="text-xl font-semibold leading-snug">{t.say}</dt>
                <dd className="max-w-prose leading-relaxed text-graphite">{t.does}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl">What’s real</h2>
            <ul className="mt-8 space-y-3">
              {real.map((item) => (
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
            <h2 className="display text-3xl">What isn’t</h2>
            <ul className="mt-8 space-y-3 text-graphite">
              {notReal.map((item) => (
                <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-x-3 leading-relaxed">
                  <span className="mt-[0.7rem] h-0.5 w-3 bg-graphite/60" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">How it’s built</h2>
          <div className="max-w-prose space-y-4 leading-relaxed">
            <p>
              Retell handles the phone call and speech. The agent’s prompt contains no menu and no
              prices. When it needs either, it calls one of five tools on our server: look up the
              menu, add an item, change a quantity, read the cart, place the order.
            </p>
            <p className="text-graphite">
              The server checks Retell’s signature on every request, validates what the model sent,
              applies the menu’s rules, and writes to Postgres. One call can place one order: a
              repeat returns the same order, and a failed write is reported to the caller as a
              failure.
            </p>
            <p>
              The code is public:{" "}
              <a href={`${SOURCE}/scripts/retell/agent-config.mjs`} className="link">
                the agent’s prompt and tools
              </a>
              ,{" "}
              <a href={`${SOURCE}/src/lib/demo-order`} className="link">
                the ordering rules and storage
              </a>
              , and{" "}
              <a href={`${SOURCE}/tests`} className="link">
                the tests
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Need the code behind your own agent?</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              Functions, webhooks, and records your agent can rely on, on Retell or any platform that
              can call an API.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/#brief" className="rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90">
              Describe your project
            </Link>
            <Link href="/agencies" className="link text-paper">
              For agencies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
