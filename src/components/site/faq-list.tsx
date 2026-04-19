import { ChevronRight } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <details key={item.question} className="panel group open:border-[color:var(--line-strong)]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-[color:var(--text-main)] marker:content-none">
            <span className="inline-flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]" aria-hidden="true" />
              <span>{item.question}</span>
            </span>
            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--text-subtle)] transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
          </summary>
          <p className="mt-4 pl-5 text-sm leading-7 text-[color:var(--text-muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
