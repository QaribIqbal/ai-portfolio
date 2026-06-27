"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealVariant = "default" | "slide-up" | "clip-up" | "fade-scale" | "slide-left" | "slide-right";

type GSAPRevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  as?: "div" | "section" | "article";
  variant?: RevealVariant;
  delay?: number;
};

export function GSAPReveal({
  children,
  className,
  stagger = false,
  as: Tag = "div",
  variant = "default",
  delay = 0,
}: GSAPRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = stagger ? Array.from(el.querySelectorAll<HTMLElement>("[data-gsap-reveal]")) : [el];

      if (reducedMotion) {
        gsap.set(targets, { clearProps: "all", opacity: 1, y: 0, x: 0, scale: 1 });
        if (variant === "clip-up") gsap.set(el, { clipPath: "none" });
        return;
      }

      if (variant === "clip-up") {
        gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(targets, { y: 60, opacity: 0 });
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          delay,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: delay + 0.15,
          ease: "power3.out",
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        return;
      }

      const fromVars: gsap.TweenVars = (() => {
        switch (variant) {
          case "slide-left":
            return { x: -60, opacity: 0 };
          case "slide-right":
            return { x: 60, opacity: 0 };
          case "fade-scale":
            return { scale: 0.88, opacity: 0 };
          case "slide-up":
            return { y: 80, opacity: 0 };
          default:
            return { y: 48, opacity: 0, scale: 0.97 };
        }
      })();

      const toVars: gsap.TweenVars = {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        ease: variant === "slide-up" ? "power4.out" : "power3.out",
        duration: variant === "slide-up" ? 1 : 0.85,
        delay,
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      };

      gsap.fromTo(targets, fromVars, toVars);
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}
