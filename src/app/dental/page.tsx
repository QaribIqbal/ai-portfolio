import { DentalAuditForm } from "@/components/dental/dental-audit-form";
import { AreasServed } from "@/components/dental/areas-served";
import { FaqGrid, FinalCta, LandingHero, OfferCard, StatSpotlight, StepsTimeline } from "@/components/dental/landing";
import { LeakCheck } from "@/components/dental/leak-check";
import { StickyAuditCta } from "@/components/dental/sticky-audit-cta";
import { DentalFaqJsonLd, DentalServiceJsonLd } from "@/components/dental/structured-data";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { DENTAL_DEMO_VIDEO_URL, brandHome, dentalDemoTitle, dentalHero, dentalMeta } from "@/lib/dental-content";
import { buildMetadata } from "@/lib/seo";

const AUDIT_HREF = "#audit";

export const metadata = buildMetadata({
  title: dentalMeta.title,
  description: dentalMeta.description,
  path: "/dental",
  keywords: [
    "dental missed call text back",
    "dental patient reactivation Australia",
    "health fund extras reset campaign",
    "dental clinic SMS automation",
  ],
});

export default function DentalPage() {
  return (
    <div className="dental-page">
      <SiteHeader />

      <main id="main">
        <LandingHero
          headingId="dental-hero-title"
          eyebrow="For Australian dental clinics"
          note={brandHome.freeNote}
          title={
            <>
              Missed calls become <span className="lp-highlight">booked appointments.</span>
            </>
          }
          lede={dentalHero.subtitle}
          primary={{ href: AUDIT_HREF, label: dentalHero.primaryCta }}
          secondary={{ href: "#offer", label: dentalHero.secondaryCta }}
        />

        <StatSpotlight />
        <OfferCard id="offer" ctaHref={AUDIT_HREF} />
        <StepsTimeline headingId="dental-steps-title" />
        <LeakCheck auditHref={AUDIT_HREF} />

        {DENTAL_DEMO_VIDEO_URL ? (
          <section id="demo" className="lp-section" aria-labelledby="dental-demo-title">
            <div className="lp-shell">
              <p className="lp-eyebrow">Demo</p>
              <h2 id="dental-demo-title" className="lp-h2">
                {dentalDemoTitle}
              </h2>
              <div className="dental-video">
                <iframe
                  src={DENTAL_DEMO_VIDEO_URL}
                  title={dentalDemoTitle}
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        ) : null}

        <section id="audit" data-sticky-cta-hide className="lp-form-section" aria-labelledby="dental-audit-title">
          <div className="lp-shell">
            <div className="lp-form-card">
              <p className="lp-eyebrow">Free until 6 November 2026</p>
              <h2 id="dental-audit-title" className="lp-h2">
                {dentalHero.primaryCta}
              </h2>
              <DentalAuditForm />
            </div>
          </div>
        </section>

        <FaqGrid headingId="dental-faq-title" />
        <AreasServed />
        <FinalCta auditHref={AUDIT_HREF} />
      </main>

      <SiteFooter />
      <StickyAuditCta href={AUDIT_HREF} />
      <DentalServiceJsonLd />
      <DentalFaqJsonLd />
    </div>
  );
}
