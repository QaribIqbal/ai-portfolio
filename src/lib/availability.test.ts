import test from "node:test";
import assert from "node:assert/strict";

import { buildAvailabilityCopy, getCurrentMonth } from "./availability.ts";

test("getCurrentMonth formats the month in the business timezone", () => {
  assert.equal(getCurrentMonth(new Date("2026-08-14T12:00:00Z")), "August");
});

test("getCurrentMonth respects the business timezone at a month boundary", () => {
  assert.equal(getCurrentMonth(new Date("2026-08-31T20:00:00Z")), "September");
});

test("buildAvailabilityCopy composes a configurable capacity", () => {
  assert.equal(
    buildAvailabilityCopy(2, new Date("2026-08-14T12:00:00Z")),
    "Accepting 2 sprint clients in August.",
  );
});
