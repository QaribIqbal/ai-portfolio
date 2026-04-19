import { ButtonLink } from "@/components/site/button-link";
import { SectionHeading } from "@/components/site/section-heading";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="page-section pt-24 sm:pt-32">
      <div className="shell">
        <div className="hero-panel">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--line)] pt-8 sm:flex-row">
              {primaryCta ? (
                <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
              ) : null}
              {secondaryCta ? (
                <ButtonLink href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
