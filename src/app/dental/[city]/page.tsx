import { notFound } from "next/navigation";

import { AreasServed } from "@/components/dental/areas-served";
import { DentalAuditForm } from "@/components/dental/dental-audit-form";
import { FaqGrid, FinalCta, LandingHero, OfferCard, StatSpotlight, StepsTimeline } from "@/components/dental/landing";
import { StickyAuditCta } from "@/components/dental/sticky-audit-cta";
import { BreadcrumbJsonLd, DentalFaqJsonLd, LocalServiceJsonLd } from "@/components/dental/structured-data";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { auLocations, buildLocationFaqs, describeLocalTime, getLocation } from "@/lib/au-locations";
import { brandHome, dentalFaqs, dentalHero } from "@/lib/dental-content";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return auLocations.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({ params }: Params) {
  const location = getLocation((await params).city);
  if (!location) return {};

  return buildMetadata({
    title: `Missed-Call Recovery for Dental Clinics in ${location.city}`,
    description: `Missed-call text-back and patient reactivation for dental clinics in ${location.city}, ${location.stateCode}. Free Missed-Call Leak Audit until 6 November 2026 and a fixed-price AUD 490 campaign.`,
    path: `/dental/${location.slug}`,
    keywords: [
      `missed call text back dental ${location.city}`,
      `dental patient reactivation ${location.city}`,
      `dental clinic SMS ${location.city}`,
      `dentist missed calls ${location.stateCode}`,
    ],
  });
}

export default async function DentalCityPage({ params }: Params) {
  const location = getLocation((await params).city);
  if (!location) notFound();

  const path = `/dental/${location.slug}`;
  const faqs = [...buildLocationFaqs(location), ...dentalFaqs];

  return (
    <div className="dental-page">
      <SiteHeader />

      <main id="main">
        <nav className="lp-shell lp-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/dental">Dental clinics</a>{" "}
          <span aria-hidden="true">/</span> <span aria-current="page">{location.city}</span>
        </nav>

        <LandingHero
          headingId="city-hero-title"
          eyebrow={`${location.city}, ${location.stateCode}`}
          note={brandHome.freeNote}
          title={
            <>
              Missed-call recovery for dental clinics in{" "}
              <span className="lp-highlight">{location.city}.</span>
            </>
          }
          lede={`For ${location.city} practices: a 60-second SMS text-back for the calls your front desk can't reach, plus a patient reactivation campaign before health-fund extras reset on 31 December.`}
          primary={{ href: "#audit", label: dentalHero.primaryCta }}
          secondary={{ href: "#offer", label: dentalHero.secondaryCta }}
        />

        <StatSpotlight />

        <section className="lp-section" aria-labelledby="city-time-title">
          <div className="lp-shell">
            <p className="lp-eyebrow">Local hours</p>
            <h2 id="city-time-title" className="lp-h2">
              Set to {location.city} time, not someone else&apos;s
            </h2>
            <p className="lp-body">{describeLocalTime(location)}</p>
          </div>
        </section>

        <OfferCard id="offer" ctaHref="#audit" />
        <StepsTimeline headingId="city-steps-title" />

        <section id="audit" data-sticky-cta-hide className="lp-form-section" aria-labelledby="city-audit-title">
          <div className="lp-shell">
            <div className="lp-form-card">
              <p className="lp-eyebrow">Free until 6 November 2026</p>
              <h2 id="city-audit-title" className="lp-h2">
                {dentalHero.primaryCta}
              </h2>
              <DentalAuditForm />
            </div>
          </div>
        </section>

        <FaqGrid headingId="city-faq-title" faqs={faqs} heading={`Questions from ${location.city} practice owners`} />
        <AreasServed currentSlug={location.slug} />
        <FinalCta auditHref="#audit" />
      </main>

      <SiteFooter />
      <StickyAuditCta href="#audit" />
      <LocalServiceJsonLd city={location.city} state={location.state} path={path} />
      <DentalFaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Dental clinics", path: "/dental" },
          { name: location.city, path },
        ]}
      />
    </div>
  );
}
