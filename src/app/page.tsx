import { CheckCircle2 } from "lucide-react";

import { ButtonLink } from "@/components/site/button-link";
import { LeadCaptureForm } from "@/components/site/lead-capture-form";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  beforeAfterExamples,
  checklistHighlights,
  homeProblems,
  processSteps,
  proofAuditIncludes,
  proofDeliverables,
  proofSprintIncludes,
  services,
  siteConfig,
} from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Automation for Marketing Agencies",
  description:
    "Qarib Iqbal helps lean marketing agencies eliminate manual follow-up, reporting, onboarding, and repetitive ops with practical AI automation systems.",
});

export default function HomePage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        <section className="page-section section-slice section-slice-hero pt-20 sm:pt-28">
          <div className="shell">
            <div className="hero-panel">
              <p className="section-eyebrow">AI Automation for Marketing Agencies</p>
              <h1 className="display-title max-w-[17ch] text-balance">
                I help marketing agencies eliminate manual follow-up, reporting, and repetitive ops
                with AI automation.
              </h1>
              <p className="mt-6 max-w-[60ch] text-[1.08rem] leading-8 text-[color:var(--text-muted)] sm:text-[1.14rem]">
                Practical systems for lean agency teams that want cleaner workflows, faster response
                times, and less manual admin.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <ButtonLink href="/checklist" className="max-sm:w-full" trackingEvent="hero_checklist_click">
                  {siteConfig.primaryCta}
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" trackingEvent="hero_audit_click">
                  {siteConfig.secondaryCta}
                </ButtonLink>
              </div>
              <p className="mt-5 max-w-[54ch] text-sm leading-7 text-[color:var(--text-subtle)]">
                {siteConfig.shortCredibility}
              </p>
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-problem" id="problem">
          <div className="shell">
            <SectionHeading
              eyebrow="Problem"
              title="Where lean agencies usually lose time and momentum"
              description="If these issues feel familiar, your systems are probably ready for cleanup."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {homeProblems.map((problem) => (
                <article key={problem} className="panel">
                  <p className="text-[1rem] leading-7 text-[color:var(--text-muted)]">{problem}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-services" id="services">
          <div className="shell">
            <SectionHeading
              eyebrow="Services"
              title="What I fix inside agency operations"
              description="Focused, operational services built around one bottleneck at a time."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {services.map((service) => (
                <article key={service.title} className="panel">
                  <h3 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-7 text-[color:var(--text-muted)]">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                        <span className="text-sm leading-7 text-[color:var(--text-muted)]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-proof" id="proof">
          <div className="shell">
            <SectionHeading
              eyebrow="Proof"
              title="What trust looks like before and during delivery"
              description="No fake logos. No made-up case studies. Clear scope, clear process, clear deliverables."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <article className="panel">
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                  What the audit includes
                </h3>
                <ul className="mt-5 space-y-3">
                  {proofAuditIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                      <span className="text-sm leading-7 text-[color:var(--text-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="panel">
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                  What a sprint includes
                </h3>
                <ul className="mt-5 space-y-3">
                  {proofSprintIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                      <span className="text-sm leading-7 text-[color:var(--text-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="panel">
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                  Example deliverables
                </h3>
                <ul className="mt-5 space-y-3">
                  {proofDeliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                      <span className="text-sm leading-7 text-[color:var(--text-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <article className="panel">
                <p className="section-eyebrow">Before / After Example</p>
                <div className="space-y-5">
                  {beforeAfterExamples.map((example) => (
                    <div key={example.before} className="subtle-card">
                      <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">Before</p>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{example.before}</p>
                      <p className="mt-4 text-xs uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">After</p>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{example.after}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel">
                <p className="section-eyebrow">Risk Reduction</p>
                <div className="space-y-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  <p>Clear scope is agreed before implementation starts.</p>
                  <p>Delivery is fixed around one bottleneck at a time.</p>
                  <p>You get implementation plus handoff support.</p>
                  <p>Direct communication stays open throughout the sprint.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-process" id="process">
          <div className="shell">
            <SectionHeading
              eyebrow="Process"
              title="Simple 4-step process"
              description="Diagnosis first. Build second."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {processSteps.map((step, index) => (
                <article key={step.title} className="panel">
                  <p className="section-eyebrow">Step {index + 1}</p>
                  <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-resource" id="checklist">
          <div className="shell">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionHeading
                  eyebrow="Primary CTA"
                  title="Get the Free Agency AI Automation Checklist"
                  description="This is the fastest way to identify what to automate first and avoid fixing the wrong workflow."
                />
                <div className="mt-6 space-y-3">
                  {checklistHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                      <p className="text-sm leading-7 text-[color:var(--text-muted)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <LeadCaptureForm />
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-final pt-0">
          <div className="shell">
            <div className="hero-panel">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="section-eyebrow">Final CTA</p>
                  <h2 className="max-w-[18ch] text-balance font-[family:var(--font-display)] text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[1] tracking-[-0.05em] text-[color:var(--text-main)]">
                    If your agency is still too manual, start with the checklist.
                  </h2>
                  <p className="mt-4 max-w-[58ch] text-[1rem] leading-7 text-[color:var(--text-muted)]">
                    If you already know the bottleneck, book a free audit and we will map the next
                    step.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:flex-col">
                  <ButtonLink href="/checklist" className="max-sm:w-full" trackingEvent="final_checklist_click">
                    {siteConfig.primaryCta}
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="secondary" trackingEvent="final_audit_click">
                    {siteConfig.secondaryCta}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
