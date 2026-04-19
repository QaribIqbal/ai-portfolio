"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { ButtonLink } from "@/components/site/button-link";
import { navigation, siteConfig } from "@/lib/site-content";

const easeOut = [0.23, 1, 0.32, 1] as const;

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
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[color:rgba(10,18,24,0.86)] text-[color:var(--text-main)] transition hover:border-[color:var(--accent)]"
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="absolute inset-x-5 top-[calc(100%+0.85rem)] rounded-[28px] border border-[color:var(--line-strong)] bg-[color:rgba(7,14,18,0.96)] p-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.75)]"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-3 py-3 text-sm text-[color:var(--text-muted)] transition hover:bg-[color:rgba(88,196,173,0.08)] hover:text-[color:var(--text-main)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex flex-col gap-3">
              <ButtonLink href="/checklist" className="w-full">
                {siteConfig.primaryCta}
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" className="w-full">
                {siteConfig.secondaryCta}
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
