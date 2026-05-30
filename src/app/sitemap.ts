import type { MetadataRoute } from "next";

import { SITE, SITE_ROUTES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_ROUTES.map((path) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
