"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MIN_FILL_MS } from "@/lib/brief";
import { REPLY_DAYS } from "@/lib/studio-offer";
import { INQUIRY_MAILTO, STUDIO_EMAIL } from "@/lib/studio-site";
import { readFirstTouch } from "@/lib/first-touch";

type State = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-paper/30 bg-paper/5 px-3 py-2.5 text-paper placeholder:text-paper/40 focus:border-paper focus:outline-none focus:ring-2 focus:ring-paper/40";

export function BriefForm() {
  const [state, setState] = useState<State>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const openedAt = useRef<number | null>(null);
  const source = useRef<Record<string, string>>({});
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    openedAt.current = performance.now();
    // Where the visitor first arrived (landing page, utm tags, outside referrer) plus the page the form is on.
    source.current = { ...readFirstTouch(), path: window.location.pathname };
  }, []);

  useEffect(() => {
    if (state === "sent" || state === "error") statusRef.current?.focus();
  }, [state]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const data = new FormData(e.currentTarget);
    const start = openedAt.current ?? performance.now();
    setState("sending");
    setFieldErrors({});
    try {
      // A visitor who pastes a prepared brief can submit before the minimum interval.
      const remaining = MIN_FILL_MS - (performance.now() - start);
      if (remaining > 0) {
        await new Promise<void>((resolve) => window.setTimeout(resolve, Math.ceil(remaining)));
      }
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          today: data.get("today"),
          result: data.get("result"),
          systems: data.get("systems"),
          timeline: data.get("timeline"),
          website: data.get("website"),
          elapsedMs: Math.max(MIN_FILL_MS, Math.round(performance.now() - start)),
          source: source.current,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body?.ok === true) {
        setState("sent");
      } else {
        setFieldErrors(body?.fields ?? {});
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-lg border border-paper/30 bg-paper/5 p-6 outline-none">
        <h3 className="text-xl font-bold">Brief sent</h3>
        <p className="mt-2 leading-relaxed text-paper/80">
          We’ll email you with questions or a proposed scope within {REPLY_DAYS} business days.
        </p>
      </div>
    );
  }

  const hasFieldErrors = Object.keys(fieldErrors).length > 0;
  const err = (name: string) =>
    fieldErrors[name] ? (
      <p id={`${name}-error`} className="mt-1 text-[14px] text-hold-soft">
        {fieldErrors[name]}
      </p>
    ) : null;
  const aria = (name: string) => ({
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="brief-email" className="font-semibold">
          Your email
        </label>
        <input id="brief-email" name="email" type="email" autoComplete="email" required className={fieldClass} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="brief-today" className="font-semibold">
          What happens today, and where does it get stuck?
        </label>
        <textarea id="brief-today" name="today" rows={4} required maxLength={5000} className={fieldClass} {...aria("today")} />
        {err("today")}
      </div>
      <div>
        <label htmlFor="brief-result" className="font-semibold">
          What would a good result look like?
        </label>
        <textarea id="brief-result" name="result" rows={3} required maxLength={5000} className={fieldClass} {...aria("result")} />
        {err("result")}
      </div>
      <div>
        <label htmlFor="brief-systems" className="font-semibold">
          Tools and systems involved <span className="font-normal text-paper/60">(optional)</span>
        </label>
        <input id="brief-systems" name="systems" maxLength={500} placeholder="For example: Gmail, HubSpot, a Postgres database" className={fieldClass} {...aria("systems")} />
        {err("systems")}
      </div>
      <div>
        <label htmlFor="brief-timeline" className="font-semibold">
          Deadline and budget range <span className="font-normal text-paper/60">(optional)</span>
        </label>
        <input id="brief-timeline" name="timeline" maxLength={500} className={fieldClass} {...aria("timeline")} />
        {err("timeline")}
      </div>
      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="brief-website">Website</label>
        <input id="brief-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-[14px] leading-relaxed text-paper/70">
        Please don’t include passwords, API keys, or your customers’ personal data. We use what you
        send only to reply about your project.
      </p>

      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-full bg-paper px-5 py-3 font-semibold text-ink hover:bg-paper/90 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send brief"}
      </button>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state === "error" && (
          <p className="rounded-md border border-hold-soft/60 bg-paper/5 px-4 py-3 leading-relaxed">
            {hasFieldErrors
              ? fieldErrors.form ?? "The brief wasn’t sent. Fix the fields marked above and send it again."
              : "The brief wasn’t sent because of a problem on our side. Nothing was lost on this page. Try again, or "}
            {!hasFieldErrors && (
              <a href={INQUIRY_MAILTO} className="link">
                email {STUDIO_EMAIL}
              </a>
            )}
            {!hasFieldErrors && "."}
          </p>
        )}
      </div>
    </form>
  );
}
