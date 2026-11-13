// Tells IndexNow search engines (Bing and others that share submissions) which pages exist,
// so new pages are crawled in hours instead of whenever a crawler next visits.
// Run after a deploy that adds or changes pages:  node scripts/seo/indexnow.mjs
// Add --dry-run to print the request without sending it.
// The key is not a secret: it is published at https://www.kummalabs.com/<key>.txt to prove we own the host.
const HOST = "www.kummalabs.com";
const KEY = "4c4bdc73f119770b2968ba93bb4b97fc";
const dryRun = process.argv.includes("--dry-run");

const sitemap = await fetch(`https://${HOST}/sitemap.xml`);
if (!sitemap.ok) throw new Error(`sitemap: HTTP ${sitemap.status}`);
const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error("sitemap has no URLs");

const keyFile = await fetch(`https://${HOST}/${KEY}.txt`);
if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) {
  throw new Error("the key file is not live yet; deploy first");
}

const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList };
if (dryRun) {
  console.log(JSON.stringify(body, null, 2));
} else {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200: received. 202: received, key check pending. 403: key file not found. 422: URL not on this host.
  console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
  if (!res.ok) process.exitCode = 1;
}
