"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getHorizontalTravel } from "@/lib/horizontal-scroll";

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
      const servicesSection = document.querySelector<HTMLElement>("[data-horizontal-section='services']");
      const servicesTrack = document.querySelector<HTMLElement>("[data-horizontal-track='services']");

      if (servicesTrack) {
        servicesTrack.dataset.horizontalMode = "native";
        gsap.set(servicesTrack, { x: 0 });
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!servicesSection || !servicesTrack) return;

        servicesTrack.dataset.horizontalMode = "forced";

        const getHeaderOffset = () =>
          Math.round(document.querySelector("header")?.getBoundingClientRect().height ?? 0);
        const getTotalShift = () => getHorizontalTravel(servicesTrack.scrollWidth, servicesTrack.clientWidth);
        if (getTotalShift() <= 0) {
          servicesTrack.dataset.horizontalMode = "native";
          return;
        }

        const horizontalTween = gsap.to(servicesTrack, {
          x: () => -getTotalShift(),
          ease: "none",
          force3D: true,
          overwrite: "auto",
          scrollTrigger: {
            id: "services-horizontal-scroll",
            trigger: servicesSection,
            start: () => `top top+=${Math.round(getHeaderOffset() + window.innerHeight * -0.45)}`,
            end: () => `+=${Math.max(getTotalShift() * 0.35, window.innerHeight * 1.75)}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          horizontalTween.kill();
          servicesTrack.dataset.horizontalMode = "native";
          gsap.set(servicesTrack, { x: 0 });
        };
      });

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

      return () => mm.revert();
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
