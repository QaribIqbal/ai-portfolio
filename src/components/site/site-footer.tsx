import { Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/site/button-link";
import { auLocations } from "@/lib/au-locations";
import { DENTAL_INSTAGRAM_URL } from "@/lib/dental-content";
import { siteConfig } from "@/lib/site-content";

const dentalLinks = [
  { href: "/dental", label: "Dental clinics" },
  { href: "/dental#audit", label: "Free Leak Audit" },
  { href: "/dental/guides", label: "Guides" },
  ...auLocations.slice(0, 3).map((location) => ({ href: `/dental/${location.slug}`, label: location.city })),
];

const moreLinks = [
  { href: "/agencies", label: "For agencies" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/checklist", label: "Agency checklist" },
  { href: "/services", label: "Agency services" },
  { href: "/about", label: "About" },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-frame border-t border-[color:var(--line)] pb-12 pt-16 sm:pt-20">
      <div className="shell footer-grid">
        <div className="space-y-5">
          <p className="section-eyebrow">Qarib Iqbal / Missed-call and lost-patient recovery</p>
          <h2 className="max-w-xl font-[family:var(--font-display)] text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[color:var(--text-main)]">
            Missed calls become booked appointments.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--text-muted)]">
            Missed-call text-back and patient reactivation for Australian dental clinics.
          </p>
          <ButtonLink href="/dental#audit" className="max-sm:w-full" trackingEvent="footer_dental_audit_click">
            {siteConfig.dentalCta}
          </ButtonLink>
        </div>

        <nav className="footer-columns" aria-label="Footer">
          <div className="footer-col">
            <h3>Dental</h3>
            <ul>
              {dentalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h3>More</h3>
            <ul>
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email
                </a>
              </li>
              <li>
                <a href={DENTAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="soft-divider mt-12" />
      <p className="footer-copyright mt-6 text-center">© {currentYear} Qarib Iqbal. All rights reserved.</p>
    </footer>
  );
}
