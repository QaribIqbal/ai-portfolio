"use client";

import { CheckCircle2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import {
  agencySizeOptions,
  auditTimelineOptions,
  sanitizeAuditForm,
  type AuditFormValues,
  validateAuditField,
  validateAuditForm,
} from "@/lib/form-validation";
import { siteConfig } from "@/lib/site-content";
import { getStoredUtmParams, readTrackingParams } from "@/lib/utm";
import { cn } from "@/lib/utils";

type AuditFormErrors = Partial<Record<keyof AuditFormValues, string>>;
type AuditFormTouched = Record<keyof AuditFormValues, boolean>;

const initialState: AuditFormValues = {
  name: "",
  email: "",
  agencySize: "",
  primaryServices: "",
  biggestPain: "",
  timeline: "",
};

const initialTouchedState: AuditFormTouched = {
  name: false,
  email: false,
  agencySize: false,
  primaryServices: false,
  biggestPain: false,
  timeline: false,
};

export function AuditForm() {
  const showDevHints = process.env.NODE_ENV !== "production";
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<AuditFormValues>(initialState);
  const [errors, setErrors] = useState<AuditFormErrors>({});
  const [touched, setTouched] = useState<AuditFormTouched>(initialTouchedState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const isFormValid = useMemo(() => {
    return Object.keys(validateAuditForm(form)).length === 0;
  }, [form]);

  function markStart() {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackEvent("audit_form_start");
  }

  function focusFirstInvalidField(nextErrors: AuditFormErrors) {
    const firstInvalid = (Object.keys(nextErrors) as Array<keyof AuditFormValues>)[0];
    if (!firstInvalid) {
      return;
    }

    const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
    field?.focus();
  }

  function setFieldTouched(field: keyof AuditFormValues) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function updateField(field: keyof AuditFormValues, value: string) {
    if (status === "error") {
      setStatus("idle");
      setError("");
    }

    setForm((current) => {
      const next = { ...current, [field]: value };

      if (touched[field]) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [field]: validateAuditField(field, next),
        }));
      }

      return next;
    });
  }

  function handleBlur(field: keyof AuditFormValues) {
    setFieldTouched(field);
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: validateAuditField(field, form),
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextTouched: AuditFormTouched = {
      name: true,
      email: true,
      agencySize: true,
      primaryServices: true,
      biggestPain: true,
      timeline: true,
    };
    const nextErrors = validateAuditForm(form);

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setError("Please fix the highlighted fields before submitting.");
      focusFirstInvalidField(nextErrors);
      const firstInvalid = Object.keys(nextErrors)[0];
      trackEvent("audit_form_validation_error", { field: firstInvalid });
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const sanitized = sanitizeAuditForm(form);

      const response = await fetch("/api/forms/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...sanitized,
          formType: "audit",
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
      trackEvent("audit_form_submit", { timeline: sanitized.timeline });
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
      <div id="audit-request-form" className="panel success-state space-y-4" role="status" aria-live="polite">
        <div className="success-icon-wrap" aria-hidden="true">
          <CheckCircle2 className="success-icon-svg" />
        </div>
        <p className="section-eyebrow">Audit Request Sent</p>
        <h3 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-[color:var(--text-main)]">
          Thanks. Your automation audit request is in.
        </h3>
        <p className="text-sm leading-7 text-[color:var(--text-muted)]">
          You can also book directly on Calendly if you want to secure a slot now.
        </p>
        <a
          href={siteConfig.calendly}
          target="_blank"
          rel="noreferrer"
          className="button-secondary inline-flex w-full justify-center sm:w-auto"
          onClick={() => trackEvent("calendly_click", { source: "audit_form_success" })}
        >
          Book on Calendly
        </a>
      </div>
    );
  }

  const nameError = touched.name ? errors.name : undefined;
  const emailError = touched.email ? errors.email : undefined;
  const agencySizeError = touched.agencySize ? errors.agencySize : undefined;
  const primaryServicesError = touched.primaryServices ? errors.primaryServices : undefined;
  const biggestPainError = touched.biggestPain ? errors.biggestPain : undefined;
  const timelineError = touched.timeline ? errors.timeline : undefined;

  return (
    <form
      id="audit-request-form"
      ref={formRef}
      className="panel space-y-5"
      onSubmit={handleSubmit}
      onFocusCapture={markStart}
      noValidate
    >
      <div className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel-soft)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
        Free Automation Audit Request
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
            aria-describedby={nameError ? "audit-name-error" : undefined}
            className={cn(nameError && "form-input-invalid")}
          />
          {nameError ? (
            <p id="audit-name-error" className="form-error" role="alert">
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
            aria-describedby={emailError ? "audit-email-error" : undefined}
            className={cn(emailError && "form-input-invalid")}
          />
          {emailError ? (
            <p id="audit-email-error" className="form-error" role="alert">
              {emailError}
            </p>
          ) : null}
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="form-field">
          <span>Agency size</span>
          <select
            required
            name="agencySize"
            value={form.agencySize}
            onChange={(event) => updateField("agencySize", event.target.value)}
            onBlur={() => handleBlur("agencySize")}
            aria-invalid={Boolean(agencySizeError)}
            aria-describedby={agencySizeError ? "audit-agency-size-error" : undefined}
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
            <p id="audit-agency-size-error" className="form-error" role="alert">
              {agencySizeError}
            </p>
          ) : null}
        </label>

        <label className="form-field">
          <span>Primary services</span>
          <input
            required
            name="primaryServices"
            type="text"
            maxLength={140}
            value={form.primaryServices}
            onChange={(event) => updateField("primaryServices", event.target.value)}
            onBlur={() => handleBlur("primaryServices")}
            placeholder="Performance, SEO, creative, lifecycle, etc."
            aria-invalid={Boolean(primaryServicesError)}
            aria-describedby={
              primaryServicesError ? "audit-primary-services-error" : "audit-primary-services-help"
            }
            className={cn(primaryServicesError && "form-input-invalid")}
          />
          {primaryServicesError ? (
            <p id="audit-primary-services-error" className="form-error" role="alert">
              {primaryServicesError}
            </p>
          ) : (
            <p id="audit-primary-services-help" className="form-help">
              Add your core offer categories. ({form.primaryServices.length}/140)
            </p>
          )}
        </label>
      </div>

      <label className="form-field">
        <span>Biggest pain</span>
        <textarea
          required
          name="biggestPain"
          maxLength={800}
          value={form.biggestPain}
          onChange={(event) => updateField("biggestPain", event.target.value)}
          onBlur={() => handleBlur("biggestPain")}
          placeholder="Which workflow is currently slowing your team down most?"
          rows={4}
          aria-invalid={Boolean(biggestPainError)}
          aria-describedby={biggestPainError ? "audit-biggest-pain-error" : "audit-biggest-pain-help"}
          className={cn(biggestPainError && "form-input-invalid")}
        />
        {biggestPainError ? (
          <p id="audit-biggest-pain-error" className="form-error" role="alert">
            {biggestPainError}
          </p>
        ) : (
          <p id="audit-biggest-pain-help" className="form-help">
            Share enough context so we can diagnose properly. ({form.biggestPain.length}/800)
          </p>
        )}
      </label>

      <label className="form-field">
        <span>Timeline</span>
        <select
          required
          name="timeline"
          value={form.timeline}
          onChange={(event) => updateField("timeline", event.target.value)}
          onBlur={() => handleBlur("timeline")}
          aria-invalid={Boolean(timelineError)}
          aria-describedby={timelineError ? "audit-timeline-error" : undefined}
          className={cn(timelineError && "form-input-invalid")}
        >
          <option value="">Select timeline</option>
          {auditTimelineOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {timelineError ? (
          <p id="audit-timeline-error" className="form-error" role="alert">
            {timelineError}
          </p>
        ) : null}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="button-primary w-full sm:w-auto"
          disabled={status === "submitting" || (hasStarted && !isFormValid)}
        >
          {status === "submitting" ? "Submitting..." : siteConfig.secondaryCta}
        </button>
        <a
          href={siteConfig.calendly}
          target="_blank"
          rel="noreferrer"
          className="button-secondary inline-flex w-full justify-center sm:w-auto"
          onClick={() => trackEvent("calendly_click", { source: "audit_form" })}
        >
          Or book on Calendly
        </a>
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : null}

      {showDevHints ? (
        <p className="text-xs leading-6 text-[color:var(--text-subtle)]">
          Form endpoint setup: configure `AUDIT_FORM_ENDPOINT` (or
          `NEXT_PUBLIC_AUDIT_FORM_ENDPOINT`) to connect Formspree, Basin, Tally, Airtable,
          Supabase, or your own endpoint.
        </p>
      ) : null}
    </form>
  );
}
