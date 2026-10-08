import Link from "next/link";
import { notFound } from "next/navigation";

import { AreasServed } from "@/components/dental/areas-served";
import { FaqGrid, FinalCta } from "@/components/dental/landing";
import { ArticleJsonLd, BreadcrumbJsonLd, DentalFaqJsonLd } from "@/components/dental/structured-data";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { dentalHero } from "@/lib/dental-content";
import { dentalGuides, getGuide } from "@/lib/dental-guides";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return dentalGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Params) {
  const guide = getGuide((await params).slug);
  if (!guide) return {};

  return buildMetadata({
    title: guide.metaTitle,
    description: guide.description,
    path: `/dental/guides/${guide.slug}`,
  });
}

export default async function DentalGuidePage({ params }: Params) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const path = `/dental/guides/${guide.slug}`;

  return (
    <div className="dental-page">
      <SiteHeader />
      <main id="main">
        <article className="lp-section">
          <div className="lp-shell guide-shell">
            <nav className="lp-breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/dental/guides">Guides</a>{" "}
              <span aria-hidden="true">/</span> <span aria-current="page">{guide.title}</span>
            </nav>
            <p className="lp-eyebrow">Guide · Australia</p>
            <h1 className="lp-h2 guide-title">{guide.title}</h1>
            <p className="guide-meta">
              By Qarib Iqbal · <time dateTime={guide.published}>
                {new Date(guide.published).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Australia/Sydney",
                })}
              </time>
            </p>

            <div className="guide-answer">
              <p className="guide-answer-label">Short answer</p>
              <p>{guide.shortAnswer}</p>
            </div>

            {guide.sections.map((section) => (
              <section key={section.heading} className="guide-section">
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {guide.disclaimer ? <p className="guide-disclaimer">{guide.disclaimer}</p> : null}

            <div className="guide-cta">
              <p>See where your own clinic is losing calls.</p>
              <Link href="/dental#audit" className="lp-cta">
                {dentalHero.primaryCta}
              </Link>
            </div>
          </div>
        </article>

        <FaqGrid headingId="guide-faq-title" faqs={guide.faqs} heading="Related questions" />
        <AreasServed />
        <FinalCta auditHref="/dental#audit" />
      </main>
      <SiteFooter />
      <ArticleJsonLd title={guide.title} description={guide.description} path={path} published={guide.published} />
      <DentalFaqJsonLd faqs={guide.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/dental/guides" },
          { name: guide.title, path },
        ]}
      />
    </div>
  );
}
