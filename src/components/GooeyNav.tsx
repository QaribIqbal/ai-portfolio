"use client";
import React, { useRef, useEffect, useState } from "react";
import "./GooeyNav.css";
import { usePathname, useRouter } from "next/navigation";

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  const router = useRouter();
  const pathname = usePathname() || "/";

  /* ---------- existing particle / geometry helpers (unchanged) ---------- */
  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // ignore
          }
        }, t);
      }, 30);
    }
  };

  /* ---------- visual effect positioning ---------- */
  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current || !element) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  /* ---------- helper to attempt scroll to an id (smooth) ---------- */
  const scrollToHash = (hash: string) => {
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // ensure URL shows hash (without navigation)
      history.replaceState(null, "", `/#${id}`);
    }
  };

  /**
   * Core activation handler (element: the clicked anchor or its LI).
   * - element: HTMLElement clicked (anchor or a child). We'll resolve to the <li>.
   * - href: navigation target from items
   * - idx: item index
   */
  const handleItemActivation = (element: HTMLElement, href: string, idx: number) => {
    // resolve li element for positioning
    const liEl = element.tagName.toLowerCase() === "li" ? element : (element.closest("li") as HTMLElement | null);
    if (!liEl) return;

    // Update active visuals & particles (always do this so the UI responds)
    setActiveIndex(idx);
    updateEffectPosition(liEl);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current!.removeChild(p));
    }

    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth; // trigger reflow
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    // ---------- navigation logic ----------
    try {
      const isExternal = href.startsWith("http") || href.startsWith("mailto:");
      const hasHash = href.includes("#");
      const urlPath = href.split("#")[0] || "/";
      const hashPart = hasHash ? `#${href.split("#")[1]}` : "";

      // External links -> let browser handle (open in new tab from caller)
      if (isExternal) return;

      // Fragment-only or absolute fragment like "/#about" or "#about"
      if (hasHash) {
        // if already on root ("/"), just scroll to element
        if (pathname === "/" || pathname === "") {
          scrollToHash(hashPart);
          return;
        }
        // otherwise navigate to root with hash, then attempt scroll after small delay
        router.push(`/#${hashPart.replace(/^#/, "")}`);
        // attempt to scroll after navigation and DOM paint
        setTimeout(() => scrollToHash(hashPart), 120);
        return;
      }

      // Internal route without hash (e.g., "/portfolio")
      if (urlPath.startsWith("/")) {
        // if the path is already active, do nothing else
        if (pathname === urlPath) return;
        router.push(urlPath);
        return;
      }

      // fallback: try push as-is
      router.push(href);
    } catch (err) {
      // ignore navigation errors — particles still work
      // console.error(err);
    }
  };

  /* ---------- click and keyboard handlers for anchors ---------- */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, idx: number) => {
    e.preventDefault();
    handleItemActivation(e.currentTarget as HTMLElement, href, idx);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, href: string, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleItemActivation(e.currentTarget as HTMLElement, href, idx);
    }
  };

  /* ---------- keep effect positioned on resize + initial mount ---------- */
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const allLis = navRef.current.querySelectorAll("li");
    const currentActiveLi = allLis[activeIndex] as HTMLElement | undefined;
    if (currentActiveLi) {
      updateEffectPosition(currentActiveLi);
      textRef.current?.classList.add("active");
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActive = navRef.current?.querySelectorAll("li")[activeIndex] as HTMLElement;
      if (currentActive) updateEffectPosition(currentActive);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => {
            const href = item.href || "#";

            // For external links show anchor that opens new tab
            const isExternal = href.startsWith("http") || href.startsWith("mailto:");

            return (
              <li key={index} className={activeIndex === index ? "active" : ""}>
                <a
                  href={href}
                  onClick={(e) => (isExternal ? undefined : handleClick(e as any, href, index))}
                  onKeyDown={(e) => handleKeyDown(e as any, href, index)}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-current={activeIndex === index ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;
