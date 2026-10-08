import { auLocations } from "@/lib/au-locations";
import { brandHome, dentalFaqs, dentalOffer, dentalSteps } from "@/lib/dental-content";
import { dentalGuides } from "@/lib/dental-guides";
import { SITE_URL } from "@/lib/seo";
import { siteConfig } from "@/lib/site-content";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${siteConfig.name}: Missed-Call Recovery for Australian Dental Clinics`,
    "",
    `> ${brandHome.meta.description}`,
    "",
    `${siteConfig.name} sets up missed-call text-back and patient reactivation for dental clinics in Australia. Campaigns run inside each clinic's existing phone and SMS tools, and patient data stays in the clinic.`,
    "",
    "## Offer",
    `- ${dentalOffer.price}`,
    `- ${dentalOffer.ongoing}`,
    `- ${dentalOffer.guarantee}`,
    "- The Missed-Call Leak Audit is free until 6 November 2026.",
    "",
    "## How it works",
    ...dentalSteps.map((step, index) => `${index + 1}. ${step.title}: ${step.description}`),
    "",
    "## Key pages",
    `- [Dental clinics](${SITE_URL}/dental): offer, how it works and the free audit form`,
    `- [Guides](${SITE_URL}/dental/guides): answers for Australian practice owners`,
    ...dentalGuides.map((guide) => `- [${guide.title}](${SITE_URL}/dental/guides/${guide.slug}): ${guide.shortAnswer}`),
    "",
    "## Locations served",
    ...auLocations.map((l) => `- [${l.city}, ${l.stateCode}](${SITE_URL}/dental/${l.slug})`),
    "",
    "## FAQ",
    ...dentalFaqs.map((faq) => `- ${faq.question} ${faq.answer}`),
    "",
    "## Contact",
    `- Email: ${siteConfig.email}`,
    `- Secondary service for marketing agencies: ${SITE_URL}/agencies`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
