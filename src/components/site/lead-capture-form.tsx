"use client";

import { useState } from "react";

import { ButtonLink } from "@/components/site/button-link";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-content";
import { getStoredUtmParams, readTrackingParams } from "@/lib/utm";

type LeadFormState = {
  name: string;
  email: string;
  agencySize: string;
  biggestBottleneck: string;
};

const initialState: LeadFormState = {
  name: "",
  email: "",
  agencySize: "",
  biggestBottleneck: "",
};

export function LeadCaptureForm() {
  const showDevHints = process.env.NODE_ENV !== "production";
  const [form, setForm] = useState<LeadFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  function updateField(key: keyof LeadFormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function markStart() {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackEvent("checklist_form_start");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/forms/checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
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
      trackEvent("checklist_form_submit", { agency_size: form.agencySize });
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
      <div id="lead-capture-form" className="panel space-y-4">
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

  return (
    <form
      id="lead-capture-form"
      className="panel space-y-5"
      onSubmit={handleSubmit}
      onFocusCapture={markStart}
    >
      <div className="rounded-full border border-[color:var(--line)] bg-[color:var(--panel-soft)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
        Agency AI Automation Checklist
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

      <label className="form-field">
        <span>Agency size</span>
        <select
          required
          value={form.agencySize}
          onChange={(event) => updateField("agencySize", event.target.value)}
          className="rounded-[22px] border px-4 py-3.5 text-[0.96rem] leading-6 text-[color:var(--text-main)] transition"
          style={{
            background: "color-mix(in oklch, var(--panel) 86%, black 14%)",
            borderColor: "var(--line)",
          }}
        >
          <option value="">Select your team size</option>
          <option value="1-5">1-5 people</option>
          <option value="6-9">6-9 people</option>
          <option value="10-15">10-15 people</option>
          <option value="16-25">16-25 people</option>
          <option value="26+">26+ people</option>
        </select>
      </label>

      <label className="form-field">
        <span>Biggest bottleneck right now</span>
        <textarea
          required
          value={form.biggestBottleneck}
          onChange={(event) => updateField("biggestBottleneck", event.target.value)}
          placeholder="Lead follow-up, reporting, onboarding, handoffs, or another ops issue"
          rows={4}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="button-primary w-full sm:w-auto" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : siteConfig.primaryCta}
        </button>
        <p className="text-sm leading-6 text-[color:var(--text-subtle)]">
          No spam. This is a practical checklist for agency operators.
        </p>
      </div>

      {status === "error" ? <p className="text-sm text-red-300">{error}</p> : null}

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
