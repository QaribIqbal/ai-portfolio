import type { MetadataRoute } from "next";

import { auLocations } from "@/lib/au-locations";
import { dentalGuides } from "@/lib/dental-guides";
import { SITE_URL } from "@/lib/seo";

const coreRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/dental", priority: 1 },
  { path: "/dental/guides", priority: 0.7 },
  { path: "/agencies", priority: 0.5 },
  { path: "/case-studies", priority: 0.4 },
  { path: "/checklist", priority: 0.4 },
  { path: "/contact", priority: 0.4 },
  { path: "/services", priority: 0.3 },
  { path: "/about", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

  return [
    ...coreRoutes.map(({ path, priority }) => ({ url: toUrl(path), changeFrequency: "monthly" as const, priority })),
    ...auLocations.map((location) => ({
      url: toUrl(`/dental/${location.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...dentalGuides.map((guide) => ({
      url: toUrl(`/dental/guides/${guide.slug}`),
      lastModified: guide.published,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
