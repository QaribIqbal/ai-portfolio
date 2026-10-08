import { DentalAuditForm } from "@/components/dental/dental-audit-form";
import { FinalCtaBand, OfferDetails, ProblemStrip, StepsList } from "@/components/dental/dental-sections";
import { DentalFaqJsonLd, DentalServiceJsonLd } from "@/components/dental/structured-data";
import { StickyAuditCta } from "@/components/dental/sticky-audit-cta";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  DENTAL_DEMO_VIDEO_URL,
  dentalDemoTitle,
  dentalFaqs,
  dentalHero,
  dentalMeta,
  dentalOffer,
} from "@/lib/dental-content";
import { buildMetadata } from "@/lib/seo";

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
        <section className="dental-shell dental-hero" data-sticky-cta-hide-after aria-labelledby="dental-hero-title">
          <h1 id="dental-hero-title">{dentalHero.title}</h1>
          <p className="dental-lede">{dentalHero.subtitle}</p>
          <div className="dental-hero-actions">
            <a href="#audit" className="dental-cta">
              {dentalHero.primaryCta}
            </a>
            <a href="#offer" className="dental-text-link">
              {dentalHero.secondaryCta}
            </a>
          </div>
        </section>

        <ProblemStrip />

        <section id="offer" className="dental-shell dental-section" aria-labelledby="dental-offer-title">
          <h2 id="dental-offer-title">{dentalOffer.heading}</h2>
          <OfferDetails />
        </section>

        <section className="dental-shell dental-section" aria-labelledby="dental-steps-title">
          <h2 id="dental-steps-title">How it works</h2>
          <StepsList headingId="dental-steps-title" />
        </section>

        {DENTAL_DEMO_VIDEO_URL ? (
          <section id="demo" className="dental-shell dental-section" aria-labelledby="dental-demo-title">
            <h2 id="dental-demo-title">Demo</h2>
            <div className="dental-video">
              <iframe
                src={DENTAL_DEMO_VIDEO_URL}
                title={dentalDemoTitle}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        ) : null}

        <section id="audit" data-sticky-cta-hide className="dental-shell dental-section" aria-labelledby="dental-audit-title">
          <h2 id="dental-audit-title">{dentalHero.primaryCta}</h2>
          <DentalAuditForm />
        </section>

        <section className="dental-shell dental-section" aria-labelledby="dental-faq-title">
          <h2 id="dental-faq-title">FAQ</h2>
          <div className="dental-faq">
            {dentalFaqs.map((faq) => (
              <article key={faq.question} className="dental-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <FinalCtaBand auditHref="#audit" />
      </main>

      <SiteFooter />
      <StickyAuditCta href="#audit" />
      <DentalServiceJsonLd />
      <DentalFaqJsonLd />
    </div>
  );
}
