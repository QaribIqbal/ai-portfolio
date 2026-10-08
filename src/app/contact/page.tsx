import { Calendar, Linkedin } from "lucide-react";

import { AuditForm } from "@/components/site/audit-form";
import { ButtonLink } from "@/components/site/button-link";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { siteConfig } from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a Free Automation Audit",
  description:
    "Request a free automation audit to identify the highest-value workflow bottleneck in your marketing agency and get a practical implementation path.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Free Automation Audit"
          title="A focused diagnostic for agencies that want to fix the right bottleneck first"
          description="This is for lean marketing agencies that know manual operations are slowing growth. You get clarity on what to fix, what to ignore for now, and what a 21-Day Agency Automation Sprint should include if there is a fit."
          primaryCta={{ href: "/checklist", label: siteConfig.secondaryCta }}
          highlights={["Free", "One workflow mapped live", "Written summary and next steps"]}
          audience="agencies"
        />

        <section className="page-section pt-0">
          <div className="shell grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <AuditForm />

            <div className="grid gap-5">
              <article className="panel">
                <p className="section-eyebrow">Who this is for</p>
                <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                  Best fit: marketing agencies around 10-15 people, usually founder-led or
                  operator-led, dealing with manual follow-up, manual reporting, onboarding
                  inconsistency, and disconnected tools.
                </p>
              </article>

              <article className="panel">
                <p className="section-eyebrow">What happens in the audit</p>
                <ul className="space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  <li>1. We identify the highest-friction operational workflow.</li>
                  <li>2. We define what a cleaner version of that workflow looks like.</li>
                  <li>3. We outline scope, effort, and the most practical implementation path.</li>
                  <li>4. If there is no fit, you still leave with clarity.</li>
                </ul>
              </article>

              <article className="panel">
                <p className="section-eyebrow">After you submit</p>
                <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                  You get a response to confirm fit and next steps. When there is a fit, the usual
                  next step is a focused 21-Day Agency Automation Sprint on one workflow. If you
                  prefer, you can book a slot directly.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <ButtonLink href={siteConfig.calendly} variant="secondary" trackingEvent="contact_calendly_click">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      Book on Calendly
                    </span>
                  </ButtonLink>
                  <ButtonLink href={siteConfig.linkedin} variant="ghost" trackingEvent="contact_linkedin_click">
                    <span className="inline-flex items-center gap-2">
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                      Message on LinkedIn
                    </span>
                  </ButtonLink>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
