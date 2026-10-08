import { Check } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/site/button-link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  highlights?: string[];
  audience?: "agencies" | "dental";
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  highlights,
  audience,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-inner">
        <p className="page-hero-pill">
          <span aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="page-hero-title">{title}</h1>
        <p className="page-hero-description">{description}</p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {primaryCta ? (
              <ButtonLink href={primaryCta.href} className="max-sm:w-full">
                {primaryCta.label}
              </ButtonLink>
            ) : null}
            {secondaryCta ? (
              <ButtonLink href={secondaryCta.href} variant="secondary" className="max-sm:w-full">
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        )}
        {highlights?.length ? (
          <ul className="page-hero-chips" aria-label="At a glance">
            {highlights.map((item) => (
              <li key={item}>
                <Check className="h-4 w-4" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {audience === "agencies" ? (
          <p className="page-hero-audience">
            This page is for marketing agencies. Run a dental clinic?{" "}
            <Link href="/dental">See missed-call recovery for dental clinics →</Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
