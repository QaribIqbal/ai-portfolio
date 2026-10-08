"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { dentalStickyCta } from "@/lib/dental-content";

// Phone-only bar that appears once the hero CTA scrolls away and hides near the form or final CTA.
export function StickyAuditCta({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-sticky-cta-hide-after]");
    const blockers = document.querySelectorAll("[data-sticky-cta-hide]");
    if (!hero) return;

    const state = { pastHero: false, blocked: new Set<Element>() };
    const update = () => setVisible(state.pastHero && state.blocked.size === 0);

    const heroObserver = new IntersectionObserver(([entry]) => {
      state.pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    });
    const blockerObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) state.blocked.add(entry.target);
        else state.blocked.delete(entry.target);
      }
      update();
    });

    heroObserver.observe(hero);
    blockers.forEach((el) => blockerObserver.observe(el));
    return () => {
      heroObserver.disconnect();
      blockerObserver.disconnect();
    };
  }, []);

  return (
    <div className="dental-sticky-cta" data-visible={visible} aria-hidden={!visible}>
      <Link href={href} className="dental-cta" tabIndex={visible ? 0 : -1}>
        {dentalStickyCta}
      </Link>
    </div>
  );
}
