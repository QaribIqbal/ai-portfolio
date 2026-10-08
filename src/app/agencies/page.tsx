import { CheckCircle2, Mail, BarChart3, FileText, Settings, ArrowDown } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/site/button-link";
import { FeaturedCaseStudy } from "@/components/site/featured-case-study";
import { VoiceAgentShowcase } from "@/components/site/voice-agent-showcase";
import { HeroAnimation, HeroTitle } from "@/components/site/hero-animation";
import { JourneySection } from "@/components/site/journey-section";
import { LeadCaptureForm } from "@/components/site/lead-capture-form";
import { PinnedProcess } from "@/components/site/pinned-process";
import { ProjectEvidenceGrid } from "@/components/site/project-evidence-grid";
import {
  ScrollParallax,
  ScrollWordReveal,
  ScrollScaleReveal,
  ScrollSectionDepth,
} from "@/components/site/scroll-parallax";
import { ServiceShowcase } from "@/components/site/service-showcase";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TrustPrinciples } from "@/components/site/trust-principles";
import { buildAvailabilityCopy } from "@/lib/availability";
import {
  featuredSolutionStudies,
  projectEvidence,
  siteConfig,
  trustPrinciples,
} from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "AI Automation for Marketing Agencies",
  description:
    "Watch Qarib Iqbal's AI automation demos for lead response, reporting, onboarding, voice agents, and agency operations.",
  path: "/agencies",
  keywords: [
    "AI automation for marketing agencies",
    "agency automation consultant",
    "marketing agency workflow automation",
    "agency reporting automation",
  ],
});

export default function AgenciesPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main id="main">
        {/* ─── HERO ─── */}
        <section className="page-section section-slice section-slice-hero pt-20 sm:pt-28" id="hero">
          <div className="shell">
            <div className="hero-panel">
              <HeroAnimation>
                <p className="section-eyebrow" data-hero-eyebrow>
                  Qarib Iqbal / AI Systems Operator
                </p>
                <HeroTitle />
                <p
                  className="mt-8 max-w-[56ch] text-[1.14rem] leading-[1.85] text-[color:var(--text-muted)] sm:text-[1.2rem]"
                  data-hero-copy
                >
                  I design and ship <span className="text-highlight-strong">voice agents, lead-response systems, reporting workflows, and operational automation</span> for teams that are done managing critical work by hand.
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
                  {buildAvailabilityCopy(siteConfig.availabilityCapacity)}
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
              <div className="max-w-[720px] mx-auto text-center">
                <p className="section-eyebrow" style={{ justifyContent: "center" }}>What I Build</p>
                <ScrollWordReveal
                  text="Pick the workflow that hurts most. I'll fix it in 21 days."
                  className="text-balance font-[family:var(--font-display)] text-[clamp(2.2rem,4.2vw,4rem)] font-bold leading-[1.05] tracking-[-0.045em] text-[color:var(--text-main)]"
                />
                <p className="mt-7 text-[1.1rem] leading-[1.9] text-[color:var(--text-muted)] max-w-[52ch] mx-auto">
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
              stat={{ value: "Always on", label: "Lead response" }}
              visual={
                <ScrollParallax speed={0.15}>
                  <div className="svc-visual-card">
                    <div className="svc-visual-card-header">
                      <div className="svc-visual-card-dot" style={{ background: "#34d399" }} />
                      <div className="svc-visual-card-dot" style={{ background: "var(--accent)" }} />
                      <div className="svc-visual-card-dot" style={{ background: "#f5f1e8" }} />
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
              stat={{ value: "Scheduled", label: "Reporting cadence" }}
              visual={
                <ScrollParallax speed={0.15}>
                  <div className="svc-visual-card">
                    <div className="svc-visual-card-header">
                      <div className="svc-visual-card-dot" style={{ background: "#34d399" }} />
                      <div className="svc-visual-card-dot" style={{ background: "var(--accent)" }} />
                      <div className="svc-visual-card-dot" style={{ background: "#f5f1e8" }} />
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
              stat={{ value: "Triggered", label: "At deal close" }}
              visual={
                <ScrollParallax speed={0.15}>
                  <div className="svc-visual-card">
                    <div className="svc-visual-card-header">
                      <div className="svc-visual-card-dot" style={{ background: "#34d399" }} />
                      <div className="svc-visual-card-dot" style={{ background: "var(--accent)" }} />
                      <div className="svc-visual-card-dot" style={{ background: "#f5f1e8" }} />
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
              <div className="max-w-[720px]">
                <p className="section-eyebrow">How It Works</p>
                <ScrollWordReveal
                  text="From free audit to running automation — in 4 steps."
                  className="text-balance font-[family:var(--font-display)] text-[clamp(2.2rem,4.2vw,4rem)] font-bold leading-[1.05] tracking-[-0.045em] text-[color:var(--text-main)]"
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

        {/* ─── EVIDENCE & PROOF ─── */}
        <section className="page-section section-slice section-slice-proof" id="case-studies" data-depth-section>
          <div className="shell">
            <ScrollSectionDepth>
              <div className="max-w-[820px]">
                <p className="section-eyebrow">Proof, not promises</p>
                <ScrollWordReveal
                  text="Watch the systems. Inspect the workflows."
                  className="text-balance font-[family:var(--font-display)] text-[clamp(2.2rem,4.2vw,4rem)] font-bold leading-[1.05] tracking-[-0.045em] text-[color:var(--text-main)]"
                />
                <p className="mt-7 max-w-[62ch] text-[1.05rem] leading-[1.85] text-[color:var(--text-muted)]">
                  The work below is labeled by what can actually be verified: live demos,
                  implemented solution builds, and workflow blueprints. TechBees is the delivery
                  studio behind the featured systems.
                </p>
              </div>
            </ScrollSectionDepth>

            <div className="proof-ledger" aria-label="Portfolio evidence summary">
              <div>
                <strong>{featuredSolutionStudies.length}</strong>
                <span>Featured solution studies</span>
              </div>
              <div>
                <strong>{projectEvidence.filter((project) => Boolean(project.demoUrl)).length}</strong>
                <span>Watchable demos and builds</span>
              </div>
              <div>
                <strong>{projectEvidence.length}</strong>
                <span>Documented systems</span>
              </div>
            </div>

            <div className="featured-studies">
              {featuredSolutionStudies.map((study, index) => (
                <FeaturedCaseStudy key={study.slug} study={study} index={index} />
              ))}
            </div>

            <div className="evidence-section-heading">
              <p className="section-eyebrow">Project archive</p>
              <h3>Six systems. Each one labeled by the evidence behind it.</h3>
            </div>
            <ProjectEvidenceGrid projects={projectEvidence} />

            <TrustPrinciples principles={trustPrinciples} />

            <ScrollScaleReveal>
              <div className="operator-lockup">
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-[color:var(--accent)] shadow-[0_0_0_4px_color-mix(in_oklch,var(--accent)_10%,transparent),0_0_24px_-6px_color-mix(in_oklch,var(--accent)_30%,transparent)]">
                  <Image
                    src="/assets/images/qarib-profile.jpg"
                    alt="Qarib Iqbal profile photo"
                    fill
                    sizes="128px"
                    className="profile-photo object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[1.4rem] font-bold tracking-[-0.02em] text-[color:var(--text-main)]">
                    Qarib Iqbal <span className="text-highlight-strong">/ AI Systems Operator</span>
                  </h3>
                  <p className="mt-3 text-[1rem] leading-[1.85] text-[color:var(--text-muted)] max-w-[60ch]">
                    I lead the system design, automation logic, testing, and handoff. Selected
                    collaborative builds ship under <span className="text-highlight">TechBees</span>.
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
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="section-eyebrow">Free Checklist</p>
                  <ScrollWordReveal
                    text="Not ready for a call? Start with the checklist."
                    className="text-balance font-[family:var(--font-display)] text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[color:var(--text-main)]"
                  />
                  <p className="mt-6 text-[1.05rem] leading-[1.85] text-[color:var(--text-muted)] max-w-[48ch]">
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
                <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                  <div>
                    <p className="section-eyebrow">Ready?</p>
                    <ScrollWordReveal
                      text="Map the bottleneck, then fix one workflow in 21 days."
                      className="max-w-[20ch] text-balance font-[family:var(--font-display)] text-[clamp(2rem,3.8vw,4rem)] font-bold leading-[1.05] tracking-[-0.05em] text-[color:var(--text-main)]"
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
