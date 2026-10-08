import { Ban, Database, MessageSquareText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FinalCta } from "@/components/dental/landing";
import { PersonJsonLd } from "@/components/dental/structured-data";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, trustPrinciples } from "@/lib/site-content";

export const metadata = buildMetadata({
  title: "About Qarib Iqbal",
  description:
    "Qarib Iqbal sets up missed-call text-back and patient reactivation for Australian dental clinics, inside the phone and SMS tools each clinic already has.",
  path: "/about",
});

const commitments = [
  {
    icon: Database,
    title: "Patient data stays in your clinic",
    body: "Campaigns run inside your existing messaging system. I segment and write; your data stays with you.",
  },
  {
    icon: MessageSquareText,
    title: "Every message has a STOP opt-out",
    body: "Sends go only to patients with express consent or who attended within the last 24 months, and replies go to your front desk.",
  },
  {
    icon: Ban,
    title: "No testimonials or clinical claims",
    body: "Messaging stays factual and conditional, in line with Australian health advertising rules. No pressure, no promises about treatment.",
  },
  {
    icon: ShieldCheck,
    title: "A guarantee in writing",
    body: "If the pilot campaign recovers zero appointments in 30 days, the pilot fee is refunded. Conditions agreed before we start.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh]">
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="About"
          title="I help Australian dental clinics turn missed calls into booked appointments."
          description="Missed-call text-back and patient reactivation, set up inside the phone and SMS tools your clinic already has. Every week you see the appointments it booked."
          primaryCta={{ href: "/dental#audit", label: siteConfig.dentalCta }}
          secondaryCta={{ href: "/dental", label: "How it works" }}
          highlights={["Based in Lahore, Pakistan", "Remote setup across Australia", "No new software for your team"]}
        />

        <section className="page-section">
          <div className="shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <article className="panel">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[color:var(--accent)]">
                  <Image
                    src="/assets/images/qarib-profile.jpg"
                    alt="Qarib Iqbal profile photo"
                    fill
                    sizes="80px"
                    className="profile-photo object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-[1.35rem] font-bold tracking-[-0.02em] text-[color:var(--text-main)]">
                    Qarib Iqbal
                  </h2>
                  <p className="text-sm text-[color:var(--text-subtle)]">Missed-call and lost-patient recovery</p>
                </div>
              </div>
              <p className="mt-5 text-[1rem] leading-8 text-[color:var(--text-muted)]">
                I build focused systems that fix one expensive leak at a time. For dental clinics, that
                leak is the phone: calls that ring out while reception is busy, over lunch and after
                hours, and patients who haven&apos;t booked in a while.
              </p>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-subtle)]">
                Toolkit: Make (Integromat), n8n, Zapier, Airtable and CRM workflow design.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/qaribiqbal92"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[color:var(--accent)] underline underline-offset-4"
                >
                  Instagram
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[color:var(--accent)] underline underline-offset-4"
                >
                  LinkedIn
                </a>
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {commitments.map(({ icon: Icon, title, body }) => (
                <article key={title} className="panel">
                  <span className="inline-flex rounded-xl bg-[color:var(--accent-soft)] p-2.5 text-[color:var(--accent)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-bold text-[color:var(--text-main)]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section pt-0">
          <div className="shell">
            <p className="section-eyebrow">How I work</p>
            <h2 className="max-w-[24ch] font-[family:var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[color:var(--text-main)]">
              Operating standards, not invented endorsements.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trustPrinciples.map((principle, index) => (
                <article key={principle.title} className="panel">
                  <span className="text-sm font-bold text-[color:var(--accent)]">0{index + 1}</span>
                  <h3 className="mt-3 text-[1.05rem] font-bold text-[color:var(--text-main)]">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{principle.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm text-[color:var(--text-subtle)]">
              Run a marketing agency instead?{" "}
              <Link href="/agencies" className="font-semibold text-[color:var(--accent)] underline underline-offset-4">
                See the agency services
              </Link>
              .
            </p>
          </div>
        </section>

        <FinalCta auditHref="/dental#audit" />
      </main>
      <SiteFooter />
      <PersonJsonLd />
    </div>
  );
}
