import type { Metadata } from "next";

export const SITE_URL = "https://qaribiqbal.netlify.app";

const baseTitle = "Qarib Iqbal";
const baseDescription =
  "Missed-call text-back and patient reactivation for Australian dental clinics. Fixed-price AUD 490 campaign and a free Missed-Call Leak Audit until 6 November 2026.";

const defaultKeywords = [
  "missed call text back dental clinic",
  "dental patient reactivation Australia",
  "dental clinic lost patient recovery",
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
  title: "Missed-Call Recovery for Australian Dental Clinics",
  path: "/",
});
