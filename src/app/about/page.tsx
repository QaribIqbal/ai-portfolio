import Image from "next/image";

import { ButtonLink } from "@/components/site/button-link";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "About Qarib Iqbal",
  description:
    "How Qarib Iqbal works with lean marketing agencies through diagnosis-first, sprint-based automation execution.",
});

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="About"
          title="Practical operator support for lean agency teams"
          description="I help marketing agencies remove one costly manual workflow at a time through clear diagnostics and focused implementation."
          primaryCta={{ href: "/contact", label: siteConfig.primaryCta }}
          secondaryCta={{ href: "/checklist", label: siteConfig.secondaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            {/* review: change-2 */}
            <article className="panel min-h-[100px]">
              <p className="section-eyebrow">Profile</p>
              <div className="flex items-start gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-[color:var(--accent)]">
                  {/* TODO: Replace with real headshot — recommended size 400x400px */}
                  <Image
                    src="/assets/images/qarib-profile.jpg"
                    alt="Qarib Iqbal profile photo"
                    fill
                    sizes="96px"
                    className="profile-photo object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]">
                    Operator-led implementation
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                    I spent years watching marketing agencies lose hours every week to the same
                    manual workflows — reports rebuilt by hand, leads chased one by one, onboarding
                    that started differently every time. I build focused automation systems that fix
                    one expensive process at a time, so founder-led teams get real leverage without
                    adding headcount, new software stacks, or extra complexity.
                  </p>
                  <p className="mt-3 text-[0.8em] leading-6 text-[color:var(--text-subtle)]">
                    Based in Lahore, Pakistan. Working with agencies remotely worldwide.
                  </p>
                  <p className="mt-1 text-[0.8em] leading-6 text-[color:var(--text-subtle)]">
                    Specialized in Make (Integromat), n8n, Zapier, Airtable, and CRM workflow
                    design.
                  </p>
                </div>
              </div>
            </article>

            <article className="panel">
              <p className="section-eyebrow">How I Work</p>
              <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                My process is diagnosis-first and sprint-based. We start with one ugly workflow,
                map where it breaks, scope the fix tightly, then implement it in your current tools.
                No open-ended projects, no extra software for the sake of it, and no bloated
                automation roadmap before the first bottleneck is fixed.
              </p>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                If the audit confirms fit, the usual next step is a focused 21-Day Agency Automation
                Sprint. After handoff, ongoing optimization is optional and only added when it
                creates practical operational leverage.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact" trackingEvent="about_page_audit_click">
                  {siteConfig.primaryCta}
                </ButtonLink>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
