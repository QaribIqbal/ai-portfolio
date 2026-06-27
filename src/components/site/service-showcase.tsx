"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ServiceShowcaseProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  features: { text: React.ReactNode }[];
  stat: { value: string; label: string };
  visual: React.ReactNode;
  reverse?: boolean;
};

export function ServiceShowcase({
  eyebrow,
  title,
  description,
  features,
  stat,
  visual,
  reverse = false,
}: ServiceShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const textSide = el.querySelector<HTMLElement>(".svc-text-side");
        const visualSide = el.querySelector<HTMLElement>(".svc-visual-side");
        const featureItems = gsap.utils.toArray<HTMLElement>(".svc-feature", el);
        const statEl = el.querySelector<HTMLElement>(".svc-stat");
        const descEl = el.querySelector<HTMLElement>(".svc-showcase-desc");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        });

        if (textSide) {
          tl.fromTo(
            textSide,
            { opacity: 0, x: reverse ? 60 : -60, y: 30 },
            { opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out" },
            0,
          );
        }

        if (visualSide) {
          tl.fromTo(
            visualSide,
            { opacity: 0, x: reverse ? -60 : 60, y: 30, scale: 0.95 },
            { opacity: 1, x: 0, y: 0, scale: 1, duration: 1, ease: "power3.out" },
            0.15,
          );
        }

        if (descEl) {
          tl.fromTo(
            descEl,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            0.3,
          );
        }

        featureItems.forEach((item, i) => {
          tl.fromTo(
            item,
            { opacity: 0, x: reverse ? 20 : -20, y: 15 },
            { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out" },
            0.4 + i * 0.1,
          );
        });

        if (statEl) {
          tl.fromTo(
            statEl,
            { opacity: 0, scale: 0.85, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.4)" },
            0.6,
          );
        }

        const visualCard = el.querySelector<HTMLElement>(".svc-visual-card");
        if (visualCard) {
          tl.fromTo(
            visualCard,
            { rotateY: reverse ? -6 : 6, transformPerspective: 1200 },
            { rotateY: 0, duration: 1, ease: "power2.out" },
            0.15,
          );
        }

        return () => tl.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const textSide = el.querySelector<HTMLElement>(".svc-text-side");
        const visualSide = el.querySelector<HTMLElement>(".svc-visual-side");

        if (textSide) {
          gsap.fromTo(textSide, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        }
        if (visualSide) {
          gsap.fromTo(visualSide, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`svc-showcase ${reverse ? "svc-showcase-reverse" : ""}`}>
      <div className="svc-text-side">
        <p className="section-eyebrow">{eyebrow}</p>
        <h3 className="svc-showcase-title">{title}</h3>
        <p className="svc-showcase-desc">{description}</p>
        <div className="svc-features">
          {features.map((f, i) => (
            <div key={i} className="svc-feature">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--accent)]" />
              <span>{f.text}</span>
            </div>
          ))}
        </div>
        <div className="svc-stat">
          <span className="svc-stat-value">{stat.value}</span>
          <span className="svc-stat-label">{stat.label}</span>
        </div>
      </div>
      <div className="svc-visual-side">{visual}</div>
    </div>
  );
}
