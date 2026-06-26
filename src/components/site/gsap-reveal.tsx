"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type GSAPRevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  as?: "div" | "section" | "article";
};

export function GSAPReveal({
  children,
  className,
  stagger = false,
  as: Tag = "div",
}: GSAPRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = stagger ? Array.from(el.querySelectorAll<HTMLElement>("[data-gsap-reveal]")) : [el];

      if (reducedMotion) {
        gsap.set(targets, { clearProps: "all", opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        targets,
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          duration: 0.8,
          stagger: stagger ? 0.1 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [stagger] },
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}
