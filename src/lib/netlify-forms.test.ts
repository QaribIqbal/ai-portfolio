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
