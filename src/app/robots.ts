import type { MetadataRoute } from "next";
import { STUDIO_URL } from "@/lib/studio-site";

// Served on kummalabs.com (the middleware passes /robots.txt through on the studio host).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${STUDIO_URL}/sitemap.xml` };
}
