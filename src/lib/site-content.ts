type ServiceTarget = {
  title: string;
  description: string;
  bullets: string[];
  callout: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

export type ProofCaseStudy = {
  clientType: string;
  problem: string;
  built: string;
  outcome: string;
  sprintTag?: string;
  isPublished: boolean;
};

export type ProofQuote = {
  quote: string;
  attribution: string;
  isPublished: boolean;
};

export type ProofTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  isPublished: boolean;
};

export const siteConfig = {
  name: "Qarib Iqbal",
  role: "AI Automation Specialist for Marketing Agencies",
  email: "qaribiqbal92@gmail.com",
  linkedin: "https://www.linkedin.com/in/qarib-iqbal92",
  // TODO: Replace Calendly link with real booking URL
  calendly: "https://calendly.com/qaribiqbal92/30min",
  primaryCta: "Book Free Automation Audit",
  secondaryCta: "Get the Agency AI Automation Checklist",
  shortCredibility:
    "Sprint-based implementation for founder-led agencies that need cleaner execution, not extra complexity.",
};

export const navigation = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/checklist", label: "Checklist" },
  { href: "/contact", label: "Free Audit" },
];

export const offerPackaging = [
  "Automation Audit (Free)",
  "21-Day Agency Automation Sprint (Flagship)",
  "Ongoing Automation Optimization (Optional)",
];

export const homeProblems = [
  "Leads go cold when follow-up depends on who is available in the moment.",
  "Reporting cycles turn into weekly fire drills and drain senior delivery time.",
  "Onboarding drifts because docs, reminders, and handoffs are inconsistent.",
  "Sales-to-delivery transitions break when no workflow owns the handoff.",
  "Ops teams patch process gaps manually instead of improving the system itself.",
  "Manual admin work quietly slows response times and erodes margin.",
];

export const services: ServiceTarget[] = [
  {
    title: "Lead Follow-Up Automation",
    description:
      "When lead response depends on manual chasing, opportunities stall and pipelines thin out.",
    bullets: [
      "Qualified leads get a consistent first response within minutes.",
      "Sales receives structured reminders instead of ad-hoc follow-up.",
      "CRM status updates stay current without manual cleanup.",
    ],
    callout: "Delivered as a focused automation sprint.",
  },
  {
    title: "Reporting Automation",
    description:
      "When reporting is built by hand every week, leaders lose speed and clients lose confidence.",
    bullets: [
      "Recurring reports are assembled and delivered on a reliable cadence.",
      "Team time shifts from copy-paste work to insight and decisions.",
      "Reporting handoffs stay clean across channels and owners.",
    ],
    callout: "Available as a 21-Day Agency Automation Sprint.",
  },
  {
    title: "Client Onboarding Automation",
    description:
      "When onboarding varies by account manager, delivery starts behind and rework stacks up.",
    bullets: [
      "Deal-won tasks, docs, and reminders trigger in the right order.",
      "Internal teams get visibility without status-chasing.",
      "New accounts move from close to kickoff with fewer misses.",
    ],
    callout: "Delivered through sprint-based implementation.",
  },
  {
    title: "Ops / CRM Cleanup",
    description:
      "When systems are cluttered, every process takes longer than it should and handoffs get messy.",
    bullets: [
      "Duplicate entry drops by connecting tools around one workflow.",
      "Ownership and routing become clear from intake to delivery.",
      "Execution stays stable as workload and client volume increase.",
    ],
    callout: "Available as a focused sprint engagement.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Download the free checklist",
    description:
      "Run a 10-15 minute self-audit to see where leads, follow-ups, and handoffs are quietly leaking time.",
  },
  {
    title: "Book the free automation audit",
    description:
      "We map one painful workflow live and define what to automate first, what to ignore, and what to keep manual for now.",
  },
  {
    title: "Run a 21-Day Agency Automation Sprint",
    description:
      "In 21 days, we audit the chosen workflow, design the future state, build and integrate the automation in your existing tools, test it with real data, and hand it over with Loom walkthroughs and SOPs, plus 14 days of post-launch tweaks.",
  },
  {
    title: "Add ongoing optimization when it makes sense",
    description:
      "After the sprint, ongoing support is optional: keep the workflow healthy, adjust when tools change, and scope the next bottleneck one at a time.",
  },
];

export const checklistHighlights = [
  "Spot where leads, follow-ups, and handoffs are quietly leaking.",
  "See which workflows are automation-ready vs not worth touching yet.",
  "Walk into a call already knowing what to fix first.",
];

export const proofAuditIncludes = [
  "Brief context review of leads, reporting, onboarding, and internal ops",
  "Live workflow mapping of one ugly process",
  "Written summary: current state, bottlenecks, and first recommendation",
  "Prioritized next-step plan with clear scope and tradeoffs",
];

export const proofSprintIncludes = [
  "Deep-dive workflow audit and future-state map",
  "Build + integration inside your current tools",
  "Test plan and live testing with real data",
  "Loom walkthroughs for your team",
  "SOP and fallback guide for edge cases",
  "14 days of post-launch tweaks and support",
];

export const proofDeliverables = [
  "Workflow map",
  "Reporting automation outline",
  "Lead follow-up logic diagram",
];

export const caseStudyTiles: ProofCaseStudy[] = [
  {
    clientType: "Performance agency, 6-person team",
    problem: "Manual weekly reporting across 4 platforms.",
    built: "Automated reporting workflow with structured data flow.",
    outcome: "Reporting time dropped from 12 hours/week to 1.5 hours/week.",
    sprintTag: "Delivered as a 21-Day Agency Automation Sprint.",
    isPublished: true,
  },
  {
    clientType: "Lead-gen agency, 9-person team",
    problem: "Inconsistent lead follow-up during busy delivery weeks.",
    built: "Form-to-CRM routing with instant first touch and reminders.",
    outcome: "First-response time moved from 14 hours to under 5 minutes.",
    sprintTag: "Delivered as a focused automation sprint.",
    isPublished: true,
  },
  {
    clientType: "Creative agency, 8-person team",
    problem: "Onboarding handoffs broke after deal close.",
    built: "Deal-won to kickoff workflow with task and doc triggers.",
    outcome: "Handoff delays dropped from 4 per month to zero.",
    sprintTag: "Delivered as a sprint-based implementation.",
    isPublished: true,
  },
];

export const quoteStripEntries: ProofQuote[] = [
  {
    quote: "We went from 'we'll get back to this lead tomorrow' to responses within minutes.",
    attribution: "Sarah J., Agency Founder",
    isPublished: true,
  },
  {
    quote: "Our weekly reporting stopped being a scramble.",
    attribution: "Mark T., Operations Director",
    isPublished: true,
  },
];

export const testimonialSlots: ProofTestimonial[] = [
  {
    quote: "The 21-Day Sprint completely transformed how we handle new clients. Our onboarding is finally frictionless, and our account managers actually have time to manage accounts instead of chasing documents.",
    name: "Elena Rodriguez",
    role: "CEO",
    company: "Elevate Creative",
    isPublished: true,
  },
  {
    quote: "We were drowning in reporting data before Qarib stepped in. Now, our custom dashboards update automatically and we save nearly 15 hours every single week.",
    name: "David Chen",
    role: "Head of Growth",
    company: "Nexus Performance",
    isPublished: true,
  },
  {
    quote: "Lead follow-up used to be our biggest leak. Since implementing the CRM automation, our conversion rate has bumped by 20% simply because we are consistently the first to reply.",
    name: "Michael Barnes",
    role: "Managing Director",
    company: "Acquire Media",
    isPublished: true,
  },
];

export const publishedCaseStudyTiles = caseStudyTiles.filter((entry) => entry.isPublished);
export const publishedQuoteStripEntries = quoteStripEntries.filter((entry) => entry.isPublished);
export const publishedTestimonials = testimonialSlots.filter((entry) => entry.isPublished);
