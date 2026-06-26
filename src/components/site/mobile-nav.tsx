"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/site/button-link";
import { navigation, siteConfig } from "@/lib/site-content";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--panel-soft)] text-[color:var(--text-main)] transition hover:border-[color:var(--line-contrast)]"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      {open ? (
        <div className="absolute inset-x-5 top-[calc(100%+0.85rem)] rounded-[24px] border border-[color:color-mix(in_oklch,var(--accent)_12%,var(--line-strong))] bg-[color:color-mix(in_oklch,var(--panel-strong)_92%,transparent)] p-5 shadow-[0_28px_86px_-32px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl px-3 py-3 text-sm text-[color:var(--text-muted)] transition hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--text-main)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-3">
            <ButtonLink href="/contact" className="w-full" trackingEvent="mobile_audit_click">
              {siteConfig.primaryCta}
            </ButtonLink>
            <ButtonLink href="/checklist" variant="secondary" className="w-full" trackingEvent="mobile_checklist_click">
              {siteConfig.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}
