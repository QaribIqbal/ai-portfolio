"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Lenis from "lenis";
import { animate } from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildHorizontalSnapPoints, getHorizontalTravel } from "@/lib/horizontal-scroll";

gsap.registerPlugin(ScrollTrigger);

const THEME_KEY = "site-theme";

function getSystemTheme() {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ExperienceShell() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showLoader, setShowLoader] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const nextTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : getSystemTheme();
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setShowLoader(false);
      return;
    }

    const bars = loaderRef.current?.querySelectorAll(".site-loader-bar");
    if (!bars || bars.length === 0) return;

    animate(bars, {
      scaleY: [0.4, 1],
      opacity: [0.3, 1],
      duration: 520,
      delay: (_, index) => index * 80,
      direction: "alternate",
      loop: true,
      ease: "inOutSine",
    });

    const timer = window.setTimeout(() => {
      if (!loaderRef.current) return;
      animate(loaderRef.current, {
        opacity: [1, 0],
        scale: [1, 1.02],
        duration: 640,
        ease: "inOutSine",
        complete: () => setShowLoader(false),
      });
    }, 1400);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      duration: 1.08,
      wheelMultiplier: 1.08,
    });
    const onLenisScroll = () => ScrollTrigger.update();
    const lenisRaf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", onLenisScroll);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.defaults({
        markers: false,
      });

      const animations: gsap.core.Tween[] = [];
      const servicesSection = scopeRef.current?.querySelector<HTMLElement>("[data-horizontal-section='services']");
      const servicesTrack = scopeRef.current?.querySelector<HTMLElement>("[data-horizontal-track='services']");

      if (servicesTrack) {
        servicesTrack.dataset.horizontalMode = "native";
        gsap.set(servicesTrack, { x: 0 });
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cleanupImageListeners: Array<() => void> = [];

        if (servicesSection && servicesTrack) {
          servicesTrack.dataset.horizontalMode = "forced";

          const getHeaderOffset = () =>
            Math.round(document.querySelector("header")?.getBoundingClientRect().height ?? 0);
          const getTotalShift = () => getHorizontalTravel(servicesTrack.scrollWidth, servicesTrack.clientWidth);
          const getSnapPoints = () =>
            buildHorizontalSnapPoints(
              Array.from(servicesTrack.children).map((child) => (child as HTMLElement).offsetLeft),
              getTotalShift(),
            );

          if (getTotalShift() > 0) {
            const horizontalTween = gsap.to(servicesTrack, {
              x: () => -getTotalShift(),
              ease: "none",
              force3D: true,
              overwrite: "auto",
              scrollTrigger: {
                id: "services-horizontal-scroll",
                trigger: servicesSection,
                start: () => `top top`,
                end: () => `+=${getTotalShift()}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                snap: {
                  snapTo: (progress: number) => gsap.utils.snap(getSnapPoints(), progress),
                  duration: { min: 0.16, max: 0.32 },
                  delay: 0.04,
                  ease: "power1.inOut",
                },
                anticipatePin: 1,
                fastScrollEnd: true,
                invalidateOnRefresh: true,
              },
            });

            animations.push(horizontalTween);
          }

          const images = servicesTrack.querySelectorAll<HTMLImageElement>("img");
          images.forEach((image) => {
            if (image.complete) return;
            const onLoad = () => ScrollTrigger.refresh();
            image.addEventListener("load", onLoad, { once: true });
            cleanupImageListeners.push(() => image.removeEventListener("load", onLoad));
          });
        }

        ScrollTrigger.refresh();

        return () => {
          cleanupImageListeners.forEach((cleanup) => cleanup());
          if (servicesTrack) {
            servicesTrack.dataset.horizontalMode = "native";
            gsap.set(servicesTrack, { x: 0 });
          }
        };
      });

      const heroVisual = document.querySelector<HTMLElement>(".hero-visual-main");
      if (heroVisual) {
        const heroTween = gsap.to(heroVisual, {
          yPercent: 28,
          xPercent: -10,
          rotate: -14,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-slice-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.05,
          },
        });
        animations.push(heroTween);
      }

      const parallaxAssets = gsap.utils.toArray<HTMLElement>("[data-parallax='asset']");
      parallaxAssets.forEach((asset, index) => {
        const tween = gsap.fromTo(
          asset,
          {
            y: 22 + index * 4,
            opacity: 0.5,
            rotate: -2,
          },
          {
            y: -16 - index * 2,
            opacity: 1,
            rotate: 2,
            ease: "none",
            scrollTrigger: {
              trigger: asset.closest(".section-slice") ?? asset,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.15,
            },
          },
        );
        animations.push(tween);
      });

      const sections = gsap.utils.toArray<HTMLElement>(".section-slice");
      sections.forEach((section) => {
        const tween = gsap.fromTo(
          section,
          { backgroundPositionY: "0%" },
          {
            backgroundPositionY: "16%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          },
        );
        animations.push(tween);
      });

      const cinematicCards = gsap.utils.toArray<HTMLElement>(".kinetic-panel");
      cinematicCards.forEach((card) => {
        const tween = gsap.fromTo(
          card,
          { y: 26, rotateX: 6, opacity: 0.82, transformOrigin: "50% 100%" },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.94,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );
        animations.push(tween);
      });

      ScrollTrigger.refresh();

      return () => {
        animations.forEach((tween) => tween.kill());
        mm.revert();
      };
    }, scopeRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(lenisRaf);
      (lenis as unknown as { off?: (event: string, cb: () => void) => void }).off?.("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={scopeRef}>
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
      </button>

      {showLoader ? (
        <div ref={loaderRef} className="site-loader" aria-hidden="true">
          <div className="site-loader-mark">
            <span className="site-loader-dot" />
            <span>Qarib Iqbal</span>
          </div>
          <div className="site-loader-bars">
            <span className="site-loader-bar" />
            <span className="site-loader-bar" />
            <span className="site-loader-bar" />
            <span className="site-loader-bar" />
            <span className="site-loader-bar" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
