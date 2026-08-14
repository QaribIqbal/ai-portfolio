import type { ProofType } from "@/lib/site-content";

const labels = {
  "live-demo": "Live demo",
  "solution-build": "Solution build",
  "workflow-blueprint": "Workflow blueprint",
  "verified-result": "Verified result",
} satisfies Record<ProofType, string>;

export function ProofBadge({ type }: { type: ProofType }) {
  return (
    <span className="proof-badge" data-proof-type={type}>
      {labels[type]}
    </span>
  );
}
