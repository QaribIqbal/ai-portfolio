import { DENTAL_INSTAGRAM_URL, brandHome, dentalFaqs, dentalOffer } from "@/lib/dental-content";
import { SITE_URL } from "@/lib/seo";
import { siteConfig } from "@/lib/site-content";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function DentalServiceJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${siteConfig.name}: Missed-Call Recovery for Australian Dental Clinics`,
        url: SITE_URL,
        email: siteConfig.email,
        description: brandHome.meta.description,
        areaServed: { "@type": "Country", name: "Australia" },
        sameAs: [DENTAL_INSTAGRAM_URL, siteConfig.linkedin],
        makesOffer: [
          {
            "@type": "Offer",
            name: dentalOffer.heading,
            price: "490",
            priceCurrency: "AUD",
            url: `${SITE_URL}/dental#offer`,
          },
          {
            "@type": "Offer",
            name: "Missed-call text-back + monthly reactivation",
            priceCurrency: "AUD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "649",
              priceCurrency: "AUD",
              unitText: "MONTH",
            },
            url: `${SITE_URL}/dental#offer`,
          },
        ],
      }}
    />
  );
}

export function DentalFaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: dentalFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}
