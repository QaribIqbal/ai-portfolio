import { BarChart3, CalendarCheck, Check, PhoneMissed, Search, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  DENTAL_INSTAGRAM_URL,
  dentalFaqs,
  dentalFinalCta,
  dentalIllustration,
  dentalOffer,
  dentalOfferBullets,
  dentalProblems,
  dentalStat,
  dentalSteps,
  dentalTrustChips,
} from "@/lib/dental-content";

import "./dental.css";

export function LandingHero({
  headingId,
  eyebrow,
  title,
  lede,
  note,
  primary,
  secondary,
  longTitle = false,
}: {
  headingId: string;
  longTitle?: boolean;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  note: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section className="lp-hero" data-sticky-cta-hide-after aria-labelledby={headingId}>
      <div className="lp-shell lp-hero-grid">
        <div className="lp-hero-copy">
          <p className="lp-pill">
            <span className="lp-pill-dot" aria-hidden="true" />
            {note}
          </p>
          <p className="lp-eyebrow">{eyebrow}</p>
          <h1 id={headingId} className={longTitle ? "lp-hero-title lp-hero-title-long" : "lp-hero-title"}>
            {title}
          </h1>
          {lede ? <p className="lp-lede">{lede}</p> : null}
          <div className="lp-actions">
            <Link href={primary.href} className="lp-cta lp-cta-glow">
              {primary.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={secondary.href} className="lp-link">
              {secondary.label}
            </Link>
          </div>
          <TrustChips />
        </div>
        <PhoneIllustration />
      </div>
    </section>
  );
}

function TrustChips() {
  return (
    <ul className="lp-chips" aria-label="What you can expect">
      {dentalTrustChips.map((chip) => (
        <li key={chip}>
          <Check className="h-4 w-4" aria-hidden="true" />
          {chip}
        </li>
      ))}
    </ul>
  );
}

function PhoneIllustration() {
  return (
    <figure className="lp-phone-wrap" aria-label={dentalIllustration.label}>
      <div className="lp-phone">
        <div className="lp-phone-notch" aria-hidden="true" />
        <div className="lp-call">
          <span className="lp-call-icon">
            <PhoneMissed className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>
            <strong>{dentalIllustration.missedCall}</strong>
            <small>{dentalIllustration.missedCallDetail}</small>
          </span>
        </div>
        <ol className="lp-thread">
          {dentalIllustration.messages.map((message, index) => (
            <li
              key={message.text}
              className={message.from === "clinic" ? "lp-bubble lp-bubble-out" : "lp-bubble lp-bubble-in"}
              style={{ animationDelay: `${0.6 + index * 0.9}s` }}
            >
              {message.text}
            </li>
          ))}
        </ol>
        <p className="lp-booked" style={{ animationDelay: "3.4s" }}>
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          {dentalIllustration.footer}
        </p>
      </div>
      <figcaption className="lp-caption">{dentalIllustration.label}</figcaption>
    </figure>
  );
}

export function StatSpotlight() {
  const [, ...otherProblems] = dentalProblems;

  return (
    <section className="lp-stat-band" aria-labelledby="lp-stat-title">
      <div className="lp-shell lp-stat-grid">
        <div className="lp-reveal">
          <p className="lp-stat-number" id="lp-stat-title">
            {dentalStat.value}
          </p>
          <p className="lp-stat-label">{dentalStat.label}</p>
          <p className="lp-stat-source">{dentalStat.source}</p>
        </div>
        <ul className="lp-stat-list">
          {otherProblems.map((problem) => (
            <li key={problem} className="lp-reveal">
              {problem}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const stepIcons = [Search, Wrench, BarChart3];

export function StepsTimeline({ headingId }: { headingId: string }) {
  return (
    <section className="lp-section" aria-labelledby={headingId}>
      <div className="lp-shell">
        <p className="lp-eyebrow">How it works</p>
        <h2 id={headingId} className="lp-h2">
          Three steps. Nothing new for your team to learn.
        </h2>
        <ol className="lp-steps">
          {dentalSteps.map((step, index) => {
            const Icon = stepIcons[index] ?? Check;
            return (
              <li key={step.title} className="lp-step lp-reveal">
                <span className="lp-step-icon">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="lp-step-index">Step {index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description.charAt(0).toUpperCase() + step.description.slice(1)}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function OfferCard({ id, ctaHref }: { id?: string; ctaHref: string }) {
  return (
    <section id={id} className="lp-light" aria-labelledby="lp-offer-title">
      <div className="lp-shell lp-offer-grid">
        <div className="lp-reveal">
          <p className="lp-eyebrow lp-eyebrow-dark">The offer</p>
          <h2 id="lp-offer-title" className="lp-h2">
            {dentalOffer.heading}
          </h2>
          <p className="lp-body">{dentalOffer.what}</p>
          <ul className="lp-checklist">
            {dentalOfferBullets.map((bullet) => (
              <li key={bullet}>
                <Check className="h-5 w-5" aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div className="lp-price-card lp-reveal">
          <p className="lp-price-tag">Pilot campaign</p>
          <p className="lp-price">
            <span className="lp-price-currency">AUD</span> 490
          </p>
          <p className="lp-price-sub">{dentalOffer.price}</p>
          <Link href={ctaHref} className="lp-cta lp-cta-block">
            Start with the free Leak Audit
          </Link>
          <p className="lp-price-ongoing">{dentalOffer.ongoing}</p>
          <div className="lp-guarantee">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            <p>{dentalOffer.guarantee}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqGrid({
  headingId,
  faqs = dentalFaqs,
  heading = "Questions practice owners ask",
}: {
  headingId: string;
  faqs?: { question: string; answer: string }[];
  heading?: string;
}) {
  return (
    <section className="lp-section" aria-labelledby={headingId}>
      <div className="lp-shell">
        <p className="lp-eyebrow">FAQ</p>
        <h2 id={headingId} className="lp-h2">
          {heading}
        </h2>
        <div className="lp-faq">
          {faqs.map((faq) => (
            <article key={faq.question} className="lp-faq-item lp-reveal">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ auditHref }: { auditHref: string }) {
  return (
    <section className="lp-final" data-sticky-cta-hide aria-labelledby="lp-final-title">
      <div className="lp-shell lp-final-inner">
        <h2 id="lp-final-title" className="lp-h2">
          {dentalFinalCta.heading}
        </h2>
        <Link href={auditHref} className="lp-cta lp-cta-glow">
          {dentalFinalCta.button}
          <span aria-hidden="true">→</span>
        </Link>
        <a href={DENTAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="lp-link">
          {dentalFinalCta.instagramLink}
        </a>
      </div>
    </section>
  );
}
