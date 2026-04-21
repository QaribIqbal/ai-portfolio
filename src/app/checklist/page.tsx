import { CheckCircle2 } from "lucide-react";

import { ButtonLink } from "@/components/site/button-link";
import { LeadCaptureForm } from "@/components/site/lead-capture-form";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { checklistHighlights, siteConfig } from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Agency AI Automation Checklist",
  description:
    "Use this checklist to identify workflow bottlenecks across lead follow-up, reporting, onboarding, and repetitive operations inside your marketing agency.",
});

export default function ChecklistPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader minimal />
      <main>
        <PageHero
          eyebrow="Lead Magnet"
          title="Find the automation bottleneck that is costing your agency the most time"
          description="This checklist helps lean marketing agency teams diagnose where manual follow-up, reporting, and onboarding are breaking down before they spend on the wrong fix."
          secondaryCta={{ href: "/contact", label: siteConfig.secondaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="panel">
              <p className="section-eyebrow">What You Get</p>
              <div className="space-y-4">
                {checklistHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                    <p className="text-sm leading-7 text-[color:var(--text-muted)]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="subtle-card mt-8">
                <h2 className="text-lg font-medium text-[color:var(--text-main)]">Who this is for</h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  Founder-led and operator-led marketing agencies with small teams doing too much
                  manually.
                </p>
              </div>

              <div className="subtle-card mt-5">
                <h2 className="text-lg font-medium text-[color:var(--text-main)]">Trust note</h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  This is a practical diagnostic resource, not a pitch deck. If there is no clear
                  fit, you can still use the checklist internally.
                </p>
              </div>

              <div className="subtle-card mt-5">
                <h2 className="text-lg font-medium text-[color:var(--text-main)]">Checklist preview</h2>
                <div className="mt-3 rounded-[18px] border border-dashed border-[color:var(--line-strong)] px-4 py-6 text-sm leading-7 text-[color:var(--text-subtle)]">
                  You will receive the full checklist after submission.
                </div>
              </div>

              <div className="mt-6">
                <ButtonLink href="/contact" variant="secondary" trackingEvent="checklist_page_audit_click">
                  Need help applying it? {siteConfig.secondaryCta}
                </ButtonLink>
              </div>
            </div>

            <LeadCaptureForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
