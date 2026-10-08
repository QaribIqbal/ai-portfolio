import test from "node:test";
import assert from "node:assert/strict";

import { SITE_URL, buildMetadata } from "./seo.ts";

test("resolves social image URLs against the production domain", () => {
  const metadata = buildMetadata({ title: "Anything" });
  assert.equal(String(metadata.metadataBase), `${SITE_URL}/`);
});

test("sets a canonical URL and custom keywords when a path is given", () => {
  const metadata = buildMetadata({
    title: "Missed-Call Text-Back + Patient Reactivation for Dental Clinics",
    path: "/dental",
    keywords: ["dental missed call text back"],
  });

  assert.equal(metadata.title, "Missed-Call Text-Back + Patient Reactivation for Dental Clinics | Qarib Iqbal");
  assert.deepEqual(metadata.alternates, { canonical: "/dental" });
  assert.deepEqual(metadata.keywords, ["dental missed call text back"]);
});

test("defaults to the dental-first description and keywords", () => {
  const metadata = buildMetadata({ title: "Missed-Call Recovery for Australian Dental Clinics" });
  assert.equal(metadata.alternates, undefined);
  assert.match(String(metadata.description), /Australian dental clinics/);
  assert.ok((metadata.keywords as string[]).includes("missed call text back dental clinic"));
});
