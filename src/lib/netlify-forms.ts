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
