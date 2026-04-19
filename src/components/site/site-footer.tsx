import Link from "next/link";
import { Calendar, Linkedin, Mail } from "lucide-react";

import { ButtonLink } from "@/components/site/button-link";
import { articles, navigation, siteConfig } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="section-frame border-t border-[color:var(--line)] pb-10 pt-14">
      <div className="shell grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.9fr]">
        <div className="space-y-5">
          <p className="section-eyebrow">For Lean Marketing Agencies</p>
          <h2 className="max-w-xl text-[clamp(1.8rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-[color:var(--text-main)]">
            Cleaner systems beat more software.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--text-muted)]">
            Qarib designs and implements AI automation systems for agencies that want faster lead
            follow-up, cleaner reporting, smoother onboarding, and less repetitive operational work.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/checklist">{siteConfig.primaryCta}</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {siteConfig.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="subtle-card">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
            Navigate
          </h3>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm leading-7 text-[color:var(--text-muted)] transition hover:text-[color:var(--text-main)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="subtle-card space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
              Planned Articles
            </h3>
            <ul className="mt-5 space-y-3">
              {articles.map((article) => (
                <li key={article.title} className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {article.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[color:var(--text-muted)]">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-[color:var(--text-main)]">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-[color:var(--text-main)]"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-[color:var(--text-main)]"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Calendly
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
