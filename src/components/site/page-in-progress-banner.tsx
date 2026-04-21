import Link from "next/link";

export function PageInProgressBanner() {
  return (
    <div className="page-in-progress-banner">
      {/* review: change-6 */}
      This page is actively being built. In the meantime,{" "}
      <Link href="/contact">book a free automation audit</Link> or{" "}
      <Link href="/">browse the homepage</Link> to understand how the sprint works.
    </div>
  );
}
