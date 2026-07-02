"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ProcessStep = {
  num: string;
  title: string;
  desc: React.ReactNode;
};

type PinnedProcessProps = {
  steps: ProcessStep[];
};

export function PinnedProcess({ steps }: PinnedProcessProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) {
        gsap.set(".pp-step", { opacity: 1 });
        gsap.set(".pp-line-fill", { scaleY: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const stepEls = gsap.utils.toArray<HTMLElement>(".pp-step", el);
        const lineFill = el.querySelector<HTMLElement>(".pp-line-fill");

        // Line fill tracks scroll progress through the whole timeline —
        // no pinning, so trigger positions stay valid even when other
        // pinned sections change the document height.
        if (lineFill) {
          gsap.fromTo(
            lineFill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 70%",
                end: "bottom 55%",
                scrub: 0.6,
              },
            },
          );
        }

        stepEls.forEach((step) => {
          const dot = step.querySelector<HTMLElement>(".pp-dot");
          const content = step.querySelector<HTMLElement>(".pp-content");

          gsap.fromTo(
            step,
            { opacity: 0.15 },
            {
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: step, start: "top 72%", once: true },
            },
          );

          if (content) {
            gsap.fromTo(
              content,
              { y: 36, scale: 0.97 },
              {
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: step, start: "top 72%", once: true },
              },
            );
          }

          if (dot) {
            gsap.to(dot, {
              scale: 1.3,
              boxShadow:
                "0 0 0 6px color-mix(in oklch, var(--accent) 22%, transparent)",
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: { trigger: step, start: "top 72%", once: true },
            });
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(".pp-step", { opacity: 1 });
        gsap.set(".pp-line-fill", { scaleY: 1 });

        gsap.utils.toArray<HTMLElement>(".pp-step", el).forEach((step) => {
          const content = step.querySelector<HTMLElement>(".pp-content");
          if (!content) return;
          gsap.fromTo(
            content,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 85%", once: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="pp-wrapper mt-12">
      <div className="pp-track">
        <div className="pp-line">
          <div className="pp-line-fill" />
        </div>
        <div className="pp-steps">
          {steps.map((step) => (
            <div key={step.num} className="pp-step">
              <div className="pp-dot-col">
                <div className="pp-dot" />
              </div>
              <div className="pp-content panel">
                <span className="process-step-num">{step.num}</span>
                <h3 className="mt-3 text-[1.3rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.8] text-[color:var(--text-muted)]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
