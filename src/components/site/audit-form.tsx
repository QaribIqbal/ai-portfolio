"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-content";
import { getStoredUtmParams, readTrackingParams } from "@/lib/utm";

type AuditFormState = {
  name: string;
  email: string;
  agencySize: string;
  primaryServices: string;
  biggestPain: string;
  timeline: string;
};

const initialState: AuditFormState = {
  name: "",
  email: "",
  agencySize: "",
  primaryServices: "",
  biggestPain: "",
  timeline: "",
};

export function AuditForm() {
  const showDevHints = process.env.NODE_ENV !== "production";
  const [form, setForm] = useState<AuditFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  function updateField(key: keyof AuditFormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function markStart() {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackEvent("audit_form_start");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/forms/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
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
      trackEvent("audit_form_submit", { timeline: form.timeline });
      setForm(initialState);
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
      <div id="audit-request-form" className="panel space-y-4">
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

  return (
    <form
      id="audit-request-form"
      className="panel space-y-5"
      onSubmit={handleSubmit}
      onFocusCapture={markStart}
    >
      <div className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel-soft)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
        Free Automation Audit Request
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="form-field">
          <span>Name</span>
          <input
            required
            type="text"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label className="form-field">
          <span>Work email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@agency.com"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="form-field">
          <span>Agency size</span>
          <input
            required
            type="text"
            value={form.agencySize}
            onChange={(event) => updateField("agencySize", event.target.value)}
            placeholder="Example: 10-person team"
          />
        </label>
        <label className="form-field">
          <span>Primary services</span>
          <input
            required
            type="text"
            value={form.primaryServices}
            onChange={(event) => updateField("primaryServices", event.target.value)}
            placeholder="Performance, SEO, creative, lifecycle, etc."
          />
        </label>
      </div>

      <label className="form-field">
        <span>Biggest pain</span>
        <textarea
          required
          value={form.biggestPain}
          onChange={(event) => updateField("biggestPain", event.target.value)}
          placeholder="Which workflow is currently slowing your team down most?"
          rows={4}
        />
      </label>

      <label className="form-field">
        <span>Timeline</span>
        <input
          required
          type="text"
          value={form.timeline}
          onChange={(event) => updateField("timeline", event.target.value)}
          placeholder="This month, next quarter, or evaluating"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="button-primary w-full sm:w-auto" disabled={status === "submitting"}>
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

      {status === "error" ? <p className="text-sm text-red-300">{error}</p> : null}

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
