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

      const textSide = el.querySelector(".svc-text-side");
      const visualSide = el.querySelector(".svc-visual-side");
      const featureItems = gsap.utils.toArray<HTMLElement>(".svc-feature", el);
      const statEl = el.querySelector(".svc-stat");

      if (textSide) {
        gsap.fromTo(
          textSide,
          { opacity: 0, x: reverse ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          },
        );
      }

      if (visualSide) {
        gsap.fromTo(
          visualSide,
          { opacity: 0, x: reverse ? -50 : 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          },
        );
      }

      gsap.fromTo(
        featureItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        },
      );

      if (statEl) {
        gsap.fromTo(
          statEl,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: statEl, start: "top 90%", once: true },
          },
        );
      }
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
