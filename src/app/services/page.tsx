import { CheckCircle2, ShieldCheck } from "lucide-react";

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
          description="This is not generic AI consulting. Each service is designed around the operational bottlenecks agencies feel most: lead follow-up, reporting, onboarding, repetitive admin work, and disconnected tools."
          primaryCta={{ href: "/checklist", label: siteConfig.primaryCta }}
          secondaryCta={{ href: "/contact", label: siteConfig.secondaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell">
            <div className="grid gap-5">
              {services.map((service) => (
                <article key={service.title} className="panel">
                  <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                      <p className="section-eyebrow">Core Service</p>
                      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-base leading-7 text-[color:var(--text-muted)]">
                        {service.description}
                      </p>
                      <p className="mt-6 text-sm leading-6 text-[color:var(--text-subtle)]">
                        {service.fit}
                      </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3 md:[&>*]:px-5 md:[&>*:not(:first-child)]:border-l md:[&>*:not(:first-child)]:border-[color:var(--line)] md:[&>*:first-child]:pl-0 md:[&>*:last-child]:pr-0">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
                          What It Includes
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {service.includes.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[color:var(--text-muted)]">
                              <CheckCircle2 className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
                          Problems It Solves
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {service.problems.map((item) => (
                            <li key={item} className="text-sm leading-6 text-[color:var(--text-muted)]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
                          Outcomes
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {service.outcomes.map((item) => (
                            <li key={item} className="text-sm leading-6 text-[color:var(--text-muted)]">
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
          </div>
        </section>

        <section className="page-section" id="packaging">
          <div className="shell">
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="panel">
                <p className="section-eyebrow">Service Packaging</p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                  Start with diagnosis, move into a fixed-scope sprint, then extend only if it makes sense.
                </h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {trustStrip.map((item) => (
                    <span key={item} className="metric-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                <article className="panel">
                  <p className="section-eyebrow">Step 1</p>
                  <h3 className="text-2xl font-semibold text-[color:var(--text-main)]">
                    Automation Audit
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[color:var(--text-muted)]">
                    A focused diagnostic to identify the workflow bottleneck most worth fixing first,
                    not a generic discovery chat.
                  </p>
                </article>

                <article className="panel border-[color:var(--accent)]" id="automation-sprint">
                  <p className="section-eyebrow">Main Paid Offer</p>
                  <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                    Fixed-Scope AI Automation Sprint (2 to 4 weeks)
                  </h3>
                  <div className="mt-6 grid gap-5 md:grid-cols-2 md:[&>*]:px-5 md:[&>*:not(:first-child)]:border-l md:[&>*:not(:first-child)]:border-[color:var(--line)] md:[&>*:first-child]:pl-0 md:[&>*:last-child]:pr-0">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
                        Scoped Before Build
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {[
                          "One clear operational bottleneck",
                          "Defined workflow and implementation scope",
                          "Agreed timeline, handoff, and support window",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[color:var(--text-muted)]">
                            <ShieldCheck className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
                        Included In The Sprint
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {[
                          "Workflow design, implementation, testing, and handoff",
                          "Weekly progress updates and fast communication during the build",
                          "Revisions during handoff and short post-launch support",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[color:var(--text-muted)]">
                            <CheckCircle2 className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-6 text-[color:var(--text-subtle)]">
                    If something inside the agreed scope is not working as specified at handoff, it gets
                    fixed before sign-off. The promise is a professional implementation process with clear
                    communication and dependable delivery, not exaggerated business guarantees.
                  </p>
                </article>

                <article className="panel">
                  <p className="section-eyebrow">After Launch</p>
                  <h3 className="text-2xl font-semibold text-[color:var(--text-main)]">
                    Ongoing Optimization Support
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[color:var(--text-muted)]">
                    Available after the sprint for agencies that want to maintain, refine, or extend the
                    first automation once it is live and being used day to day.
                  </p>
                </article>
              </div>
            </div>

            <div className="mt-10">
              <ButtonLink href="/contact">{siteConfig.secondaryCta}</ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
