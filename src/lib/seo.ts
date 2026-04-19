import type { Metadata } from "next";

const baseTitle = "Qarib Iqbal";
const baseDescription =
  "AI automation for marketing agencies that want faster lead follow-up, automated reporting, cleaner onboarding, and less repetitive operational work.";

const keywords = [
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
}: {
  title: string;
  description?: string;
}): Metadata {
  const fullTitle = `${title} | ${baseTitle}`;

  return {
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
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
