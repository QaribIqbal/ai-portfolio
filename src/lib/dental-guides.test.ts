import test from "node:test";
import assert from "node:assert/strict";

import { dentalGuides, getGuide } from "./dental-guides.ts";

const allText = dentalGuides
  .flatMap((guide) => [
    guide.title,
    guide.description,
    guide.shortAnswer,
    ...guide.sections.flatMap((s) => [s.heading, ...(s.paragraphs ?? []), ...(s.bullets ?? [])]),
    ...guide.faqs.flatMap((f) => [f.question, f.answer]),
  ])
  .join("\n");

test("each guide opens with a short answer for answer engines", () => {
  for (const guide of dentalGuides) {
    const words = guide.shortAnswer.split(/\s+/).length;
    assert.ok(words >= 25 && words <= 70, `${guide.slug} short answer is ${words} words`);
  }
});

test("guide slugs are unique and resolvable", () => {
  assert.equal(new Set(dentalGuides.map((g) => g.slug)).size, dentalGuides.length);
  assert.equal(getGuide("health-fund-extras-reset")?.slug, "health-fund-extras-reset");
});

test("the only statistic is the sourced 38% figure", () => {
  const percentages = allText.match(/\d+%/g) ?? [];
  assert.deepEqual([...new Set(percentages)], ["38%"]);
  assert.match(allText, /2026 vendor study of 26 practices found 38%/);
});

test("guides avoid testimonials, outcome promises and pressure phrases", () => {
  assert.doesNotMatch(allText, /act now|hurry|last chance|limited time|guaranteed results|use it or lose it/i);
});
