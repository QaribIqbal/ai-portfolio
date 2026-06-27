import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-[58rem]",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 className="text-balance font-[family:var(--font-display)] text-[clamp(2.2rem,4.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[color:var(--text-main)]">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-[64ch] text-[1.06rem] leading-[1.85] text-[color:var(--text-muted)] sm:text-[1.12rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
