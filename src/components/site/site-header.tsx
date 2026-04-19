import Link from "next/link";

import { ButtonLink } from "@/components/site/button-link";
import { MobileNav } from "@/components/site/mobile-nav";
import { navigation, siteConfig } from "@/lib/site-content";

export function SiteHeader({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[color:color-mix(in_oklch,var(--bg)_84%,transparent)] backdrop-blur-xl">
      <div className="shell relative flex min-h-18 items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[-0.01em] text-[color:var(--text-main)]">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]" aria-hidden="true" />
          <span>{siteConfig.name}</span>
        </Link>

        {!minimal ? (
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-[color:var(--line)] bg-[color:var(--panel-soft)] p-1 lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-[color:var(--text-muted)] transition hover:bg-[color:color-mix(in_oklch,var(--accent)_8%,transparent)] hover:text-[color:var(--text-main)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <div className="hidden sm:block" />
        )}

        <div className="flex items-center gap-2.5">
          {!minimal ? (
            <>
              <ButtonLink href="/contact" variant="ghost" className="hidden xl:inline-flex">
                {siteConfig.secondaryCta}
              </ButtonLink>
              <ButtonLink href="/checklist" className="hidden sm:inline-flex">
                {siteConfig.primaryCta}
              </ButtonLink>
            </>
          ) : null}
          {minimal ? (
            <ButtonLink href="/contact" variant="secondary" className="hidden sm:inline-flex">
              {siteConfig.secondaryCta}
            </ButtonLink>
          ) : null}
          <ButtonLink href="/contact" variant="secondary" className="hidden lg:inline-flex xl:hidden">
            {siteConfig.secondaryCta}
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
