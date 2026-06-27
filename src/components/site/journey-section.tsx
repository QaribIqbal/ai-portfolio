"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  Bot,
  CheckCircle2,
  Send,
  Megaphone,
  BarChart3,
  AlertTriangle,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  CalendarX,
  CreditCard,
  Bell,
  RefreshCw,
  Sheet,
} from "lucide-react";
import { ButtonLink } from "@/components/site/button-link";

gsap.registerPlugin(ScrollTrigger);

const CHAOS_CARDS = [
  { label: "Missed Lead", Icon: AlertTriangle, category: "lead" },
  { label: "Unread Email", Icon: Mail, category: "lead" },
  { label: "CRM Outdated", Icon: AlertTriangle, category: "crm" },
  { label: "Report Overdue", Icon: BarChart3, category: "reporting" },
  { label: "Client Call", Icon: Phone, category: "onboarding" },
  { label: "WhatsApp Msg", Icon: MessageSquare, category: "lead" },
  { label: "Spreadsheet", Icon: Sheet, category: "reporting" },
  { label: "Onboarding Doc", Icon: FileText, category: "onboarding" },
  { label: "Calendar Clash", Icon: CalendarX, category: "scheduling" },
  { label: "Invoice Draft", Icon: CreditCard, category: "crm" },
  { label: "Slack Alert", Icon: Bell, category: "alerts" },
  { label: "Follow-Up", Icon: RefreshCw, category: "lead" },
];

const CATEGORIES = [
  { key: "lead", label: "Lead Follow-Up", x: 45, y: 18 },
  { key: "reporting", label: "Client Reporting", x: 78, y: 18 },
  { key: "crm", label: "CRM Updates", x: 45, y: 58 },
  { key: "onboarding", label: "Onboarding", x: 78, y: 58 },
  { key: "scheduling", label: "Scheduling", x: 61, y: 78 },
  { key: "alerts", label: "Internal Alerts", x: 61, y: 38 },
];

const FUNNEL_STAGES: { label: string; Icon: typeof Target }[] = [
  { label: "Lead Captured", Icon: Target },
  { label: "AI Qualified", Icon: Bot },
  { label: "CRM Updated", Icon: CheckCircle2 },
  { label: "Follow-Up Sent", Icon: Send },
  { label: "Team Notified", Icon: Megaphone },
  { label: "Report Generated", Icon: BarChart3 },
];

const DASHBOARD_METRICS = [
  { value: 4.2, suffix: "s", label: "Avg Response" },
  { value: 97, suffix: "%", label: "Follow-Up Rate" },
  { value: 0, suffix: "", label: "Missed Leads" },
  { value: 12, suffix: "h", label: "Saved Weekly" },
];

const BAR_HEIGHTS = [40, 55, 68, 82, 75, 92];

const SCENE_COPY = [
  {
    eyebrow: "The Reality",
    title: "Most agencies do not lose growth because they lack talent.",
    subtitle: "They lose it because too much of the business still runs manually.",
  },
  {
    eyebrow: "The Pattern",
    title: "Once the workflow is mapped, the real bottlenecks become obvious.",
    subtitle: "Every missed lead, delayed report, and broken handoff traces back to the same manual gaps.",
  },
  {
    eyebrow: "The Layer",
    title: "We add an AI automation layer that connects your tools, understands the task, and moves work forward automatically.",
    subtitle: "No new platforms. No rip-and-replace. Just intelligent orchestration inside your existing stack.",
  },
  {
    eyebrow: "The System",
    title: "Your agency gets a system that captures, qualifies, follows up, updates, and reports.",
    subtitle: "Without your team chasing every step manually.",
  },
  {
    eyebrow: "The Result",
    title: "Less manual work. Faster response. Cleaner operations.",
    subtitle: "More time for strategy, clients, and growth.",
  },
];

function animateCounters(container: HTMLElement) {
  const metricValues = container.querySelectorAll<HTMLElement>(".dashboard-metric-value");
  metricValues.forEach((el, i) => {
    const metric = DASHBOARD_METRICS[i];
    if (!metric) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: metric.value,
      duration: 1.6,
      delay: i * 0.15,
      ease: "power2.out",
      onUpdate() {
        if (metric.value === 0) {
          el.textContent = `0${metric.suffix}`;
        } else if (metric.suffix === "s") {
          el.textContent = `${obj.val.toFixed(1)}${metric.suffix}`;
        } else if (metric.suffix === "%") {
          el.textContent = `${Math.round(obj.val)}${metric.suffix}`;
        } else {
          el.textContent = `${Math.round(obj.val)}${metric.suffix}`;
        }
      },
    });
  });

  const bars = container.querySelectorAll<HTMLElement>(".dashboard-bar");
  bars.forEach((bar, i) => {
    gsap.fromTo(bar,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.8, delay: 0.3 + i * 0.1, ease: "back.out(1.4)" }
    );
  });
}

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      container.querySelectorAll<HTMLElement>(".journey-scene").forEach((s) => {
        s.style.opacity = "1";
      });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scenes = gsap.utils.toArray<HTMLElement>(".journey-scene", container);
      const cards = gsap.utils.toArray<HTMLElement>(".chaos-card", canvas);
      const categoryLabels = gsap.utils.toArray<HTMLElement>(".category-label", canvas);
      const connectionLines = gsap.utils.toArray<HTMLElement>(".connection-line", canvas);
      const aiCore = canvas.querySelector<HTMLElement>(".ai-core");
      const funnelStages = gsap.utils.toArray<HTMLElement>(".funnel-stage", canvas);
      const dashboardEl = canvas.querySelector<HTMLElement>(".dashboard-final");
      const workflowLine = canvas.querySelector<SVGPathElement>(".workflow-path");
      const copyBlocks = gsap.utils.toArray<HTMLElement>(".scene-copy", container);

      gsap.set(scenes.slice(1), { opacity: 0 });
      gsap.set(categoryLabels, { opacity: 0, scale: 0.8 });
      gsap.set(connectionLines, { opacity: 0, scaleX: 0 });
      gsap.set(aiCore, { opacity: 0, scale: 0.5 });
      gsap.set(funnelStages, { opacity: 0, y: 40, scale: 0.85 });
      gsap.set(dashboardEl, { opacity: 0, scale: 0.88, y: 40 });
      if (workflowLine) {
        const length = workflowLine.getTotalLength();
        gsap.set(workflowLine, { strokeDasharray: length, strokeDashoffset: length });
      }

      cards.forEach((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2;
        const radius = 120 + Math.random() * 100;
        gsap.set(card, {
          x: Math.cos(angle) * radius + (Math.random() - 0.5) * 60,
          y: Math.sin(angle) * radius + (Math.random() - 0.5) * 60,
          rotation: (Math.random() - 0.5) * 25,
          opacity: 1,
        });
      });

      let dashboardAnimated = false;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (self.progress > 0.78 && !dashboardAnimated && dashboardEl) {
              dashboardAnimated = true;
              animateCounters(dashboardEl);
            }
          },
        },
      });

      // SCENE 1: Manual chaos - cards float around (0 -> 0.15)
      tl.to(cards, {
        x: () => (Math.random() - 0.5) * 280,
        y: () => (Math.random() - 0.5) * 200,
        rotation: () => (Math.random() - 0.5) * 35,
        duration: 0.15,
        ease: "power1.inOut",
        stagger: { each: 0.008, from: "random" },
      }, 0);

      tl.fromTo(copyBlocks[0], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.06 }, 0);
      tl.to(copyBlocks[0], { opacity: 0, y: -20, duration: 0.04 }, 0.12);

      // SCENE 2: Bottlenecks visible - cards group (0.15 -> 0.35)
      tl.to(scenes[0], { opacity: 0, duration: 0.04 }, 0.16);
      tl.to(scenes[1], { opacity: 1, duration: 0.04 }, 0.16);

      cards.forEach((card) => {
        const cat = card.dataset.category;
        const catInfo = CATEGORIES.find((c) => c.key === cat);
        if (!catInfo) return;
        tl.to(card, {
          x: () => {
            const rect = canvas.getBoundingClientRect();
            return (catInfo.x / 100) * rect.width - rect.width / 2 + (Math.random() - 0.5) * 40;
          },
          y: () => {
            const rect = canvas.getBoundingClientRect();
            return (catInfo.y / 100) * rect.height - rect.height / 2 + (Math.random() - 0.5) * 30;
          },
          rotation: (Math.random() - 0.5) * 8,
          duration: 0.12,
          ease: "power2.inOut",
        }, 0.18);
      });

      tl.to(categoryLabels, { opacity: 1, scale: 1, duration: 0.06, stagger: 0.01, ease: "back.out(1.4)" }, 0.25);
      tl.to(connectionLines, { opacity: 0.6, scaleX: 1, duration: 0.06, stagger: 0.01, ease: "power2.out" }, 0.28);

      tl.fromTo(copyBlocks[1], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.06 }, 0.2);
      tl.to(copyBlocks[1], { opacity: 0, y: -20, duration: 0.04 }, 0.33);

      // SCENE 3: AI Automation Layer (0.35 -> 0.55)
      tl.to(scenes[1], { opacity: 0, duration: 0.04 }, 0.36);
      tl.to(scenes[2], { opacity: 1, duration: 0.04 }, 0.36);

      tl.to(categoryLabels, { opacity: 0.3, duration: 0.06 }, 0.36);
      tl.to(cards, { opacity: 0.15, scale: 0.7, duration: 0.08, ease: "power2.in" }, 0.36);
      tl.to(aiCore, { opacity: 1, scale: 1, duration: 0.08, ease: "back.out(1.7)" }, 0.38);

      if (workflowLine) {
        tl.to(workflowLine, { strokeDashoffset: 0, duration: 0.12, ease: "power2.inOut" }, 0.4);
      }

      tl.to(connectionLines, { opacity: 0.9, duration: 0.04 }, 0.42);

      tl.fromTo(copyBlocks[2], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.06 }, 0.38);
      tl.to(copyBlocks[2], { opacity: 0, y: -20, duration: 0.04 }, 0.53);

      // SCENE 4: Automated Sales Funnel (0.55 -> 0.75)
      tl.to(scenes[2], { opacity: 0, duration: 0.04 }, 0.56);
      tl.to(scenes[3], { opacity: 1, duration: 0.04 }, 0.56);

      tl.to(cards, { opacity: 0, duration: 0.06 }, 0.55);
      tl.to(aiCore, { opacity: 0.3, scale: 0.8, y: -40, duration: 0.06 }, 0.55);
      tl.to(categoryLabels, { opacity: 0, duration: 0.04 }, 0.55);
      tl.to(connectionLines, { opacity: 0, duration: 0.04 }, 0.55);

      funnelStages.forEach((stage, i) => {
        tl.to(stage, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.04,
          ease: "back.out(1.4)",
        }, 0.58 + i * 0.025);
      });

      tl.fromTo(copyBlocks[3], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.06 }, 0.58);
      tl.to(copyBlocks[3], { opacity: 0, y: -20, duration: 0.04 }, 0.73);

      // SCENE 5: Calm System (0.75 -> 1.0)
      tl.to(scenes[3], { opacity: 0, duration: 0.04 }, 0.76);
      tl.to(scenes[4], { opacity: 1, duration: 0.04 }, 0.76);

      tl.to(funnelStages, { opacity: 0.2, scale: 0.85, y: -20, duration: 0.06 }, 0.76);
      tl.to(dashboardEl, { opacity: 1, scale: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.78);

      tl.fromTo(copyBlocks[4], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08 }, 0.78);

      cards.forEach((card) => {
        gsap.to(card, {
          y: `+=${8 + Math.random() * 12}`,
          x: `+=${(Math.random() - 0.5) * 10}`,
          duration: 2.5 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });

      return () => {
        tl.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      const mobileScenes = gsap.utils.toArray<HTMLElement>(".journey-mobile-scene", container);

      mobileScenes.forEach((scene) => {
        gsap.fromTo(scene,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scene,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      {/* Desktop: Pinned journey */}
      <section ref={containerRef} className="journey-section hidden md:block" id="journey">
        <div className="journey-viewport">
          <div ref={canvasRef} className="journey-canvas">
            {CHAOS_CARDS.map((card, i) => (
              <div
                key={`card-${i}`}
                className="chaos-card"
                data-category={card.category}
              >
                <card.Icon className="chaos-card-icon" />
                <span className="chaos-card-label">{card.label}</span>
              </div>
            ))}

            {CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                className="category-label"
                style={{ left: `${cat.x}%`, top: `${cat.y}%` }}
              >
                {cat.label}
              </div>
            ))}

            <svg className="connection-lines-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line className="connection-line" x1="45" y1="22" x2="61" y2="38" />
              <line className="connection-line" x1="78" y1="22" x2="61" y2="38" />
              <line className="connection-line" x1="45" y1="58" x2="61" y2="38" />
              <line className="connection-line" x1="78" y1="58" x2="61" y2="38" />
              <line className="connection-line" x1="61" y1="78" x2="61" y2="38" />
            </svg>

            <div className="ai-core">
              <div className="ai-core-ring" />
              <div className="ai-core-ring ai-core-ring-2" />
              <div className="ai-core-inner">AI</div>
              <svg className="workflow-svg" viewBox="0 0 600 200" fill="none">
                <path
                  className="workflow-path"
                  d="M 20 100 C 80 100 100 40 160 40 S 240 100 300 100 S 380 40 440 40 S 520 100 580 100"
                  stroke="url(#workflow-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="workflow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--accent-warm)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="funnel-container">
              {FUNNEL_STAGES.map((stage, i) => (
                <div key={stage.label} className="funnel-stage">
                  <div className="funnel-stage-icon">
                    <stage.Icon className="funnel-stage-svg" />
                  </div>
                  <div className="funnel-stage-label">{stage.label}</div>
                  {i < FUNNEL_STAGES.length - 1 && (
                    <svg className="funnel-arrow-svg" viewBox="0 0 24 12" fill="none">
                      <path d="M0 6h20m0 0l-5-5m5 5l-5 5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <div className="dashboard-final">
              <div className="dashboard-header">
                <span className="dashboard-dot dashboard-dot-green" />
                <span className="dashboard-dot dashboard-dot-blue" />
                <span className="dashboard-dot dashboard-dot-purple" />
                <span className="dashboard-title">Agency Automation Dashboard</span>
              </div>
              <div className="dashboard-grid">
                {DASHBOARD_METRICS.map((metric) => (
                  <div key={metric.label} className="dashboard-metric">
                    <span className="dashboard-metric-value">0{metric.suffix}</span>
                    <span className="dashboard-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
              <div className="dashboard-bar-chart">
                {BAR_HEIGHTS.map((h, i) => (
                  <div key={i} className="dashboard-bar" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="journey-grid-bg" aria-hidden="true" />
          </div>

          {SCENE_COPY.map((scene, i) => (
            <div key={`scene-${i}`} className={`journey-scene ${i === 0 ? "active" : ""}`}>
              <div className="scene-copy">
                <p className="section-eyebrow">{scene.eyebrow}</p>
                <h2 className="scene-title">{scene.title}</h2>
                <p className="scene-subtitle">{scene.subtitle}</p>
              </div>
            </div>
          ))}

          <div className="journey-scene journey-cta-scene" style={{ opacity: 0 }}>
            <div className="scene-copy">
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href="/contact" trackingEvent="journey_audit_click">
                  Book Free Automation Audit
                </ButtonLink>
                <ButtonLink href="/checklist" variant="secondary" trackingEvent="journey_checklist_click">
                  Get the Checklist
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="journey-progress">
            {SCENE_COPY.map((_, i) => (
              <div key={`dot-${i}`} className="journey-progress-dot" />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile: Stacked journey */}
      <section className="journey-mobile md:hidden" id="journey-mobile">
        {SCENE_COPY.map((scene, i) => (
          <div key={`mobile-${i}`} className="journey-mobile-scene">
            <div className="shell">
              <div className="journey-mobile-card">
                <div className="journey-mobile-number">{String(i + 1).padStart(2, "0")}</div>
                <p className="section-eyebrow">{scene.eyebrow}</p>
                <h3 className="journey-mobile-title">{scene.title}</h3>
                <p className="journey-mobile-subtitle">{scene.subtitle}</p>

                {i === 0 && (
                  <div className="journey-mobile-visual">
                    {CHAOS_CARDS.slice(0, 6).map((card, j) => (
                      <div key={j} className="chaos-card-mini">
                        <card.Icon className="h-3.5 w-3.5 shrink-0" />
                        <span>{card.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {i === 3 && (
                  <div className="journey-mobile-funnel">
                    {FUNNEL_STAGES.map((stage, j) => (
                      <div key={j} className="funnel-stage-mini">
                        <stage.Icon className="h-3.5 w-3.5 shrink-0 text-[color:var(--accent)]" />
                        <span>{stage.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {i === 4 && (
                  <div className="journey-mobile-cta">
                    <ButtonLink href="/contact" trackingEvent="journey_mobile_audit_click">
                      Book Free Automation Audit
                    </ButtonLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
