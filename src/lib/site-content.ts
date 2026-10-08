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

export type ProofType =
  | "live-demo"
  | "solution-build"
  | "workflow-blueprint"
  | "verified-result";

export type SolutionStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  audience: string;
  studio: "TechBees";
  sourceUrl: string;
  featuredDemoUrl: string;
  featuredDemoLabel: string;
  workflow: string[];
  potentialImpact: string[];
  tools: string[];
};

export type ProjectEvidence = {
  title: string;
  summary: string;
  proofType: ProofType;
  sourceUrl: string;
  demoUrl?: string;
  demoLabel?: string;
  tools: string[];
  potentialImpact: string;
};

export type ProofTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  sourceUrl: string;
  approvedForPublication: boolean;
  isPublished: boolean;
};

export type TrustPrinciple = {
  title: string;
  description: string;
};

export const siteConfig = {
  name: "Qarib Iqbal",
  role: "Missed-call and lost-patient recovery for Australian dental clinics",
  email: "qaribiqbal92@gmail.com",
  linkedin: "https://www.linkedin.com/in/qarib-iqbal92",
  // TODO: Replace Calendly link with real booking URL
  calendly: "https://calendly.com/qaribiqbal92/30min",
  dentalCta: "Get the free Missed-Call Leak Audit",
  primaryCta: "Book Free Automation Audit",
  secondaryCta: "Get the Agency AI Automation Checklist",
  availabilityCapacity: 2,
  shortCredibility:
    "Founder-led delivery. Real demos. Clear scope. No invented results.",
};

export const navigation = [
  { href: "/dental", label: "For dental clinics" },
  { href: "/agencies", label: "For agencies" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/checklist", label: "Checklist" },
  { href: "/contact", label: "Agency Audit" },
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
  {
    title: "AI Voice Agent Setup",
    description:
      "When inbound calls go unanswered or your team spends hours on repetitive phone conversations, an AI voice agent handles it — qualifying leads, booking appointments, and answering FAQs 24/7.",
    bullets: [
      "Inbound calls are answered instantly, even outside business hours.",
      "Leads are qualified and routed to the right person automatically.",
      "Appointment booking happens live on the call without human intervention.",
    ],
    callout: "Available as a 21-Day Voice Agent Sprint.",
  },
  {
    title: "AI Chatbot & Conversational Agents",
    description:
      "When support tickets pile up or website visitors leave without engaging, an AI chatbot captures intent, answers questions, and routes conversations intelligently.",
    bullets: [
      "Website visitors get instant, contextual responses from your knowledge base.",
      "Support volume drops as routine questions resolve without human agents.",
      "Qualified conversations are escalated with full context to your team.",
    ],
    callout: "Delivered through sprint-based implementation.",
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

const REAL_ESTATE_STUDY_URL =
  "https://app.notion.com/p/3b0a34737b6681109648f37a61f61786";
const AGENCY_AUTOMATION_STUDY_URL =
  "https://app.notion.com/p/3b0a34737b66817ba1cafae3aa98edd8";

export const featuredSolutionStudies: SolutionStudy[] = [
  {
    slug: "real-estate-lead-response",
    eyebrow: "Real Estate Lead Response",
    title: "Respond to property leads in minutes, not hours.",
    summary:
      "A voice and chat response system designed to qualify property inquiries, capture requirements, coordinate viewings, and hand urgent conversations to a human agent.",
    audience: "Property teams handling inbound buyer and tenant inquiries",
    studio: "TechBees",
    sourceUrl: REAL_ESTATE_STUDY_URL,
    featuredDemoUrl: "https://youtube.com/shorts/0vO8tecumK8?feature=share",
    featuredDemoLabel: "Watch the real-estate voice agent",
    workflow: [
      "Respond using approved scripts, business rules, and property knowledge.",
      "Qualify budget, area, property type, timing, and viewing preferences.",
      "Book the next step, write the lead record, or hand off to a person.",
    ],
    potentialImpact: [
      "Fewer inquiries waiting after hours",
      "More complete requirements before an agent joins",
      "Less repetitive qualification and scheduling work",
    ],
    tools: ["AI voice", "WhatsApp", "CRM", "Calendar", "n8n / Make"],
  },
  {
    slug: "agency-automation",
    eyebrow: "Marketing & Creative Agency Operations",
    title: "Fix the workflow wasting the most time every week.",
    summary:
      "A focused automation system for recurring reporting, lead follow-up, onboarding, and delivery handoffs—built around the process an agency already runs.",
    audience: "Lean agencies protecting delivery time without adding admin headcount",
    studio: "TechBees",
    sourceUrl: AGENCY_AUTOMATION_STUDY_URL,
    featuredDemoUrl: "https://www.loom.com/embed/f7560adbec7841ca809a84e5d638c4f8",
    featuredDemoLabel: "Watch the weekly reporting automation",
    workflow: [
      "Trigger the workflow on the agency's agreed schedule or system event.",
      "Generate the correct client update from structured performance data.",
      "Deliver the output and confirm completion to the internal team.",
    ],
    potentialImpact: [
      "Fewer repetitive reporting steps",
      "More consistent delivery at the promised time",
      "Clearer ownership after reports and handoffs run",
    ],
    tools: ["Make", "n8n", "Airtable", "APIs", "Custom code"],
  },
];

export const projectEvidence: ProjectEvidence[] = [
  {
    title: "Real-estate voice agent",
    summary:
      "An AI phone workflow that gathers property requirements, supports viewing coordination, and transfers edge cases to a human agent.",
    proofType: "live-demo",
    sourceUrl: REAL_ESTATE_STUDY_URL,
    demoUrl: "https://youtube.com/shorts/0vO8tecumK8?feature=share",
    demoLabel: "Watch voice demo",
    tools: ["AI voice", "Calendar", "CRM"],
    potentialImpact: "Designed to keep inbound property conversations moving outside office hours.",
  },
  {
    title: "WhatsApp inquiry assistant",
    summary:
      "A conversational assistant for common questions, inventory or listing information, requirements capture, and structured human handoff.",
    proofType: "live-demo",
    sourceUrl: REAL_ESTATE_STUDY_URL,
    demoUrl:
      "https://drive.google.com/file/d/16O38ZMaMMjXbo84LqKeS7l7EXFD6bxrN/view?usp=share_link",
    demoLabel: "Watch WhatsApp demo",
    tools: ["WhatsApp", "Knowledge base", "Routing"],
    potentialImpact: "Designed to answer routine questions before a team member steps in.",
  },
  {
    title: "Lead-email automation",
    summary:
      "A follow-up build that preserves context, schedules the next touch, and alerts the team when a reply needs human judgment.",
    proofType: "solution-build",
    sourceUrl: REAL_ESTATE_STUDY_URL,
    demoUrl:
      "https://drive.google.com/file/d/1lsKdjwt6U5fAO1vx2Vn3vmU-tUQghXkg/view?usp=sharing",
    demoLabel: "Inspect email build",
    tools: ["Email", "CRM", "Automation logic"],
    potentialImpact: "Designed to make follow-up consistent without hiding high-intent replies.",
  },
  {
    title: "Weekly client reporting automation",
    summary:
      "A scheduled Make workflow that reads structured data, prepares client-specific summaries, sends reports, and confirms delivery internally.",
    proofType: "live-demo",
    sourceUrl: AGENCY_AUTOMATION_STUDY_URL,
    demoUrl: "https://www.loom.com/embed/f7560adbec7841ca809a84e5d638c4f8",
    demoLabel: "Watch reporting demo",
    tools: ["Make", "Email", "Structured data"],
    potentialImpact: "Designed to reduce repetitive reporting steps and missed delivery windows.",
  },
  {
    title: "Structured lead qualification",
    summary:
      "A repeatable qualification path that captures essential answers, tags intent, updates the chosen system, and routes unusual requests immediately.",
    proofType: "workflow-blueprint",
    sourceUrl: REAL_ESTATE_STUDY_URL,
    tools: ["Forms", "CRM", "Intent routing"],
    potentialImpact: "Designed to give every lead the same essential first-pass qualification.",
  },
  {
    title: "Client onboarding and handoff",
    summary:
      "A deal-won blueprint that creates the internal project, requests assets, assigns owners, updates the CRM, and notifies delivery.",
    proofType: "workflow-blueprint",
    sourceUrl: AGENCY_AUTOMATION_STUDY_URL,
    tools: ["CRM", "Project tools", "Notifications"],
    potentialImpact: "Designed to stop new clients disappearing between sales and fulfillment.",
  },
];

export const trustPrinciples: TrustPrinciple[] = [
  {
    title: "Clear scope before build",
    description:
      "One workflow, named owners, visible boundaries, and an agreed definition of done before implementation starts.",
  },
  {
    title: "A system your team can inspect",
    description:
      "The handoff includes the workflow logic, documentation, and walkthroughs—not a black box that only the builder understands.",
  },
  {
    title: "Human fallback paths",
    description:
      "High-value, unusual, or uncertain conversations route to a person instead of forcing automation past its limits.",
  },
  {
    title: "Ownership after launch",
    description:
      "Alerts, monitoring, and support boundaries are defined so the workflow remains operable when tools or inputs change.",
  },
];

export const testimonialSlots: ProofTestimonial[] = [];

export const publishedTestimonials = testimonialSlots.filter(
  (entry) => entry.isPublished && entry.approvedForPublication && Boolean(entry.sourceUrl),
);
