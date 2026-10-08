import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

const routes = ["/", "/dental", "/agencies", "/case-studies", "/checklist", "/contact", "/services", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    changeFrequency: "monthly",
    priority: route === "/" || route === "/dental" ? 1 : 0.5,
  }));
}
