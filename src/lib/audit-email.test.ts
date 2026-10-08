import test from "node:test";
import assert from "node:assert/strict";

import { buildAuditEmailHref } from "./audit-email.ts";

test("builds a mailto link with the clinic's details and the patient-data confirmation", () => {
  const href = buildAuditEmailHref({
    to: "qaribiqbal92@gmail.com",
    subject: "Missed-Call Leak Audit request",
    values: {
      clinicName: "Harbour Dental",
      name: "Sam Lee",
      email: "sam@harbourdental.com.au",
      phone: "",
      smsTool: "Practice software SMS",
    },
  });

  assert.ok(href.startsWith("mailto:qaribiqbal92@gmail.com?subject="));
  const params = new URLSearchParams(href.split("?")[1]);
  assert.equal(params.get("subject"), "Missed-Call Leak Audit request: Harbour Dental");
  const body = params.get("body") ?? "";
  assert.match(body, /Clinic: Harbour Dental/);
  assert.match(body, /Phone: not provided/);
  assert.match(body, /no patient data/i);
});
