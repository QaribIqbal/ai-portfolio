"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionSnap() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getSnapPoints = () => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-snap-section]");
        const totalHeight = document.body.scrollHeight - window.innerHeight;

        if (totalHeight <= 0) return [0];

        const sectionPoints = sections
          .filter((section) => section.offsetHeight <= window.innerHeight * 1.5)
          .map((section) => section.offsetTop / totalHeight);

        return Array.from(new Set([0, ...sectionPoints]));
      };

      const snapTrigger = ScrollTrigger.create({
        snap: {
          snapTo: (progress) => gsap.utils.snap(getSnapPoints(), progress),
          duration: { min: 0.3, max: 0.6 },
          delay: 0.05,
          ease: "power2.inOut",
        },
        invalidateOnRefresh: true,
      });

      return () => snapTrigger.kill();
    });

    return () => mm.revert();
  }, []);

  return null;
}
