"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { dentalLeakCheck } from "@/lib/dental-content";

export function LeakCheck({ auditHref }: { auditHref: string }) {
  const [selected, setSelected] = useState<boolean[]>(() => dentalLeakCheck.questions.map(() => false));
  const count = selected.filter(Boolean).length;
  const total = dentalLeakCheck.questions.length;

  function toggle(index: number) {
    setSelected((current) => current.map((value, i) => (i === index ? !value : value)));
    trackEvent("dental_leak_check_toggle", { index });
  }

  return (
    <section className="lp-section" aria-labelledby="lp-leak-title">
      <div className="lp-shell">
        <div className="lp-leak">
          <p className="lp-eyebrow">{dentalLeakCheck.eyebrow}</p>
          <h2 id="lp-leak-title" className="lp-h2">
            {dentalLeakCheck.heading}
          </h2>
          <p className="lp-body">{dentalLeakCheck.intro}</p>
          <div className="lp-leak-options">
            {dentalLeakCheck.questions.map((question, index) => (
              <button
                key={question}
                type="button"
                className="lp-leak-option"
                aria-pressed={selected[index]}
                onClick={() => toggle(index)}
              >
                <span className="lp-leak-box" aria-hidden="true">
                  {selected[index] ? <Check className="h-4 w-4" /> : null}
                </span>
                {question}
              </button>
            ))}
          </div>
          <div className="lp-leak-result" aria-live="polite">
            <div className="lp-meter" aria-hidden="true">
              <span style={{ width: `${(count / total) * 100}%` }} />
            </div>
            <p>
              {count === 0 ? (
                dentalLeakCheck.resultNone
              ) : (
                <>
                  <strong>
                    {count} of {total}
                  </strong>{" "}
                  {dentalLeakCheck.resultSome}
                </>
              )}
            </p>
            <Link
              href={auditHref}
              className="lp-cta"
              onClick={() => trackEvent("dental_leak_check_cta", { count })}
            >
              {dentalLeakCheck.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
