import type { MetadataRoute } from "next";
import { STUDIO_URL } from "@/lib/studio-site";
import { notePath, notes } from "@/lib/studio-notes";

// Studio pages only; served on kummalabs.com.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${STUDIO_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${STUDIO_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${STUDIO_URL}/services/integration`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${STUDIO_URL}/services/retell`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${STUDIO_URL}/agencies`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${STUDIO_URL}/work/sample-diagnostic`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${STUDIO_URL}/work/menu-validation`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${STUDIO_URL}/work/kota`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${STUDIO_URL}/notes`, changeFrequency: "weekly", priority: 0.8 },
    ...notes.map((n) => ({
      url: `${STUDIO_URL}${notePath(n.slug)}`,
      lastModified: n.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
