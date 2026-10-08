import Link from "next/link";

import { AreasServed } from "@/components/dental/areas-served";
import { FaqGrid, FinalCta, LandingHero, OfferCard, StatSpotlight, StepsTimeline } from "@/components/dental/landing";
import { LeakCheck } from "@/components/dental/leak-check";
import { StickyAuditCta } from "@/components/dental/sticky-audit-cta";
import { DentalServiceJsonLd, PersonJsonLd } from "@/components/dental/structured-data";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { brandHome, dentalHero } from "@/lib/dental-content";
import { buildMetadata } from "@/lib/seo";

const AUDIT_HREF = "/dental#audit";

export const metadata = buildMetadata({
  title: brandHome.meta.title,
  description: brandHome.meta.description,
  path: "/",
  keywords: [
    "missed call text back dental clinic",
    "dental patient reactivation Australia",
    "dental clinic lost patient recovery",
    "health fund extras reset campaign",
  ],
});

export default function HomePage() {
  return (
    <div className="dental-page">
      <SiteHeader />

      <main id="main">
        <LandingHero
          headingId="home-hero-title"
          longTitle
          eyebrow={brandHome.eyebrow}
          note={brandHome.freeNote}
          title={
            <>
              {brandHome.headlineLead}
              <span className="lp-highlight">{brandHome.headlineKey}</span>
              {brandHome.headlineTail}
            </>
          }
          primary={{ href: AUDIT_HREF, label: dentalHero.primaryCta }}
          secondary={{ href: "/dental#offer", label: "See the 31 December reactivation campaign" }}
        />

        <StatSpotlight />
        <LeakCheck auditHref={AUDIT_HREF} />
        <StepsTimeline headingId="home-steps-title" />
        <OfferCard ctaHref={AUDIT_HREF} />
        <FaqGrid headingId="home-faq-title" />

        <section className="lp-section" aria-labelledby="home-agencies-title">
          <div className="lp-shell">
            <div className="lp-leak">
              <h2 id="home-agencies-title" className="lp-h2">
                {brandHome.agencies.heading}
              </h2>
              <p className="lp-body">{brandHome.agencies.body}</p>
              <p className="lp-body" style={{ marginTop: "1.25rem" }}>
                <Link href="/agencies" className="lp-link">
                  {brandHome.agencies.link} →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <AreasServed />
        <FinalCta auditHref={AUDIT_HREF} />
      </main>

      <SiteFooter />
      <StickyAuditCta href={AUDIT_HREF} />
      <DentalServiceJsonLd />
      <PersonJsonLd />
    </div>
  );
}
