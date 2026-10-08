import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/site/button-link";
import { MobileNav } from "@/components/site/mobile-nav";
import { navigation, siteConfig } from "@/lib/site-content";

export function SiteHeader({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:color-mix(in_oklch,var(--accent)_8%,var(--line))] bg-[color:color-mix(in_oklch,var(--bg)_78%,transparent)] backdrop-blur-2xl backdrop-saturate-[1.6]">
      <div className="shell relative flex min-h-18 items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-[-0.01em] text-[color:var(--text-main)]"
        >
          <span
            className="relative inline-flex h-9 w-9 overflow-hidden rounded-full border-2 border-[color:var(--accent)] shadow-[0_0_12px_-4px_color-mix(in_oklch,var(--accent)_40%,transparent)] transition-shadow duration-300 hover:shadow-[0_0_20px_-4px_color-mix(in_oklch,var(--accent)_60%,transparent)]"
            aria-hidden="true"
          >
            {/* TODO: Replace placeholder profile photo with real image */}
            {/* TODO: Replace profile photo placeholder with real headshot — /assets/images/qarib-profile.jpg */}
            <Image
              src="/assets/images/qarib-profile.jpg"
              alt="Qarib Iqbal profile avatar"
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigation.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[color:var(--text-subtle)] transition hover:text-[color:var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {!minimal ? (
            <>
              <ButtonLink href="/dental#audit" className="hidden whitespace-nowrap sm:inline-flex" trackingEvent="header_dental_audit_click">
                {siteConfig.dentalCta}
              </ButtonLink>
            </>
          ) : (
            <ButtonLink href="/dental#audit" className="hidden sm:inline-flex" trackingEvent="header_minimal_audit_click">
              {siteConfig.dentalCta}
            </ButtonLink>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
