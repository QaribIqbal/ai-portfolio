import Link from "next/link";

import {
  DENTAL_INSTAGRAM_URL,
  dentalFinalCta,
  dentalOffer,
  dentalProblems,
  dentalSteps,
} from "@/lib/dental-content";

import "./dental.css";

export function ProblemStrip() {
  return (
    <section className="dental-problems" aria-label="Why calls and patients leak">
      <ul className="dental-shell">
        {dentalProblems.map((problem) => (
          <li key={problem}>{problem}</li>
        ))}
      </ul>
    </section>
  );
}

export function OfferDetails() {
  return (
    <>
      <p className="dental-body">{dentalOffer.what}</p>
      <div className="dental-card dental-price">
        <p className="dental-price-main">{dentalOffer.price}</p>
        <p>{dentalOffer.ongoing}</p>
      </div>
      <p className="dental-guarantee">{dentalOffer.guarantee}</p>
    </>
  );
}

export function StepsList({ headingId }: { headingId: string }) {
  return (
    <ol className="dental-steps" aria-labelledby={headingId}>
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
  );
}

export function FinalCtaBand({ auditHref }: { auditHref: string }) {
  return (
    <section className="dental-final" data-sticky-cta-hide aria-labelledby="dental-final-title">
      <div className="dental-shell">
        <h2 id="dental-final-title">{dentalFinalCta.heading}</h2>
        <Link href={auditHref} className="dental-cta">
          {dentalFinalCta.button}
        </Link>
        <a href={DENTAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="dental-text-link">
          {dentalFinalCta.instagramLink}
        </a>
      </div>
    </section>
  );
}
