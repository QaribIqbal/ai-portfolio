"use client";

import { CheckCircle2 } from "lucide-react";
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
import { siteConfig } from "@/lib/site-content";
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
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Submission failed. Please try again in a moment.",
      );
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
          You are in. The checklist request has been sent.
        </h3>
        <p className="text-sm leading-7 text-[color:var(--text-muted)]">
          Next step: if you want direct help identifying what to fix first, book a free automation
          audit.
        </p>
        <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
          {siteConfig.secondaryCta}
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
      className="panel space-y-5"
      onSubmit={handleSubmit}
      onFocusCapture={markStart}
      noValidate
    >
      <div className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel-soft)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
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
              {option} people
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
          required
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
            Add at least one specific workflow issue. ({form.biggestBottleneck.length}/600)
          </p>
        )}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="button-primary w-full sm:w-auto"
          disabled={status === "submitting" || (hasStarted && !isFormValid)}
        >
          {status === "submitting" ? "Submitting..." : siteConfig.primaryCta}
        </button>
        <p className="text-sm leading-6 text-[color:var(--text-subtle)]">
          No spam. This is a practical checklist for agency operators.
        </p>
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-300" role="alert">
          {error}
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
