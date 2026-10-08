# AI Portfolio - Conversion-Focused Agency Landing Site

This is a Next.js site for Qarib Iqbal, positioned as an AI Automation Specialist for lean marketing agencies.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Form endpoint setup (required)

The site submits both forms through a local relay route:
- `POST /api/forms/checklist`
- `POST /api/forms/audit`

Those relay routes forward to your real form backend (Formspree, Basin, Tally webhook, Airtable automation webhook, Supabase function, etc.).

### 1. Create local env file

```bash
cp .env.local.example .env.local
```

### 2. Set endpoints in `.env.local`

Option A: separate endpoints per form

```bash
CHECKLIST_FORM_ENDPOINT=https://your-provider.example/checklist
AUDIT_FORM_ENDPOINT=https://your-provider.example/audit
```

Option B: one shared endpoint for both forms

```bash
FORMS_ENDPOINT=https://your-provider.example/forms
```

Optional payload mode:

```bash
# json (default) or form
FORM_SUBMIT_CONTENT_TYPE=json
```

### 3. Restart dev server

```bash
npm run dev
```

## Form payload fields

Checklist form sends:
- `name`
- `email`
- `agencySize`
- `biggestBottleneck`
- `formType=checklist`
- `submittedAt`
- `pagePath`
- `utm` (object)

Audit form sends:
- `name`
- `email`
- `agencySize`
- `primaryServices`
- `biggestPain`
- `timeline`
- `formType=audit`
- `submittedAt`
- `pagePath`
- `utm` (object)

## Tracking events

The frontend emits events through `src/lib/analytics.ts` and fails silently if analytics is not installed.

Primary events:
- `hero_checklist_click`
- `hero_audit_click`
- `checklist_form_start`
- `checklist_form_submit`
- `audit_form_start`
- `audit_form_submit`
- `calendly_click`
- `linkedin_outbound_click`

## Build

```bash
npm run build
```

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

## Australian SEO pages

- Location pages (`/dental/<city>`) are generated from `src/lib/au-locations.ts`. Add a city there with its state and time zone; the page, sitemap entry, `llms.txt` entry and OG image are generated automatically.
- Guides (`/dental/guides/<slug>`) come from `src/lib/dental-guides.ts`. Each guide needs a 25-70 word short answer (shown first, for answer engines) and must only use the sourced 38% statistic.
- `/llms.txt`, `/sitemap.xml` and `/robots.txt` are generated from the same content modules.
