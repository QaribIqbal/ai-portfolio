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
  const allowed = new Set(["60", "30", "38", "26", "31", "490", "48", "649", "3", "24", "6", "2026"]);
  const numbers = allCopy.replace(/https?:\/\/\S+/g, "").match(/\d+/g) ?? [];
  const unexpected = numbers.filter((n) => !allowed.has(n));

  assert.deepEqual(unexpected, []);
});

test("no filler text and no unfinished demo placeholder in the copy", () => {
  assert.doesNotMatch(allCopy, /lorem|ipsum|TODO|TBD|recording in progress/i);
});

test("the stat is source-backed and extras wording is conditional", () => {
  assert.ok(dental.dentalProblems.includes("A 2026 vendor study of 26 practices found 38% of calls went unanswered."));
  assert.ok(dental.dentalProblems.includes("If you have extras cover, most funds reset on 31 Dec."));
  assert.doesNotMatch(allCopy, /industry estimates/i);
});

test("copy avoids testimonials, clinical outcome claims, and pressure phrases", () => {
  assert.doesNotMatch(allCopy, /testimonial|clinical|cure|guaranteed results|act now|hurry|don't miss out|last chance|limited time/i);
});

test("the home hero line is the approved wording", () => {
  const { headlineLead, headlineKey, headlineTail } = dental.brandHome;
  assert.equal(
    `${headlineLead}${headlineKey}${headlineTail}`,
    "I plug missed-call and lost-patient recovery into the phones your dental practice already has, and every week I show you the appointments it booked.",
  );
  assert.equal(dental.brandHome.meta.title, "Missed-Call Recovery for Australian Dental Clinics");
});

test("the Instagram link points at the owner's profile", () => {
  assert.equal(dental.DENTAL_INSTAGRAM_URL, "https://www.instagram.com/qaribiqbal92");
});
