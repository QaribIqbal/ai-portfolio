import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/site/button-link";
import { MobileNav } from "@/components/site/mobile-nav";
import { siteConfig } from "@/lib/site-content";

export function SiteHeader({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[color:color-mix(in_oklch,var(--bg)_82%,transparent)] backdrop-blur-2xl backdrop-saturate-150">
      <div className="shell relative flex min-h-18 items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-[-0.01em] text-[color:var(--text-main)]"
        >
          <span
            className="relative inline-flex h-8 w-8 overflow-hidden rounded-full border-2 border-[color:var(--accent)]"
            aria-hidden="true"
          >
            {/* TODO: Replace placeholder profile photo with real image */}
            {/* TODO: Replace profile photo placeholder with real headshot — /assets/images/qarib-profile.jpg */}
            <Image
              src="/assets/images/qarib-profile.jpg"
              alt="Qarib Iqbal profile avatar"
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <div className="hidden sm:block" />

        <div className="flex items-center gap-2.5">
          {!minimal ? (
            <>
              <ButtonLink href="/contact" className="hidden lg:inline-flex" trackingEvent="header_audit_click">
                {siteConfig.primaryCta}
              </ButtonLink>
              <ButtonLink href="/checklist" variant="secondary" className="hidden sm:inline-flex" trackingEvent="header_checklist_click">
                {siteConfig.secondaryCta}
              </ButtonLink>
            </>
          ) : (
            <ButtonLink href="/checklist" className="hidden sm:inline-flex" trackingEvent="header_minimal_checklist_click">
              {siteConfig.secondaryCta}
            </ButtonLink>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
