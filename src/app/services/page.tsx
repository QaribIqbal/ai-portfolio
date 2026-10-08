import { CheckCircle2 } from "lucide-react";

import { ButtonLink } from "@/components/site/button-link";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buildMetadata } from "@/lib/seo";
import { offerPackaging, services, siteConfig } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "Services Delivered Through Focused Sprints",
  description:
    "Qarib Iqbal delivers automation work through focused 21-Day Agency Automation Sprints for lean marketing agencies.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Services"
          title="Focused sprint delivery, not open-ended automation projects"
          description="Instead of broad service menus, work is scoped and delivered as focused 21-Day Agency Automation Sprints targeting one painful workflow at a time."
          primaryCta={{ href: "/contact", label: siteConfig.primaryCta }}
          secondaryCta={{ href: "/checklist", label: siteConfig.secondaryCta }}
        />

        <section className="page-section pt-0">
          <div className="shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="panel">
              <p className="section-eyebrow">Offer Packaging</p>
              <div className="space-y-3">
                {offerPackaging.map((item) => (
                  <div key={item} className="subtle-card text-sm leading-7 text-[color:var(--text-muted)]">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-[color:var(--text-muted)]">
                Each sprint focuses on one workflow so scope, implementation, and handoff stay clear.
              </p>
            </article>

            <article className="panel">
              <p className="section-eyebrow">Use Cases</p>
              <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                These are sprint targets, not separate competing offers.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact" trackingEvent="services_page_audit_click">
                  {siteConfig.primaryCta}
                </ButtonLink>
                <ButtonLink href="/checklist" variant="secondary" trackingEvent="services_page_checklist_click">
                  {siteConfig.secondaryCta}
                </ButtonLink>
              </div>
            </article>
          </div>

          <div className="shell mt-6 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="panel">
                <h2 className="text-[1.45rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{service.description}</p>
                <ul className="mt-6 space-y-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                      <span className="text-sm leading-7 text-[color:var(--text-muted)]">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs uppercase tracking-[0.1em] text-[color:var(--accent)]">
                  {service.callout}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
