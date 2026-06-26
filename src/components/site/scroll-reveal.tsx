"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  as?: "div" | "section" | "article";
};

export function ScrollReveal({
  children,
  className,
  stagger = false,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    if (stagger) {
      const children = el.querySelectorAll(".reveal");
      for (const child of children) {
        observer.observe(child);
      }
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [stagger]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        !stagger && "reveal",
        stagger && "reveal-stagger",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
