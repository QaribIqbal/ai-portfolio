"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  as?: "div" | "section" | "span";
};

export function ScrollParallax({
  children,
  className,
  speed = 0.3,
  as: Tag = "div",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(el, {
        y: () => speed * -100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}

type WordRevealProps = {
  text: string;
  className?: string;
  tag?: "h2" | "h3" | "p";
};

export function ScrollWordReveal({ text, className, tag: Tag = "h2" }: WordRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.querySelectorAll<HTMLElement>(".word").forEach((w) => {
          w.style.opacity = "1";
        });
        return;
      }

      const words = gsap.utils.toArray<HTMLElement>(".word", el);

      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.8,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={cn(className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="word" style={{ display: "inline-block", marginRight: "0.3em" }}>
          {word}
        </span>
      ))}
    </Tag>
  );
}

type ScaleRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollScaleReveal({ children, className }: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        el,
        { scale: 0.85, opacity: 0, y: 60 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

type SectionDepthProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollSectionDepth({ children, className }: SectionDepthProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 120, scale: 0.92, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
