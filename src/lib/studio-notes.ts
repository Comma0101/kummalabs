// Engineering notes on the studio site (/notes). Each entry has a page at
// src/app/studio/notes/<slug>/page.tsx; tests/studio-notes.test.mjs checks the two stay in step.
// Kept dependency-free so `node --test` can import it directly.

export type Note = {
  slug: string;
  /** The headline shown on the page and in the list. */
  title: string;
  /** Search and share title: says what the page answers in plain terms. */
  searchTitle: string;
  summary: string;
  /** ISO date the note was written and its evidence recorded. */
  date: string;
  /** One line on where the evidence comes from, shown in the list. */
  basis: string;
};

export const notes: Note[] = [
  {
    slug: "keep-the-menu-out-of-the-prompt",
    title: "The agent offered desserts that don’t exist: keeping facts out of the prompt",
    searchTitle: "Voice agent making up menu items or prices? Keep the menu behind tools, not in the prompt",
    summary:
      "Our ordering agent’s prompt has no menu and no prices. Every fact comes from a tool. It still offered a dessert list that doesn’t exist, because one tool answered with an empty list. Here is the design, what went wrong, and the fix.",
    date: "2026-11-13",
    basis: "Typed conversations with a Retell agent in English and Mandarin, and tests of the ordering rules",
  },
  {
    slug: "verify-retell-signature-nextjs",
    title: "The tool URL is public: checking Retell’s signature in a Next.js route",
    searchTitle: "Verify X-Retell-Signature in a Next.js route handler: raw body, replay window, and tests",
    summary:
      "A custom function is a URL on the public internet. If it places orders or books appointments, so can anyone who finds it, unless every request is checked. Here is the check we run in a Next.js route, the mistakes that make it fail, and a script to test your own endpoint.",
    date: "2026-11-13",
    basis: "Unit tests, forged requests sent to the route, and Retell’s own calls to our deployed endpoint",
  },
  {
    slug: "agent-said-confirmed-nothing-saved",
    title: "The agent said “confirmed”. The database had nothing.",
    searchTitle: "When an AI agent confirms an order that was never saved: causes and a fix",
    summary:
      "We forced a database write to fail in our own phone-ordering prototype. The agent confirmed the order anyway and texted the caller. Here is why, how the rebuilt version behaves, and how to check your own agent.",
    date: "2026-11-12",
    basis: "A diagnostic of our own prototype, and tests of the backend we rebuilt afterwards",
  },
  {
    slug: "duplicate-tool-calls",
    title: "One request, five bookings: making agent tool calls safe to repeat",
    searchTitle: "Duplicate bookings from repeated AI agent tool calls: an idempotent fix with Postgres",
    summary:
      "Agents repeat tool calls. Callers say yes twice, turns get retried, and platforms resend webhooks. If the tool inserts a record every time, you get duplicates. The fix belongs in the database, not in the prompt.",
    date: "2026-11-12",
    basis: "Storage tests against Postgres, including ten simultaneous requests for one call",
  },
];

export function notePath(slug: string): string {
  return `/notes/${slug}`;
}

export function getNote(slug: string): Note {
  const note = notes.find((n) => n.slug === slug);
  if (!note) throw new Error(`Unknown note: ${slug}`);
  return note;
}

/** "2026-11-12" → "November 12, 2026", without depending on the server's time zone. */
export function formatNoteDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[month - 1]} ${day}, ${year}`;
}
