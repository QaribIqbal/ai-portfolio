# Dental Landing Page (/dental) + Homepage Fixes Implementation Plan

> **For agentic workers (written for Claude Sonnet 5.5):** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Work through the tasks in order; each task ends with a commit.

**Goal:** Ship a mobile-first `/dental` landing page on qaribiqbal.netlify.app that matches the Instagram bio and DM offer word for word, with a Netlify Forms audit form. Also add a "For dental clinics →" entry on the homepage and remove the shelved Geo Dash demo from the project archive.

**Architecture:** `/dental` is a statically prerendered Next.js App Router page. All copy lives in one plain-TS content module (`src/lib/dental-content.ts`) so tests and the content-verification script can lock it to the spec. The only client component is the audit form. It POSTs URL-encoded data to a static form skeleton in `public/__forms.html`, which is how Netlify Forms works under the Netlify Next.js runtime. Page styles are scoped under `.dental-page` in a page-local CSS file, so the existing amber agency theme is untouched.

**Tech stack:** Next.js 16.1 (App Router, Turbopack), React 19.1, TypeScript 5, Tailwind v4 (homepage only), plain CSS for `/dental`, `next/og` for the OG image, Node's built-in test runner, Netlify Forms (free tier).

## Global constraints (from the spec, verbatim; every task must respect these)

- Do NOT touch qaribiqbal92.netlify.app (separate dev portfolio).
- No invented numbers, results, or testimonials anywhere. The only stats allowed are the ones written in the spec: 60-second, 30 to 38%, 31 December, AUD 490, 48 hours, AUD 649/month, first 3 practices, zero appointments in 30 days, 24 months, 3 min, 6 November 2026.
- Demos must be labelled as demos. No fake screenshots of client systems. No stock imagery.
- New page palette: Emerald `#10B981`, Onyx `#0A0F0D`, Cream `#F5F1E8`. Gold `#D4AF37` **only on CTA buttons** (not on links, borders, focus rings, or icons).
- No paid services or new accounts. Forms use Netlify Forms (free tier, site is already on Netlify).
- Mobile-first: most visitors arrive from Instagram on a phone.
- No new frameworks or trackers, and no new npm dependencies. `next/og` ships with Next.
- No lorem ipsum, and no placeholder text other than the demo panel. That includes **no `placeholder=""` attributes** on the dental form inputs.
- Homepage: change nothing except the nav item, the dental card, Geo Dash removal, and the count text. Headline, sprints, proof studies, testimonial holding note, and the October availability line all stay.

## Codebase facts you must know (verified on 8 Oct 2026 against `main` @ `96216ca`)

1. **Hosting:** The live site runs the Netlify Next.js runtime: response headers show `server: Netlify`, `x-powered-by: Next.js`, and `netlify-vary`. There is no `netlify.toml`; build settings live in the Netlify UI. `/dental` currently returns 404.
2. **Netlify Forms under the Next.js runtime:** Netlify cannot detect forms rendered by React. The supported pattern is a static HTML file in `public/` containing a hidden copy of the form with `data-netlify="true"`, plus a client `fetch` POST to that file's path with `Content-Type: application/x-www-form-urlencoded` and a `form-name` field. Field names must match the static file exactly, or Netlify silently drops those fields.
3. **Local form testing is impossible:** under `next start`, `POST /__forms.html` returns **500** (verified), so locally the form shows its error state. Real submissions only work on a Netlify deploy (deploy preview or production).
4. **Existing forms are separate:** `/contact` and `/checklist` use a Formspree relay at `src/app/api/forms/[formType]/route.ts`. Do not modify or reuse it.
5. **Tests on Node 22.14 (this VM):** `npm test` fails with `ERR_UNKNOWN_FILE_EXTENSION ".ts"`. Run tests with `node --experimental-strip-types --test src/lib/*.test.ts` instead. Node 22.18+ and 23.6+ strip types by default, so `npm test` works there. Do not change `package.json`.
6. **Test imports:** test files import siblings with an explicit `.ts` extension (`./site-content.ts`). Any `src/lib` module that a test imports must have **no** `@/` imports, because Node can't resolve the alias. `import type` is fine, since it gets stripped.
7. **Turbopack rejects a symlinked `node_modules`** ("Symlink node_modules is invalid"). In a worktree, run a real `npm ci`.
8. **Global scroll effects:** `src/components/site/smooth-scroll-provider.tsx` (mounted in the root layout) animates any `.hero-panel`, `.section-slice`, `.section-slice-hero`, `[data-depth-section]`, `[data-tilt-card]`, and `.svc-visual-side`. **Never use these classes on `/dental`.** Its Lenis click handler already smooth-scrolls same-page `href="#id"` links with a -80px offset, so plain `<a href="#audit">` anchors work with no extra JS.
9. **No `metadataBase` today:** without it, OG image URLs fall back to `localhost`. Task 4 adds `metadataBase: https://qaribiqbal.netlify.app`.
10. **Desktop header capacity (measured):** the header renders `navigation.slice(0, 3)`. At 1280px the baseline row has under 50px of slack. Adding a 4th uppercase link (`For dental clinics →`) wraps the link and both CTA buttons. This happens even with tighter tracking, with the brand name hidden, or with "Process" swapped out (all three tried and screenshotted). The fix used in Task 7 is to show four links (`whitespace-nowrap`), keep the primary "Book Free Automation Audit" button, and hide the long secondary checklist button at `lg` and up (`hidden sm:inline-flex lg:hidden`). The checklist stays reachable from the hero, final CTA, footer, and mobile menu. **This is the one deliberate header trade-off; call it out in the PR description.**
11. **Archive counts:** the ledger counts on the homepage come from `projectEvidence`, so they update automatically (7→6 documented systems, 5→4 watchable demos). Only the hardcoded `<h3>Seven systems…` needs a text edit. The `/case-studies` page has no hardcoded counts.
12. **LCP measurement:** in Lighthouse's default *simulated* throttling, every existing page reads LCP of about 3.2–3.4s (`/` 3.4s, `/contact` 3.2s) because the root layout ships GSAP/Lenis JS. That's site-wide, not page-specific. With **DevTools throttling** (real slow-4G plus 4x CPU slowdown), the prototype `/dental` measured **LCP 1.8s, score 0.98**, and unthrottled LCP equals FCP at about 100ms. Use the DevTools-throttled number for the spec's "LCP under 2.5s on 4G" check (Task 9).

## File map

| File | Status | Responsibility |
|---|---|---|
| `src/lib/netlify-forms.ts` | create | Form name, static path, field list, URL-encoding helper |
| `public/__forms.html` | create | Static skeleton Netlify detects at build time |
| `src/lib/netlify-forms.test.ts` | create | Encoding, plus a check that the static HTML declares every field |
| `src/lib/form-validation.ts` | modify (append) | Dental form types, sanitize, validate |
| `src/lib/form-validation.test.ts` | create | Dental validation rules |
| `src/lib/dental-content.ts` | create | Every word of `/dental` copy, Instagram URL, demo URL slot |
| `src/lib/dental-content.test.ts` | create | Exact-copy lock and allowed-numbers guard |
| `src/lib/seo.ts` | modify | `metadataBase`, optional `path` (canonical), optional `keywords` |
| `src/lib/seo.test.ts` | create | Metadata helper behaviour |
| `src/components/dental/dental-audit-form.tsx` | create | Client form: validation, Netlify POST, success/error states |
| `src/app/dental/page.tsx` | create | Server page: all sections, metadata |
| `src/app/dental/dental.css` | create | Scoped, mobile-first styles for the page |
| `src/app/dental/opengraph-image.tsx` | create | 1200×630 brand card (Onyx background, Emerald headline) |
| `src/lib/site-content.ts` | modify | Add nav item, remove Geo Dash |
| `src/lib/proof-content.test.ts` | modify | Geo Dash absent; dental nav item within first four |
| `src/components/site/site-header.tsx` | modify | Four desktop links; header button visibility |
| `src/app/page.tsx` | modify | Dental card in "What I Build"; "Six systems" |
| `scripts/verify-site-content.mjs` | modify | Spec-copy and regression guards |
| `README.md` | modify | Netlify Forms setup and demo-video swap instructions |

---

### Task 0: Branch, install, baseline

- [ ] **Step 1: Branch and install**

```bash
cd /workspace
git checkout main && git pull origin main
git checkout -b cursor/dental-landing-page-<suffix>   # follow the branch naming rule you were given
npm ci --no-audit --no-fund
```

- [ ] **Step 2: Record the baseline**

```bash
node --experimental-strip-types --test src/lib/*.test.ts 2>&1 | grep -E "^# (tests|pass|fail)"
node scripts/verify-site-content.mjs
npm run build 2>&1 | grep -E "Compiled|/dental|○|ƒ"
```

Expected: `# tests 11`, `# pass 11`, `# fail 0`; `Content verification passed.`; build succeeds with routes `/`, `/about`, `/case-studies`, `/checklist`, `/contact`, `/services`, `/api/forms/[formType]`, and no `/dental`.

---

### Task 1: Netlify Forms plumbing

**Files:**
- Create: `src/lib/netlify-forms.ts`
- Create: `public/__forms.html`
- Test: `src/lib/netlify-forms.test.ts`

**Interfaces:**
- Produces: `NETLIFY_FORMS_PATH = "/__forms.html"`, `DENTAL_AUDIT_FORM_NAME = "dental-audit"`, `DENTAL_AUDIT_FORM_FIELDS` (readonly tuple of field names), `type NetlifyFormPayload = Record<string, string | undefined>`, `encodeNetlifyForm(formName: string, payload: NetlifyFormPayload): string`.

- [ ] **Step 1: Write the failing test** at `src/lib/netlify-forms.test.ts`

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  DENTAL_AUDIT_FORM_FIELDS,
  DENTAL_AUDIT_FORM_NAME,
  NETLIFY_FORMS_PATH,
  encodeNetlifyForm,
} from "./netlify-forms.ts";

test("encodes the form name first and skips empty values", () => {
  const body = encodeNetlifyForm("dental-audit", {
    clinicName: "Harbour Dental",
    phone: "",
    smsTool: undefined,
    email: "sam@harbourdental.com.au",
  });

  assert.equal(
    body,
    "form-name=dental-audit&clinicName=Harbour+Dental&email=sam%40harbourdental.com.au",
  );
});

test("the static Netlify form declares every field the React form submits", () => {
  const html = readFileSync(new URL(`../../public${NETLIFY_FORMS_PATH}`, import.meta.url), "utf8");

  assert.match(html, new RegExp(`<form[^>]*name="${DENTAL_AUDIT_FORM_NAME}"[^>]*data-netlify="true"`));
  assert.match(html, /netlify-honeypot="bot-field"/);

  for (const field of DENTAL_AUDIT_FORM_FIELDS) {
    assert.match(html, new RegExp(`name="${field}"`), `missing field ${field}`);
  }
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --experimental-strip-types --test src/lib/netlify-forms.test.ts`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `netlify-forms.ts`.

- [ ] **Step 3: Create `src/lib/netlify-forms.ts`**

```ts
// Netlify's Next.js runtime cannot detect forms rendered by React, so every form
// must also exist as static markup in public/__forms.html and be POSTed there.
export const NETLIFY_FORMS_PATH = "/__forms.html";

export const DENTAL_AUDIT_FORM_NAME = "dental-audit";

export const DENTAL_AUDIT_FORM_FIELDS = [
  "clinicName",
  "name",
  "email",
  "phone",
  "smsTool",
  "consent",
  "pagePath",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

export type NetlifyFormPayload = Record<string, string | undefined>;

export function encodeNetlifyForm(formName: string, payload: NetlifyFormPayload): string {
  const body = new URLSearchParams();
  body.append("form-name", formName);

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === "") {
      continue;
    }

    body.append(key, value);
  }

  return body.toString();
}
```

- [ ] **Step 4: Create `public/__forms.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Netlify form definitions</title>
  </head>
  <body>
    <!-- Build-time form detection for Netlify. Keep field names in sync with src/lib/netlify-forms.ts. -->
    <form name="dental-audit" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="hidden" name="form-name" value="dental-audit" />
      <input name="bot-field" />
      <input name="clinicName" />
      <input name="name" />
      <input name="email" type="email" />
      <input name="phone" type="tel" />
      <input name="smsTool" />
      <input name="consent" type="checkbox" value="yes" />
      <input name="pagePath" type="hidden" />
      <input name="utm_source" type="hidden" />
      <input name="utm_medium" type="hidden" />
      <input name="utm_campaign" type="hidden" />
      <input name="utm_content" type="hidden" />
    </form>
  </body>
</html>
```

- [ ] **Step 5: Run the test and confirm it passes**

Run: `node --experimental-strip-types --test src/lib/netlify-forms.test.ts`
Expected: `# pass 2`, `# fail 0`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/netlify-forms.ts src/lib/netlify-forms.test.ts public/__forms.html
git commit -m "feat(dental): add Netlify Forms skeleton and encoder for the dental audit form"
```

---

### Task 2: Dental audit form validation

**Files:**
- Modify: `src/lib/form-validation.ts` (append to the end of the file; reuses its private `normalize`, `validateName`, and `validateEmail`)
- Test: `src/lib/form-validation.test.ts`

**Interfaces:**
- Produces: `type DentalAuditFormValues = { clinicName: string; name: string; email: string; phone: string; smsTool: string; consent: boolean }`, `type DentalAuditFormErrors = Partial<Record<keyof DentalAuditFormValues, string>>`, `sanitizeDentalAuditForm(values): DentalAuditFormValues`, `validateDentalAuditField(field, values): string | undefined`, `validateDentalAuditForm(values): DentalAuditFormErrors`.

- [ ] **Step 1: Write the failing test** at `src/lib/form-validation.test.ts`

```ts
import test from "node:test";
import assert from "node:assert/strict";

import {
  sanitizeDentalAuditForm,
  validateDentalAuditForm,
  type DentalAuditFormValues,
} from "./form-validation.ts";

const validDentalForm: DentalAuditFormValues = {
  clinicName: "Harbour Dental",
  name: "Sam Lee",
  email: "sam@harbourdental.com.au",
  phone: "",
  smsTool: "",
  consent: true,
};

test("accepts a dental audit request with only the required fields", () => {
  assert.deepEqual(validateDentalAuditForm(validDentalForm), {});
});

test("requires clinic name, name, email, and the patient-data confirmation", () => {
  const errors = validateDentalAuditForm({
    clinicName: " ",
    name: "",
    email: "",
    phone: "",
    smsTool: "",
    consent: false,
  });

  assert.deepEqual(Object.keys(errors).sort(), ["clinicName", "consent", "email", "name"]);
});

test("rejects a malformed email and phone but allows a blank phone", () => {
  const errors = validateDentalAuditForm({ ...validDentalForm, email: "sam@", phone: "call me" });
  assert.ok(errors.email);
  assert.ok(errors.phone);
  assert.equal(validateDentalAuditForm({ ...validDentalForm, phone: "+61 2 9000 0000" }).phone, undefined);
});

test("collapses whitespace before a dental request is sent", () => {
  const sanitized = sanitizeDentalAuditForm({
    ...validDentalForm,
    clinicName: "  Harbour   Dental ",
    smsTool: " Dental4Windows  SMS ",
  });

  assert.equal(sanitized.clinicName, "Harbour Dental");
  assert.equal(sanitized.smsTool, "Dental4Windows SMS");
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --experimental-strip-types --test src/lib/form-validation.test.ts`
Expected: FAIL with a `SyntaxError` saying the requested module does not provide an export named `sanitizeDentalAuditForm`.

- [ ] **Step 3: Append this block to the end of `src/lib/form-validation.ts`** (after `validateAuditForm`; change nothing above it)

```ts
export type DentalAuditFormValues = {
  clinicName: string;
  name: string;
  email: string;
  phone: string;
  smsTool: string;
  consent: boolean;
};

export type DentalAuditFormErrors = Partial<Record<keyof DentalAuditFormValues, string>>;

const phonePattern = /^[+\d][\d\s()-]{5,24}$/;

export function sanitizeDentalAuditForm(values: DentalAuditFormValues): DentalAuditFormValues {
  return {
    ...values,
    clinicName: normalize(values.clinicName),
    name: normalize(values.name),
    email: normalize(values.email),
    phone: normalize(values.phone),
    smsTool: normalize(values.smsTool),
  };
}

export function validateDentalAuditField(
  field: keyof DentalAuditFormValues,
  values: DentalAuditFormValues,
) {
  switch (field) {
    case "clinicName": {
      const normalized = normalize(values.clinicName);
      if (!normalized) {
        return "Please enter your clinic name.";
      }

      if (normalized.length > 120) {
        return "Clinic name is too long. Keep it under 120 characters.";
      }

      return undefined;
    }
    case "name":
      return validateName(values.name);
    case "email":
      return validateEmail(values.email);
    case "phone": {
      const normalized = normalize(values.phone);
      if (!normalized) {
        return undefined;
      }

      if (!phonePattern.test(normalized)) {
        return "Please enter a valid phone number, or leave it blank.";
      }

      return undefined;
    }
    case "smsTool":
      return normalize(values.smsTool).length > 200
        ? "Please keep this under 200 characters."
        : undefined;
    case "consent":
      return values.consent ? undefined : "Please confirm before sending.";
    default:
      return undefined;
  }
}

export function validateDentalAuditForm(values: DentalAuditFormValues): DentalAuditFormErrors {
  const errors: DentalAuditFormErrors = {};

  (Object.keys(values) as Array<keyof DentalAuditFormValues>).forEach((field) => {
    const message = validateDentalAuditField(field, values);
    if (message) {
      errors[field] = message;
    }
  });

  return errors;
}
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `node --experimental-strip-types --test src/lib/form-validation.test.ts`
Expected: `# pass 4`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/form-validation.ts src/lib/form-validation.test.ts
git commit -m "feat(dental): add dental audit form validation"
```

---

### Task 3: Dental copy module (single source of truth for spec copy)

**Files:**
- Create: `src/lib/dental-content.ts`
- Test: `src/lib/dental-content.test.ts`

**Interfaces:**
- Produces: `DENTAL_INSTAGRAM_URL`, `DENTAL_DEMO_VIDEO_URL: string | null`, `dentalMeta {title, description}`, `dentalHero {title, subtitle, primaryCta, secondaryCta}`, `dentalProblems: string[]`, `dentalOffer {heading, what, price, ongoing, guarantee}`, `dentalSteps: {title, description}[]`, `dentalDemoPlaceholder: string`, `dentalAuditForm {labels: {clinicName, name, email, phone, smsTool, consent}, submit, success, note}`, `dentalFaqs: {question, answer}[]`, `dentalFinalCta {heading, button, instagramLink}`.

Copy rules: every string is copied character for character from the spec. The only additions are the form labels "(optional)" (the spec marks Phone and SMS-tool as optional) and the section headings "How it works", "Demo", and "FAQ", which name sections the spec defines. Do not reword anything else, and do not "improve" punctuation. `dentalMeta.title` deliberately omits ` | Qarib Iqbal`, because `buildMetadata` appends it.

- [ ] **Step 1: Write the failing test** at `src/lib/dental-content.test.ts`

```ts
import test from "node:test";
import assert from "node:assert/strict";

import * as dental from "./dental-content.ts";

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectStrings);
  return [];
}

const allCopy = collectStrings(dental).join("\n");

test("hero and offer copy match the spec word for word", () => {
  assert.equal(dental.dentalHero.title, "Missed calls become booked appointments.");
  assert.equal(dental.dentalOffer.price, "Fixed price: AUD 490. Live within 48 hours of access.");
  assert.equal(
    dental.dentalOffer.ongoing,
    "Ongoing: Missed-call text-back + monthly reactivation, AUD 649/month. Founding price for the first 3 practices.",
  );
  assert.equal(dental.dentalProblems.length, 3);
  assert.equal(dental.dentalSteps.length, 3);
  assert.equal(dental.dentalFaqs.length, 4);
});

test("only numbers written in the spec appear in dental copy", () => {
  const allowed = new Set(["60", "30", "38", "31", "490", "48", "649", "3", "24", "6", "2026"]);
  const numbers = allCopy.replace(/https?:\/\/\S+/g, "").match(/\d+/g) ?? [];
  const unexpected = numbers.filter((n) => !allowed.has(n));

  assert.deepEqual(unexpected, []);
});

test("no filler text, and the demo placeholder is labelled exactly as specified", () => {
  assert.doesNotMatch(allCopy, /lorem|ipsum|TODO|TBD/i);
  assert.equal(
    dental.dentalDemoPlaceholder,
    "Demo video: missed-call text-back + a live reactivation run (3 min). Recording in progress.",
  );
});

test("the Instagram link points at the owner's profile", () => {
  assert.equal(dental.DENTAL_INSTAGRAM_URL, "https://www.instagram.com/qaribiqbal92");
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --experimental-strip-types --test src/lib/dental-content.test.ts`
Expected: FAIL with `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Create `src/lib/dental-content.ts`**

```ts
export const DENTAL_INSTAGRAM_URL = "https://www.instagram.com/qaribiqbal92";

// Owner swaps this for the recorded demo's embed URL (YouTube /embed/ or Loom /embed/).
export const DENTAL_DEMO_VIDEO_URL: string | null = null;

export const dentalMeta = {
  title: "Missed-Call Text-Back + Patient Reactivation for Dental Clinics",
  description:
    "Free Missed-Call Leak Audit for Australian dental clinics. 60-second SMS text-back and a fixed-price AUD 490 reactivation campaign before the 31 December extras reset.",
};

export const dentalHero = {
  title: "Missed calls become booked appointments.",
  subtitle:
    "For Australian dental clinics: a 60-second SMS text-back for the calls your front desk can't reach, plus a patient reactivation campaign before health-fund extras reset on 31 December.",
  primaryCta: "Get the free Missed-Call Leak Audit",
  secondaryCta: "See the reactivation campaign",
};

export const dentalProblems = [
  "30 to 38% of inbound calls to dental practices go unanswered (industry estimates).",
  "A missed call with no text-back usually books with the next clinic.",
  "Unused health-fund extras expire 31 December for most major funds.",
];

export const dentalOffer = {
  heading: "The 31 December Reactivation Campaign",
  what: "We reactivate your existing patients with a compliant SMS + email sequence built around the extras reset: segment by health fund, write the copy, run it inside your clinic's own messaging system, and report every recovered booking.",
  price: "Fixed price: AUD 490. Live within 48 hours of access.",
  ongoing:
    "Ongoing: Missed-call text-back + monthly reactivation, AUD 649/month. Founding price for the first 3 practices.",
  guarantee:
    "Pilot guarantee: if the campaign recovers zero appointments in 30 days, the pilot fee is refunded. Conditions in writing before we start.",
};

export const dentalSteps = [
  {
    title: "Free Leak Audit",
    description:
      "we map where calls and patients are leaking: voicemail, lunch, after-hours, no callback queue.",
  },
  {
    title: "Build inside your system",
    description:
      "the campaign runs in the SMS/email tool your clinic already uses. Your patient data never leaves your clinic.",
  },
  {
    title: "Weekly proof",
    description: "a simple report: messages sent, replies, appointments recovered.",
  },
];

export const dentalDemoPlaceholder =
  "Demo video: missed-call text-back + a live reactivation run (3 min). Recording in progress.";

export const dentalAuditForm = {
  labels: {
    clinicName: "Clinic name",
    name: "Your name",
    email: "Work email",
    phone: "Phone (optional)",
    smsTool: "What do you currently use for patient SMS? (optional)",
    consent:
      "I confirm this enquiry is about my clinic's own systems. Do not send patient data through this form.",
  },
  submit: "Request my free Leak Audit",
  success: "Request received. Your audit summary arrives by email within one business day.",
  note: "The Leak Audit is free until 6 November 2026.",
};

export const dentalFaqs = [
  {
    question: "Does our patient data leave the clinic?",
    answer:
      "No. Campaigns run inside your existing messaging system. We segment and write; your data stays with you.",
  },
  {
    question: "Is the messaging compliant?",
    answer:
      "Yes. Sends go only to patients with express consent or who attended within the last 24 months, every message carries a STOP opt-out, and replies are forwarded to your front desk.",
  },
  {
    question: "What if we have no SMS tool?",
    answer:
      "We set up a sending number for you as a fallback, with every reply forwarded to your front desk the same day.",
  },
  {
    question: "How fast is it live?",
    answer: "48 hours from access to your system.",
  },
];

export const dentalFinalCta = {
  heading: "Find out what missed calls are costing your clinic.",
  button: "Get the free Missed-Call Leak Audit",
  instagramLink: "Prefer to talk first? DM 'AUDIT' on Instagram",
};
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `node --experimental-strip-types --test src/lib/dental-content.test.ts`
Expected: `# pass 4`, `# fail 0`. If "only numbers written in the spec" fails, you changed copy; fix the copy, never the allow-list.

- [ ] **Step 5: Commit**

```bash
git add src/lib/dental-content.ts src/lib/dental-content.test.ts
git commit -m "feat(dental): add spec-locked copy for the dental landing page"
```

---

### Task 4: SEO helper (metadataBase, canonical path, per-page keywords)

**Files:**
- Modify: `src/lib/seo.ts` (full replacement below; existing callers keep working because the new params are optional)
- Test: `src/lib/seo.test.ts`

**Interfaces:**
- Produces: `SITE_URL = "https://qaribiqbal.netlify.app"`, `buildMetadata({ title: string; description?: string; path?: string; keywords?: string[] }): Metadata`. When `path` is set, it adds `alternates.canonical` and `openGraph.url`. It always sets `metadataBase`.

- [ ] **Step 1: Write the failing test** at `src/lib/seo.test.ts`

```ts
import test from "node:test";
import assert from "node:assert/strict";

import { SITE_URL, buildMetadata } from "./seo.ts";

test("resolves social image URLs against the production domain", () => {
  const metadata = buildMetadata({ title: "Anything" });
  assert.equal(String(metadata.metadataBase), `${SITE_URL}/`);
});

test("sets a canonical URL and custom keywords when a path is given", () => {
  const metadata = buildMetadata({
    title: "Missed-Call Text-Back + Patient Reactivation for Dental Clinics",
    path: "/dental",
    keywords: ["dental missed call text back"],
  });

  assert.equal(metadata.title, "Missed-Call Text-Back + Patient Reactivation for Dental Clinics | Qarib Iqbal");
  assert.deepEqual(metadata.alternates, { canonical: "/dental" });
  assert.deepEqual(metadata.keywords, ["dental missed call text back"]);
});

test("keeps the agency defaults for pages that pass only a title", () => {
  const metadata = buildMetadata({ title: "AI Automation for Marketing Agencies" });
  assert.equal(metadata.alternates, undefined);
  assert.ok((metadata.keywords as string[]).includes("AI automation for marketing agencies"));
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --experimental-strip-types --test src/lib/seo.test.ts`
Expected: FAIL; `SITE_URL` is not exported.

- [ ] **Step 3: Replace `src/lib/seo.ts` with**

```ts
import type { Metadata } from "next";

export const SITE_URL = "https://qaribiqbal.netlify.app";

const baseTitle = "Qarib Iqbal";
const baseDescription =
  "AI automation for marketing agencies that want faster lead follow-up, automated reporting, cleaner onboarding, and less repetitive operational work.";

const defaultKeywords = [
  "AI automation for marketing agencies",
  "agency automation consultant",
  "marketing agency workflow automation",
  "AI systems for agencies",
  "automate lead follow-up for agencies",
  "agency reporting automation",
];

export function buildMetadata({
  title,
  description = baseDescription,
  path,
  keywords = defaultKeywords,
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${baseTitle}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      ...(path ? { url: path } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export const defaultMetadata = buildMetadata({
  title: "AI Automation for Marketing Agencies",
});
```

- [ ] **Step 4: Run all tests and confirm they pass**

Run: `node --experimental-strip-types --test src/lib/*.test.ts 2>&1 | grep -E "^# (tests|pass|fail)"`
Expected: `# tests 24`, `# pass 24`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/seo.ts src/lib/seo.test.ts
git commit -m "feat(seo): add metadataBase, canonical path, and per-page keywords"
```

---

### Task 5: The /dental page (form component, page, styles, OG image)

**Files:**
- Create: `src/components/dental/dental-audit-form.tsx`
- Create: `src/app/dental/page.tsx`
- Create: `src/app/dental/dental.css`
- Create: `src/app/dental/opengraph-image.tsx`

**Interfaces:**
- Consumes: everything produced by Tasks 1–4, plus the existing `trackEvent` (`@/lib/analytics`, which no-ops when no analytics is installed), `getStoredUtmParams` and `readTrackingParams` (`@/lib/utm`), `siteConfig.email` and `siteConfig.name` (`@/lib/site-content`), and `cn` (`@/lib/utils`).
- Produces: `DentalAuditForm` (named export, no props); route `/dental`; route `/dental/opengraph-image`. Section ids `offer`, `demo`, and `audit` are fixed by the spec.

Design rules for this task:
- The page is a server component. Do **not** add `export const dynamic`, GSAP, `motion`, Lenis hooks, images, or any of the global scroll classes listed in fact 8.
- Gold (`--dental-gold`) appears only on `.dental-cta` (the hero CTA, the submit button, and the final-band CTA). Text links are Emerald.
- Inputs use `font-size: 1rem` (prevents iOS zoom on focus) and are at least 48px tall; the checkbox is 22px; CTAs are at least 52px tall and full-width under 480px, so the form works one-handed.
- The FAQ shows every answer by default (no accordions), so it stays readable without interaction.
- The page has its own slim header (name links to `/`) and footer (name and email). Don't use `SiteHeader` or `SiteFooter` here: they carry agency CTAs.
- The demo panel: while `DENTAL_DEMO_VIDEO_URL` is `null`, render the exact placeholder text inside a dashed-border 16:9 box. When the owner sets a URL, a lazy-loaded `<iframe>` renders instead.

- [ ] **Step 1: Create `src/components/dental/dental-audit-form.tsx`**

```tsx
"use client";

import { CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";
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

        return (
          <label key={field} className="dental-field">
            <span>{dentalAuditForm.labels[field]}</span>
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
              aria-describedby={error ? errorId : undefined}
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
        <p className="dental-field-error" role="alert">
          That didn&apos;t go through. Please try again, or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline">
            {siteConfig.email}
          </a>
          .
        </p>
      ) : null}

      <p className="dental-form-note">{dentalAuditForm.note}</p>
    </form>
  );
}
```

- [ ] **Step 2: Create `src/app/dental/dental.css`**

```css
.dental-page {
  --dental-emerald: #10b981;
  --dental-onyx: #0a0f0d;
  --dental-cream: #f5f1e8;
  --dental-gold: #d4af37;
  --dental-muted: rgb(245 241 232 / 0.74);
  --dental-line: rgb(16 185 129 / 0.22);
  --dental-panel: rgb(245 241 232 / 0.04);

  min-height: 100dvh;
  background: var(--dental-onyx);
  color: var(--dental-muted);
  font-size: 1rem;
  line-height: 1.65;
}

.dental-page *:focus-visible {
  outline: 2px solid var(--dental-emerald);
  outline-offset: 3px;
}

.dental-page h1,
.dental-page h2 {
  margin: 0;
  color: var(--dental-cream);
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.dental-page h1 {
  font-size: clamp(2.3rem, 9vw, 4.4rem);
  line-height: 1.04;
  color: var(--dental-emerald);
}

.dental-page h2 {
  font-size: clamp(1.6rem, 6vw, 2.5rem);
  line-height: 1.12;
}

.dental-shell {
  width: 100%;
  max-width: 760px;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

.dental-header {
  padding-block: 1.25rem;
}

.dental-brand {
  color: var(--dental-cream);
  font-weight: 600;
  text-decoration: none;
}

.dental-hero {
  padding-block: 2.5rem 3.5rem;
}

.dental-lede {
  margin: 1.25rem 0 0;
  font-size: 1.12rem;
  max-width: 58ch;
}

.dental-hero-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 2rem;
}

.dental-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.25rem;
  padding: 0.85rem 1.5rem;
  border: 0;
  border-radius: 999px;
  background: var(--dental-gold);
  color: var(--dental-onyx);
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: filter 150ms ease, transform 150ms ease;
}

.dental-cta:hover {
  filter: brightness(1.08);
}

.dental-cta:active {
  transform: translateY(1px);
}

.dental-cta:disabled {
  cursor: progress;
  opacity: 0.7;
}

.dental-text-link {
  color: var(--dental-emerald);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.25em;
  padding-block: 0.5rem;
}

.dental-problems {
  border-block: 1px solid var(--dental-line);
  background: rgb(16 185 129 / 0.06);
}

.dental-problems ul {
  display: grid;
  gap: 1rem;
  margin-block: 0;
  padding-block: 1.75rem;
  list-style: none;
}

.dental-problems li {
  padding-left: 1rem;
  border-left: 3px solid var(--dental-emerald);
  color: var(--dental-cream);
}

.dental-section {
  padding-block: 3.5rem 0;
  scroll-margin-top: 1.5rem;
}

.dental-section > h2 {
  margin-bottom: 1.25rem;
}

.dental-body {
  margin: 0;
  max-width: 62ch;
}

.dental-card {
  border: 1px solid var(--dental-line);
  border-radius: 1rem;
  background: var(--dental-panel);
  padding: 1.25rem;
}

.dental-price {
  margin-top: 1.5rem;
}

.dental-price p {
  margin: 0;
}

.dental-price-main {
  color: var(--dental-cream);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem !important;
}

.dental-guarantee {
  margin: 1.25rem 0 0;
  padding-left: 1rem;
  border-left: 3px solid var(--dental-emerald);
}

.dental-steps {
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dental-steps li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.dental-steps p {
  margin: 0;
}

.dental-steps strong {
  color: var(--dental-cream);
}

.dental-step-number {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid var(--dental-emerald);
  color: var(--dental-emerald);
  font-weight: 700;
}

.dental-video {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px dashed var(--dental-emerald);
  border-radius: 1rem;
  background: var(--dental-panel);
}

.dental-video iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.dental-video-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 1.5rem;
  text-align: center;
  color: var(--dental-cream);
}

.dental-form {
  display: grid;
  gap: 1.1rem;
}

.dental-form-success {
  justify-items: start;
  border: 1px solid var(--dental-emerald);
  border-radius: 1rem;
  padding: 1.5rem;
  color: var(--dental-cream);
}

.dental-form-success p {
  margin: 0;
}

.dental-field {
  display: grid;
  gap: 0.4rem;
}

.dental-field > span:first-child {
  color: var(--dental-cream);
  font-size: 0.95rem;
  font-weight: 600;
}

.dental-field input {
  min-height: 3rem;
  padding: 0.75rem 1rem;
  border: 1px solid rgb(245 241 232 / 0.2);
  border-radius: 0.75rem;
  background: rgb(245 241 232 / 0.06);
  color: var(--dental-cream);
  font-size: 1rem;
}

.dental-field input:focus {
  border-color: var(--dental-emerald);
  outline: none;
  box-shadow: 0 0 0 3px rgb(16 185 129 / 0.25);
}

.dental-input-invalid {
  border-color: #f87171 !important;
}

.dental-field-error {
  color: #fca5a5;
  font-size: 0.9rem;
}

.dental-consent {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  color: var(--dental-cream);
  font-size: 0.95rem;
  cursor: pointer;
}

.dental-consent input {
  flex: none;
  width: 1.4rem;
  height: 1.4rem;
  margin-top: 0.1rem;
  accent-color: var(--dental-emerald);
}

.dental-form-note {
  margin: 0;
  font-size: 0.9rem;
}

.dental-faq {
  display: grid;
  gap: 0.75rem;
}

.dental-faq h3 {
  margin: 0;
  color: var(--dental-cream);
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;
}

.dental-faq p {
  margin: 0.5rem 0 0;
}

.dental-final {
  margin-top: 4rem;
  padding-block: 3.5rem;
  border-top: 1px solid var(--dental-line);
  background: rgb(16 185 129 / 0.06);
}

.dental-final .dental-shell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}

.dental-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  padding-block: 2rem;
  font-size: 0.9rem;
}

.dental-footer a {
  color: var(--dental-muted);
}

@media (max-width: 479px) {
  .dental-hero-actions .dental-cta,
  .dental-final .dental-cta {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .dental-hero {
    padding-block: 4.5rem 5rem;
  }

  .dental-problems ul {
    grid-template-columns: repeat(3, 1fr);
  }

  .dental-hero-actions {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }

  .dental-section {
    padding-top: 5rem;
  }
}
```

- [ ] **Step 3: Create `src/app/dental/page.tsx`**

```tsx
import Link from "next/link";

import { DentalAuditForm } from "@/components/dental/dental-audit-form";
import {
  DENTAL_DEMO_VIDEO_URL,
  DENTAL_INSTAGRAM_URL,
  dentalDemoPlaceholder,
  dentalFaqs,
  dentalFinalCta,
  dentalHero,
  dentalMeta,
  dentalOffer,
  dentalProblems,
  dentalSteps,
} from "@/lib/dental-content";
import { siteConfig } from "@/lib/site-content";
import { buildMetadata } from "@/lib/seo";

import "./dental.css";

export const metadata = buildMetadata({
  title: dentalMeta.title,
  description: dentalMeta.description,
  path: "/dental",
  keywords: [
    "dental missed call text back",
    "dental patient reactivation Australia",
    "health fund extras reset campaign",
    "dental clinic SMS automation",
  ],
});

export default function DentalPage() {
  return (
    <div className="dental-page">
      <header className="dental-shell dental-header">
        <Link href="/" className="dental-brand">
          {siteConfig.name}
        </Link>
      </header>

      <main>
        <section className="dental-shell dental-hero" aria-labelledby="dental-hero-title">
          <h1 id="dental-hero-title">{dentalHero.title}</h1>
          <p className="dental-lede">{dentalHero.subtitle}</p>
          <div className="dental-hero-actions">
            <a href="#audit" className="dental-cta">
              {dentalHero.primaryCta}
            </a>
            <a href="#offer" className="dental-text-link">
              {dentalHero.secondaryCta}
            </a>
          </div>
        </section>

        <section className="dental-problems" aria-label="Why calls and patients leak">
          <ul className="dental-shell">
            {dentalProblems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </section>

        <section id="offer" className="dental-shell dental-section" aria-labelledby="dental-offer-title">
          <h2 id="dental-offer-title">{dentalOffer.heading}</h2>
          <p className="dental-body">{dentalOffer.what}</p>
          <div className="dental-card dental-price">
            <p className="dental-price-main">{dentalOffer.price}</p>
            <p>{dentalOffer.ongoing}</p>
          </div>
          <p className="dental-guarantee">{dentalOffer.guarantee}</p>
        </section>

        <section className="dental-shell dental-section" aria-labelledby="dental-steps-title">
          <h2 id="dental-steps-title">How it works</h2>
          <ol className="dental-steps">
            {dentalSteps.map((step, index) => (
              <li key={step.title} className="dental-card">
                <span className="dental-step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <p>
                  <strong>{step.title}</strong> — {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="demo" className="dental-shell dental-section" aria-labelledby="dental-demo-title">
          <h2 id="dental-demo-title">Demo</h2>
          <div className="dental-video">
            {DENTAL_DEMO_VIDEO_URL ? (
              <iframe
                src={DENTAL_DEMO_VIDEO_URL}
                title={dentalDemoPlaceholder.replace(" Recording in progress.", "")}
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p className="dental-video-placeholder">{dentalDemoPlaceholder}</p>
            )}
          </div>
        </section>

        <section id="audit" className="dental-shell dental-section" aria-labelledby="dental-audit-title">
          <h2 id="dental-audit-title">{dentalHero.primaryCta}</h2>
          <DentalAuditForm />
        </section>

        <section className="dental-shell dental-section" aria-labelledby="dental-faq-title">
          <h2 id="dental-faq-title">FAQ</h2>
          <div className="dental-faq">
            {dentalFaqs.map((faq) => (
              <article key={faq.question} className="dental-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dental-final" aria-labelledby="dental-final-title">
          <div className="dental-shell">
            <h2 id="dental-final-title">{dentalFinalCta.heading}</h2>
            <a href="#audit" className="dental-cta">
              {dentalFinalCta.button}
            </a>
            <a href={DENTAL_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="dental-text-link">
              {dentalFinalCta.instagramLink}
            </a>
          </div>
        </section>
      </main>

      <footer className="dental-shell dental-footer">
        <Link href="/">{siteConfig.name}</Link>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </footer>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/app/dental/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

import { dentalHero, dentalMeta } from "@/lib/dental-content";

export const alt = `${dentalHero.title} ${dentalMeta.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0A0F0D",
          color: "#F5F1E8",
        }}
      >
        <div style={{ fontSize: 30, color: "#F5F1E8", opacity: 0.8 }}>Qarib Iqbal</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: "#10B981" }}>
            {dentalHero.title}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3, color: "#F5F1E8" }}>{dentalMeta.title}</div>
        </div>
        <div style={{ width: 160, height: 8, background: "#10B981" }} />
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 5: Build and confirm both routes are static**

Run: `npm run build 2>&1 | grep -E "Compiled|rror|/dental"`
Expected: `✓ Compiled successfully`, `○ /dental`, `○ /dental/opengraph-image` (○ = static). If you see `ƒ /dental`, something made it dynamic; remove it.

- [ ] **Step 6: Check the rendered meta tags**

Start the server in tmux (`PORT=3100 npm start`), then run:

```bash
curl -s localhost:3100/dental | grep -o '<title>[^<]*</title>\|<meta property="og:image"[^>]*>\|<link rel="canonical"[^>]*>\|<meta name="description"[^>]*>'
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" localhost:3100/dental/opengraph-image
```

Expected:
- `<title>Missed-Call Text-Back + Patient Reactivation for Dental Clinics | Qarib Iqbal</title>`
- the description exactly as in the spec
- `<link rel="canonical" href="https://qaribiqbal.netlify.app/dental"/>`
- `og:image` content starting with `https://qaribiqbal.netlify.app/dental/opengraph-image`
- `200 image/png`

- [ ] **Step 7: Check the page in a phone-sized browser**

Open `http://localhost:3100/dental` at 390×844 (headless Chrome is at `/usr/local/bin/google-chrome`) and confirm all of the following:
- The hero headline is Emerald and the subtitle readable; the gold CTA is full width; "See the reactivation campaign" is an Emerald underlined link.
- Tapping the gold CTA scrolls to the form, and the secondary link scrolls to "The 31 December Reactivation Campaign".
- The problem strip shows 3 items; on a 1280px-wide viewport they sit in 3 centered columns.
- The demo panel shows the exact placeholder text in a dashed Emerald 16:9 box.
- Submitting the empty form shows 4 errors (clinic name, name, email, confirmation) and focuses "Clinic name".
- A valid submit shows the error message ("That didn't go through…"). This is expected locally (fact 3).
- To check the success UI locally, stub `window.fetch` in DevTools so `"/__forms.html"` resolves to `new Response("", { status: 200 })`. Submit again and confirm: "Request received. Your audit summary arrives by email within one business day." The posted body should look like `form-name=dental-audit&clinicName=…&consent=yes&pagePath=%2Fdental` plus any `utm_*` values from the URL.

- [ ] **Step 8: Commit**

```bash
git add src/components/dental src/app/dental
git commit -m "feat(dental): add /dental landing page with Netlify audit form and OG card"
```

---

### Task 6: Remove Geo Dash from the project archive and fix the count text

**Files:**
- Modify: `src/lib/proof-content.test.ts`
- Modify: `src/lib/site-content.ts` (the `projectEvidence` array; the entry is around lines 318–328)
- Modify: `src/app/page.tsx` (around line 373)
- Modify: `scripts/verify-site-content.mjs` (around line 87)

- [ ] **Step 1: Update the tests first.** In `src/lib/proof-content.test.ts`, replace the "keeps the supplied live demos" test with the two tests below:

```ts
test("keeps the supplied live demos in the evidence inventory", () => {
  const urls = projectEvidence.flatMap((item) => [item.demoUrl, item.sourceUrl]);
  assert.ok(urls.includes("https://youtube.com/shorts/0vO8tecumK8?feature=share"));
  assert.ok(urls.includes("https://www.loom.com/embed/f7560adbec7841ca809a84e5d638c4f8"));
});

test("does not present the shelved Geo Dash project in the archive", () => {
  assert.ok(projectEvidence.every((item) => item.title !== "Geo Dash"));
  assert.ok(projectEvidence.every((item) => item.demoUrl !== "https://youtu.be/NLuXiAsI1U4"));
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --experimental-strip-types --test src/lib/proof-content.test.ts`
Expected: FAIL on "does not present the shelved Geo Dash project in the archive".

- [ ] **Step 3: Delete the whole Geo Dash object from `projectEvidence`** in `src/lib/site-content.ts`. Remove exactly this block, and leave every other entry and its order untouched:

```ts
  {
    title: "Geo Dash",
    summary:
      "A product workflow for discovering relevant keywords, generating SEO-focused articles, and supporting publishing across client websites.",
    proofType: "live-demo",
    sourceUrl: AGENCY_AUTOMATION_STUDY_URL,
    demoUrl: "https://youtu.be/NLuXiAsI1U4",
    demoLabel: "Watch Geo Dash demo",
    tools: ["SEO research", "AI content", "Publishing"],
    potentialImpact: "Designed to reduce movement between research, drafting, optimization, and publishing.",
  },
```

- [ ] **Step 4: Fix the hardcoded count** in `src/app/page.tsx`:

```tsx
// before
<h3>Seven systems. Each one labeled by the evidence behind it.</h3>
// after
<h3>Six systems. Each one labeled by the evidence behind it.</h3>
```

The ledger numbers above it (`projectEvidence.length` and the demo count) recompute to 6 and 4 automatically. Don't hardcode them.

- [ ] **Step 5: Update the content-verification script.** In `scripts/verify-site-content.mjs`, delete the line `'title: "Geo Dash"',` from the first `expectIncludes(siteContent, [...])` list. Then, just above `if (failures.length > 0) {`, add:

```js
expectExcludes(siteContent, ['title: "Geo Dash"', "Watch Geo Dash demo"], "site-content", failures);
expectIncludes(homePage, ["Six systems. Each one labeled by the evidence behind it."], "home-page archive", failures);
expectExcludes(homePage, ["Seven systems."], "home-page", failures);
```

- [ ] **Step 6: Run the checks and confirm they pass**

```bash
node --experimental-strip-types --test src/lib/*.test.ts 2>&1 | grep -E "^# (tests|pass|fail)"
node scripts/verify-site-content.mjs
```

Expected: `# tests 25`, `# pass 25`, `# fail 0`; `Content verification passed.`

- [ ] **Step 7: Commit**

```bash
git add src/lib/site-content.ts src/lib/proof-content.test.ts src/app/page.tsx scripts/verify-site-content.mjs
git commit -m "fix(home): remove shelved Geo Dash from the project archive and update counts"
```

---

### Task 7: Homepage entry points (nav item, header fit, "What I Build" card)

**Files:**
- Modify: `src/lib/proof-content.test.ts`
- Modify: `src/lib/site-content.ts` (`navigation`, around line 74)
- Modify: `src/components/site/site-header.tsx` (lines 34, 38, 48, 51)
- Modify: `src/app/page.tsx` (imports, and the end of the `#services` section after the "Sprint 03" `ServiceShowcase`)

- [ ] **Step 1: Write the failing test.** Append to `src/lib/proof-content.test.ts`:

```ts
test("keeps the dental clinics link inside the four items shown in the desktop header", () => {
  const dentalIndex = navigation.findIndex((item) => item.href === "/dental");
  assert.ok(dentalIndex >= 0 && dentalIndex < 4);
  assert.equal(navigation[dentalIndex].label, "For dental clinics →");
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --experimental-strip-types --test src/lib/proof-content.test.ts`
Expected: FAIL on the new test.

- [ ] **Step 3: Add the nav item** as the 4th entry in `navigation` in `src/lib/site-content.ts`:

```ts
export const navigation = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/dental", label: "For dental clinics →" },
  { href: "/checklist", label: "Checklist" },
  { href: "/contact", label: "Free Audit" },
];
```

The mobile menu (`mobile-nav.tsx`) maps over the full array, so it picks the item up with no edit.

- [ ] **Step 4: Make the desktop header fit** (see fact 10). Make exactly these three edits in `src/components/site/site-header.tsx`:

```tsx
// 1) nav: show four items and never wrap a label
{navigation.slice(0, 4).map((item) => (
  <Link
    key={item.href}
    href={item.href}
    className="whitespace-nowrap px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[color:var(--text-subtle)] transition hover:text-[color:var(--accent)]"
  >

// 2) primary header CTA: keep it on one line
<ButtonLink href="/contact" className="hidden whitespace-nowrap lg:inline-flex" trackingEvent="header_audit_click">

// 3) secondary header CTA: tablet only; there is no room for it beside four links on desktop
<ButtonLink href="/checklist" variant="secondary" className="hidden sm:inline-flex lg:hidden" trackingEvent="header_checklist_click">
```

Leave the `minimal` branch and everything else unchanged.

- [ ] **Step 5: Add the "What I Build" card.** In `src/app/page.tsx`, add `import Link from "next/link";` directly below `import Image from "next/image";`. Then insert this card after the closing `/>` of the "Sprint 03" `ServiceShowcase` and before the `</div>` that closes the `#services` shell:

```tsx
            <Link
              href="/dental"
              className="panel mt-12 flex flex-col gap-2 transition hover:border-[color:var(--accent)] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[color:var(--text-main)]">
                For dental clinics →
              </span>
              <span className="text-[0.98rem] leading-7 text-[color:var(--text-muted)]">
                Missed-call text-back and patient reactivation for Australian dental clinics.
              </span>
            </Link>
```

The card uses the homepage's existing amber theme on purpose; the dental palette applies only on `/dental`. The supporting line only restates spec wording; no new claims.

- [ ] **Step 6: Run the tests and confirm they pass**

Run: `node --experimental-strip-types --test src/lib/*.test.ts 2>&1 | grep -E "^# (tests|pass|fail)"`
Expected: `# tests 26`, `# pass 26`, `# fail 0`.

- [ ] **Step 7: Check the header and card visually**

Rebuild, then screenshot `http://localhost:3100/` at widths 1024, 1280, and 390:
- 1024 and 1280: one row showing `SERVICES · PROCESS · CASE STUDIES · FOR DENTAL CLINICS →` with every label on one line, plus a single-line "Book Free Automation Audit" button.
- 390: the mobile menu lists "For dental clinics →".
- The card appears at the end of "What I Build" (one row on desktop, stacked on mobile) and links to `/dental`.
- The hero headline, sprint copy, proof studies, testimonial note, and "Accepting 2 sprint clients in October." line are unchanged.

- [ ] **Step 8: Commit**

```bash
git add src/lib/site-content.ts src/lib/proof-content.test.ts src/components/site/site-header.tsx src/app/page.tsx
git commit -m "feat(home): add 'For dental clinics →' nav item and What I Build card"
```

---

### Task 8: Lock the spec into the content-verification script; document owner steps

**Files:**
- Modify: `scripts/verify-site-content.mjs`
- Modify: `README.md`

- [ ] **Step 1: Add file reads.** In `scripts/verify-site-content.mjs`, below `const voiceAgentShowcase = read(...)`, add:

```js
const siteHeader = read("src/components/site/site-header.tsx");
const dentalContent = read("src/lib/dental-content.ts");
const dentalPage = read("src/app/dental/page.tsx");
const dentalForm = read("src/components/dental/dental-audit-form.tsx");
const netlifyFormsHtml = read("public/__forms.html");
```

- [ ] **Step 2: Add the guards** just above `if (failures.length > 0) {` (below the Task 6 lines):

```js
expectIncludes(homePage, ['href="/dental"', "For dental clinics →"], "home-page dental entry", failures);
expectIncludes(siteHeader, ["navigation.slice(0, 4)", "sm:inline-flex lg:hidden"], "site-header", failures);

expectIncludes(
  dentalContent,
  [
    "Missed calls become booked appointments.",
    "30 to 38% of inbound calls to dental practices go unanswered (industry estimates).",
    "The 31 December Reactivation Campaign",
    "Fixed price: AUD 490. Live within 48 hours of access.",
    "Founding price for the first 3 practices.",
    "Pilot guarantee: if the campaign recovers zero appointments in 30 days, the pilot fee is refunded. Conditions in writing before we start.",
    "Demo video: missed-call text-back + a live reactivation run (3 min). Recording in progress.",
    "Request received. Your audit summary arrives by email within one business day.",
    "The Leak Audit is free until 6 November 2026.",
    "Prefer to talk first? DM 'AUDIT' on Instagram",
    "https://www.instagram.com/qaribiqbal92",
  ],
  "dental-content",
  failures,
);
expectIncludes(dentalPage, ['id="offer"', 'id="demo"', 'id="audit"', 'href="#audit"', 'href="#offer"'], "dental-page", failures);
expectExcludes(dentalPage, ["force-dynamic", "gsap", "motion/react"], "dental-page", failures);
expectExcludes(dentalForm, ["placeholder="], "dental-audit-form", failures);
expectIncludes(netlifyFormsHtml, ['name="dental-audit"', 'data-netlify="true"'], "public/__forms.html", failures);
expectExcludes(
  [dentalContent, dentalPage, dentalForm].join("\n"),
  ["lorem", "ipsum", "TODO"],
  "dental copy",
  failures,
);
```

- [ ] **Step 3: Run it and confirm it passes**

Run: `node scripts/verify-site-content.mjs`
Expected: `Content verification passed.` As a sanity check, temporarily change `"Missed calls become booked appointments."` in `dental-content.ts` and confirm the script fails, then revert.

- [ ] **Step 4: Document the owner steps.** Append this section to the end of `README.md`:

````markdown
## Dental landing page (/dental)

All copy lives in `src/lib/dental-content.ts`, and `scripts/verify-site-content.mjs` locks it to the 8 Oct 2026 spec.

### Audit form (Netlify Forms)

The dental audit form posts to Netlify Forms, not the Formspree relay. Netlify detects the form at build time from `public/__forms.html`; field names there must match `DENTAL_AUDIT_FORM_FIELDS` in `src/lib/netlify-forms.ts`.

One-time Netlify setup (free tier):
1. Site configuration → Forms → enable form detection, then redeploy.
2. After the deploy, check that a form named `dental-audit` appears under Forms.
3. Forms → Form notifications → Add notification → Email notification → form `dental-audit` → owner email.

Submissions only work on a Netlify deploy. Locally, `next start` returns 500 for `POST /__forms.html`.

### Demo video

Set `DENTAL_DEMO_VIDEO_URL` in `src/lib/dental-content.ts` to an embed URL (for example `https://www.youtube-nocookie.com/embed/<id>` or `https://www.loom.com/embed/<id>`). While it is `null`, the page shows the labelled placeholder panel.
````

- [ ] **Step 5: Commit**

```bash
git add scripts/verify-site-content.mjs README.md
git commit -m "chore(dental): guard spec copy in content verification and document Netlify Forms setup"
```

---

### Task 9: Full verification, performance, PR, and deploy-preview acceptance

- [ ] **Step 1: Run the full local gate**

```bash
node --experimental-strip-types --test src/lib/*.test.ts 2>&1 | grep -E "^# (tests|pass|fail)"
node scripts/verify-site-content.mjs
npm run build 2>&1 | grep -E "Compiled|rror|/dental"
```

Expected: `# tests 26`, `# pass 26`, `# fail 0`; `Content verification passed.`; `○ /dental`, `○ /dental/opengraph-image`.

- [ ] **Step 2: Check mobile performance** with the server running on port 3100:

```bash
npx -y lighthouse@12 http://localhost:3100/dental --only-categories=performance --form-factor=mobile \
  --throttling-method=devtools --output=json --output-path=/tmp/lh.json --quiet \
  --chrome-flags="--headless=new --no-sandbox"
node -e 'const r=require("/tmp/lh.json");const a=r.audits;console.log(r.categories.performance.score,a["largest-contentful-paint"].displayValue,a["cumulative-layout-shift"].displayValue)'
```

Expected: about `0.98 1.8 s 0` (the prototype measured exactly this). The bar is LCP under 2.5s and CLS 0. In default simulated mode it reads about 3.3s, the same as the existing `/` and `/contact` pages (fact 12). Don't chase that number in this task.

- [ ] **Step 3: Link check.** Every link on `/dental`: `#audit` (×2), `#offer`, `/` (header and footer), `mailto:qaribiqbal92@gmail.com`, and `https://www.instagram.com/qaribiqbal92` (opens in a new tab with `rel="noopener noreferrer"`). Run `curl -sI https://www.instagram.com/qaribiqbal92 | head -1` and expect a 200 or a 30x redirect, not a 404.

- [ ] **Step 4: Push and open a draft PR.** Use `git push -u origin <branch>`. In the PR description:
  - list the spec items covered
  - call out the header trade-off (fact 10) with the 1280px before/after screenshots
  - list the owner actions from the README section
  - include phone-width screenshots of the hero, offer, form, and FAQ

- [ ] **Step 5: Deploy-preview acceptance.** Do this on the Netlify deploy preview, or ask the owner to do it if previews are off:
  1. Open `<preview-url>/__forms.html` and confirm it is served (200).
  2. In Netlify → Forms, confirm a form named `dental-audit` was detected. If none appears, form detection is off; the owner enables it (README step 1) and redeploys.
  3. Submit a test request from `<preview-url>/dental?utm_source=instagram` on a phone-width viewport. Expected: the success message appears; the submission shows in Netlify → Forms → dental-audit with every field filled, including `pagePath=/dental` and `utm_source=instagram`; and the owner receives the notification email.
  4. Run the phone acceptance check: hero, offer, form, and FAQ readable at 390px; CTA buttons gold; form submittable one-handed (all inputs and the submit button in the lower two-thirds reach, with no horizontal scroll).
  5. Paste the preview `/dental` URL into a link-preview tool (for example the Facebook Sharing Debugger) and confirm the Onyx/Emerald card shows.
  6. Delete the test submission in Netlify after confirming.

## Owner actions (cannot be done from code)

1. Netlify UI: enable form detection (if not already on) and add an email notification for `dental-audit` (README, Dental landing page section).
2. Record the 3-minute demo and set `DENTAL_DEMO_VIDEO_URL`.
3. Update the Instagram bio link to `https://qaribiqbal.netlify.app/dental` after merge.
4. Before 6 November 2026, update or remove the "free until 6 November 2026" note (it is plain text; nothing expires it automatically).

## Spec coverage (self-review)

| Spec item | Task |
|---|---|
| P0 hero (H1, sub, gold CTA → audit form, secondary → offer) | 3, 5 |
| Problem strip (3 items) | 3, 5 |
| Offer `#offer` (heading, what, price, ongoing, guarantee) | 3, 5 |
| How it works (3 steps) | 3, 5 |
| Demo `#demo` 16:9 slot + exact placeholder, no stock/fake UI | 3, 5 |
| Audit form `#audit`: fields, required checkbox, submit text, success text, note, Netlify Forms | 1, 2, 3, 5, 9 |
| FAQ (exact answers) | 3, 5 |
| Final CTA band + Instagram link | 3, 5, 9 |
| Meta title, description, OG brand card | 3, 4, 5 |
| Palette, gold only on CTAs, mobile-first | 5 |
| P1.1 nav item + "What I Build" card → /dental | 7 |
| P1.2 remove Geo Dash; update "Seven systems" and counts | 6 |
| P1.3 change nothing else | 6, 7 (visual check), 8 (guards) |
| P2 LCP < 2.5s, no new frameworks/trackers, compressed images (none added) | 5, 9 |
| P2 form test arrives in Netlify and triggers an email | 9 (deploy preview) + owner action 1 |
| P2 links verified, Instagram opens profile | 9 |
| P2 no lorem/placeholder text | 3 (test), 5 (no `placeholder=`), 8 (guard) |
| P2 phone acceptance check | 5, 9 |
| Do not touch qaribiqbal92.netlify.app | Global constraints |
