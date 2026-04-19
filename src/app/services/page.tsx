import { CheckCircle2 } from "lucide-react";

import { ButtonLink } from "@/components/site/button-link";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { services, siteConfig, trustStrip } from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Explore Qarib Iqbal's AI automation services for marketing agencies, from lead follow-up and reporting to onboarding, workflow design, and internal AI systems.",
});

export default function ServicesPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Services"
          title="AI automation services built specifically for marketing agencies."
          description="This is AI automation for marketing agencies, not generic AI consulting. Each service is designed around the operational bottlenecks agencies feel most: lead follow-up, reporting, onboarding, repetitive admin work, and disconnected systems."
          primaryCta={{ href: "/checklist#lead-capture-form", label: siteConfig.primaryCta }}
          secondaryCta={{ href: siteConfig.calendly, label: siteConfig.secondaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell grid gap-5">
            {services.map((service) => (
              <article key={service.title} className="panel service-panel">
                <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-9">
                  <div className="service-copy-col">
                    <h2 className="max-w-[18ch] text-[clamp(1.85rem,2.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[color:var(--text-main)]">
                      {service.title}
                    </h2>
                    <p className="mt-5 max-w-[58ch] text-[1.04rem] leading-8 text-[color:var(--text-muted)]">
                      {service.description}
                    </p>
                    <p className="mt-8 text-[0.95rem] leading-8 text-[color:var(--text-subtle)]">
                      {service.fit}
                    </p>
                  </div>

                  <div className="service-insight-grid">
                    <div className="subtle-card service-insight-card">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                        What It Includes
                      </h3>
                      <ul className="mt-5 space-y-4">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2
                              className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                              aria-hidden="true"
                            />
                            <span className="text-[0.98rem] leading-8 text-[color:var(--text-muted)]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="subtle-card service-insight-card">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                        Problems It Solves
                      </h3>
                      <ul className="mt-5 space-y-4">
                        {service.problems.map((item) => (
                          <li key={item} className="text-[0.98rem] leading-8 text-[color:var(--text-muted)]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="subtle-card service-insight-card">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                        Outcomes
                      </h3>
                      <ul className="mt-5 space-y-4">
                        {service.outcomes.map((item) => (
                          <li key={item} className="text-[0.98rem] leading-8 text-[color:var(--text-muted)]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" id="packaging">
          <div className="shell">
            <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
              <article className="panel">
                <p className="section-eyebrow">Service Packaging</p>
                <h2 className="text-[clamp(1.85rem,2.9vw,3rem)] font-semibold tracking-[-0.045em] text-[color:var(--text-main)]">
                  Start with diagnosis, move into a fixed-scope sprint, and extend only after the
                  first automation is live.
                </h2>
                <p className="mt-4 max-w-[60ch] text-[1rem] leading-7 text-[color:var(--text-muted)]">
                  The work is designed to feel specific, scoped, low-risk, and professionally
                  managed. Results, reliability, communication, speed, and professionalism matter
                  more than technical complexity.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {trustStrip.map((item) => (
                    <span key={item} className="metric-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>

              <div className="grid gap-5">
                <article className="panel">
                  <h3 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                    Free Automation Audit
                  </h3>
                  <p className="mt-4 text-[1rem] leading-7 text-[color:var(--text-muted)]">
                    A focused diagnostic for identifying the workflow bottleneck most worth fixing
                    first, not a generic discovery chat.
                  </p>
                </article>

                <article className="panel panel-featured" id="automation-sprint">
                  <h3 className="text-[1.75rem] font-semibold tracking-[-0.045em] text-[color:var(--text-main)]">
                    Fixed-Scope AI Automation Sprint (2 to 4 weeks)
                  </h3>
                  <p className="mt-4 text-[1rem] leading-7 text-[color:var(--text-muted)]">
                    This is the main paid offer: one clear operational bottleneck, one scoped
                    solution, one defined timeline, and one professional implementation process.
                  </p>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div className="subtle-card">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                        Scoped Before Build
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {[
                          "One clear operational bottleneck",
                          "Defined workflow and agreed sprint scope",
                          "Timeline, handoff, revisions, and support window set before implementation",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2
                              className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                              aria-hidden="true"
                            />
                            <span className="text-sm leading-7 text-[color:var(--text-muted)]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="subtle-card">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                        Included In The Sprint
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {[
                          "Workflow design, implementation, testing, and handoff",
                          "Weekly progress updates and fast communication throughout the build",
                          "Revisions during handoff and short post-launch support",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2
                              className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                              aria-hidden="true"
                            />
                            <span className="text-sm leading-7 text-[color:var(--text-muted)]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-6 max-w-[62ch] text-sm leading-7 text-[color:var(--text-subtle)]">
                    If something inside the agreed scope is not working as specified at handoff, it
                    gets fixed before sign-off. The promise is a clear process and dependable
                    implementation, not exaggerated outcome guarantees.
                  </p>
                </article>

                <article className="panel">
                  <h3 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                    Ongoing Optimization Support / Retainer
                  </h3>
                  <p className="mt-4 text-[1rem] leading-7 text-[color:var(--text-muted)]">
                    Available after the sprint for agencies that want to refine, maintain, or extend
                    the first automation once it is live.
                  </p>
                </article>
              </div>
            </div>

            <div className="mt-10">
              <ButtonLink href={siteConfig.calendly}>{siteConfig.secondaryCta}</ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
