"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import SplitText from "@/components/SplitText";

gsap.registerPlugin(useGSAP);

const HERO_TITLE = "Remove one high-cost manual bottleneck in 21 days.";

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
      const title = el.querySelector("[data-hero-title]");
      const paragraph = el.querySelector("[data-hero-copy]");
      const buttons = el.querySelectorAll("[data-hero-cta]");
      const credibility = el.querySelector("[data-hero-credibility]");
      const capacity = el.querySelector("[data-hero-capacity]");
      const targets = [eyebrow, title, paragraph, ...Array.from(buttons), credibility, capacity].filter(Boolean);

      if (reducedMotion) {
        gsap.set(targets, { clearProps: "all", opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: 22, scale: 0.985 });

      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.74 } })
        .to(eyebrow, { opacity: 1, y: 0, scale: 1 }, 0)
        .to(title, { opacity: 1, y: 0, scale: 1 }, 0.2)
        .to(paragraph, { opacity: 1, y: 0, scale: 1 }, 0.5)
        .to(buttons, { opacity: 1, y: 0, scale: 1, stagger: 0.1 }, 0.7)
        .to([credibility, capacity], { opacity: 1, y: 0, scale: 1, stagger: 0.08 }, 0.9);
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}

export function HeroTitle() {
  return (
    <div data-hero-title>
      <SplitText
        text={HERO_TITLE}
        tag="h1"
        splitType="words"
        textAlign="left"
        className="display-title max-w-[17ch] text-balance"
        delay={80}
        duration={0.72}
        from={{ opacity: 0, y: 32 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0}
        rootMargin="0px"
      />
    </div>
  );
}
