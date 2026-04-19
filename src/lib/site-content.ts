export const siteConfig = {
  name: "Qarib Iqbal",
  email: "qaribiqbal92@gmail.com",
  linkedin: "https://www.linkedin.com/in/qarib-iqbal92",
  primaryCta: "Get the Free Agency AI Automation Checklist",
  secondaryCta: "Book a Free Automation Audit",
  shortCredibility:
    "AI automation systems for lean marketing teams that want smoother ops, not more tools.",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/checklist", label: "Free Checklist" },
  { href: "/contact", label: "Book Audit" },
];

export const homeProblems = [
  "Leads sit untouched for days when the team gets busy, so good opportunities quietly go cold.",
  "Weekly and monthly reports are rebuilt by hand, even though the same numbers get pulled every time.",
  "Sales-to-delivery handoffs break because onboarding lives across Notion, spreadsheets, inboxes, and memory.",
  "Internal ops still depend on repetitive admin work that steals time from strategy, client communication, and billable work.",
  "Too many tools are in place, but they are loosely connected and easy to break.",
  "Smart team members keep getting pulled into manual tasks that should already be automated.",
];

export const homeOutcomes = [
  "New leads are handled automatically within minutes, even when nobody is at a desk.",
  "Client reporting goes out on time without a weekly scramble.",
  "Onboarding starts from one trigger instead of a patchwork checklist.",
  "Admin chaos drops because steps, reminders, and handoffs happen in the right order.",
  "Founders and small teams get time back for strategy, creative work, and client relationships.",
];

export const services = [
  {
    title: "AI Lead Follow-Up Automation",
    description:
      "When lead response depends on who is online, agencies lose good opportunities. I build follow-up systems that route, qualify, and move leads forward without manual chasing.",
    bullets: [
      "Every new lead gets a fast, on-brand first response instead of sitting untouched.",
      "Routing, reminders, and CRM updates happen automatically so nobody has to remember the next step.",
      "Qualification workflows create a cleaner pipeline and fewer dropped opportunities.",
    ],
    includes: [
      "Lead capture and routing rules",
      "Auto-replies, reminders, and follow-up triggers",
      "CRM updates and qualification workflows",
    ],
    problems: [
      "Slow response times",
      "Inconsistent follow-up",
      "Leads slipping between channels",
    ],
    outcomes: [
      "Faster lead response",
      "Fewer dropped opportunities",
      "Less manual admin around sales follow-up",
    ],
    fit: "Best for agencies still handling lead replies manually across forms, inboxes, DMs, or CRMs.",
  },
  {
    title: "Client Reporting Automation",
    description:
      "Manual reporting eats time every week and invites mistakes. I automate the pull, formatting, and delivery of client reports so reporting becomes dependable instead of disruptive.",
    bullets: [
      "Reporting time drops because the recurring data work is handled automatically.",
      "Clients get consistent reporting on schedule without last-minute scrambling.",
      "Teams spend less time copying numbers and more time explaining what matters.",
    ],
    includes: [
      "Scheduled data pulls from core tools",
      "Automated report formatting and delivery",
      "Checks to reduce missed numbers and broken reports",
    ],
    problems: [
      "Weekly report rebuilds",
      "Copy-paste errors",
      "Reporting work piling up on account managers or founders",
    ],
    outcomes: [
      "Automated client reporting",
      "More reliable reporting cycles",
      "Time back every week",
    ],
    fit: "Best for performance, SEO, or cross-channel agencies producing recurring reports for multiple clients.",
  },
  {
    title: "Client Onboarding & Ops Automation",
    description:
      "Messy onboarding creates avoidable friction before work even starts. I turn scattered handoffs, forms, approvals, and recurring tasks into a cleaner operational flow.",
    bullets: [
      "Each new client starts with the same clear process instead of ad hoc handoffs.",
      "Internal tasks, reminders, and approvals trigger automatically from one action.",
      "Delivery teams spend less time checking what was missed and more time moving work forward.",
    ],
    includes: [
      "Onboarding triggers and task creation",
      "Approvals, reminders, and handoff rules",
      "Recurring process workflows for internal ops",
    ],
    problems: [
      "Forgotten steps",
      "Messy client setup",
      "Broken handoffs between sales and delivery",
    ],
    outcomes: [
      "Cleaner onboarding",
      "More consistent internal workflows",
      "Less repetitive admin work",
    ],
    fit: "Best for lean teams onboarding clients quickly and feeling the strain when processes live in too many places.",
  },
  {
    title: "AI Workflow Design & Tool Integration",
    description:
      "Most agencies do not need more tools. They need the right systems connected properly so work moves cleanly from one step to the next.",
    bullets: [
      "Disconnected tools become one dependable workflow instead of a fragile chain of manual fixes.",
      "Information moves automatically between your CRM, forms, sheets, PM tools, and communication tools.",
      "Operations get simpler because the right bottleneck is fixed instead of adding more software.",
    ],
    includes: [
      "Workflow mapping and bottleneck diagnosis",
      "Tool integration across day-to-day systems",
      "Reliability checks and handoff logic",
    ],
    problems: [
      "Too many tools badly connected",
      "Duplicate data entry",
      "Fragile operational workarounds",
    ],
    outcomes: [
      "Cleaner systems",
      "Fewer manual handoffs",
      "More reliable day-to-day operations",
    ],
    fit: "Best for agencies that already have a stack in place but know the systems are not talking to each other well.",
  },
  {
    title: "AI Assistants / Internal AI Systems",
    description:
      "Teams waste time answering the same questions and repeating the same micro-tasks. I build practical internal AI helpers that support operations instead of adding more noise.",
    bullets: [
      "Repeated internal questions can be handled faster with a focused AI helper.",
      "Small operational tasks get lighter without turning the team into prompt engineers.",
      "Knowledge retrieval becomes easier for the people doing the work day to day.",
    ],
    includes: [
      "Internal AI assistants for common ops questions",
      "Knowledge retrieval and task support flows",
      "Simple scoped use cases tied to real agency work",
    ],
    problems: [
      "Repeated team questions",
      "Micro-tasks eating up time",
      "Operational knowledge living in too many places",
    ],
    outcomes: [
      "Less repetitive work",
      "Faster access to answers",
      "Better operational consistency",
    ],
    fit: "Best after the core workflow is clear and there is a specific internal use case worth supporting with AI.",
  },
];

export const offerPath = [
  {
    title: "Free Agency AI Automation Checklist",
    description:
      "A practical checklist for spotting which agency workflows should be automated first, where manual work is hiding, and what to clean up before adding more tools.",
    bullets: [
      "Useful immediately for lean teams that feel stretched.",
      "Helps identify the bottlenecks most worth fixing first.",
      "Low-friction way to see where your ops are still too manual.",
    ],
    cta: siteConfig.primaryCta,
    href: "/checklist",
    featured: false,
  },
  {
    title: "Free Automation Audit",
    description:
      "A focused diagnostic call to identify the highest-value operational bottleneck in your agency and map the most sensible next step.",
    bullets: [
      "Not a vague chat or hard sell.",
      "You leave with clearer priorities and a practical recommendation.",
      "Best for agencies that know something is too manual but want help finding the right fix first.",
    ],
    cta: siteConfig.secondaryCta,
    href: "/contact",
    featured: false,
  },
  {
    title: "Fixed-Scope AI Automation Sprint",
    description:
      "The main paid offer: one clear bottleneck, one scoped solution, one defined timeline. Built as a focused 2 to 4 week sprint with professional communication and dependable implementation.",
    bullets: [
      "Clear scope before build so everyone knows what is being solved.",
      "Weekly progress updates, revisions during handoff, and short post-launch support.",
      "A lower-risk way to buy than open-ended consulting or more software subscriptions.",
    ],
    cta: "See the Sprint Scope",
    href: "/services#automation-sprint",
    featured: true,
  },
  {
    title: "Ongoing Optimization Support",
    description:
      "Available after the sprint for agencies that want to refine, extend, or maintain the system once the first automation is live.",
    bullets: [
      "Best as the next step after the first workflow is already working.",
      "Keeps improvements focused instead of turning into a bloated retainer.",
      "Useful for iterative optimization, additional workflows, and operational fine-tuning.",
    ],
    cta: "Talk Through Ongoing Support",
    href: "/contact",
    featured: false,
  },
];

export const trustStrip = [
  "Clear scope before build",
  "Weekly updates",
  "Revisions included",
  "Post-launch support",
  "Fast communication",
];

export const processSteps = [
  {
    title: "Audit your workflow bottlenecks",
    description:
      "We look at where manual work is costing time, creating inconsistency, or slowing down the team. The goal is to find the one bottleneck most worth fixing first.",
  },
  {
    title: "Design the automation system",
    description:
      "I map the workflow, define scope, and decide what needs to happen automatically versus what should stay human. You see the plan before anything is built.",
  },
  {
    title: "Build and implement",
    description:
      "The system gets implemented with clean integrations, clear communication, and a defined timeline. You get regular updates instead of disappearing development work.",
  },
  {
    title: "Refine and optimize",
    description:
      "After launch, we test, adjust, and hand over a workflow your team can actually use. If ongoing support makes sense, it starts from a live system instead of theory.",
  },
];

export const proofCards = [
  {
    title: "Example scenario: lead follow-up system",
    description:
      "A sample build for an agency where leads arrive through forms and DMs but follow-up depends on whoever notices first.",
    bullets: [
      "Lead capture triggers an immediate first response and routes the inquiry to the right owner.",
      "Qualification steps update the CRM automatically and create reminders if the lead stalls.",
      "Result: faster response, fewer dropped leads, and less manual sales admin.",
    ],
  },
  {
    title: "What an Automation Sprint includes",
    description:
      "Professional delivery matters even before there are client logos to show. The sprint is designed to feel dependable and easy to buy.",
    bullets: [
      "Workflow map, implementation, testing, handoff guidance, and short post-launch support.",
      "Defined scope before build so the project stays focused.",
      "Revisions during handoff to make sure the agreed workflow works as intended.",
    ],
  },
  {
    title: "Example scenario: reporting workflow",
    description:
      "A sample reporting automation for an agency that manually rebuilds the same report every week.",
    bullets: [
      "Data is pulled on a schedule, shaped into the right format, and delivered automatically.",
      "Checks are added so broken inputs are easier to spot before a client report goes out.",
      "Result: less reporting scramble, fewer manual errors, and more predictable delivery.",
    ],
  },
];

export const faqItems = [
  {
    question: "What kinds of agencies do you work with?",
    answer:
      "The best fit is lean marketing agencies and small agency teams that are still doing too much manually across lead follow-up, reporting, onboarding, and internal ops.",
  },
  {
    question: "What tools can you integrate?",
    answer:
      "Most common agency tools are fair game: CRMs, forms, spreadsheets, project management tools, reporting tools, email, and communication platforms. The exact tools matter less than fixing the right workflow.",
  },
  {
    question: "Do I need a big team or a mature stack first?",
    answer:
      "No. This work is often most useful for smaller teams that have grown faster than their systems and need cleaner operations before adding headcount.",
  },
  {
    question: "How long does a typical automation project take?",
    answer:
      "Most fixed-scope automation sprints are designed to run in 2 to 4 weeks, depending on the workflow and how much integration work is involved.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes, but usually after the first automation is live. Ongoing optimization support is there for refinement, maintenance, and the next workflow once the first sprint is complete.",
  },
  {
    question: "Do you build custom workflows or only templates?",
    answer:
      "The work is custom to the bottleneck being fixed. Reusable patterns help move faster, but the solution is scoped around the agency’s actual workflow, not forced into a generic template.",
  },
  {
    question: "What happens in the free Automation Audit?",
    answer:
      "We look at the current workflow, identify where manual work is causing the most friction, and narrow down the highest-value automation opportunity. You leave with clearer priorities and a practical next step.",
  },
  {
    question: "How do we get started?",
    answer:
      "Start with the checklist if you want a quick self-assessment, or book the free Automation Audit if you want help diagnosing the bottleneck and deciding whether a sprint makes sense.",
  },
];

export const caseStudies = [
  {
    agencyType: "Boutique paid social agency, 6-person team",
    challenge:
      "Inbound leads were arriving through forms and DMs, but response time depended on who happened to be online. Follow-up was inconsistent and CRM updates were getting skipped.",
    system:
      "A lead follow-up workflow would capture every inquiry, send an immediate first response, assign the right owner, update the CRM, and trigger reminders or qualification steps based on response behavior.",
    improvement:
      "The team would stop losing time to manual lead triage and reduce the number of promising leads that cool off before anyone replies.",
    whyItMatters:
      "For a small team, faster lead handling means more capacity without hiring someone just to manage follow-up admin.",
  },
  {
    agencyType: "SEO and content agency, 8-person team",
    challenge:
      "Weekly and monthly reports were still assembled manually across several tools, creating repeated copy-paste work and last-minute pressure before client delivery.",
    system:
      "A reporting automation would pull recurring metrics, format a standard report structure, and deliver the output automatically on schedule with checks for missing inputs.",
    improvement:
      "Reporting time would shrink, delivery would become more consistent, and the team would spend more time on analysis instead of assembling the same report every week.",
    whyItMatters:
      "Reliable reporting protects client trust and frees up account managers for higher-value conversations.",
  },
  {
    agencyType: "Creative and performance agency, 5-person team",
    challenge:
      "Client onboarding lived in a mix of spreadsheets, docs, and inbox threads, which meant missed steps, messy handoffs, and too much back-and-forth after the deal closed.",
    system:
      "An onboarding and ops workflow would trigger internal task creation, request the right client inputs, assign owners, move approvals forward, and create visibility around each stage.",
    improvement:
      "Onboarding would become cleaner and more repeatable, with fewer missed tasks and less admin overhead for the founder or ops lead.",
    whyItMatters:
      "A small team feels broken handoffs quickly. Cleaner onboarding increases reliability without adding another layer of management.",
  },
];

export const beliefs = [
  "Most agencies do not have a lead problem. They have a follow-up and workflow problem.",
  "You do not need more AI tools. You need the right system fixing the right bottleneck.",
  "Automation should reduce noise, make operations more dependable, and give small teams time back.",
];

export const checklistHighlights = [
  "10 agency workflows worth evaluating first",
  "A quick self-assessment for where your ops are still too manual",
  "The signs your reporting, follow-up, or onboarding process needs cleanup before more tools are added",
  "Simple guidance for choosing the highest-value bottleneck to fix first",
];

export const articles = [
  {
    title: "5 AI workflows every marketing agency should automate first",
    blurb:
      "A practical breakdown of the first operational workflows worth tightening before adding more software.",
  },
  {
    title: "Why most agencies don’t have a lead problem — they have a follow-up problem",
    blurb:
      "A look at how lead leakage happens in small agency teams and what a better response system looks like.",
  },
  {
    title: "The weekly reporting process your team should stop doing manually",
    blurb:
      "Why repeated reporting work becomes an operations problem and how to turn it into a dependable workflow.",
  },
];
