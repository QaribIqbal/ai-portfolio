import type { TrustPrinciple } from "@/lib/site-content";

export function TrustPrinciples({ principles }: { principles: TrustPrinciple[] }) {
  if (principles.length === 0) return null;

  return (
    <section className="trust-principles" aria-labelledby="trust-principles-title">
      <div className="trust-principles-intro">
        <p className="section-eyebrow">What clients value</p>
        <h3 id="trust-principles-title">Operating standards, not invented endorsements.</h3>
        <p>
          The original testimonials are being recovered. Until they can be sourced and approved,
          judge the work by the demos and the way each build is delivered.
        </p>
      </div>

      <ol className="trust-principles-list">
        {principles.map((principle, index) => (
          <li className="trust-principle" key={principle.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h4>{principle.title}</h4>
              <p>{principle.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
