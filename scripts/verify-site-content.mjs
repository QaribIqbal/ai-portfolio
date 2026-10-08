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
const siteHeader = read("src/components/site/site-header.tsx");
const dentalContent = read("src/lib/dental-content.ts");
const dentalPage = read("src/app/dental/page.tsx");
const dentalForm = read("src/components/dental/dental-audit-form.tsx");
const netlifyFormsHtml = read("public/__forms.html");
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

expectExcludes(siteContent, ['title: "Geo Dash"', "Watch Geo Dash demo"], "site-content", failures);
expectIncludes(homePage, ["Six systems. Each one labeled by the evidence behind it."], "home-page archive", failures);
expectExcludes(homePage, ["Seven systems."], "home-page", failures);

expectIncludes(homePage, ['href="/dental"', "For dental clinics →"], "home-page dental entry", failures);
expectIncludes(siteHeader, ["navigation.slice(0, 4)", "sm:inline-flex lg:hidden"], "site-header", failures);

expectIncludes(
  dentalContent,
  [
    "Missed calls become booked appointments.",
    "30 to 38% of inbound calls to dental practices go unanswered (industry estimates).",
    "The 31 December Reactivation Campaign",
    "Fixed price: AUD 490. Live within 48 hours of access.",
    "Founding price for the first 3 practices.",
    "Pilot guarantee: if the campaign recovers zero appointments in 30 days, the pilot fee is refunded. Conditions in writing before we start.",
    "Demo video: missed-call text-back + a live reactivation run (3 min). Recording in progress.",
    "Request received. Your audit summary arrives by email within one business day.",
    "The Leak Audit is free until 6 November 2026.",
    "Prefer to talk first? DM 'AUDIT' on Instagram",
    "https://www.instagram.com/qaribiqbal92",
  ],
  "dental-content",
  failures,
);
expectIncludes(dentalPage, ['id="offer"', 'id="demo"', 'id="audit"', 'href="#audit"', 'href="#offer"'], "dental-page", failures);
expectExcludes(dentalPage, ["force-dynamic", "gsap", "motion/react"], "dental-page", failures);
expectExcludes(dentalForm, ["placeholder="], "dental-audit-form", failures);
expectIncludes(netlifyFormsHtml, ['name="dental-audit"', 'data-netlify="true"'], "public/__forms.html", failures);
expectExcludes(
  [dentalContent, dentalPage, dentalForm].join("\n"),
  ["lorem", "ipsum", "TODO"],
  "dental copy",
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
