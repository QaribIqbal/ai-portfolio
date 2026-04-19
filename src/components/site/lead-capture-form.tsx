"use client";

import { useState } from "react";

import { siteConfig } from "@/lib/site-content";

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
  const [form, setForm] = useState<LeadFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "opening">("idle");

  function updateField(key: keyof LeadFormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent("Agency AI Automation Checklist request");
    const body = encodeURIComponent(
      [
        "Hi Qarib,",
        "",
        "I'd like the Free Agency AI Automation Checklist.",
        "",
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Agency size: ${form.agencySize}`,
        `Current bottleneck: ${form.biggestBottleneck}`,
        "",
        "Please send the checklist when you can.",
      ].join("\n"),
    );

    setStatus("opening");
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="panel space-y-5" onSubmit={handleSubmit}>
      <div className="rounded-[24px] border border-[color:var(--line)] bg-[color:rgba(255,255,255,0.02)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--text-subtle)]">
        Checklist Request
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
        <input
          required
          type="text"
          value={form.agencySize}
          onChange={(event) => updateField("agencySize", event.target.value)}
          placeholder="Example: 5-person team"
        />
      </label>

      <label className="form-field">
        <span>Biggest manual bottleneck right now</span>
        <textarea
          required
          value={form.biggestBottleneck}
          onChange={(event) => updateField("biggestBottleneck", event.target.value)}
          placeholder="Lead follow-up, reporting, onboarding, or another ops issue"
          rows={4}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="button-primary">
          Request the Checklist
        </button>
        <p className="text-sm leading-6 text-[color:var(--text-subtle)]">
          This opens a prefilled email so you can send the request in one click.
        </p>
      </div>

      {status === "opening" ? (
        <p className="text-sm text-[color:var(--accent)]">
          Your email app should open with the request already drafted.
        </p>
      ) : null}
    </form>
  );
}
