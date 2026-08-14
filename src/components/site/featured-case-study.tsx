import type { SolutionStudy } from "@/lib/site-content";

export function FeaturedCaseStudy({
  study,
  index,
}: {
  study: SolutionStudy;
  index: number;
}) {
  return (
    <article className="featured-study" id={study.slug}>
      <div className="featured-study-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="featured-study-intro">
        <div className="featured-study-kicker">
          <span>{study.studio}</span>
          <span aria-hidden="true">/</span>
          <span>{study.eyebrow}</span>
        </div>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
        <p className="featured-study-audience">Built for: {study.audience}</p>

        <div className="featured-study-actions">
          <a href={study.featuredDemoUrl} target="_blank" rel="noreferrer">
            {study.featuredDemoLabel}
            <span aria-hidden="true">↗</span>
          </a>
          <a href={study.sourceUrl} target="_blank" rel="noreferrer">
            Read source study
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="featured-study-detail">
        <div>
          <p className="featured-study-label">Workflow</p>
          <ol className="featured-study-workflow">
            {study.workflow.map((step, stepIndex) => (
              <li key={step}>
                <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="featured-study-impact">
          <p className="featured-study-label">Potential impact — not a claimed client result</p>
          <ul>
            {study.potentialImpact.map((impact) => (
              <li key={impact}>{impact}</li>
            ))}
          </ul>
        </div>

        <ul className="featured-study-tools" aria-label="Tools and capabilities">
          {study.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
