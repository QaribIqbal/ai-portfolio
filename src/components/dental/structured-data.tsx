import { DENTAL_INSTAGRAM_URL, brandHome, dentalFaqs, dentalOffer } from "@/lib/dental-content";
import { SITE_URL } from "@/lib/seo";
import { siteConfig } from "@/lib/site-content";

export function JsonLd({ data }: { data: object }) {
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

type Faq = { question: string; answer: string };

export function DentalFaqJsonLd({ faqs = dentalFaqs }: { faqs?: Faq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}

const PERSON_ID = `${SITE_URL}/#qarib-iqbal`;

export function PersonJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": PERSON_ID,
        name: siteConfig.name,
        url: SITE_URL,
        email: siteConfig.email,
        jobTitle: "Missed-call and lost-patient recovery for Australian dental clinics",
        knowsAbout: [
          "Missed-call text-back",
          "Dental patient reactivation",
          "Health fund extras reset campaigns",
          "SMS rules for Australian dental clinics",
        ],
        sameAs: [DENTAL_INSTAGRAM_URL, siteConfig.linkedin],
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
        })),
      }}
    />
  );
}

export function LocalServiceJsonLd({ city, state, path }: { city: string; state: string; path: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Missed-call recovery for dental clinics in ${city}`,
        serviceType: "Missed-call text-back and patient reactivation",
        url: `${SITE_URL}${path}`,
        provider: { "@id": PERSON_ID, "@type": "Person", name: siteConfig.name },
        areaServed: {
          "@type": "City",
          name: city,
          containedInPlace: { "@type": "State", name: state, containedInPlace: { "@type": "Country", name: "Australia" } },
        },
        audience: { "@type": "BusinessAudience", audienceType: "Dental clinics" },
        offers: { "@type": "Offer", price: "490", priceCurrency: "AUD", name: dentalOffer.heading },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  path,
  published,
}: {
  title: string;
  description: string;
  path: string;
  published: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `${SITE_URL}${path}`,
        mainEntityOfPage: `${SITE_URL}${path}`,
        datePublished: published,
        dateModified: published,
        inLanguage: "en-AU",
        author: { "@id": PERSON_ID, "@type": "Person", name: siteConfig.name, url: SITE_URL },
        publisher: { "@id": PERSON_ID, "@type": "Person", name: siteConfig.name },
      }}
    />
  );
}
