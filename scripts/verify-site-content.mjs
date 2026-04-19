import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function read(relativePath) {
  return readFileSync(resolve(root, relativePath), "utf8");
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
const servicesPage = read("src/app/services/page.tsx");
const caseStudiesPage = read("src/app/case-studies/page.tsx");
const aboutPage = read("src/app/about/page.tsx");
const checklistPage = read("src/app/checklist/page.tsx");
const contactPage = read("src/app/contact/page.tsx");

expectIncludes(
  siteContent,
  [
    'primaryCta: "Get the Free Agency AI Automation Checklist"',
    'secondaryCta: "Book a Free Automation Audit"',
    'title: "AI Lead Follow-Up Automation"',
    'title: "Client Reporting Automation"',
    'title: "Client Onboarding & Ops Automation"',
    'title: "AI Workflow Design & Tool Integration"',
    'title: "AI Assistants / Internal AI Systems"',
    'title: "Free Agency AI Automation Checklist"',
    'title: "Free Automation Audit"',
    'title: "Fixed-Scope AI Automation Sprint"',
    'title: "Ongoing Optimization Support / Retainer"',
    'title: "Audit your workflow bottlenecks"',
    'title: "Design the automation system"',
    'title: "Build and implement"',
    'title: "Refine and optimize"',
  ],
  "site-content",
  failures,
);

expectExcludes(
  siteContent,
  [
    'cta: "See the Sprint Scope"',
    'cta: "Talk Through Ongoing Support"',
    'label: "Free Checklist"',
    'label: "Book Audit"',
  ],
  "site-content",
  failures,
);

expectIncludes(
  homePage,
  [
    "I help marketing agencies eliminate manual follow-up, reporting, and repetitive ops with AI automation.",
    "I design and implement AI automation systems that save time, reduce lead leakage, and help your agency run more smoothly without adding more manual work.",
    "If your agency is still running too much manually, start with the checklist or book a free audit.",
  ],
  "home-page",
  failures,
);

expectExcludes(
  homePage,
  [
    "Agency Operations Map",
    "One bottleneck. One scoped fix. One clear timeline.",
    "Entry Point",
    "Main Paid Offer",
    "After The Sprint",
    "Delivery Detail",
  ],
  "home-page",
  failures,
);

expectInOrder(
  homePage,
  [
    'id="problem"',
    'id="outcomes"',
    'id="services"',
    'id="offers"',
    'id="process"',
    'id="proof"',
    'id="about"',
    'id="free-resource"',
    'id="faq"',
  ],
  "home-page",
  failures,
);

expectIncludes(
  servicesPage,
  [
    "AI automation services built specifically for marketing agencies.",
    "Free Automation Audit",
    "Fixed-Scope AI Automation Sprint (2 to 4 weeks)",
    "Ongoing Optimization Support / Retainer",
  ],
  "services-page",
  failures,
);

expectIncludes(
  caseStudiesPage,
  [
    "These are clearly labeled sample workflow scenarios, not client case studies.",
    "Operational Challenge",
    "System To Build",
    "Expected Improvement",
    "Why It Matters",
  ],
  "case-studies-page",
  failures,
);

expectIncludes(
  aboutPage,
  [
    "Why this work is focused on marketing agencies.",
    "Diagnose before prescribing. Build systems that work in the real world.",
  ],
  "about-page",
  failures,
);

expectIncludes(
  checklistPage,
  [
    "Spot the 7 workflows your agency should automate next.",
    "What's Inside",
    "Who it's for",
    "Why it matters now",
  ],
  "checklist-page",
  failures,
);

expectIncludes(
  contactPage,
  [
    "The Free Automation Audit is not a generic discovery chat.",
    "What It Is",
    "What To Expect",
  ],
  "contact-page",
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
