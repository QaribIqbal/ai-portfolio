import {
  Bot,
  ChartColumnIncreasing,
  CheckCircle2,
  MessageSquareReply,
  Settings2,
  Workflow,
} from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/site/button-link";
import { FaqList } from "@/components/site/faq-list";
import { LeadCaptureForm } from "@/components/site/lead-capture-form";
import { ProfileCardPanel } from "@/components/site/profile-card-panel";
import { Reveal } from "@/components/site/reveal";
import { SectionRail } from "@/components/site/section-rail";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import {
  beliefs,
  checklistHighlights,
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

const serviceVisuals = [
  "/images/lead-automation.svg",
  "/images/reporting-automation.svg",
  "/images/onboarding-ops.svg",
  "/images/lead-automation.svg",
  "/images/reporting-automation.svg",
];

const railSections = [
  { id: "problem", label: "Problem" },
  { id: "outcomes", label: "Outcomes" },
  { id: "services", label: "Services" },
  { id: "offers", label: "Offers" },
  { id: "process", label: "Process" },
  { id: "proof", label: "Proof" },
  { id: "about", label: "About" },
  { id: "free-resource", label: "Checklist" },
  { id: "faq", label: "FAQ" },
];

export default function HomePage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <SectionRail sections={railSections} />
      <main>
        <section className="page-section section-slice section-slice-hero pt-20 sm:pt-28">
          <div className="shell">
            <Reveal className="hero-panel relative overflow-hidden">
              <Image
                src="/images/lead-automation.svg"
                alt=""
                width={420}
                height={420}
                aria-hidden="true"
                className="hero-visual hero-visual-main"
              />
              <div className="relative z-10 max-w-[58rem]">
                <p className="section-eyebrow">AI Automation For Marketing Agencies</p>
                <h1 className="display-title max-w-[15ch] text-balance">
                  I help marketing agencies eliminate manual follow-up, reporting, and repetitive
                  ops with AI automation.
                </h1>
                <p className="mt-6 max-w-[58ch] text-[1.08rem] leading-8 text-[color:var(--text-muted)] sm:text-[1.14rem]">
                  I design and implement AI automation systems that save time, reduce lead
                  leakage, and help your agency run more smoothly without adding more manual work.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                  <ButtonLink href="/checklist">{siteConfig.primaryCta}</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    {siteConfig.secondaryCta}
                  </ButtonLink>
                </div>
                <p className="mt-5 max-w-[54ch] text-sm leading-7 text-[color:var(--text-subtle)]">
                  {siteConfig.shortCredibility}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="page-section section-slice section-slice-problem" id="problem">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="Problem / Pain"
                title="This is what the day-to-day reality usually looks like inside lean agencies."
                description="These bottlenecks rarely show up as one dramatic failure. They show up as repeated operational drag across lead follow-up, reporting, onboarding, and internal admin work."
              />
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {homeProblems.map((problem, index) => (
                <Reveal key={problem} delay={index * 0.03}>
                  <article className="panel">
                    <p className="text-[1rem] leading-7 text-[color:var(--text-muted)]">
                      {problem}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-outcomes" id="outcomes">
          <div className="shell">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <Reveal>
                <SectionHeading
                  eyebrow="Outcome / Transformation"
                  title="What changes after the right workflow bottleneck gets fixed."
                  description="The goal is practical and believable: more speed, more consistency, less admin chaos, and more time back for the work that actually grows the agency."
                />
              </Reveal>
              <Reveal className="panel" delay={0.05}>
                <ul className="space-y-4">
                  {homeOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[color:var(--accent)]"
                        aria-hidden="true"
                      />
                      <span className="text-[1rem] leading-7 text-[color:var(--text-muted)]">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-services" id="services">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="Services Overview"
                title="Focused AI automation services for marketing agencies."
                description="Each service is built around a specific operational pain and a practical outcome: faster lead handling, cleaner reporting, smoother onboarding, better connected systems, and less repeated internal work."
              />
            </Reveal>
            <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 lg:grid lg:overflow-visible lg:pb-0 lg:[grid-template-columns:repeat(2,minmax(0,1fr))">
              {services.map((service, index) => {
                const Icon = serviceIcons[index];
                const visual = serviceVisuals[index];

                return (
                  <Reveal
                    key={service.title}
                    delay={index * 0.04}
                    className={`min-w-[88vw] snap-start sm:min-w-[70vw] lg:min-w-0 ${index === services.length - 1 ? "lg:col-span-2" : ""}`}
                  >
                    <article className="panel kinetic-panel relative h-full overflow-hidden">
                      <Image
                        src={visual}
                        alt=""
                        width={280}
                        height={180}
                        aria-hidden="true"
                        className="service-visual"
                      />
                      <div className="relative z-10 flex items-start justify-between gap-6">
                        <div className="max-w-[42rem]">
                          <h3 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-[color:var(--text-main)] sm:text-[1.75rem]">
                            {service.title}
                          </h3>
                          <p className="mt-4 text-[1rem] leading-7 text-[color:var(--text-muted)]">
                            {service.description}
                          </p>
                        </div>
                        <Icon
                          className="mt-1 hidden h-5 w-5 shrink-0 text-[color:var(--accent)] sm:block"
                          aria-hidden="true"
                        />
                      </div>
                      <ul className="mt-6 space-y-3">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <CheckCircle2
                              className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                              aria-hidden="true"
                            />
                            <span className="text-sm leading-7 text-[color:var(--text-muted)]">
                              {bullet}
                            </span>
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

        <section className="page-section section-slice section-slice-offers" id="offers">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="Offer Path"
                title="A simple, clear offer ladder for agencies that want to fix one bottleneck properly."
                description="Clients do not need more AI tools. They need the right system fixing the right bottleneck, with clear scope, dependable communication, and a realistic path from diagnosis to implementation."
              />
            </Reveal>
            <Reveal className="mt-8 overflow-hidden" delay={0.04}>
              <div className="rail-track">
                {[...trustStrip, ...trustStrip].map((item, index) => (
                  <span key={`${item}-${index}`} className="metric-pill whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {offerPath.map((offer, index) => (
                <Reveal key={offer.title} delay={index * 0.04}>
                  <article
                    className={`panel h-full ${offer.featured ? "panel-featured" : ""}`}
                    id={offer.featured ? "automation-sprint" : undefined}
                  >
                    <h3 className="text-[1.6rem] font-semibold tracking-[-0.04em] text-[color:var(--text-main)] sm:text-[1.85rem]">
                      {offer.title}
                    </h3>
                    <p className="mt-4 text-[1rem] leading-7 text-[color:var(--text-muted)]">
                      {offer.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {offer.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-7 text-[color:var(--text-muted)]">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7">
                      <ButtonLink href={offer.href} variant={offer.featured ? "primary" : "secondary"}>
                        {offer.cta}
                      </ButtonLink>
                    </div>
                    {"note" in offer && offer.note ? (
                      <p className="mt-5 max-w-[56ch] text-sm leading-7 text-[color:var(--text-subtle)]">
                        {offer.note}
                      </p>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-process" id="process">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="How It Works"
                title="A calm, clear process from diagnosis to implementation."
                description="No vague framework language. Just a practical path for identifying the bottleneck, designing the system, building it well, and refining it after launch."
              />
            </Reveal>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {processSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.04}>
                  <article className="panel">
                    <p className="section-eyebrow">Step {index + 1}</p>
                    <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                      {step.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-proof" id="proof">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="Proof / Credibility"
                title="Honest proof of process instead of fake logos, testimonials, or invented case studies."
                description="Until real client work exists, the most credible thing to show is how the work is scoped, what a sample system looks like, and what a client actually receives in a sprint."
              />
            </Reveal>
            <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 lg:grid lg:overflow-visible lg:pb-0 lg:grid-cols-3">
              {proofCards.map((card, index) => (
                <Reveal key={card.title} delay={index * 0.04} className="min-w-[86vw] snap-start sm:min-w-[66vw] lg:min-w-0">
                  <article className="panel kinetic-panel relative h-full overflow-hidden">
                    <Image
                      src={serviceVisuals[index]}
                      alt=""
                      width={260}
                      height={160}
                      aria-hidden="true"
                      className="proof-visual"
                    />
                    <h3 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-[color:var(--text-main)]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[1rem] leading-7 text-[color:var(--text-muted)]">
                      {card.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-7 text-[color:var(--text-muted)]">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-about" id="about">
          <div className="shell">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Reveal>
                <SectionHeading
                  eyebrow="About"
                  title="A hands-on operator who understands both agency operations and technical implementation."
                  description="Qarib focuses on marketing agencies because this is where repeated follow-up, reporting, onboarding, and internal workflow issues quietly eat time every week. The work starts with diagnosis before prescription and stays outcome-first from start to finish."
                />
              </Reveal>
              <Reveal className="panel" delay={0.05}>
                <p className="text-[1rem] leading-7 text-[color:var(--text-muted)]">
                  Most agencies do not stay manual because they are careless. They stay manual because
                  client work always feels more urgent than fixing the systems behind it. That is why
                  the operational problems often linger until they start affecting lead response,
                  reporting consistency, onboarding quality, and day-to-day reliability.
                </p>
                <div className="mt-6 space-y-3">
                  {beliefs.map((belief) => (
                    <div key={belief} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-[color:var(--text-muted)]">{belief}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-7 text-[color:var(--text-subtle)]">
                  Built with reliable implementation and clean integrations. Technical depth is there
                  to make systems dependable, but the work stays focused on practical wins for small
                  teams.
                </p>
                <div className="mt-8 flex justify-center sm:justify-start">
                  <ProfileCardPanel />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-resource" id="free-resource">
          <div className="shell">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <Reveal>
                <SectionHeading
                  eyebrow="Free Resource"
                  title="Get the Free Agency AI Automation Checklist"
                  description="A practical lead magnet for lean agencies that feel stretched and know too much still depends on manual work."
                />
                <div className="mt-6 space-y-3">
                  {checklistHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-7 text-[color:var(--text-muted)]">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-[58ch] text-sm leading-7 text-[color:var(--text-subtle)]">
                  Best for lean agencies that feel stretched, not huge enterprises. If too much still
                  depends on manual follow-up, manual reporting, and manual onboarding, the checklist
                  helps you spot where to start.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <LeadCaptureForm />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-faq" id="faq">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="FAQ"
                title="Short, direct answers to the questions agencies usually ask before reaching out."
                description="The goal here is to lower risk and make the next step clearer."
              />
            </Reveal>
            <div className="mt-10">
              <Reveal>
                <FaqList items={faqItems} />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="page-section section-slice section-slice-final pt-0">
          <div className="shell">
            <Reveal className="hero-panel">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="section-eyebrow">Final CTA</p>
                  <h2 className="max-w-[18ch] text-balance font-[family:var(--font-display)] text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[1] tracking-[-0.05em] text-[color:var(--text-main)]">
                    If your agency is still running too much manually, start with the checklist or
                    book a free audit.
                  </h2>
                  <p className="mt-4 max-w-[58ch] text-[1rem] leading-7 text-[color:var(--text-muted)]">
                    You do not need more AI tools. You need the right system fixing the right
                    bottleneck.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
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
