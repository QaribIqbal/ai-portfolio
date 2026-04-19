import { CheckCircle2 } from "lucide-react";

import { LeadCaptureForm } from "@/components/site/lead-capture-form";
import { PageHero } from "@/components/site/page-hero";
import { SiteHeader } from "@/components/site/site-header";
import { checklistHighlights, siteConfig } from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Agency AI Automation Checklist",
  description:
    "Get the Free Agency AI Automation Checklist to spot the workflows your marketing agency should automate next and identify where manual work is slowing the team down.",
});

export default function ChecklistPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader minimal />
      <main>
        <PageHero
          eyebrow="Free Resource"
          title="Spot the workflows your agency should automate next."
          description="The Free Agency AI Automation Checklist helps lean marketing teams identify where manual work is creating friction, where systems are too disconnected, and which workflow is most worth fixing first."
          secondaryCta={{ href: "/contact", label: siteConfig.secondaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="panel">
                <p className="section-eyebrow">What’s Inside</p>
                <div className="space-y-4">
                {checklistHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                    <p className="text-sm leading-6 text-[color:var(--text-muted)]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="subtle-card mt-8">
                <h2 className="text-lg font-medium text-[color:var(--text-main)]">Who it’s for</h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  Lean agencies that feel stretched, are still handling too much manually, and want a
                  practical way to spot the best automation opportunity before adding more headcount or more tools.
                </p>
              </div>

              <div className="subtle-card mt-5">
                <h2 className="text-lg font-medium text-[color:var(--text-main)]">Why it matters now</h2>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  Manual follow-up, manual reporting, and manual onboarding do not stay small for long. The
                  longer they stay untreated, the more they pull founders and small teams away from strategy,
                  client work, and growth.
                </p>
              </div>
            </div>

            <LeadCaptureForm />
          </div>
        </section>
      </main>
    </div>
  );
}
