import { Instagram, Linkedin } from "lucide-react";

import { ButtonLink } from "@/components/site/button-link";
import { DENTAL_INSTAGRAM_URL } from "@/lib/dental-content";
import { siteConfig } from "@/lib/site-content";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-frame border-t border-[color:color-mix(in_oklch,var(--accent)_8%,var(--line))] pb-16 pt-20">
      <div className="shell grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="section-eyebrow">Qarib Iqbal / Missed-call and lost-patient recovery</p>
          <h2 className="max-w-xl font-[family:var(--font-display)] text-[clamp(2.2rem,3.6vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[color:var(--text-main)]">
            Missed calls become booked appointments.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--text-muted)]">
            Missed-call text-back and patient reactivation for Australian dental clinics.
            Running a marketing agency? There is a separate path for agencies.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/dental#audit" trackingEvent="footer_dental_audit_click">{siteConfig.dentalCta}</ButtonLink>
            <ButtonLink href="/agencies" variant="secondary" trackingEvent="footer_agencies_click">
              For agencies
            </ButtonLink>
          </div>
        </div>

        <div className="subtle-card space-y-4">
          {/* review: change-7 */}
          <a href={`mailto:${siteConfig.email}`} className="footer-email-link text-sm">
            {siteConfig.email}
          </a>
          {/* review: change-7 */}
          <ButtonLink href={DENTAL_INSTAGRAM_URL} variant="ghost" external trackingEvent="instagram_footer_click">
            <span className="inline-flex items-center gap-2">
              <Instagram className="h-4 w-4" aria-hidden="true" />
              Instagram
            </span>
          </ButtonLink>
          <ButtonLink href={siteConfig.linkedin} variant="ghost" external trackingEvent="linkedin_footer_click">
            <span className="inline-flex items-center gap-2">
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </span>
          </ButtonLink>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.1em] text-[color:var(--text-subtle)]">
            <ButtonLink href="/about" variant="ghost" trackingEvent="footer_about_click">
              About
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost" trackingEvent="footer_services_click">
              Services
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="ghost" trackingEvent="footer_case_studies_click">
              Case Studies
            </ButtonLink>
          </div>
        </div>
      </div>
      {/* review: change-7 */}
      <div className="soft-divider mt-10" />
      <p className="footer-copyright mt-6 text-center">
        © {currentYear} Qarib Iqbal. All rights reserved.
      </p>
    </footer>
  );
}
