"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { ButtonLink } from "@/components/site/button-link";
import { trackEvent } from "@/lib/analytics";
import {
  agencySizeOptions,
  sanitizeChecklistForm,
  type ChecklistFormValues,
  validateChecklistField,
  validateChecklistForm,
} from "@/lib/form-validation";
import { getStoredUtmParams, readTrackingParams } from "@/lib/utm";
import { cn } from "@/lib/utils";

type LeadFormErrors = Partial<Record<keyof ChecklistFormValues, string>>;
type LeadFormTouched = Record<keyof ChecklistFormValues, boolean>;

const initialState: ChecklistFormValues = {
  name: "",
  email: "",
  agencySize: "",
  biggestBottleneck: "",
};

const initialTouchedState: LeadFormTouched = {
  name: false,
  email: false,
  agencySize: false,
  biggestBottleneck: false,
};

export function LeadCaptureForm() {
  const showDevHints = process.env.NODE_ENV !== "production";
  const formRef = useRef<HTMLFormElement>(null);
  const checklistDownloadHref = "/checklists/agency-ai-automation-checklist.pdf";

  const [form, setForm] = useState<ChecklistFormValues>(initialState);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [touched, setTouched] = useState<LeadFormTouched>(initialTouchedState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const isFormValid = useMemo(() => {
    return Object.keys(validateChecklistForm(form)).length === 0;
  }, [form]);

  function markStart() {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackEvent("checklist_form_start");
  }

  function focusFirstInvalidField(nextErrors: LeadFormErrors) {
    const firstInvalid = (Object.keys(nextErrors) as Array<keyof ChecklistFormValues>)[0];
    if (!firstInvalid) {
      return;
    }

    const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
    field?.focus();
  }

  function setFieldTouched(field: keyof ChecklistFormValues) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function updateField(field: keyof ChecklistFormValues, value: string) {
    if (status === "error") {
      setStatus("idle");
      setError("");
    }

    setForm((current) => {
      const next = { ...current, [field]: value };

      if (touched[field]) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [field]: validateChecklistField(field, next),
        }));
      }

      return next;
    });
  }

  function handleBlur(field: keyof ChecklistFormValues) {
    setFieldTouched(field);
    setErrors((current) => ({
      ...current,
      [field]: validateChecklistField(field, form),
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextTouched: LeadFormTouched = {
      name: true,
      email: true,
      agencySize: true,
      biggestBottleneck: true,
    };
    const nextErrors = validateChecklistForm(form);

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setError("Please fix the highlighted fields before submitting.");
      focusFirstInvalidField(nextErrors);
      const firstInvalid = Object.keys(nextErrors)[0];
      trackEvent("checklist_form_validation_error", { field: firstInvalid });
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const sanitized = sanitizeChecklistForm(form);

      // TODO: Replace checklist form endpoint with real endpoint
      // TODO: Replace YOUR_FORM_ID with your real Formspree form ID
      const response = await fetch("/api/forms/checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...sanitized,
          formType: "checklist",
          submittedAt: new Date().toISOString(),
          pagePath: window.location.pathname,
          utm: {
            ...getStoredUtmParams(),
            ...readTrackingParams(new URLSearchParams(window.location.search)),
          },
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Unable to submit right now.");
      }

      setStatus("success");
      trackEvent("checklist_form_submit", { agency_size: sanitized.agencySize });
      setForm(initialState);
      setErrors({});
      setTouched(initialTouchedState);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email me directly.");
    }
  }

  if (status === "success") {
    return (
      <div id="lead-capture-form" className="panel success-state space-y-4" role="status" aria-live="polite">
        <div className="success-icon-wrap" aria-hidden="true">
          <CheckCircle2 className="success-icon-svg" />
        </div>
        <p className="section-eyebrow">Checklist Requested</p>
        <h3 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
          Checklist ready. Download it below.
        </h3>
        <p className="text-sm leading-7 text-[color:var(--text-muted)]">
          Your updated Agency AI Automation Checklist is ready now.
        </p>
        <a
          href={checklistDownloadHref}
          download="agency-ai-automation-checklist.pdf"
          className="button-primary inline-flex w-full justify-center sm:w-auto"
        >
          Download the Checklist
        </a>
        <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
          Book a Free Automation Audit →
        </ButtonLink>
      </div>
    );
  }

  const nameError = touched.name ? errors.name : undefined;
  const emailError = touched.email ? errors.email : undefined;
  const agencySizeError = touched.agencySize ? errors.agencySize : undefined;
  const bottleneckError = touched.biggestBottleneck ? errors.biggestBottleneck : undefined;

  return (
    <form
      id="lead-capture-form"
      ref={formRef}
      className="panel space-y-6 relative overflow-hidden rounded-3xl border border-[color:color-mix(in_oklch,var(--accent)_20%,transparent)] bg-[color:color-mix(in_oklch,var(--panel)_80%,transparent)] backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_50px_-15px_color-mix(in_oklch,var(--accent)_20%,transparent)]"
      onSubmit={handleSubmit}
      onFocusCapture={markStart}
      noValidate
    >

      <div className="inline-flex items-center gap-2 rounded-full border border-[color:color-mix(in_oklch,var(--accent)_20%,transparent)] bg-[color:color-mix(in_oklch,var(--accent)_10%,transparent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--accent)] mb-2">
        <CheckCircle2 className="h-4 w-4" />
        Agency AI Automation Checklist
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="form-field">
          <span>Name</span>
          <input
            required
            name="name"
            type="text"
            maxLength={80}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder="Your name"
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? "checklist-name-error" : undefined}
            className={cn(nameError && "form-input-invalid")}
          />
          {nameError ? (
            <p id="checklist-name-error" className="form-error" role="alert">
              {nameError}
            </p>
          ) : null}
        </label>

        <label className="form-field">
          <span>Work email</span>
          <input
            required
            name="email"
            type="email"
            maxLength={120}
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="you@agency.com"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "checklist-email-error" : undefined}
            className={cn(emailError && "form-input-invalid")}
          />
          {emailError ? (
            <p id="checklist-email-error" className="form-error" role="alert">
              {emailError}
            </p>
          ) : null}
        </label>
      </div>

      <label className="form-field">
        <span>Agency size</span>
        <select
          required
          name="agencySize"
          value={form.agencySize}
          onChange={(event) => updateField("agencySize", event.target.value)}
          onBlur={() => handleBlur("agencySize")}
          aria-invalid={Boolean(agencySizeError)}
          aria-describedby={agencySizeError ? "checklist-agency-size-error" : undefined}
          className={cn(agencySizeError && "form-input-invalid")}
        >
          <option value="">Select your team size</option>
          {agencySizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {agencySizeError ? (
          <p id="checklist-agency-size-error" className="form-error" role="alert">
            {agencySizeError}
          </p>
        ) : null}
      </label>

      <label className="form-field">
        <span>Biggest bottleneck right now</span>
        <textarea
          name="biggestBottleneck"
          maxLength={600}
          value={form.biggestBottleneck}
          onChange={(event) => updateField("biggestBottleneck", event.target.value)}
          onBlur={() => handleBlur("biggestBottleneck")}
          placeholder="Lead follow-up, reporting, onboarding, handoffs, or another ops issue"
          rows={4}
          aria-invalid={Boolean(bottleneckError)}
          aria-describedby={bottleneckError ? "checklist-bottleneck-error" : "checklist-bottleneck-help"}
          className={cn(bottleneckError && "form-input-invalid")}
        />
        {bottleneckError ? (
          <p id="checklist-bottleneck-error" className="form-error" role="alert">
            {bottleneckError}
          </p>
        ) : (
          <p id="checklist-bottleneck-help" className="form-help">
            Optional: share one workflow issue for better diagnosis.
          </p>
        )}
      </label>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          type="submit"
          className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full p-4 sm:p-5 font-medium text-[color:var(--bg)] shadow-[0_0_40px_-10px_color-mix(in_oklch,var(--accent)_60%,transparent)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          disabled={status === "submitting" || (hasStarted && !isFormValid)}
        >
          <span className="absolute inset-0 bg-[color:var(--accent)] transition-colors duration-300 group-hover:bg-[color:var(--accent-warm)]" />
          <span className="relative flex items-center gap-2 text-base sm:text-lg font-bold tracking-wide">
            {status === "submitting" ? "Sending..." : "Get the Free Checklist"}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
        <p className="text-sm font-medium text-[color:var(--text-subtle)] text-center">
          No spam. This is a practical checklist for agency operators.
        </p>
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-300" role="alert">
          {error || "Something went wrong. Please try again or email me directly."}
        </p>
      ) : null}

      {showDevHints ? (
        <p className="text-xs leading-6 text-[color:var(--text-subtle)]">
          Form endpoint setup: configure `CHECKLIST_FORM_ENDPOINT` (or
          `NEXT_PUBLIC_CHECKLIST_FORM_ENDPOINT`) to connect Formspree, Basin, Tally, Airtable,
          Supabase, or your own endpoint.
        </p>
      ) : null}
    </form>
  );
}
