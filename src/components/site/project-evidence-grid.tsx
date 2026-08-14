import type { ProjectEvidence } from "@/lib/site-content";

import { ProofBadge } from "@/components/site/proof-badge";

export function ProjectEvidenceGrid({ projects }: { projects: ProjectEvidence[] }) {
  if (projects.length === 0) return null;

  return (
    <div className="evidence-grid">
      {projects.map((project, index) => (
        <article className="evidence-card" key={project.title}>
          <div className="evidence-card-topline">
            <ProofBadge type={project.proofType} />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3>{project.title}</h3>
          <p className="evidence-card-summary">{project.summary}</p>
          <p className="evidence-card-impact">{project.potentialImpact}</p>

          <ul className="evidence-card-tools" aria-label={`${project.title} tools`}>
            {project.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>

          <div className="evidence-card-actions">
            {project.demoUrl ? (
              <a className="evidence-link evidence-link-primary" href={project.demoUrl} target="_blank" rel="noreferrer">
                {project.demoLabel ?? "Open demo"}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            <a className="evidence-link" href={project.sourceUrl} target="_blank" rel="noreferrer">
              Source
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
