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
        const n = stepEls.length;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 18%",
            end: `+=${n * 45}vh`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onRefresh(self) {
              if (self.pin) {
                (self.pin as HTMLElement).style.zIndex = "1";
              }
              if (self.spacer) {
                (self.spacer as HTMLElement).style.zIndex = "1";
              }
            },
          },
        });

        if (lineFill) {
          tl.fromTo(
            lineFill,
            { scaleY: 0 },
            { scaleY: 1, duration: 1, ease: "none" },
            0,
          );
        }

        stepEls.forEach((step, i) => {
          const dot = step.querySelector<HTMLElement>(".pp-dot");
          const content = step.querySelector<HTMLElement>(".pp-content");
          const t = i / Math.max(n - 1, 1);

          tl.fromTo(
            step,
            { opacity: 0.15 },
            { opacity: 1, duration: 0.15, ease: "power2.out" },
            t * 0.85,
          );

          if (content) {
            tl.fromTo(
              content,
              { y: 18, scale: 0.98 },
              { y: 0, scale: 1, duration: 0.18, ease: "power3.out" },
              t * 0.85,
            );
          }

          if (dot) {
            tl.to(
              dot,
              {
                scale: 1.3,
                boxShadow:
                  "0 0 0 6px color-mix(in oklch, var(--accent) 22%, transparent)",
                duration: 0.1,
              },
              t * 0.85,
            );
          }

          if (i < n - 1) {
            tl.to(
              step,
              { opacity: 0.35, duration: 0.12 },
              Math.min(t * 0.85 + 0.2, 0.95),
            );
          }
        });

        return () => tl.kill();
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
