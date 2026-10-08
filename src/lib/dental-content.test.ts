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
