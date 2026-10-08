import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/__forms.html"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/", "/__forms.html"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
