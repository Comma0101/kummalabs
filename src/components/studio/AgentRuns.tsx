"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

type Status = "done" | "asked" | "approval" | "standby";

type Step = { status: Status; title: string; detail: string };

type Run = {
  id: string;
  tab: string;
  provenance: string;
  input: { label: string; text: string };
  steps: Step[];
  result: { title: string; rows: [string, string][] };
};

// Every run is labeled with where it comes from. Only "Inbox" is illustrative (shown last); the others
// describe behavior verified in our own code (KOTA, the outreach pipeline) with synthetic data.
const runs: Run[] = [
  {
    id: "documents",
    tab: "Documents",
    provenance: "From KOTA’s menu onboarding pipeline. Synthetic menu.",
    input: { label: "Input", text: "Three photos of a printed menu with English and Chinese item names." },
    steps: [
      { status: "done", title: "Extracted the menu", detail: "Sections, items, prices, and required options as structured data." },
      { status: "asked", title: "Removed an unsupported claim", detail: "A suggested pairing named a dish that isn’t on the menu. It was removed and flagged." },
      { status: "done", title: "Refined the descriptions", detail: "Items, options, and prices were not allowed to change." },
      { status: "done", title: "Validated the result", detail: "Schema and coverage checks passed." },
      { status: "done", title: "Loaded into the menu database", detail: "Ready for the phone agent to answer from." },
    ],
    result: {
      title: "Result in the menu database",
      rows: [
        ["Menu", "Sections, items, options, and prices"],
        ["Review", "Flagged issues listed for a person to check"],
      ],
    },
  },
  {
    id: "leads",
    tab: "Leads",
    provenance: "From our outreach pipeline, an internal tool we built. Synthetic lead.",
    input: { label: "New lead", text: "A dental practice with a website and no contact name." },
    steps: [
      { status: "done", title: "Checked the opt-out list", detail: "Not on it, so the lead was accepted." },
      { status: "done", title: "Read the practice’s website", detail: "Services and contact details, from the public site." },
      { status: "asked", title: "A claim was blocked", detail: "The draft promised calendar booking. The rule check rejected it because the product can’t back it." },
      { status: "approval", title: "A person approved the redraft", detail: "Nothing is sent without a person approving it." },
      { status: "done", title: "Sent within the daily limit", detail: "The send step enforces the cap and refuses duplicates." },
    ],
    result: {
      title: "Result in the lead database",
      rows: [
        ["Lead", "Message approved and sent"],
        ["On file", "Draft, approval, and the claim list it was checked against"],
      ],
    },
  },
  {
    id: "phone",
    tab: "Phone",
    provenance: "From KOTA, our bilingual phone-ordering prototype. Synthetic call.",
    input: { label: "Caller", text: "“Can I get two beef noodle soups and a jasmine tea?”" },
    steps: [
      { status: "done", title: "Checked the menu database", detail: "Both items found. Prices come from the database, not the model." },
      { status: "asked", title: "A required choice was missing", detail: "Asked: thin or wide noodles? The caller chose wide." },
      { status: "done", title: "Confirmed before adding", detail: "Read the item and its options back. The caller said yes." },
      { status: "done", title: "Saved the order and texted a confirmation", detail: "Said “I texted you” only after the SMS was accepted." },
      { status: "standby", title: "Hand-off to staff", detail: "Available any time by pressing 0. Not needed on this call." },
    ],
    result: {
      title: "Result in the order database",
      rows: [
        ["Items", "2 × beef noodle soup (wide), 1 × jasmine tea"],
        ["Status", "Placed, confirmation sent"],
      ],
    },
  },
  {
    id: "inbox",
    tab: "Inbox",
    provenance: "Illustrative example of an agent we’d build. Synthetic email, not client work.",
    input: {
      label: "Customer email",
      text: "“Can you quote 40 branded mugs for an event on the 18th? Same logo as last time.”",
    },
    steps: [
      { status: "done", title: "Read the request", detail: "40 mugs, branded, needed by the 18th, repeat customer." },
      { status: "done", title: "Found the customer in the CRM", detail: "Previous order and logo file on record." },
      { status: "done", title: "Priced it from your price list", detail: "Quantity pricing came from the product table, not the model." },
      { status: "asked", title: "A detail was missing", detail: "No delivery address on file, so the reply asks for one." },
      { status: "approval", title: "Reply drafted for approval", detail: "A person reviews it and clicks send." },
    ],
    result: {
      title: "Result in the CRM",
      rows: [
        ["Deal", "40 branded mugs, quote drafted"],
        ["Status", "Waiting for approval"],
      ],
    },
  },
];

const statusLabel: Record<Status, string> = {
  done: "Done",
  asked: "Needed attention",
  approval: "Waiting on a person",
  standby: "Standing by",
};

function Mark({ status }: { status: Status }) {
  if (status === "done") {
    return (
      <span className="grid size-6 place-items-center rounded-full bg-pass text-paper" aria-hidden>
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (status === "asked") {
    return (
      <span
        className="grid size-6 place-items-center rounded-full bg-hold-soft text-[13px] font-bold text-hold ring-1 ring-hold/50"
        aria-hidden
      >
        !
      </span>
    );
  }
  if (status === "approval") {
    return (
      <span className="grid size-6 place-items-center rounded-full bg-paper text-ink ring-2 ring-ink" aria-hidden>
        <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
          <circle cx="8" cy="5.2" r="2.6" />
          <path d="M3 13.5c0-2.8 2.2-4.6 5-4.6s5 1.8 5 4.6z" />
        </svg>
      </span>
    );
  }
  return <span className="size-6 rounded-full border-2 border-dashed border-graphite/50" aria-hidden />;
}

export function AgentRuns() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const run = runs[active];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowRight: (active + 1) % runs.length,
      ArrowLeft: (active - 1 + runs.length) % runs.length,
      Home: 0,
      End: runs.length - 1,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <figure className="rounded-lg border border-rule bg-sheet">
      <div
        role="tablist"
        aria-label="Example agent runs"
        onKeyDown={onKeyDown}
        className="flex gap-1 border-b border-rule px-2 pt-3 sm:px-3"
      >
        {runs.map((r, i) => {
          const selected = i === active;
          return (
            <button
              key={r.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`run-tab-${r.id}`}
              aria-selected={selected}
              aria-controls={`run-panel-${r.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`-mb-px whitespace-nowrap rounded-t-md border px-2.5 py-2 text-[15px] font-semibold sm:px-3.5 ${
                selected
                  ? "border-rule border-b-sheet bg-sheet text-ink"
                  : "border-transparent text-graphite hover:text-ink"
              }`}
            >
              {r.tab}
            </button>
          );
        })}
      </div>

      <div key={run.id} role="tabpanel" id={`run-panel-${run.id}`} aria-labelledby={`run-tab-${run.id}`}>
        <figcaption className="px-5 pt-4 text-[14px] leading-snug text-graphite">{run.provenance}</figcaption>

        <div className="px-5 pt-4">
          <p className="text-[15px] text-graphite">{run.input.label}</p>
          <p className="mt-1 text-lg leading-snug">{run.input.text}</p>
        </div>

        <ol className="mt-4 px-5 pb-2">
          {run.steps.map((step, i) => (
            <li
              key={step.title}
              className="run-step relative grid grid-cols-[1.5rem_1fr] gap-x-3 pb-4"
              style={{ "--i": i } as CSSProperties}
            >
              {i < run.steps.length - 1 && (
                <span className="absolute bottom-0 left-[11px] top-7 w-px bg-rule" aria-hidden />
              )}
              <Mark status={step.status} />
              <div>
                <p className="font-semibold leading-6">
                  {step.title}
                  <span className="sr-only"> ({statusLabel[step.status]})</span>
                </p>
                <p className="text-[15px] leading-snug text-graphite">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div
          className="run-step mx-5 mb-5 rounded-md border border-pass/40 bg-pass-soft px-4 py-3"
          style={{ "--i": run.steps.length } as CSSProperties}
        >
          <p className="text-[14px] font-semibold text-pass">{run.result.title}</p>
          <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 text-[15px]">
            {run.result.rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-graphite">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </figure>
  );
}
