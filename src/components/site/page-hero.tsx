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
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            level={1}
            className="max-w-[56rem]"
          />
          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {primaryCta ? (
                <ButtonLink href={primaryCta.href} className="max-sm:w-full">
                  {primaryCta.label}
                </ButtonLink>
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
