import Link from "next/link";

import { AreasServed } from "@/components/dental/areas-served";
import { FinalCta } from "@/components/dental/landing";
import { BreadcrumbJsonLd } from "@/components/dental/structured-data";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { dentalGuides } from "@/lib/dental-guides";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guides for Australian Dental Practice Owners",
  description:
    "Plain-English guides on missed-call text-back, the health fund extras reset and SMS rules for Australian dental clinics.",
  path: "/dental/guides",
});

export default function DentalGuidesPage() {
  return (
    <div className="dental-page">
      <SiteHeader />
      <main id="main">
        <section className="lp-section">
          <div className="lp-shell guide-shell">
            <nav className="lp-breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/dental">Dental clinics</a>{" "}
              <span aria-hidden="true">/</span> <span aria-current="page">Guides</span>
            </nav>
            <p className="lp-eyebrow">Guides</p>
            <h1 className="lp-h2 guide-title">Guides for Australian dental practice owners</h1>
            <ul className="guide-list">
              {dentalGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/dental/guides/${guide.slug}`}>
                    <strong>{guide.title}</strong>
                    <span>{guide.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <AreasServed />
        <FinalCta auditHref="/dental#audit" />
      </main>
      <SiteFooter />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Dental clinics", path: "/dental" },
          { name: "Guides", path: "/dental/guides" },
        ]}
      />
    </div>
  );
}
