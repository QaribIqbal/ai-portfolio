"use client";

import { useEffect, useState } from "react";

type SectionItem = {
  id: string;
  label: string;
};

export function SectionRail({ sections }: { sections: SectionItem[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (!element) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(section.id);
            }
          }
        },
        {
          rootMargin: "-35% 0px -45% 0px",
          threshold: 0.05,
        },
      );

      observer.observe(element);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) observer.disconnect();
    };
  }, [sections]);

  return (
    <nav aria-label="Section progress" className="section-rail">
      {sections.map((section) => {
        const active = section.id === activeId;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`section-rail-item ${active ? "section-rail-item-active" : ""}`}
            aria-current={active ? "true" : undefined}
          >
            <span className="section-rail-dot" aria-hidden="true" />
            <span className="section-rail-label">{section.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
