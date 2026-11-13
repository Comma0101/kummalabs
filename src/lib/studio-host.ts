// Host-based routing: kummalabs.com serves the KummaLabs studio pages under src/app/studio;
// every other host (kota.kummalabs.com, localhost, Vercel previews) keeps the KOTA site.
// Kept dependency-free so `node --test` can import it directly.

const STUDIO_HOSTS = new Set(["kummalabs.com", "www.kummalabs.com", "studio.localhost"]);

export function isStudioHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const name = host.trim().toLowerCase().replace(/:\d+$/, "");
  return STUDIO_HOSTS.has(name);
}

export function studioPath(pathname: string): string {
  return pathname === "/" ? "/studio" : `/studio${pathname}`;
}

export function isStaticFile(pathname: string): boolean {
  return /\.[a-z0-9]+$/i.test(pathname);
}
