import { CheckCircle2, Mail, BarChart3, FileText, Settings, ArrowDown } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/site/button-link";
import { VoiceAgentShowcase } from "@/components/site/voice-agent-showcase";
import { GSAPReveal } from "@/components/site/gsap-reveal";
import { HeroAnimation, HeroTitle } from "@/components/site/hero-animation";
import { JourneySection } from "@/components/site/journey-section";
import { LeadCaptureForm } from "@/components/site/lead-capture-form";
import { PinnedProcess } from "@/components/site/pinned-process";
import {
  ScrollParallax,
  ScrollWordReveal,
  ScrollScaleReveal,
  ScrollSectionDepth,
} from "@/components/site/scroll-parallax";
import { ServiceShowcase } from "@/components/site/service-showcase";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TestimonialCarousel } from "@/components/site/testimonial-carousel";
import {
  publishedCaseStudyTiles,
  publishedTestimonials,
  siteConfig,
} from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Automation for Marketing Agencies",
  description:
    "Qarib Iqbal helps lean marketing agencies remove manual follow-up, reporting, onboarding, and handoff bottlenecks with practical automation systems.",
});

export default function HomePage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        {/* ─── HERO ─── */}
        <section className="page-section section-slice section-slice-hero pt-16 sm:pt-20" id="hero">
          <div className="shell">
            <div className="hero-panel">
              <HeroAnimation>
                <p className="section-eyebrow" data-hero-eyebrow>
                  AI Automation for Marketing Agencies
                </p>
                <HeroTitle />
                <p
                  className="mt-8 max-w-[56ch] text-[1.14rem] leading-[1.85] text-[color:var(--text-muted)] sm:text-[1.2rem]"
                  data-hero-copy
                >
                  I run <span className="text-highlight-strong">21-Day Automation Sprints</span> that
                  fix <span className="text-highlight">one expensive manual workflow</span> at a time — so
                  your team gets hours back without adding headcount.
                </p>
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
                    Get the Free Checklist
                  </ButtonLink>
                </div>
                <p
                  className="mt-6 max-w-[54ch] text-sm leading-7 text-[color:var(--text-subtle)]"
                  data-hero-credibility
                >
                  {siteConfig.shortCredibility}
                </p>
                <p className="capacity-note mt-3 max-w-[54ch]" data-hero-capacity>
                  Currently accepting <span className="text-highlight">2 new sprint clients</span> per month.
                </p>
              </HeroAnimation>
            </div>
          </div>
        </section>

        {/* ─── CINEMATIC JOURNEY ─── */}
        <JourneySection />

        {/* ─── SERVICES: THE STAR ─── */}
        <section className="page-section section-slice section-slice-services" id="services" data-depth-section>
          <div className="shell">
            <ScrollSectionDepth>
              <div className="max-w-[680px] mx-auto text-center">
                <p className="section-eyebrow" style={{ justifyContent: "center" }}>What I Build</p>
                <ScrollWordReveal
                  text="Pick the workflow that hurts most. I'll fix it in 21 days."
                  className="text-balance font-[family:var(--font-display)] text-[clamp(2.2rem,4.2vw,4rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[color:var(--text-main)]"
                />
                <p className="mt-6 text-[1.08rem] leading-[1.85] text-[color:var(--text-muted)] max-w-[52ch] mx-auto">
                  Each sprint targets <span className="text-highlight">one painful process</span> — not
                  a vague retainer. You pick the bottleneck, I build the automation.
                </p>
              </div>
            </ScrollSectionDepth>

            <ServiceShowcase
              eyebrow="Sprint 01"
              title={
                <>
                  Lead Follow-Up{" "}
                  <span className="text-highlight-strong">in minutes, not hours</span>
                </>
              }
              description={
                <>
                  When lead response depends on who&apos;s free, opportunities stall.
                  This sprint builds <span className="text-highlight">instant first-touch automation</span> that
                  qualifies, routes, and follows up — before your competitor even opens their inbox.
                </>
              }
              features={[
                { text: <><span className="text-highlight">Qualified leads</span> get a response within minutes — automatically</> },
                { text: <>CRM status stays current without manual cleanup</> },
                { text: <>Sales gets structured reminders, not ad-hoc chasing</> },
              ]}
              stat={{ value: "<5m", label: "Avg First Response" }}
              visual={
                <ScrollParallax speed={0.15}>
                  <div className="svc-visual-card">
                    <div className="svc-visual-card-header">
                      <div className="svc-visual-card-dot" style={{ background: "#34d399" }} />
                      <div className="svc-visual-card-dot" style={{ background: "var(--accent)" }} />
                      <div className="svc-visual-card-dot" style={{ background: "#a78bfa" }} />
                      <span className="svc-visual-card-title">Lead Automation Flow</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="svc-workflow-step">
                        <div className="svc-workflow-step-icon"><Mail className="h-4 w-4" /></div>
                        <span>New lead submitted via form</span>
                      </div>
                      <div className="svc-workflow-arrow"><ArrowDown className="h-4 w-4" /></div>
                      <div className="svc-workflow-step">
                        <div className="svc-workflow-step-icon"><Settings className="h-4 w-4" /></div>
                        <span>AI qualifies &amp; scores lead</span>
                      </div>
                      <div className="svc-workflow-arrow"><ArrowDown className="h-4 w-4" /></div>
                      <div className="svc-workflow-step">
                        <div className="svc-workflow-step-icon"><CheckCircle2 className="h-4 w-4" /></div>
                        <span>CRM updated, follow-up triggered</span>
                      </div>
                    </div>
                  </div>
                </ScrollParallax>
              }
            />

            <ServiceShowcase
              reverse
              eyebrow="Sprint 02"
              title={
                <>
                  Reporting that{" "}
                  <span className="text-highlight-strong">builds itself</span>
                </>
              }
              description={
                <>
                  Rebuilding reports by hand every week is a{" "}
                  <span className="text-highlight">hidden tax on senior time</span>.
                  This sprint connects your data sources and delivers polished client
                  reports on autopilot.
                </>
              }
              features={[
                { text: <>Reports assembled and sent on a <span className="text-highlight">reliable cadence</span></> },
                { text: <>Team shifts from copy-paste to insight and decisions</> },
                { text: <>Data stays clean across channels and owners</> },
              ]}
              stat={{ value: "12h", label: "Saved Per Week" }}
              visual={
                <ScrollParallax speed={0.15}>
                  <div className="svc-visual-card">
                    <div className="svc-visual-card-header">
                      <div className="svc-visual-card-dot" style={{ background: "#34d399" }} />
                      <div className="svc-visual-card-dot" style={{ background: "var(--accent)" }} />
                      <div className="svc-visual-card-dot" style={{ background: "#a78bfa" }} />
                      <span className="svc-visual-card-title">Reporting Pipeline</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="svc-workflow-step">
                        <div className="svc-workflow-step-icon"><BarChart3 className="h-4 w-4" /></div>
                        <span>Data pulled from 4+ platforms</span>
                      </div>
                      <div className="svc-workflow-arrow"><ArrowDown className="h-4 w-4" /></div>
                      <div className="svc-workflow-step">
                        <div className="svc-workflow-step-icon"><Settings className="h-4 w-4" /></div>
                        <span>Auto-formatted into branded template</span>
                      </div>
                      <div className="svc-workflow-arrow"><ArrowDown className="h-4 w-4" /></div>
                      <div className="svc-workflow-step">
                        <div className="svc-workflow-step-icon"><Mail className="h-4 w-4" /></div>
                        <span>Delivered to clients on schedule</span>
                      </div>
                    </div>
                  </div>
                </ScrollParallax>
              }
            />

            <ServiceShowcase
              eyebrow="Sprint 03"
              title={
                <>
                  Client onboarding{" "}
                  <span className="text-highlight-strong">that never drifts</span>
                </>
              }
              description={
                <>
                  When onboarding varies by account manager,{" "}
                  <span className="text-highlight">delivery starts behind</span> and
                  rework stacks up. This sprint builds a consistent deal-won to kickoff
                  pipeline that fires every time.
                </>
              }
              features={[
                { text: <>Tasks, docs, and reminders trigger <span className="text-highlight">in the right order</span></> },
                { text: <>Internal teams get visibility without chasing status</> },
                { text: <>New accounts go from close to kickoff with zero gaps</> },
              ]}
              stat={{ value: "0", label: "Missed Handoffs Per Month" }}
              visual={
                <ScrollParallax speed={0.15}>
                  <div className="svc-visual-card">
                    <div className="svc-visual-card-header">
                      <div className="svc-visual-card-dot" style={{ background: "#34d399" }} />
                      <div className="svc-visual-card-dot" style={{ background: "var(--accent)" }} />
                      <div className="svc-visual-card-dot" style={{ background: "#a78bfa" }} />
                      <span className="svc-visual-card-title">Onboarding Workflow</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="svc-workflow-step">
                        <div className="svc-workflow-step-icon"><CheckCircle2 className="h-4 w-4" /></div>
                        <span>Deal marked won in CRM</span>
                      </div>
                      <div className="svc-workflow-arrow"><ArrowDown className="h-4 w-4" /></div>
                      <div className="svc-workflow-step">
                        <div className="svc-workflow-step-icon"><FileText className="h-4 w-4" /></div>
                        <span>Docs, tasks, and calendar auto-created</span>
                      </div>
                      <div className="svc-workflow-arrow"><ArrowDown className="h-4 w-4" /></div>
                      <div className="svc-workflow-step">
                        <div className="svc-workflow-step-icon"><Mail className="h-4 w-4" /></div>
                        <span>Welcome email + team notifications sent</span>
                      </div>
                    </div>
                  </div>
                </ScrollParallax>
              }
            />
          </div>
        </section>

        {/* ─── VOICE AGENTS ─── */}
        <VoiceAgentShowcase />

        {/* ─── HOW IT WORKS ─── */}
        <section className="page-section section-slice section-slice-process" id="process">
          <div className="shell">
            <ScrollSectionDepth>
              <div className="max-w-[680px]">
                <p className="section-eyebrow">How It Works</p>
                <ScrollWordReveal
                  text="From free audit to running automation — in 4 steps."
                  className="text-balance font-[family:var(--font-display)] text-[clamp(2.2rem,4.2vw,4rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[color:var(--text-main)]"
                />
              </div>
            </ScrollSectionDepth>
            <PinnedProcess
              steps={[
                {
                  num: "01",
                  title: "Download the free checklist",
                  desc: (
                    <>
                      A <span className="text-highlight">10-minute self-audit</span> to find the workflows
                      leaking the most time each week.
                    </>
                  ),
                },
                {
                  num: "02",
                  title: "Book the free automation audit",
                  desc: (
                    <>
                      We map <span className="text-highlight">one painful workflow</span> live and
                      define what to automate first.
                    </>
                  ),
                },
                {
                  num: "03",
                  title: "Run a 21-Day Sprint",
                  desc: (
                    <>
                      Audit, design, build, test, and hand over — with{" "}
                      <span className="text-highlight-strong">Loom walkthroughs and SOPs</span> included.
                    </>
                  ),
                },
                {
                  num: "04",
                  title: "Optional ongoing optimization",
                  desc: (
                    <>
                      Keep the workflow healthy. Adjust when tools change. Scope the next
                      bottleneck <span className="text-highlight">one at a time</span>.
                    </>
                  ),
                },
              ]}
            />
          </div>
        </section>

        {/* ─── RESULTS & PROOF ─── */}
        <section className="page-section section-slice section-slice-proof" id="case-studies" data-depth-section>
          <div className="shell">
            <ScrollSectionDepth>
              <div className="max-w-[680px]">
                <p className="section-eyebrow">Results</p>
                <ScrollWordReveal
                  text="Real sprints. Measurable outcomes."
                  className="text-balance font-[family:var(--font-display)] text-[clamp(2.2rem,4.2vw,4rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[color:var(--text-main)]"
                />
              </div>
            </ScrollSectionDepth>

            {publishedCaseStudyTiles.length > 0 && (
              <GSAPReveal stagger variant="slide-up" delay={0.1}>
                <div className="mt-12 grid gap-5 lg:grid-cols-3">
                  {publishedCaseStudyTiles.map((tile) => (
                    <ScrollScaleReveal key={tile.clientType}>
                      <article className="panel" data-gsap-reveal data-tilt-card>
                        <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--text-subtle)]">
                          {tile.clientType}
                        </p>
                        <p className="mt-4 text-[0.95rem] leading-[1.75] text-[color:var(--text-muted)]">
                          <strong className="text-[color:var(--text-main)]">Problem:</strong> {tile.problem}
                        </p>
                        <p className="mt-2 text-[0.95rem] leading-[1.75] text-[color:var(--text-muted)]">
                          <strong className="text-[color:var(--text-main)]">Outcome:</strong>{" "}
                          <span className="text-highlight">{tile.outcome}</span>
                        </p>
                        {tile.sprintTag ? (
                          <p className="mt-4 text-xs uppercase tracking-[0.1em] text-[color:var(--accent)]">
                            {tile.sprintTag}
                          </p>
                        ) : null}
                      </article>
                    </ScrollScaleReveal>
                  ))}
                </div>
              </GSAPReveal>
            )}

            {publishedTestimonials.length > 0 ? (
              <GSAPReveal variant="fade-scale">
                <TestimonialCarousel testimonials={publishedTestimonials} />
              </GSAPReveal>
            ) : null}

            <ScrollScaleReveal>
              <div className="mt-12 grid gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[color:var(--accent)] shadow-[0_0_0_4px_color-mix(in_oklch,var(--accent)_10%,transparent),0_0_20px_-6px_color-mix(in_oklch,var(--accent)_30%,transparent)]">
                  <Image
                    src="/assets/images/qarib-profile.jpg"
                    alt="Qarib Iqbal profile photo"
                    fill
                    sizes="112px"
                    className="profile-photo object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]">
                    Built by <span className="text-highlight-strong">Qarib Iqbal</span>
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.8] text-[color:var(--text-muted)] max-w-[60ch]">
                    I build focused automation systems for marketing agencies — one expensive
                    process at a time. Specialized in{" "}
                    <span className="text-highlight">Make, n8n, Zapier, Airtable</span>, and CRM workflow design.
                    Based in Lahore, working remotely worldwide.
                  </p>
                </div>
              </div>
            </ScrollScaleReveal>
          </div>
        </section>

        {/* ─── CHECKLIST + LEAD CAPTURE ─── */}
        <section className="page-section section-slice section-slice-resource" id="checklist" data-depth-section>
          <div className="shell">
            <ScrollSectionDepth>
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="section-eyebrow">Free Checklist</p>
                  <ScrollWordReveal
                    text="Not ready for a call? Start with the checklist."
                    className="text-balance font-[family:var(--font-display)] text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[color:var(--text-main)]"
                  />
                  <p className="mt-5 text-[1rem] leading-[1.8] text-[color:var(--text-muted)] max-w-[48ch]">
                    A <span className="text-highlight">10-minute self-audit</span> to find the 3-5 workflows
                    wasting the most time — and see which one is ready for a sprint.
                  </p>
                </div>
                <ScrollParallax speed={0.1}>
                  <LeadCaptureForm />
                </ScrollParallax>
              </div>
            </ScrollSectionDepth>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="page-section section-slice section-slice-final pt-0" id="final-cta" data-depth-section>
          <div className="shell">
            <ScrollSectionDepth>
              <div className="hero-panel">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <p className="section-eyebrow">Ready?</p>
                    <ScrollWordReveal
                      text="Map the bottleneck, then fix one workflow in 21 days."
                      className="max-w-[20ch] text-balance font-[family:var(--font-display)] text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-[color:var(--text-main)]"
                    />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:flex-col">
                    <ButtonLink href="/contact" className="max-sm:w-full" trackingEvent="final_audit_click">
                      Book Free Automation Audit
                    </ButtonLink>
                    <ButtonLink href="/checklist" variant="secondary" trackingEvent="final_checklist_click">
                      Get the Free Checklist
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </ScrollSectionDepth>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
