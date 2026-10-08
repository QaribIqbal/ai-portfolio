import type { Metadata } from "next";

export const SITE_URL = "https://qaribiqbal.netlify.app";

const baseTitle = "Qarib Iqbal";
const baseDescription =
  "AI automation for marketing agencies that want faster lead follow-up, automated reporting, cleaner onboarding, and less repetitive operational work.";

const defaultKeywords = [
  "AI automation for marketing agencies",
  "agency automation consultant",
  "marketing agency workflow automation",
  "AI systems for agencies",
  "automate lead follow-up for agencies",
  "agency reporting automation",
];

export function buildMetadata({
  title,
  description = baseDescription,
  path,
  keywords = defaultKeywords,
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${baseTitle}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      ...(path ? { url: path } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export const defaultMetadata = buildMetadata({
  title: "AI Automation for Marketing Agencies",
});
