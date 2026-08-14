import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function read(relativePath) {
  const absolutePath = resolve(root, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function expectIncludes(haystack, needles, label, failures) {
  const normalizedHaystack = normalize(haystack);

  for (const needle of needles) {
    if (!normalizedHaystack.includes(normalize(needle))) {
      failures.push(`${label} is missing: ${needle}`);
    }
  }
}

function expectExcludes(haystack, needles, label, failures) {
  const normalizedHaystack = normalize(haystack);

  for (const needle of needles) {
    if (normalizedHaystack.includes(normalize(needle))) {
      failures.push(`${label} should not include: ${needle}`);
    }
  }
}

function expectInOrder(haystack, needles, label, failures) {
  let cursor = -1;

  for (const needle of needles) {
    const index = haystack.indexOf(needle);

    if (index === -1) {
      failures.push(`${label} is missing ordered text: ${needle}`);
      return;
    }

    if (index < cursor) {
      failures.push(`${label} is out of order at: ${needle}`);
      return;
    }

    cursor = index;
  }
}

const failures = [];

const siteContent = read("src/lib/site-content.ts");
const homePage = read("src/app/page.tsx");
const caseStudiesPage = read("src/app/case-studies/page.tsx");
const heroAnimation = read("src/components/site/hero-animation.tsx");
const pageHero = read("src/components/site/page-hero.tsx");
const proofBadge = read("src/components/site/proof-badge.tsx");
const trustPrinciples = read("src/components/site/trust-principles.tsx");
const journeySection = read("src/components/site/journey-section.tsx");
const voiceAgentShowcase = read("src/components/site/voice-agent-showcase.tsx");
const allTrustContent = [
  siteContent,
  homePage,
  caseStudiesPage,
  heroAnimation,
  proofBadge,
  trustPrinciples,
  journeySection,
  voiceAgentShowcase,
].join("\n");

expectIncludes(
  siteContent,
  [
    'availabilityCapacity: 2',
    'slug: "real-estate-lead-response"',
    'slug: "agency-automation"',
    'title: "Real-estate voice agent"',
    'title: "WhatsApp inquiry assistant"',
    'title: "Lead-email automation"',
    'title: "Weekly client reporting automation"',
    'title: "Geo Dash"',
    'title: "Structured lead qualification"',
    'title: "Client onboarding and handoff"',
    "entry.approvedForPublication",
    "Boolean(entry.sourceUrl)",
  ],
  "site-content",
  failures,
);

expectIncludes(
  [homePage, heroAnimation, trustPrinciples].join("\n"),
  [
    'export const dynamic = "force-dynamic"',
    "Qarib Iqbal / AI Systems Operator",
    "I build the AI systems your team keeps saying it needs.",
    "Proof, not promises",
    "What clients value",
    "buildAvailabilityCopy(siteConfig.availabilityCapacity)",
  ],
  "home-page",
  failures,
);

expectIncludes(
  caseStudiesPage,
  [
    "Watch the systems. Inspect the workflows. Decide from evidence.",
    "Potential impact — not a claimed client result",
    "featuredSolutionStudies",
    "projectEvidence",
  ],
  "case-studies-page",
  failures,
);

expectIncludes(
  proofBadge,
  ["Live demo", "Solution build", "Workflow blueprint", "Verified result"],
  "proof-badge",
  failures,
);

expectIncludes(pageHero, ["level={1}"], "page-hero semantics", failures);

expectIncludes(
  trustPrinciples,
  ["What clients value", "Operating standards, not invented endorsements."],
  "trust-principles",
  failures,
);

expectExcludes(
  allTrustContent,
  [
    "Elena Rodriguez",
    "Elevate Creative",
    "David Chen",
    "Nexus Performance",
    "Michael Barnes",
    "Acquire Media",
    "Real sprints. Measurable outcomes.",
    "Reporting time dropped from 12 hours/week",
    "First-response time moved from 14 hours",
    'value: 4.2, suffix: "s"',
    'value: 97, suffix: "%"',
    'value: 12, suffix: "h"',
    "&lt;3s",
    '<span className="voice-stat-value">85%</span>',
    "Calls Resolved",
  ],
  "published trust content",
  failures,
);

if (failures.length > 0) {
  console.error("Content verification failed:");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Content verification passed.");
