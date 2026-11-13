// Validation for the studio project-brief form. Pure and dependency-free so `node --test`
// can import it directly. Submitted text is untrusted: validate, limit, and escape it.

export type BriefSource = Partial<Record<(typeof SOURCE_KEYS)[number], string>>;

export type Brief = {
  email: string;
  today: string;
  result: string;
  systems: string;
  timeline: string;
  source: BriefSource;
};

export type BriefResult =
  | { ok: true; spam: boolean; brief: Brief }
  | { ok: false; spam: false; errors: Record<string, string> };

const SOURCE_KEYS = ["utm_source", "utm_medium", "utm_campaign", "referrer", "path"] as const;
const MAX_LONG = 5000;
const MAX_SHORT = 500;
const MIN_FILL_MS = 3000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function validateBrief(input: unknown, now: number): BriefResult {
  if (!input || typeof input !== "object") {
    return { ok: false, spam: false, errors: { form: "Invalid request." } };
  }
  const raw = input as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const email = text(raw.email).toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) errors.email = "Enter an email address we can reply to.";

  const today = text(raw.today);
  if (!today) errors.today = "Describe what happens today.";
  else if (today.length > MAX_LONG) errors.today = `Keep this under ${MAX_LONG} characters.`;

  const result = text(raw.result);
  if (!result) errors.result = "Describe the result you want.";
  else if (result.length > MAX_LONG) errors.result = `Keep this under ${MAX_LONG} characters.`;

  const systems = text(raw.systems);
  if (systems.length > MAX_SHORT) errors.systems = `Keep this under ${MAX_SHORT} characters.`;

  const timeline = text(raw.timeline);
  if (timeline.length > MAX_SHORT) errors.timeline = `Keep this under ${MAX_SHORT} characters.`;

  if (Object.keys(errors).length > 0) return { ok: false, spam: false, errors };

  const source: BriefSource = {};
  if (raw.source && typeof raw.source === "object") {
    for (const key of SOURCE_KEYS) {
      const value = text((raw.source as Record<string, unknown>)[key]).slice(0, 200);
      if (value) source[key] = value;
    }
  }

  // Bots fill the hidden field or submit instantly. Treated as spam: accepted silently, never sent.
  const startedAt = typeof raw.startedAt === "number" ? raw.startedAt : NaN;
  const spam = text(raw.website) !== "" || !(now - startedAt >= MIN_FILL_MS);

  return { ok: true, spam, brief: { email, today, result, systems, timeline, source } };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
