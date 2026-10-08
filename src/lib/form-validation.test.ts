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

test("accepts Australian mobile and landline formats", () => {
  for (const phone of ["0412 345 678", "+61 412 345 678", "(02) 9123 4567", "02 9123 4567", "+61 2 9123 4567", "1300 123 456"]) {
    assert.equal(validateDentalAuditForm({ ...validDentalForm, phone }).phone, undefined, phone);
  }
});

test("rejects phone numbers that are not Australian", () => {
  for (const phone of ["12345", "+1 415 555 0100", "0412 345"]) {
    assert.ok(validateDentalAuditForm({ ...validDentalForm, phone }).phone, phone);
  }
});
