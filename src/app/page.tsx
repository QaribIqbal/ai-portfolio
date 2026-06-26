import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/site/button-link";
import { GSAPReveal } from "@/components/site/gsap-reveal";
import { HeroAnimation, HeroTitle } from "@/components/site/hero-animation";
import { LeadCaptureForm } from "@/components/site/lead-capture-form";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  checklistHighlights,
  homeProblems,
  processSteps,
  publishedCaseStudyTiles,
  publishedQuoteStripEntries,
  publishedTestimonials,
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
    "Qarib Iqbal helps lean marketing agencies remove manual follow-up, reporting, onboarding, and handoff bottlenecks with practical automation systems.",
});

const flowSteps = [
  {
    label: "Find the leak",
    href: "#problem",
    description: "Scan the bottlenecks that usually drain agency time.",
  },
  {
    label: "Choose the workflow",
    href: "#services",
    description: "Pick the one manual process worth fixing first.",
  },
  {
    label: "See the sprint path",
    href: "#process",
    description: "Understand exactly how the audit becomes a working system.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        <section className="page-section section-slice section-slice-hero pt-16 sm:pt-20" id="hero" data-snap-section>
          <div className="shell">
            <div className="hero-panel">
              <HeroAnimation>
                <p className="section-eyebrow" data-hero-eyebrow>
                  AI Automation for Marketing Agencies
                </p>
                <HeroTitle />
                <p
                  className="mt-6 max-w-[62ch] text-[1.08rem] leading-8 text-[color:var(--text-muted)] sm:text-[1.14rem]"
                  data-hero-copy
                >
                  I run focused 21-Day Agency Automation Sprints that fix one expensive manual
                  workflow at a time, lead follow-up, reporting, onboarding, or internal handoffs, so
                  your team gets hours back without adding headcount.
                </p>
                {/* review: change-1 */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <ButtonLink
                    href="/contact"
                    className="hero-primary-cta max-[480px]:w-full"
                    trackingEvent="hero_audit_click"
                    data-hero-cta
                  >
                    Book Free Automation Audit
                  </ButtonLink>
                  <ButtonLink
                    href="/checklist"
                    variant="ghost"
                    className="hero-secondary-cta max-[480px]:w-full"
                    trackingEvent="hero_checklist_click"
                    data-hero-cta
                  >
                    Get the Agency AI Automation Checklist
                  </ButtonLink>
                </div>
                <p
                  className="mt-6 max-w-[54ch] text-sm leading-7 text-[color:var(--text-subtle)]"
                  data-hero-credibility
                >
                  {siteConfig.shortCredibility}
                </p>
                {/* review: change-5 */}
                <p className="capacity-note mt-3 max-w-[54ch]" data-hero-capacity>
                  Currently accepting 2 new sprint clients per month — next availability: June 2026.
                </p>
              </HeroAnimation>
              {/*
                LinkedIn traffic alignment:
                When sharing the website from LinkedIn Featured or banner,
                use: https://qaribiqbal.netlify.app/?utm_source=linkedin&utm_medium=profile&utm_campaign=checklist
                The site does not need to show UTM params to visitors —
                but analytics tools (Plausible, GA4) will capture them automatically.
              */}
            </div>
          </div>
        </section>

        <section className="flow-strip-section" aria-label="Recommended page path">
          <div className="shell">
            <GSAPReveal stagger>
              <div className="flow-strip">
                {flowSteps.map((step, index) => (
                  <Link key={step.href} href={step.href} className="flow-step" data-gsap-reveal>
                    <span className="flow-step-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flow-step-copy">
                      <span>{step.label}</span>
                      <span>{step.description}</span>
                    </span>
                  </Link>
                ))}
                <div className="flow-step flow-step-cta" data-gsap-reveal>
                  <span className="flow-step-index">04</span>
                  <span className="flow-step-copy">
                    <span>Book or self-audit</span>
                    <span>Use the checklist if you are not ready for the call.</span>
                  </span>
                </div>
              </div>
            </GSAPReveal>
          </div>
        </section>

        <section className="page-section section-slice section-slice-problem" id="problem" data-snap-section>
          <div className="shell">
            <GSAPReveal>
              <SectionHeading
                eyebrow="Problem"
                title="Manual operations are where lean agencies lose leverage"
                description="Fix one bottleneck properly and the team gets immediate leverage without adding more software."
              />
            </GSAPReveal>
            <GSAPReveal stagger>
              <div className="problem-grid mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {homeProblems.map((problem, index) => (
                  <article key={problem} className="panel" data-gsap-reveal>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_oklch,var(--accent)_30%,transparent)] bg-[color:color-mix(in_oklch,var(--accent)_10%,transparent)] text-xs font-bold text-[color:var(--accent)]">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-[1rem] leading-7 text-[color:var(--text-muted)]">{problem}</p>
                  </article>
                ))}
              </div>
            </GSAPReveal>
          </div>
        </section>

        <section
          className="page-section section-slice section-slice-services horizontal-services-section"
          id="services"
          data-horizontal-section="services"
        >
          <div className="shell">
            <GSAPReveal>
              <div className="services-heading-row">
                <SectionHeading
                  eyebrow="Services"
                  title="What the 21-Day Agency Automation Sprint can target"
                  description="Instead of vague automation services, the work is delivered through focused sprints that target one painful workflow at a time."
                />
                <div className="horizontal-scroll-cue" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </GSAPReveal>
            <GSAPReveal stagger className="horizontal-viewport">
              <div className="horizontal-track services-horizontal-track" data-horizontal-track="services">
                {services.map((service, index) => (
                  <article key={service.title} className="panel service-panel horizontal-service-card" data-gsap-reveal>
                    <div className="service-card-topline">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>{service.callout}</span>
                    </div>
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="mt-4 text-[1rem] leading-7 text-[color:var(--text-muted)]">
                      {service.description}
                    </p>
                    <ul className="service-card-list">
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
            </GSAPReveal>
          </div>
        </section>

        <section className="page-section section-slice section-slice-process" id="process" data-snap-section>
          <div className="shell">
            <GSAPReveal>
              <SectionHeading
                eyebrow="Process"
                title="How the audit turns into one fixed workflow"
                description="Start with the smallest high-cost bottleneck. Then map it, build it, test it, and hand it over without turning the engagement into a vague retainer."
              />
            </GSAPReveal>
            <GSAPReveal stagger>
              <div className="process-path mt-10">
                {processSteps.map((step, index) => (
                  <article key={step.title} className="panel process-card" data-gsap-reveal>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="step-number">{index + 1}</span>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
                        Step {index + 1}
                      </p>
                    </div>
                    <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{step.description}</p>
                  </article>
                ))}
              </div>
            </GSAPReveal>
          </div>
        </section>

        <section className="page-section section-slice section-slice-proof" id="proof" data-snap-section>
          <div className="shell">
            <GSAPReveal>
              <SectionHeading
                eyebrow="Validation"
                title="What you can check before committing"
                description="Real operators care about implementation clarity more than vague promise language, so the audit, sprint scope, deliverables, and handoff all stay visible."
              />
            </GSAPReveal>

            {publishedCaseStudyTiles.length > 0 ? (
              <GSAPReveal stagger>
                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                  {publishedCaseStudyTiles.map((tile) => (
                    <article key={tile.clientType} className="panel" data-gsap-reveal>
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
              </GSAPReveal>
            ) : (
              <GSAPReveal stagger>
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {/* review: change-3 */}
                  <article className="panel social-proof-placeholder" data-gsap-reveal>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
                      SPRINT OUTCOMES
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                      Sprint results are documented with before/after metrics and workflow maps.
                      During the free audit, I walk through anonymized delivery artifacts from past
                      sprint engagements.
                    </p>
                    <Link href="/services" className="mt-4 inline-flex text-sm text-[color:var(--accent)]">
                      See what a sprint delivers →
                    </Link>
                  </article>
                  {/* review: change-3 */}
                  <article className="panel testimonial-placeholder" data-gsap-reveal>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-subtle)]">
                      CLIENT FEEDBACK
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                      Feedback is collected at sprint close. Quotes and outcomes are shared publicly
                      only after client approval. References available on request during the audit
                      call.
                    </p>
                    <Link href="/contact" className="mt-4 inline-flex text-sm text-[color:var(--accent)]">
                      Book the free audit →
                    </Link>
                  </article>
                </div>
              </GSAPReveal>
            )}

            <GSAPReveal>
              <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <article className="panel">
                  <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                    Inside a 21-Day Agency Automation Sprint
                  </h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {proofSprintIncludes.map((item) => (
                      <div key={item} className="subtle-card text-sm leading-7 text-[color:var(--text-muted)]">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-7 text-[color:var(--text-muted)]">
                    If the agreed workflow is not implemented and running as scoped, I keep working on
                    it until it is, at no extra cost.
                  </p>
                  {/* review: change-4 */}
                  <hr className="mt-6 border-0 border-t border-t-[color:color-mix(in_oklch,var(--line)_40%,transparent)]" />
                  {/* review: change-4 */}
                  <p className="pricing-note mt-4">
                    Sprint pricing is scoped per engagement based on workflow complexity, tool stack,
                    and agency size. Investment range and timeline are discussed transparently during
                    the free automation audit — no vague retainer structures, no surprise scope creep.
                  </p>
                </article>

                <article className="panel">
                  <p className="section-eyebrow">Example Deliverables — Sample systems, not client work</p>
                  {/* TODO: Replace example deliverable placeholders with real screenshots when available */}
                  <ul className="space-y-3">
                    {proofDeliverables.map((item) => (
                      <li key={item} className="subtle-card text-sm leading-7 text-[color:var(--text-muted)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </GSAPReveal>

            {publishedQuoteStripEntries.length > 0 ? (
              <GSAPReveal>
                <article className="panel mt-5">
                  <p className="section-eyebrow">Quote Strip</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {publishedQuoteStripEntries.map((entry) => (
                      <p key={`${entry.quote}-${entry.attribution}`} className="subtle-card text-sm leading-7 text-[color:var(--text-muted)]">
                        "{entry.quote}" — {entry.attribution}
                      </p>
                    ))}
                  </div>
                </article>
              </GSAPReveal>
            ) : (
              <GSAPReveal>
                <article className="panel mt-5">
                  {/* TODO: Replace placeholder testimonial with real client quote */}
                  <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                    Client quotes are shared publicly only after approval. If helpful, I can share
                    anonymized sprint feedback during the audit call.
                  </p>
                </article>
              </GSAPReveal>
            )}

            {publishedTestimonials.length > 0 ? (
              <GSAPReveal stagger>
                <div className="mt-5 grid gap-5 lg:grid-cols-3">
                  {publishedTestimonials.map((testimonial, index) => (
                    <article
                      key={`${testimonial.name}-${index}`}
                      className="panel border-t-2 border-t-[color:var(--accent)]" data-gsap-reveal
                    >
                      <p className="text-sm leading-7 text-[color:var(--text-muted)]">"{testimonial.quote}"</p>
                      <p className="mt-4 text-sm font-semibold text-[color:var(--text-main)]">
                        {testimonial.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--text-subtle)]">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </article>
                  ))}
                </div>
              </GSAPReveal>
            ) : null}

            <GSAPReveal>
              <div className="mt-5 grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
                <article className="panel">
                  <p className="section-eyebrow">Free Agency Automation Audit</p>
                  <ul className="space-y-3">
                    {proofAuditIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                        <span className="text-sm leading-7 text-[color:var(--text-muted)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                {/* review: change-2 */}
                <article className="panel min-h-[100px]">
                  <p className="section-eyebrow">ABOUT QARIB</p>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[color:var(--accent)] shadow-[0_0_0_4px_color-mix(in_oklch,var(--accent)_10%,transparent),0_0_20px_-6px_color-mix(in_oklch,var(--accent)_30%,transparent)]">
                      {/* TODO: Replace placeholder profile photo with real image */}
                      {/* <!-- TODO: Replace with real headshot — recommended size 400x400px --> */}
                      <Image
                        src="/assets/images/qarib-profile.jpg"
                        alt="Qarib Iqbal profile photo"
                        fill
                        sizes="112px"
                        className="profile-photo object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]">
                        Operator-led implementation
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                        I spent years watching marketing agencies lose hours every week to the same
                        manual workflows — reports rebuilt by hand, leads chased one by one,
                        onboarding that started differently every time. I build focused automation
                        systems that fix one expensive process at a time, so founder-led teams get
                        real leverage without adding headcount, new software stacks, or extra
                        complexity.
                      </p>
                      <p className="mt-3 text-[0.8em] leading-6 text-[color:var(--text-subtle)]">
                        Based in Lahore, Pakistan. Working with agencies remotely worldwide.
                      </p>
                      <p className="mt-1 text-[0.8em] leading-6 text-[color:var(--text-subtle)]">
                        Specialized in Make (Integromat), n8n, Zapier, Airtable, and CRM workflow
                        design.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </GSAPReveal>
          </div>
        </section>

        <section className="page-section section-slice section-slice-resource" id="checklist" data-snap-section>
          <div className="shell">
            <GSAPReveal>
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <SectionHeading
                    eyebrow="FREE CHECKLIST"
                    title="Not ready to book a call? Start with the checklist."
                    description="A 10–15 minute self‑audit to find the 3–5 workflows wasting the most time each week and see which one is ready for a 21‑Day Agency Automation Sprint."
                  />
                  <div className="mt-6 space-y-3">
                    {checklistHighlights.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                        <p className="text-sm leading-7 text-[color:var(--text-muted)]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-7 text-[color:var(--text-subtle)]">
                    Not ready for a call yet? Start here, find your bottlenecks, then book the audit
                    when you&apos;re ready.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-subtle)]">
                    This helps you decide what to tackle in your first sprint.
                  </p>
                  <div className="mt-6">
                    <ButtonLink href="/checklist" trackingEvent="checklist_section_button_click">
                      Get the Checklist
                    </ButtonLink>
                  </div>
                </div>
                <LeadCaptureForm />
              </div>
            </GSAPReveal>
          </div>
        </section>

        <section className="page-section section-slice section-slice-final pt-0" id="final-cta" data-snap-section>
          <div className="shell">
            <GSAPReveal>
              <div className="hero-panel">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <p className="section-eyebrow">Final CTA</p>
                    <h2 className="max-w-[18ch] text-balance font-[family:var(--font-display)] text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[1] tracking-[-0.05em] text-[color:var(--text-main)]">
                      Map the bottleneck, then fix one workflow in 21 days.
                    </h2>
                    <p className="mt-4 max-w-[58ch] text-[1rem] leading-7 text-[color:var(--text-muted)]">
                      If your agency is still rebuilding reports by hand, chasing leads manually, or
                      relying on messy onboarding checklists, start with the checklist, book the audit,
                      and then fix one workflow through a focused 21-day sprint with optional ongoing
                      optimization after handoff.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:flex-col">
                    <ButtonLink href="/contact" className="max-sm:w-full" trackingEvent="final_audit_click">
                      Book Free Automation Audit
                    </ButtonLink>
                    <ButtonLink href="/checklist" variant="secondary" trackingEvent="final_checklist_click">
                      Get the Agency AI Automation Checklist
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </GSAPReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
