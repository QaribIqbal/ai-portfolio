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
