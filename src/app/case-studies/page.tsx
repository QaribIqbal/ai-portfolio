import { ButtonLink } from "@/components/site/button-link";
import { PageInProgressBanner } from "@/components/site/page-in-progress-banner";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buildMetadata } from "@/lib/seo";
import { publishedCaseStudyTiles, siteConfig } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Selected automation case studies for lean marketing agencies delivered through focused sprint-based implementation.",
});

export default function CaseStudiesPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        {/* review: change-6 */}
        <PageInProgressBanner />
        <PageHero
          eyebrow="Case Studies"
          title="Workflow outcomes from focused implementation"
          description="Published examples show workflow bottlenecks, what was built, and the practical result after delivery."
          primaryCta={{ href: "/contact", label: siteConfig.primaryCta }}
          secondaryCta={{ href: "/checklist", label: siteConfig.secondaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell">
            {publishedCaseStudyTiles.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {publishedCaseStudyTiles.map((tile) => (
                  <article key={tile.clientType} className="panel">
                    <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--text-subtle)]">
                      {tile.clientType}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                      <strong className="text-[color:var(--text-main)]">Problem:</strong> {tile.problem}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                      <strong className="text-[color:var(--text-main)]">Built:</strong> {tile.built}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                      <strong className="text-[color:var(--text-main)]">Outcome:</strong> {tile.outcome}
                    </p>
                    {tile.sprintTag ? (
                      <p className="mt-3 text-xs uppercase tracking-[0.1em] text-[color:var(--accent)]">
                        {tile.sprintTag}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <article className="panel">
                {/* TODO: Replace placeholder case-study metric with real result */}
                <h2 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                  No public case studies yet
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--text-muted)]">
                  Public case-study outcomes are added only when client approval is available. If
                  you book an audit, I can walk you through anonymized workflow examples and the
                  sprint deliverables used in similar scenarios.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href="/contact" trackingEvent="case_studies_audit_click">
                    {siteConfig.primaryCta}
                  </ButtonLink>
                  <ButtonLink href="/checklist" variant="secondary" trackingEvent="case_studies_checklist_click">
                    {siteConfig.secondaryCta}
                  </ButtonLink>
                </div>
              </article>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
