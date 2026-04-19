import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { caseStudies, siteConfig } from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Example automation breakdowns showing how AI automation systems could improve lead follow-up, reporting, and onboarding inside marketing agencies.",
});

export default function CaseStudiesPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Case Studies"
          title="Example automation breakdowns for marketing agencies."
          description="These are clearly labeled sample workflow scenarios, not client case studies. They show the kinds of operational bottlenecks the work is designed to solve and what a believable improvement could look like."
          primaryCta={{ href: "/checklist", label: siteConfig.primaryCta }}
          secondaryCta={{ href: "/contact", label: siteConfig.secondaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell grid gap-5">
            {caseStudies.map((study, index) => (
              <article key={study.agencyType} className="panel">
                <p className="section-eyebrow">Sample Workflow Scenario {index + 1}</p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                  {study.agencyType}
                </h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:[&>*]:px-5 xl:[&>*:not(:first-child)]:border-l xl:[&>*:not(:first-child)]:border-[color:var(--line)] xl:[&>*:first-child]:pl-0 xl:[&>*:last-child]:pr-0">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
                      Operational Challenge
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
                      System To Build
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{study.system}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
                      Expected Improvement
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{study.improvement}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
                      Why It Matters
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{study.whyItMatters}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
