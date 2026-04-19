import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition duration-200 active:translate-y-px active:scale-[0.985]",
        variant === "primary" &&
          "border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--bg-strong)] hover:bg-[color:var(--accent-strong)] hover:border-[color:var(--accent-strong)]",
        variant === "secondary" &&
          "border-[color:var(--line-strong)] bg-[color:var(--panel)] text-[color:var(--text-main)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]",
        variant === "ghost" &&
          "border-transparent bg-transparent px-0 text-[color:var(--text-muted)] hover:text-[color:var(--text-main)]",
        className,
      )}
    >
      <span>{children}</span>
      {variant !== "ghost" ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
      ) : null}
    </Link>
  );
}
