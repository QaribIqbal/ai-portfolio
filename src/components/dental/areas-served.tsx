import Link from "next/link";

import { auLocations } from "@/lib/au-locations";
import { dentalGuides } from "@/lib/dental-guides";

export function AreasServed({ currentSlug }: { currentSlug?: string }) {
  return (
    <section className="lp-section lp-areas" aria-labelledby="lp-areas-title">
      <div className="lp-shell">
        <p className="lp-eyebrow">Australia-wide</p>
        <h2 id="lp-areas-title" className="lp-h2">
          Dental clinics across Australia
        </h2>
        <ul className="lp-area-links">
          {auLocations.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/dental/${location.slug}`}
                aria-current={location.slug === currentSlug ? "page" : undefined}
              >
                {location.city} <span>{location.stateCode}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="lp-guides-heading">Guides for practice owners</h3>
        <ul className="lp-guide-links">
          {dentalGuides.map((guide) => (
            <li key={guide.slug}>
              <Link href={`/dental/guides/${guide.slug}`}>{guide.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
