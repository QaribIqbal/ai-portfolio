import test from "node:test";
import assert from "node:assert/strict";

import {
  featuredSolutionStudies,
  navigation,
  projectEvidence,
  publishedTestimonials,
  testimonialSlots,
} from "./site-content.ts";

test("publishes the two supplied TechBees solution studies", () => {
  assert.deepEqual(
    featuredSolutionStudies.map((study) => study.slug),
    ["real-estate-lead-response", "agency-automation"],
  );
});

test("exposes at least five source-backed evidence items", () => {
  assert.ok(projectEvidence.length >= 5);
  assert.ok(projectEvidence.every((item) => item.sourceUrl.startsWith("https://")));
});

test("keeps the supplied live demos in the evidence inventory", () => {
  const urls = projectEvidence.flatMap((item) => [item.demoUrl, item.sourceUrl]);
  assert.ok(urls.includes("https://youtube.com/shorts/0vO8tecumK8?feature=share"));
  assert.ok(urls.includes("https://www.loom.com/embed/f7560adbec7841ca809a84e5d638c4f8"));
  assert.ok(urls.includes("https://youtu.be/NLuXiAsI1U4"));
});

test("does not publish testimonials without a source and approval", () => {
  assert.equal(testimonialSlots.length, 0);
  assert.equal(publishedTestimonials.length, 0);
});

test("links the primary case-studies navigation to the full evidence page", () => {
  assert.equal(navigation.find((item) => item.label === "Case Studies")?.href, "/case-studies");
});
