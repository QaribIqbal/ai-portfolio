import { Linkedin, Mail } from "lucide-react";

import { AuditForm } from "@/components/site/audit-form";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { siteConfig } from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a Free Automation Audit",
  description:
    "Book a Free Automation Audit with Qarib Iqbal to identify the highest-value workflow bottleneck in your marketing agency and get a practical next step.",
});

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Book Audit"
          title="A focused diagnostic for agencies that know something is too manual."
          description="The Free Automation Audit is not a generic discovery chat. It is a practical conversation to identify the workflow bottleneck most worth fixing, clarify what better looks like, and decide whether a focused sprint makes sense."
          primaryCta={{ href: "/checklist", label: siteConfig.primaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <AuditForm />

            <div className="grid gap-5">
              <article className="panel">
                <p className="section-eyebrow">What It Is</p>
                <h2 className="text-2xl font-semibold text-[color:var(--text-main)]">
                  A serious diagnostic for agencies that want clarity before they buy a build.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  Best fit: marketing agency owners, operators, and small teams dealing with manual lead
                  follow-up, reporting, onboarding, or disconnected internal workflows.
                </p>
                <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  You leave with a clearer view of the bottleneck, prioritized opportunities, and a practical
                  next step. If there is no fit, there is no pressure to force one.
                </p>
              </article>

              <article className="panel">
                <p className="section-eyebrow">What To Expect</p>
                <ul className="space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  <li>Clear next steps instead of a vague conversation.</li>
                  <li>Fast response and direct communication.</li>
                  <li>Diagnosis before any recommendation to build.</li>
                  <li>A simple path into a fixed-scope sprint if the problem is worth solving now.</li>
                </ul>
              </article>

              <article className="panel">
                <p className="section-eyebrow">Direct Contact</p>
                <div className="space-y-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="subtle-card inline-flex items-center gap-3 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-main)]"
                  >
                    <Mail className="h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                    {siteConfig.email}
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="subtle-card inline-flex items-center gap-3 text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-main)]"
                  >
                    <Linkedin className="h-4 w-4 text-[color:var(--accent)]" aria-hidden="true" />
                    Message on LinkedIn
                  </a>
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
