import type { MetadataRoute } from "next";
import { STUDIO_URL } from "@/lib/studio-site";

// Studio pages only; served on kummalabs.com.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${STUDIO_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${STUDIO_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${STUDIO_URL}/services/integration`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${STUDIO_URL}/work/menu-validation`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${STUDIO_URL}/work/kota`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
