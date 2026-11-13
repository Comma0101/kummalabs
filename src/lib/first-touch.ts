// Where a visitor first arrived in this tab: the landing page, any utm_* tags, and the outside
// referrer. Kept in sessionStorage (no cookie, nothing sent anywhere) and attached to a project
// brief only if the visitor submits one, so we can tell which page or post produced it.
// `describeVisit` is pure so `node --test` can check it.

export const FIRST_TOUCH_KEY = "kl_first_touch";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export type Visit = Partial<Record<"landing" | "referrer" | (typeof UTM_KEYS)[number], string>>;

export function describeVisit(search: string, pathname: string, referrer: string, origin: string): Visit {
  const visit: Visit = { landing: pathname };
  const params = new URLSearchParams(search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) visit[key] = value;
  }
  // A referrer from our own site says nothing about where the visitor came from.
  if (referrer && !referrer.startsWith(`${origin}/`) && referrer !== origin) visit.referrer = referrer;
  return visit;
}

/** Returns the stored first visit for this tab, recording the current page as the first if none is stored. */
export function readFirstTouch(): Visit {
  if (typeof window === "undefined") return {};
  const current = describeVisit(window.location.search, window.location.pathname, document.referrer, window.location.origin);
  try {
    const stored = window.sessionStorage.getItem(FIRST_TOUCH_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (parsed && typeof parsed === "object" && typeof (parsed as Visit).landing === "string") return parsed as Visit;
    }
    window.sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(current));
  } catch {
    // Storage can be blocked (private windows, strict settings). Fall back to this page.
  }
  return current;
}
