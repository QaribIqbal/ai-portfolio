import Link from "next/link";

import { ButtonLink } from "@/components/site/button-link";
import { MobileNav } from "@/components/site/mobile-nav";
import { navigation, siteConfig } from "@/lib/site-content";

export function SiteHeader({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[color:rgba(5,11,15,0.82)] backdrop-blur-xl">
      <div className="shell relative flex min-h-18 items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-sm font-medium text-[color:var(--text-main)]">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]" aria-hidden="true" />
          <span>{siteConfig.name}</span>
        </Link>

        {!minimal ? (
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[color:var(--text-muted)] transition hover:text-[color:var(--text-main)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <nav aria-label="Compact" className="hidden items-center gap-6 sm:flex">
            <Link
              href="/"
              className="text-sm text-[color:var(--text-muted)] transition hover:text-[color:var(--text-main)]"
            >
              Back to Home
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {!minimal ? (
            <ButtonLink href="/checklist" className="hidden sm:inline-flex">
              {siteConfig.primaryCta}
            </ButtonLink>
          ) : null}
          <ButtonLink href="/contact" variant={minimal ? "primary" : "secondary"} className="hidden sm:inline-flex">
            {siteConfig.secondaryCta}
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
