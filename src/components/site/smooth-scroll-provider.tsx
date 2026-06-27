"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useSmoothScroll() {
  return useContext(LenisContext);
}

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 1.5,
      wheelMultiplier: 1.5,
      touchMultiplier: 2,
      syncTouch: false,
    });

    setLenisInstance(lenis);

    const onLenisScroll = () => ScrollTrigger.update();
    const lenisRaf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", onLenisScroll);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    const handleHashClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      const prefix = href.slice(0, hashIndex);
      if (prefix && prefix !== "/" && prefix !== window.location.pathname) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", handleHashClick);

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        requestAnimationFrame(() => lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.6 }));
      }
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const sections = gsap.utils.toArray<HTMLElement>(".section-slice");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { backgroundPositionY: "0%" },
          {
            backgroundPositionY: "16%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          },
        );
      });

      // Hero scroll-away: panel scales down, fades, shifts up as user scrolls past
      const heroPanel = document.querySelector<HTMLElement>(".hero-panel");
      const heroSection = document.querySelector<HTMLElement>(".section-slice-hero");
      if (heroPanel && heroSection) {
        gsap.to(heroPanel, {
          y: -100,
          scale: 0.93,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
          },
        });
      }

      mm.add("(min-width: 768px)", () => {
        // Section depth entrance: shells rise with subtle scale and fade
        document
          .querySelectorAll<HTMLElement>("[data-depth-section] > .shell")
          .forEach((shell) => {
            const section = shell.closest<HTMLElement>(".page-section");
            if (!section) return;
            gsap.fromTo(
              shell,
              { y: 60, opacity: 0.4 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top 92%",
                  end: "top 30%",
                  scrub: 0.6,
                },
              },
            );
          });

        // Panel 3D tilt on scroll entrance
        gsap.utils
          .toArray<HTMLElement>("[data-tilt-card]")
          .forEach((panel) => {
            gsap.fromTo(
              panel,
              { rotateX: 5, transformPerspective: 1200, y: 24 },
              {
                rotateX: 0,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 92%",
                  end: "top 55%",
                  scrub: 0.5,
                },
              },
            );
          });

        // Service visual-side parallax: visuals move slower than text
        gsap.utils
          .toArray<HTMLElement>(".svc-visual-side")
          .forEach((el) => {
            const showcase = el.closest<HTMLElement>(".svc-showcase");
            if (!showcase) return;
            gsap.fromTo(
              el,
              { y: 60 },
              {
                y: -60,
                ease: "none",
                scrollTrigger: {
                  trigger: showcase,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", handleHashClick);
      ctx.revert();
      gsap.ticker.remove(lenisRaf);
      (lenis as unknown as { off?: (event: string, cb: () => void) => void }).off?.("scroll", onLenisScroll);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return <LenisContext.Provider value={lenisInstance}>{children}</LenisContext.Provider>;
}
