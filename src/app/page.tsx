import Link from "next/link";

import { FinalCtaBand, OfferDetails, ProblemStrip, StepsList } from "@/components/dental/dental-sections";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { brandHome, dentalHero } from "@/lib/dental-content";
import { buildMetadata } from "@/lib/seo";

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

      <main>
        <section className="dental-shell dental-hero" aria-labelledby="home-hero-title">
          <p className="dental-eyebrow">{brandHome.eyebrow}</p>
          <h1 id="home-hero-title" className="dental-hero-line">
            {brandHome.headlineLead}
            <span>{brandHome.headlineKey}</span>
            {brandHome.headlineTail}
          </h1>
          <div className="dental-hero-actions">
            <Link href="/dental#audit" className="dental-cta">
              {dentalHero.primaryCta}
            </Link>
            <Link href="/dental#offer" className="dental-text-link">
              See the 31 December reactivation campaign
            </Link>
          </div>
          <p className="dental-form-note">{brandHome.freeNote}</p>
        </section>

        <ProblemStrip />

        <section className="dental-shell dental-section" aria-labelledby="home-offer-title">
          <h2 id="home-offer-title">{brandHome.offerHeading}</h2>
          <OfferDetails />
          <p className="dental-body" style={{ marginTop: "1rem" }}>
            <Link href="/dental#offer" className="dental-text-link">
              {brandHome.offerLink}
            </Link>
          </p>
        </section>

        <section className="dental-shell dental-section" aria-labelledby="home-steps-title">
          <h2 id="home-steps-title">How it works</h2>
          <StepsList headingId="home-steps-title" />
        </section>

        <section className="dental-shell dental-section" aria-labelledby="home-agencies-title">
          <div className="dental-card">
            <h2 id="home-agencies-title" className="dental-card-heading">
              {brandHome.agencies.heading}
            </h2>
            <p className="dental-body">{brandHome.agencies.body}</p>
            <p className="dental-body" style={{ marginTop: "1rem" }}>
              <Link href="/agencies" className="dental-text-link">
                {brandHome.agencies.link} →
              </Link>
            </p>
          </div>
        </section>

        <FinalCtaBand auditHref="/dental#audit" />
      </main>

      <SiteFooter />
    </div>
  );
}
