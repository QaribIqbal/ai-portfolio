import {
  ArrowRight,
  Bot,
  ChartColumnIncreasing,
  CheckCircle2,
  Clock3,
  MessageSquareReply,
  Settings2,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { ButtonLink } from "@/components/site/button-link";
import { FaqList } from "@/components/site/faq-list";
import { LeadCaptureForm } from "@/components/site/lead-capture-form";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  beliefs,
  faqItems,
  homeOutcomes,
  homeProblems,
  offerPath,
  processSteps,
  proofCards,
  services,
  siteConfig,
  trustStrip,
} from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Automation for Marketing Agencies",
  description:
    "Qarib Iqbal helps marketing agencies automate lead follow-up, reporting, onboarding, and internal workflows with focused AI automation systems.",
});

const serviceIcons = [
  MessageSquareReply,
  ChartColumnIncreasing,
  Workflow,
  Settings2,
  Bot,
];

export default function HomePage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        <section className="page-section pt-20 sm:pt-28">
          <div className="shell">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <Reveal className="hero-panel hero-orbit">
                <p className="section-eyebrow">AI Automation For Marketing Agencies</p>
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:rgba(88,196,173,0.08)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                  <span className="pulse-soft inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]" aria-hidden="true" />
                  One bottleneck. One scoped fix. One clear timeline.
                </div>
                <h1 className="display-title max-w-4xl text-balance">
                  I help marketing agencies eliminate manual follow-up, reporting, and repetitive
                  ops with AI automation.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--text-muted)]">
                  I design and implement AI automation systems that save time, reduce lead leakage,
                  and help your agency run more smoothly without adding more manual work.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/checklist">{siteConfig.primaryCta}</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    {siteConfig.secondaryCta}
                  </ButtonLink>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-6 text-[color:var(--text-subtle)]">
                  {siteConfig.shortCredibility}
                </p>
              </Reveal>

              <Reveal className="panel float-slow lg:translate-y-6" delay={0.08}>
                <p className="section-eyebrow">Agency Operations Map</p>
                <div className="space-y-5">
                  <div className="rounded-[24px] border border-[color:var(--line)] bg-[color:rgba(88,196,173,0.06)] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                          Incoming Lead
                        </p>
                        <h2 className="mt-2 text-lg font-medium text-[color:var(--text-main)]">
                          Reply, route, qualify
                        </h2>
                      </div>
                      <span className="metric-pill">Minutes, not days</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[color:var(--text-subtle)]">
                    <div className="h-px flex-1 bg-[color:var(--line)]" />
                    <Clock3 className="h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                    <div className="h-px flex-1 bg-[color:var(--line)]" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-[color:var(--line)] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                        Reporting
                      </p>
                      <h3 className="mt-2 text-lg font-medium text-[color:var(--text-main)]">
                        Scheduled and consistent
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">
                        Pull the right data, format it cleanly, and stop rebuilding the same report every week.
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-[color:var(--line)] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
                        Onboarding
                      </p>
                      <h3 className="mt-2 text-lg font-medium text-[color:var(--text-main)]">
                        Triggered from one action
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">
                        Tasks, handoffs, and reminders start from one clean trigger instead of scattered checklists.
                      </p>
                    </div>
                  </div>

                  <div className="soft-divider" />

                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      "Fewer dropped opportunities",
                      "Cleaner weekly ops rhythm",
                      "Less repetitive admin work",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-[22px] border border-[color:var(--line)] px-4 py-4 text-sm leading-6 text-[color:var(--text-muted)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="page-section" id="problem">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="The Day-To-Day Reality"
                title="Manual agency operations create drag long before they look like a big problem."
                description="This is what it often looks like inside lean agency teams that have grown faster than their systems."
              />
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {homeProblems.map((problem, index) => (
                <Reveal key={problem} delay={index * 0.03}>
                  <div className="panel">
                    <p className="text-base leading-7 text-[color:var(--text-muted)]">{problem}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section" id="outcomes">
          <div className="shell">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <SectionHeading
                  eyebrow="What Better Looks Like"
                  title="The goal is not more AI tools. It is smoother operations around the work that matters."
                  description="When the right bottleneck gets fixed, agencies feel it quickly in speed, consistency, and day-to-day calm."
                />
              </Reveal>
              <Reveal className="panel" delay={0.06}>
                <ul className="space-y-4">
                  {homeOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-[color:var(--accent)]" aria-hidden="true" />
                      <span className="text-base leading-7 text-[color:var(--text-muted)]">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="page-section" id="services">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="Services"
                title="Focused AI automation services for marketing agencies that still have too much manual work in the loop."
                description="Each service is designed around a practical operational problem, the workflow behind it, and the outcome your team actually cares about."
              />
            </Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {services.map((service, index) => {
                const Icon = serviceIcons[index];
                return (
                  <Reveal
                    key={service.title}
                    className={index === services.length - 1 ? "lg:col-span-2" : ""}
                    delay={index * 0.04}
                  >
                    <article className="panel">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="section-eyebrow mb-3">Service {index + 1}</p>
                          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                            {service.title}
                          </h3>
                        </div>
                        <Icon className="h-6 w-6 text-[color:var(--accent)]" aria-hidden="true" />
                      </div>
                      <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--text-muted)]">
                        {service.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <ArrowRight className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                            <span className="text-sm leading-6 text-[color:var(--text-muted)]">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section" id="offers">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="Offer Path"
                title="A simple way to start, diagnose the problem properly, and fix one important bottleneck without buying a huge engagement."
                description="The work is designed to feel low-risk, professionally managed, and easy to understand at each step."
              />
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-3" delay={0.04}>
              {trustStrip.map((item) => (
                <span key={item} className="metric-pill">
                  {item}
                </span>
              ))}
            </Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-5">
                {offerPath.slice(0, 2).map((offer, index) => (
                  <Reveal key={offer.title} delay={index * 0.05}>
                    <article className="panel">
                      <p className="section-eyebrow mb-3">Entry Point</p>
                      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                        {offer.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-[color:var(--text-muted)]">
                        {offer.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {offer.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-[color:var(--text-muted)]">
                            <CheckCircle2 className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-7">
                        <ButtonLink href={offer.href} variant="secondary">
                          {offer.cta}
                        </ButtonLink>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
              <div className="grid gap-5">
                {offerPath.slice(2).map((offer, index) => (
                  <Reveal key={offer.title} delay={0.08 + index * 0.05}>
                    <article
                      className={`panel ${offer.featured ? "border-[color:var(--accent)] bg-[color:var(--panel-strong)]" : ""}`}
                      id={offer.title === "Fixed-Scope AI Automation Sprint" ? "automation-sprint" : undefined}
                    >
                      <p className="section-eyebrow mb-3">
                        {offer.featured ? "Main Paid Offer" : "After The Sprint"}
                      </p>
                      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)] sm:text-3xl">
                        {offer.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-[color:var(--text-muted)]">
                        {offer.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {offer.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-[color:var(--text-muted)]">
                            <ShieldCheck className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-7">
                        <ButtonLink href={offer.href}>{offer.cta}</ButtonLink>
                      </div>
                      {offer.featured ? (
                        <p className="mt-5 text-sm leading-6 text-[color:var(--text-subtle)]">
                          If something inside the agreed sprint scope is not working as specified at handoff,
                          it gets fixed before sign-off. The promise is around scope clarity and implementation quality,
                          not inflated outcome guarantees.
                        </p>
                      ) : null}
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="page-section" id="process">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="How It Works"
                title="A calm, clear process from diagnosis to implementation."
                description="No vague framework language, just a sensible path to identifying and fixing one operational bottleneck at a time."
              />
            </Reveal>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {processSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.04}>
                  <article className="panel">
                    <p className="section-eyebrow mb-3">Step {index + 1}</p>
                    <h3 className="text-xl font-semibold text-[color:var(--text-main)]">{step.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{step.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section" id="proof">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="Proof Of Process"
                title="No fake logos, no invented testimonials, and no made-up case studies."
                description="Until real client stories exist, the honest way to build trust is to show how the work is thought through, scoped, and delivered."
              />
            </Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              {proofCards.map((card, index) => (
                <Reveal
                  key={card.title}
                  className={index === 0 ? "lg:row-span-2" : ""}
                  delay={index * 0.05}
                >
                  <article className={`panel ${index === 0 ? "lg:row-span-2" : ""}`}>
                    <p className="section-eyebrow mb-3">{index === 1 ? "Delivery Detail" : "Example Build"}</p>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[color:var(--text-muted)]">{card.description}</p>
                    <ul className="mt-6 space-y-3">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-[color:var(--text-muted)]">
                          <Sparkles className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section" id="about">
          <div className="shell">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Reveal>
                <SectionHeading
                  eyebrow="About Qarib"
                  title="A hands-on operator focused on helping agencies remove the manual work slowing them down."
                  description="I focus on marketing agencies because that is where repeated follow-up, reporting, onboarding, and operations work quietly eats time every week. The best automation work starts with diagnosing the real bottleneck, not jumping straight to another tool."
                />
              </Reveal>
              <Reveal className="panel" delay={0.06}>
                <p className="text-base leading-7 text-[color:var(--text-muted)]">
                  Qarib works at the intersection of agency operations and dependable implementation. The
                  goal is not to produce pretty diagrams or generic AI talk. It is to build practical
                  systems that reduce admin work, improve consistency, and hold up in day-to-day use.
                </p>
                <div className="mt-6 space-y-3">
                  {beliefs.map((belief) => (
                    <div key={belief} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                      <p className="text-sm leading-6 text-[color:var(--text-muted)]">{belief}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-6 text-[color:var(--text-subtle)]">
                  Technical depth is there to make systems dependable, but the work stays outcome-first:
                  faster follow-up, cleaner reporting, smoother onboarding, and less manual admin.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="page-section" id="free-resource">
          <div className="shell">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <Reveal>
                <div>
                  <SectionHeading
                    eyebrow="Free Resource"
                    title="Get the Free Agency AI Automation Checklist"
                    description="A practical lead magnet for lean agencies that feel stretched and know too much still depends on manual work."
                  />
                  <div className="mt-6 space-y-3">
                    {[
                      "10 workflows agencies can evaluate first",
                      "Signs your lead follow-up, reporting, or onboarding process is too manual",
                      "A simple self-assessment to help choose the highest-value bottleneck",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                        <p className="text-sm leading-6 text-[color:var(--text-muted)]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm leading-6 text-[color:var(--text-subtle)]">
                    Best for small and growing agencies that want to clean up the right workflow before hiring
                    more people or adding more tools.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <LeadCaptureForm />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="page-section" id="faq">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="FAQ"
                title="Short answers to the questions agencies usually ask before they reach out."
                description="The goal here is clarity, not pressure."
              />
            </Reveal>
            <div className="mt-10">
              <Reveal>
                <FaqList items={faqItems} />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="page-section pt-0">
          <div className="shell">
            <Reveal className="hero-panel">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="section-eyebrow">Next Step</p>
                  <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text-main)] sm:text-4xl">
                    If your agency is still running too much manually, start with the checklist or book a free audit.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--text-muted)]">
                    You do not need more AI tools. You need the right system fixing the right bottleneck.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <ButtonLink href="/checklist">{siteConfig.primaryCta}</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    {siteConfig.secondaryCta}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
