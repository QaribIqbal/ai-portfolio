import { ButtonLink } from "@/components/site/button-link";
import { FeaturedCaseStudy } from "@/components/site/featured-case-study";
import { PageHero } from "@/components/site/page-hero";
import { ProjectEvidenceGrid } from "@/components/site/project-evidence-grid";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buildMetadata } from "@/lib/seo";
import { featuredSolutionStudies, projectEvidence, siteConfig } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "AI Automation Demos & Solution Studies",
  description:
    "Watch Qarib Iqbal and TechBees AI automation demos for real-estate lead response, agency reporting, WhatsApp, email, onboarding, and SEO workflows.",
  path: "/case-studies",
});

const proofTypes = [
  {
    label: "Live demo",
    description: "A watchable demonstration of the system or product in operation.",
  },
  {
    label: "Solution build",
    description: "An implemented automation with build evidence available to inspect.",
  },
  {
    label: "Workflow blueprint",
    description: "A documented system design ready to customize around a real process.",
  },
  {
    label: "Verified result",
    description: "Reserved for an attributable outcome with evidence and publication approval.",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Qarib Iqbal / Proof of Work"
          title="Watch the systems. Inspect the workflows. Decide from evidence."
          description="Every item is labeled by what can actually be verified. No generated testimonials, borrowed credibility, or unsupported performance claims."
          primaryCta={{ href: "/contact", label: siteConfig.primaryCta }}
          secondaryCta={{ href: "/checklist", label: siteConfig.secondaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell">
            <div className="proof-taxonomy" aria-label="Proof label definitions">
              {proofTypes.map((type, index) => (
                <article key={type.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{type.label}</h2>
                  <p>{type.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-proof pt-0">
          <div className="shell">
            <div className="evidence-section-heading evidence-section-heading-wide">
              <p className="section-eyebrow">Featured TechBees solution studies</p>
              <h2>Two markets. One standard: show the system before selling the promise.</h2>
            </div>

            <div className="featured-studies">
              {featuredSolutionStudies.map((study, index) => (
                <FeaturedCaseStudy key={study.slug} study={study} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="page-section section-slice">
          <div className="shell">
            <div className="evidence-section-heading evidence-section-heading-wide">
              <p className="section-eyebrow">Complete project evidence</p>
              <h2>Voice, WhatsApp, email, reporting, SEO, qualification, and onboarding.</h2>
              <p>
                Potential impact — not a claimed client result. Demonstrated capabilities and
                expected improvements depend on the starting process, data, tools, and final scope.
              </p>
            </div>

            <ProjectEvidenceGrid projects={projectEvidence} />

            <div className="evidence-cta">
              <div>
                <p className="section-eyebrow">Bring the ugly workflow</p>
                <h2>We will identify the smallest useful system worth building first.</h2>
              </div>
              <ButtonLink href="/contact" trackingEvent="case_studies_audit_click">
                {siteConfig.primaryCta}
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
