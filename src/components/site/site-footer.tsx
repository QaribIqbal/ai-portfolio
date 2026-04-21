import { Linkedin } from "lucide-react";

import { ButtonLink } from "@/components/site/button-link";
import { siteConfig } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="section-frame border-t border-[color:var(--line)] pb-10 pt-14">
      <div className="shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="section-eyebrow">For Lean Marketing Agencies</p>
          <h2 className="max-w-xl text-[clamp(1.8rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-[color:var(--text-main)]">
            Cleaner systems beat more software.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--text-muted)]">
            Start with a free automation audit for a clear diagnosis, then run a focused sprint to
            fix one workflow at a time.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/contact" trackingEvent="footer_audit_click">{siteConfig.primaryCta}</ButtonLink>
            <ButtonLink href="/checklist" variant="secondary" trackingEvent="footer_checklist_click">
              {siteConfig.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="subtle-card space-y-4">
          {/* review: change-7 */}
          <a href={`mailto:${siteConfig.email}`} className="footer-email-link text-sm">
            {siteConfig.email}
          </a>
          {/* review: change-7 */}
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
      <p className="footer-copyright mt-8 text-center">© 2026 Qarib Iqbal. All rights reserved.</p>
    </footer>
  );
}
