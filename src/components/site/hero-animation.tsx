"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type HeroAnimationProps = {
  children: React.ReactNode;
};

export function HeroAnimation({ children }: HeroAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const eyebrow = el.querySelector("[data-hero-eyebrow]");
      const lines = el.querySelectorAll("[data-hero-line] > span");
      const paragraph = el.querySelector("[data-hero-copy]");
      const buttons = el.querySelectorAll("[data-hero-cta]");
      const credibility = el.querySelector("[data-hero-credibility]");
      const capacity = el.querySelector("[data-hero-capacity]");
      const fadeTargets = [eyebrow, paragraph, ...Array.from(buttons), credibility, capacity].filter(
        Boolean,
      );

      if (reducedMotion) {
        gsap.set([...fadeTargets, ...Array.from(lines)], {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set(fadeTargets, { opacity: 0, y: 24 });
      gsap.set(lines, { yPercent: 112 });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.25)
        .to(paragraph, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
        .to(buttons, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1.0)
        .to([credibility, capacity], { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1.15);
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}

export function HeroTitle() {
  return (
    <h1
      className="display-title max-w-[15ch] text-balance"
      data-hero-title
      aria-label="I build the AI systems your team keeps saying it needs."
    >
      <span className="title-line" data-hero-line>
        <span>I build the AI systems</span>
      </span>
      <span className="title-line" data-hero-line>
        <span>your team keeps saying</span>
      </span>
      <span className="title-line" data-hero-line>
        <span><em>it needs.</em></span>
      </span>
    </h1>
  );
}
