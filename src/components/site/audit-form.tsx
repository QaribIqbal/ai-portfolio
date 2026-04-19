"use client";

import { useState } from "react";

import { siteConfig } from "@/lib/site-content";

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
  const [form, setForm] = useState<AuditFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "opening">("idle");

  function updateField(key: keyof AuditFormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent("Free Automation Audit request");
    const body = encodeURIComponent(
      [
        "Hi Qarib,",
        "",
        "I'd like to book a Free Automation Audit.",
        "",
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Agency size: ${form.agencySize}`,
        `Primary services: ${form.primaryServices}`,
        `Biggest manual pain right now: ${form.biggestPain}`,
        `Desired timeline to start: ${form.timeline}`,
        "",
        "Please let me know the next step.",
      ].join("\n"),
    );

    setStatus("opening");
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="panel space-y-5" onSubmit={handleSubmit}>
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
            placeholder="Example: 7-person team, 20 active clients"
          />
        </label>
        <label className="form-field">
          <span>Primary services</span>
          <input
            required
            type="text"
            value={form.primaryServices}
            onChange={(event) => updateField("primaryServices", event.target.value)}
            placeholder="Performance, creative, SEO, lifecycle, or mixed"
          />
        </label>
      </div>

      <label className="form-field">
        <span>Biggest manual pain right now</span>
        <textarea
          required
          value={form.biggestPain}
          onChange={(event) => updateField("biggestPain", event.target.value)}
          placeholder="Describe the workflow that is eating time, causing missed steps, or slowing the team down"
          rows={4}
        />
      </label>

      <label className="form-field">
        <span>Desired timeline to start</span>
        <input
          required
          type="text"
          value={form.timeline}
          onChange={(event) => updateField("timeline", event.target.value)}
          placeholder="Example: This month, next quarter, or just exploring"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="button-primary">
          Send Audit Request
        </button>
        <p className="text-sm leading-6 text-[color:var(--text-subtle)]">
          This opens a prefilled email with your answers so the next step is clear.
        </p>
      </div>

      {status === "opening" ? (
        <p className="text-sm text-[color:var(--accent)]">
          Your email app should open with the audit request drafted.
        </p>
      ) : null}
    </form>
  );
}
