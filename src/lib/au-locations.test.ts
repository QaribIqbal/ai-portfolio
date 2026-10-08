import test from "node:test";
import assert from "node:assert/strict";

import { auLocations, buildLocationFaqs, describeLocalTime, getLocation } from "./au-locations.ts";

test("every location has a unique URL-safe slug", () => {
  const slugs = auLocations.map((location) => location.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.every((slug) => /^[a-z]+(-[a-z]+)*$/.test(slug)));
});

test("daylight saving matches each state's real rules", () => {
  const noDst = auLocations.filter((l) => !l.timeZone.daylightSaving).map((l) => l.stateCode);
  assert.deepEqual([...new Set(noDst)].sort(), ["NT", "QLD", "WA"]);
});

test("local time copy is specific to each city", () => {
  const perth = getLocation("perth");
  const sydney = getLocation("sydney");
  assert.ok(perth && sydney);
  assert.match(describeLocalTime(perth), /AWST.*does not observe daylight saving/);
  assert.match(describeLocalTime(sydney), /first Sunday in October/);
});

test("location FAQs reuse the published prices only", () => {
  const text = auLocations.flatMap(buildLocationFaqs).map((f) => f.answer).join(" ");
  const numbers = new Set(text.match(/\d+/g));
  assert.deepEqual([...numbers].sort(), ["3", "31", "490", "649"]);
});
