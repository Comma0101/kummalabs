"use client";

import { useEffect, useState } from "react";

type Order = { reference: string; call: string; lines: string[]; total: string; at: string };
type Event = { call: string; tool: string; ok: boolean; summary: string; at: string };
type Feed = { available: boolean; orders: Order[]; events: Event[] };

const time = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export function DemoFeed() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let stopped = false;
    async function load() {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/demo/orders", { cache: "no-store" });
        const data = (await res.json()) as Feed;
        if (!stopped) {
          setFeed(data);
          setFailed(false);
        }
      } catch {
        if (!stopped) setFailed(true);
      }
    }
    load();
    const id = setInterval(load, 5000);
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, []);

  if (failed && !feed) return <p className="text-graphite">The order feed couldn’t be loaded. Reload the page to try again.</p>;
  if (!feed) return <p className="text-graphite">Loading the latest orders…</p>;
  if (!feed.available) return <p className="text-graphite">The demo database isn’t connected right now, so there is nothing to show.</p>;

  return (
    <div className="grid gap-12 lg:grid-cols-2" aria-live="polite">
      <div>
        <h3 className="text-lg font-bold">Latest orders in the database</h3>
        {feed.orders.length === 0 ? (
          <p className="mt-3 text-graphite">No orders yet. Call the line and yours will appear here.</p>
        ) : (
          <ul className="mt-4 border-t border-ink">
            {feed.orders.map((o) => (
              <li key={o.reference} className="border-b border-rule py-4">
                <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-mono text-[15px] font-medium">Order {o.reference}</span>
                  <span className="text-[14px] text-graphite">{time(o.at)}</span>
                </p>
                <ul className="mt-2 space-y-0.5 text-[15px]">
                  {o.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <p className="mt-2 text-[15px]">
                  <span className="text-graphite">Total before tax </span>
                  <span className="font-semibold">{o.total}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold">What the agent asked the backend to do</h3>
        {feed.events.length === 0 ? (
          <p className="mt-3 text-graphite">Nothing yet.</p>
        ) : (
          <ol className="mt-4 space-y-1.5 border-l-2 border-mark pl-5 font-mono text-[13px] leading-relaxed">
            {feed.events.slice(0, 18).map((e, i) => (
              <li key={`${e.at}-${i}`} className={e.ok ? "" : "text-mark"}>
                <span className="text-graphite">call …{e.call}</span> {e.tool}: {e.summary}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
