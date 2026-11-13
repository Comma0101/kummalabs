"use client";

import Link from "next/link";
import { useState } from "react";

// Data is the recorded run shown on /work/menu-validation: KOTA's scripts/menu_grounding.py
// (commit d15e5d7, 2026-11-12) on a synthetic menu. `message` strings are the code's verbatim
// output. Do not edit them by hand; re-run and paste.

type Outcome = "kept" | "removed" | "replaced" | "normalized" | "flagged";

type Token = {
  id: string;
  field: string;
  text: string;
  outcome: Outcome;
  rule: string;
  message?: string;
  code?: string;
  result: string;
};

const tokens: Token[] = [
  {
    id: "name",
    field: "Item",
    text: "Beef Noodle Soup 红烧牛肉面",
    outcome: "kept",
    rule: "Item names are the catalog. Every other field is checked against them.",
    result: "Kept as extracted.",
  },
  {
    id: "price",
    field: "Price",
    text: "13.95",
    outcome: "kept",
    rule: "This step never changes a price. Prices are reviewed by a person before a menu goes live.",
    result: "Kept as extracted.",
  },
  {
    id: "options",
    field: "Noodle type (required)",
    text: "Thin / Wide",
    outcome: "flagged",
    rule: "A required choice with no descriptions is reported, not guessed at.",
    code: "option_descriptions_missing",
    message: "All option descriptions are missing for slot 'Noodle type' (Thin, Wide).",
    result: "Kept unchanged. Added to the review list.",
  },
  {
    id: "alias-ok",
    field: "Also called",
    text: "beef noodles",
    outcome: "kept",
    rule: "An alias is allowed if it doesn’t repeat the item’s name or belong to another item.",
    result: "Kept as extracted.",
  },
  {
    id: "alias-collide",
    field: "Also called",
    text: "wonton soup",
    outcome: "removed",
    rule: "An alias can’t be another item’s name. A caller asking for wonton soup would get the wrong dish.",
    code: "alias_collides_item_name",
    message: "Alias 'wonton soup' collides with item 'Wonton Soup'.",
    result: "Removed from the accepted record.",
  },
  {
    id: "tag-ok",
    field: "Dietary tags",
    text: "contains_beef",
    outcome: "kept",
    rule: "Dietary tags must come from a fixed list of 20.",
    result: "Kept as extracted.",
  },
  {
    id: "tag-unknown",
    field: "Dietary tags",
    text: "keto_friendly",
    outcome: "removed",
    rule: "Dietary tags must come from a fixed list of 20, so the agent can’t repeat a claim nobody checked.",
    code: "dietary_tag_unknown",
    message: "Unknown dietary tag 'keto_friendly' removed.",
    result: "Removed from the accepted record.",
  },
  {
    id: "upsell",
    field: "Serving suggestion",
    text: "Pairs well with “Scallion Pancake” or “Mango Pudding”.",
    outcome: "removed",
    rule: "A suggestion may only name dishes that are on this menu. Mango Pudding isn’t.",
    code: "upsell_note_ungrounded",
    message: "Upsell note references unknown item(s): \"Mango Pudding\".",
    result: "Whole note removed, so the agent never offers a dish the kitchen can’t make.",
  },
  {
    id: "persona",
    field: "Agent persona",
    text: "A warm, efficient host. Recommend popular items like Beef Noodle Soup and Peking Duck.",
    outcome: "replaced",
    rule: "A persona sets tone only. Dish recommendations must come from menu data, and Peking Duck isn’t on the menu.",
    code: "persona_mentions_menu_item",
    message: "Persona references menu items; persona must be style-only.",
    result: "Replaced with a style-only persona that tells the agent to use only verified menu items.",
  },
];

const outcomeLabel: Record<Outcome, string> = {
  kept: "Accepted",
  removed: "Excluded",
  replaced: "Replaced",
  normalized: "Normalized",
  flagged: "Accepted, flagged for review",
};

const outcomeTone: Record<Outcome, string> = {
  kept: "bg-pass-soft text-pass",
  removed: "bg-mark-soft text-mark",
  replaced: "bg-mark-soft text-mark",
  normalized: "bg-pass-soft text-pass",
  flagged: "bg-hold-soft text-hold",
};

const byField = tokens.reduce<Record<string, Token[]>>((acc, t) => {
  (acc[t.field] ??= []).push(t);
  return acc;
}, {});

const accepted = tokens.filter((t) => t.outcome === "kept" || t.outcome === "flagged");
const exceptions = tokens.filter((t) => t.code);

export function Inspector() {
  const [selectedId, setSelectedId] = useState("upsell");
  const selected = tokens.find((t) => t.id === selectedId) ?? tokens[0];

  const pick = (t: Token, extra = "") => (
    <button
      key={t.id}
      type="button"
      aria-pressed={t.id === selectedId}
      onClick={() => setSelectedId(t.id)}
      className={`rounded-sm text-left leading-snug decoration-rule underline-offset-4 hover:underline ${
        t.id === selectedId ? "annot bg-mark-soft text-ink" : ""
      } ${extra}`}
    >
      {t.text}
    </button>
  );

  return (
    <section aria-label="Inspect a recorded validation run" className="border-y border-ink bg-sheet">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6">
        <p className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-3 text-[14px] text-graphite">
          <span>
            A recorded run of our document validation step. The menu is synthetic; the checks and their
            output are real.
          </span>
          <Link href="/work/menu-validation" className="link text-ink">
            Read the full run
          </Link>
        </p>

        <div className="grid lg:grid-cols-[1.15fr_1fr_1fr] lg:divide-x lg:divide-rule">
          {/* 1. Extracted draft */}
          <div className="py-6 lg:pr-8">
            <h2 className="text-[15px] font-bold">1. What the model extracted</h2>
            <p className="mt-1 text-[14px] text-graphite">Select any value to follow it.</p>
            <dl className="mt-5 space-y-4">
              {Object.entries(byField).map(([field, items]) => (
                <div key={field} className="grid grid-cols-[8.5rem_1fr] gap-x-4">
                  <dt className="pt-0.5 text-[14px] text-graphite">{field}</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {items.map((t) =>
                      pick(t, field === "Dietary tags" || field === "Also called" ? "font-mono text-[14px]" : ""),
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 2. The check */}
          <div className="border-t border-rule py-6 lg:border-t-0 lg:px-8" aria-live="polite">
            <h2 className="text-[15px] font-bold">2. The check</h2>
            <div key={selected.id} className="trace-in mt-5">
              <p className="text-[14px] text-graphite">{selected.field}</p>
              <p className="annot mt-1 text-lg font-semibold leading-snug">{selected.text}</p>
              <p className="mt-4 leading-relaxed">{selected.rule}</p>
              {selected.message ? (
                <div className="mt-4 border-l-2 border-mark pl-4">
                  <p className="text-[13px] text-graphite">Reported by the code</p>
                  <p className="mt-1 font-mono text-[14px] leading-relaxed">{selected.message}</p>
                  <p className="mt-1 font-mono text-[13px] text-graphite">{selected.code}</p>
                </div>
              ) : (
                <p className="mt-4 border-l-2 border-pass pl-4 text-[15px] text-graphite">
                  No issue reported for this value.
                </p>
              )}
              <p className="mt-5">
                <span className={`inline-block rounded-sm px-2 py-0.5 text-[14px] font-semibold ${outcomeTone[selected.outcome]}`}>
                  {outcomeLabel[selected.outcome]}
                </span>
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-graphite">{selected.result}</p>
            </div>
          </div>

          {/* 3. Result */}
          <div className="border-t border-rule py-6 lg:border-t-0 lg:pl-8">
            <h2 className="text-[15px] font-bold">3. What reached the database</h2>
            <ul className="mt-5 space-y-1.5 text-[15px]">
              {accepted.map((t) => (
                <li key={t.id} className="grid grid-cols-[1rem_1fr] gap-x-2">
                  <span className="text-pass" aria-hidden>
                    ✓
                  </span>
                  {pick(t, t.field === "Dietary tags" || t.field === "Also called" ? "font-mono text-[14px]" : "")}
                </li>
              ))}
            </ul>
            <h3 className="mt-7 text-[15px] font-bold">Exception record</h3>
            <p className="mt-1 text-[14px] text-graphite">Kept for a person to review. Nothing is silently dropped.</p>
            <ul className="mt-3 space-y-1.5">
              {exceptions.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    aria-pressed={t.id === selectedId}
                    onClick={() => setSelectedId(t.id)}
                    className={`rounded-sm text-left font-mono text-[14px] hover:underline ${
                      t.id === selectedId ? "annot bg-mark-soft" : "text-graphite"
                    }`}
                  >
                    {t.code}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
