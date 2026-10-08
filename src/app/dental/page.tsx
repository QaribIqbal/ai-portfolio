import Link from "next/link";

import { DentalAuditForm } from "@/components/dental/dental-audit-form";
import {
  DENTAL_DEMO_VIDEO_URL,
  DENTAL_INSTAGRAM_URL,
  dentalDemoPlaceholder,
  dentalFaqs,
  dentalFinalCta,
  dentalHero,
  dentalMeta,
  dentalOffer,
  dentalProblems,
  dentalSteps,
} from "@/lib/dental-content";
import { siteConfig } from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

import "./dental.css";

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
      <header className="dental-shell dental-header">
        <Link href="/" className="dental-brand">
          {siteConfig.name}
        </Link>
      </header>

      <main>
        <section className="dental-shell dental-hero" aria-labelledby="dental-hero-title">
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

        <section className="dental-problems" aria-label="Why calls and patients leak">
          <ul className="dental-shell">
            {dentalProblems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </section>

        <section id="offer" className="dental-shell dental-section" aria-labelledby="dental-offer-title">
          <h2 id="dental-offer-title">{dentalOffer.heading}</h2>
          <p className="dental-body">{dentalOffer.what}</p>
          <div className="dental-card dental-price">
            <p className="dental-price-main">{dentalOffer.price}</p>
            <p>{dentalOffer.ongoing}</p>
          </div>
          <p className="dental-guarantee">{dentalOffer.guarantee}</p>
        </section>

        <section className="dental-shell dental-section" aria-labelledby="dental-steps-title">
          <h2 id="dental-steps-title">How it works</h2>
          <ol className="dental-steps">
            {dentalSteps.map((step, index) => (
              <li key={step.title} className="dental-card">
                <span className="dental-step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <p>
                  <strong>{step.title}</strong> — {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="demo" className="dental-shell dental-section" aria-labelledby="dental-demo-title">
          <h2 id="dental-demo-title">Demo</h2>
          <div className="dental-video">
            {DENTAL_DEMO_VIDEO_URL ? (
              <iframe
                src={DENTAL_DEMO_VIDEO_URL}
                title={dentalDemoPlaceholder.replace(" Recording in progress.", "")}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p className="dental-video-placeholder">{dentalDemoPlaceholder}</p>
            )}
          </div>
        </section>

        <section id="audit" className="dental-shell dental-section" aria-labelledby="dental-audit-title">
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

        <section className="dental-final" aria-labelledby="dental-final-title">
          <div className="dental-shell">
            <h2 id="dental-final-title">{dentalFinalCta.heading}</h2>
            <a href="#audit" className="dental-cta">
              {dentalFinalCta.button}
            </a>
            <a href={DENTAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="dental-text-link">
              {dentalFinalCta.instagramLink}
            </a>
          </div>
        </section>
      </main>

      <footer className="dental-shell dental-footer">
        <Link href="/">{siteConfig.name}</Link>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </footer>
    </div>
  );
}
