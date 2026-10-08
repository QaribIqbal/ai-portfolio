"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { buildAuditEmailHref } from "@/lib/audit-email";
import { dentalAuditForm } from "@/lib/dental-content";
import {
  sanitizeDentalAuditForm,
  validateDentalAuditField,
  validateDentalAuditForm,
  type DentalAuditFormErrors,
  type DentalAuditFormValues,
} from "@/lib/form-validation";
import { DENTAL_AUDIT_FORM_NAME, NETLIFY_FORMS_PATH, encodeNetlifyForm } from "@/lib/netlify-forms";
import { siteConfig } from "@/lib/site-content";
import { getStoredUtmParams, readTrackingParams } from "@/lib/utm";
import { cn } from "@/lib/utils";

const initialState: DentalAuditFormValues = {
  clinicName: "",
  name: "",
  email: "",
  phone: "",
  smsTool: "",
  consent: false,
};

type TextField = Exclude<keyof DentalAuditFormValues, "consent">;

const textFields: Array<{
  field: TextField;
  type: "text" | "email" | "tel";
  autoComplete: string;
  inputMode?: "email" | "tel";
  required: boolean;
  maxLength: number;
}> = [
  { field: "clinicName", type: "text", autoComplete: "organization", required: true, maxLength: 120 },
  { field: "name", type: "text", autoComplete: "name", required: true, maxLength: 80 },
  { field: "email", type: "email", autoComplete: "email", inputMode: "email", required: true, maxLength: 120 },
  { field: "phone", type: "tel", autoComplete: "tel", inputMode: "tel", required: false, maxLength: 25 },
  { field: "smsTool", type: "text", autoComplete: "off", required: false, maxLength: 200 },
];

export function DentalAuditForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<DentalAuditFormValues>(initialState);
  const [errors, setErrors] = useState<DentalAuditFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [hasStarted, setHasStarted] = useState(false);

  function markStart() {
    if (hasStarted) return;
    setHasStarted(true);
    trackEvent("dental_audit_form_start");
  }

  function updateField<K extends keyof DentalAuditFormValues>(field: K, value: DentalAuditFormValues[K]) {
    if (status === "error") setStatus("idle");

    const next = { ...form, [field]: value };
    setForm(next);
    if (errors[field]) {
      setErrors((currentErrors) => ({ ...currentErrors, [field]: validateDentalAuditField(field, next) }));
    }
  }

  function handleBlur(field: keyof DentalAuditFormValues) {
    setErrors((currentErrors) => ({ ...currentErrors, [field]: validateDentalAuditField(field, form) }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateDentalAuditForm(form);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      trackEvent("dental_audit_form_validation_error", { field: firstInvalid });
      return;
    }

    setStatus("submitting");

    const sanitized = sanitizeDentalAuditForm(form);
    const utm = {
      ...getStoredUtmParams(),
      ...readTrackingParams(new URLSearchParams(window.location.search)),
    };

    try {
      const response = await fetch(NETLIFY_FORMS_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeNetlifyForm(DENTAL_AUDIT_FORM_NAME, {
          clinicName: sanitized.clinicName,
          name: sanitized.name,
          email: sanitized.email,
          phone: sanitized.phone,
          smsTool: sanitized.smsTool,
          consent: "yes",
          pagePath: window.location.pathname,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
        }),
      });

      if (!response.ok) throw new Error(`Netlify Forms responded with ${response.status}`);

      setStatus("success");
      setForm(initialState);
      trackEvent("dental_audit_form_submit");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="dental-form dental-form-success" role="status" aria-live="polite">
        <CheckCircle2 className="h-8 w-8 text-[color:var(--dental-emerald)]" aria-hidden="true" />
        <p>{dentalAuditForm.success}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      name={DENTAL_AUDIT_FORM_NAME}
      className="dental-form"
      onSubmit={handleSubmit}
      onFocusCapture={markStart}
      noValidate
    >
      {textFields.map(({ field, type, autoComplete, inputMode, required, maxLength }) => {
        const error = errors[field];
        const errorId = `dental-${field}-error`;
        const helpText = field === "phone" || field === "smsTool" ? dentalAuditForm.help[field] : undefined;
        const helpId = `dental-${field}-help`;
        const describedBy = [helpText ? helpId : "", error ? errorId : ""].filter(Boolean).join(" ") || undefined;

        return (
          <label key={field} className="dental-field">
            <span>{dentalAuditForm.labels[field]}</span>
            {helpText ? (
              <span id={helpId} className="dental-field-help">
                {helpText}
              </span>
            ) : null}
            <input
              name={field}
              type={type}
              autoComplete={autoComplete}
              inputMode={inputMode}
              required={required}
              maxLength={maxLength}
              value={form[field]}
              onChange={(event) => updateField(field, event.target.value)}
              onBlur={() => handleBlur(field)}
              aria-invalid={Boolean(error)}
              aria-describedby={describedBy}
              className={cn(error && "dental-input-invalid")}
            />
            {error ? (
              <span id={errorId} className="dental-field-error" role="alert">
                {error}
              </span>
            ) : null}
          </label>
        );
      })}

      <label className="dental-consent">
        <input
          name="consent"
          type="checkbox"
          required
          checked={form.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "dental-consent-error" : undefined}
        />
        <span>{dentalAuditForm.labels.consent}</span>
      </label>
      {errors.consent ? (
        <span id="dental-consent-error" className="dental-field-error" role="alert">
          {errors.consent}
        </span>
      ) : null}

      <button type="submit" className="dental-cta w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : dentalAuditForm.submit}
      </button>

      {status === "error" ? (
        <div className="dental-form-fallback" role="alert">
          <p>{dentalAuditForm.fallback.message}</p>
          <a
            className="dental-text-link"
            href={buildAuditEmailHref({
              to: siteConfig.email,
              subject: dentalAuditForm.fallback.subject,
              values: sanitizeDentalAuditForm(form),
            })}
            onClick={() => trackEvent("dental_audit_email_fallback_click")}
          >
            {dentalAuditForm.fallback.link}
          </a>
        </div>
      ) : null}

      <p className="dental-form-note">{dentalAuditForm.note}</p>
    </form>
  );
}
