import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recorded run: validating extracted menu data",
  description:
    "A recorded run of KummaLabs’ document validation step: a synthetic extracted menu goes in, five unsupported or inconsistent fields are caught, and the cleaned record comes out. Real code, real output.",
  alternates: { canonical: "/work/menu-validation" },
};

// Output below is copied from a run of scripts/menu_grounding.py (sanitize_menu_document) in the
// KOTA repo on 2026-11-12, commit d15e5d7, against a synthetic menu. Do not edit the messages:
// re-run the script and paste the new output if the code changes.
const issues = [
  {
    code: "upsell_note_ungrounded",
    field: "Beef Noodle Soup → upsell note",
    message: "Upsell note references unknown item(s): \"Mango Pudding\".",
    before: "Pairs well with \"Scallion Pancake\" or \"Mango Pudding\".",
    after: "Removed",
    why: "Mango Pudding is not on this menu. A phone agent reading this note would offer a dish the kitchen can’t make.",
  },
  {
    code: "alias_collides_item_name",
    field: "Beef Noodle Soup → aliases",
    message: "Alias 'wonton soup' collides with item 'Wonton Soup'.",
    before: "beef noodles, Beef Noodle Soup, wonton soup",
    after: "beef noodles",
    why: "A caller asking for wonton soup would have been matched to the wrong dish.",
  },
  {
    code: "dietary_tag_unknown",
    field: "Beef Noodle Soup → dietary tags",
    message: "Unknown dietary tag 'keto_friendly' removed.",
    before: "contains_beef, contains_wheat, keto_friendly",
    after: "contains_beef, contains_wheat",
    why: "Only tags from a fixed list are allowed, so the agent can’t repeat a dietary claim nobody checked.",
  },
  {
    code: "persona_mentions_menu_item",
    field: "Restaurant → agent persona",
    message: "Persona references menu items; persona must be style-only.",
    before: "A warm, efficient host. Recommend popular items like Beef Noodle Soup and Peking Duck.",
    after: "Replaced with a style-only persona that tells the agent to use only verified menu items.",
    why: "Peking Duck is not on the menu. Dish recommendations must come from menu data, not from a personality description.",
  },
  {
    code: "option_descriptions_missing",
    field: "Beef Noodle Soup → Noodle type options",
    message: "All option descriptions are missing for slot 'Noodle type' (Thin, Wide).",
    before: "Thin, Wide (no descriptions)",
    after: "Unchanged, flagged for a person to review",
    why: "Not an error the code should guess at. It goes on the review list.",
  },
];

const unchanged = [
  "All four items and both sections",
  "Every price (Beef Noodle Soup stayed 13.95)",
  "The required “Noodle type” choice and its two options",
  "English and Chinese item names",
];

export default function MenuValidationRun() {
  return (
    <article>
      <header className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 lg:pt-20">
        <p className="text-[15px] text-graphite">Recorded run</p>
        <h1 className="display mt-3 max-w-4xl text-[2.2rem] sm:text-5xl">
          Catching what a document extraction got wrong, before it reaches the database
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          When an AI model reads a document, most fields come out right and a few come out
          invented. This is the step that finds the invented ones. Below is one real run of that
          step from KOTA’s menu onboarding pipeline, with its actual output.
        </p>
      </header>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <h2 className="font-bold">Real</h2>
            <p className="mt-2 leading-relaxed text-graphite">
              The validation code and every message shown in the results. Run on November 12,
              2026 against commit d15e5d7 of the KOTA repository.
            </p>
          </div>
          <div>
            <h2 className="font-bold">Synthetic</h2>
            <p className="mt-2 leading-relaxed text-graphite">
              The menu. We wrote a small fictional menu by hand, with mistakes of the kind an
              extraction model makes, to stand in for the model’s output. No restaurant’s data is
              shown.
            </p>
          </div>
          <div>
            <h2 className="font-bold">Not shown</h2>
            <p className="mt-2 leading-relaxed text-graphite">
              The extraction from photos, which calls a vision model, and the database load. Both
              exist in the pipeline but were not part of this run.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">The input</h2>
          <div className="max-w-prose">
            <p className="text-lg leading-relaxed">
              A structured menu for a fictional noodle house: two sections, four items with English
              and Chinese names, prices, dietary tags, a required noodle choice, serving
              suggestions, and a personality description for the phone agent.
            </p>
            <ul className="mt-6 divide-y divide-rule border-y border-rule">
              {[
                ["Beef Noodle Soup 红烧牛肉面", "13.95"],
                ["Wonton Soup 馄饨汤", "9.50"],
                ["Scallion Pancake 葱油饼", "6.50"],
                ["Jasmine Tea 茉莉花茶", "2.50"],
              ].map(([name, price]) => (
                <li key={name} className="flex justify-between gap-4 py-2.5">
                  <span>{name}</span>
                  <span className="text-graphite">{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="display text-3xl">What the validation step reported</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-graphite">
            Five issues. Four were fixed automatically because the menu itself proves them wrong.
            One was left alone and flagged, because fixing it would mean guessing.
          </p>
          <ol className="mt-10 border-t border-ink">
            {issues.map((issue) => (
              <li key={issue.code} className="grid gap-x-10 gap-y-4 border-b border-rule py-8 lg:grid-cols-[1fr_1.4fr]">
                <div>
                  <h3 className="text-lg font-bold">{issue.field}</h3>
                  <p className="mt-2 leading-relaxed">{issue.why}</p>
                </div>
                <div className="space-y-3">
                  <p className="rounded-md border border-hold/40 bg-hold-soft px-4 py-3 text-[15px] leading-snug">
                    <span className="block text-[13px] text-hold">Reported by the code ({issue.code})</span>
                    {issue.message}
                  </p>
                  <dl className="grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-2 text-[15px] leading-snug">
                    <dt className="text-graphite">Before</dt>
                    <dd>{issue.before}</dd>
                    <dt className="text-graphite">After</dt>
                    <dd>{issue.after}</dd>
                  </dl>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-graphite">
            The run also made two changes without reporting an issue. It dropped the alias “Beef
            Noodle Soup” because it only repeated the item’s own name, and it normalized Wonton
            Soup’s “contains_shrimp” to the standard “contains_shellfish”.
          </p>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">What it did not touch</h2>
          <div className="max-w-prose">
            <ul className="space-y-3">
              {unchanged.map((item) => (
                <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-x-3 leading-relaxed">
                  <svg viewBox="0 0 16 16" className="mt-1.5 size-4 text-pass" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                    <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-graphite">
              That matters as much as the fixes. A cleanup step that quietly changes a price is
              worse than no cleanup step.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-sheet">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr]">
          <h2 className="display text-3xl">Limits</h2>
          <div className="max-w-prose space-y-4 leading-relaxed text-graphite">
            <p>
              This step checks the extracted data against itself. It can tell that Mango Pudding
              isn’t on the menu. It cannot tell that a price was misread from the photo, because
              nothing else in the document contradicts it. That is why a person reviews the flagged
              list and the prices before a menu goes live.
            </p>
            <p>
              We have built this for menus. The same pattern applies to invoices, intake forms, and
              other documents (extract, check against known records, flag what doesn’t match), but
              we have not yet delivered those, and each needs its own rules.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="display text-3xl">Have documents that need this?</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              Tell us what the documents are, where the data needs to go, and what you check by
              hand today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/#brief" className="rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90">
              Describe your project
            </Link>
            <Link href="/work" className="link text-paper">
              All work
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
