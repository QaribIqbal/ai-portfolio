type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <details key={item.question} className="panel group">
          <summary className="cursor-pointer list-none text-base font-medium text-[color:var(--text-main)] marker:content-none">
            <span className="inline-flex items-start gap-3">
              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]" aria-hidden="true" />
              <span>{item.question}</span>
            </span>
          </summary>
          <p className="mt-4 pl-5 text-sm leading-7 text-[color:var(--text-muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
