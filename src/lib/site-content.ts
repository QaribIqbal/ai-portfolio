export const siteConfig = {
  name: "Qarib Iqbal",
  email: "qaribiqbal92@gmail.com",
  linkedin: "https://www.linkedin.com/in/qarib-iqbal92",
  calendly: "https://calendly.com/qaribiqbal92/30min",
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
  { href: "/checklist", label: "Checklist" },
  { href: "/contact", label: "Contact" },
];

export const homeProblems = [
  "Leads sit untouched for days when the team gets busy.",
  "Reports get rebuilt manually every week.",
  "Broken handoffs slow things down between sales and delivery.",
  "Client onboarding still lives in Notion, spreadsheets, and memory.",
  "Too many tools do not talk to each other properly.",
  "Repetitive admin work quietly eats into billable and strategy time.",
];

export const homeOutcomes = [
  "Leads are handled automatically within minutes.",
  "Reporting is delivered on time without a weekly scramble.",
  "Onboarding is triggered instantly from a single action.",
  "Less admin chaos means fewer dropped balls.",
  "More time goes back to strategy, creative work, and client relationships.",
];

export const services = [
  {
    title: "AI Lead Follow-Up Automation",
    description:
      "Slow, inconsistent follow-up leaves good leads waiting too long. I automate lead capture, routing, triggers, reminders, CRM updates, and qualification workflows so agencies respond faster and drop fewer opportunities.",
    bullets: [
      "Every new lead gets an automated, on-brand first reply within minutes, even when your team is offline.",
      "Routing, reminders, and CRM updates happen automatically so fewer opportunities get lost in the shuffle.",
      "Qualification workflows create a cleaner pipeline with less manual admin around follow-up.",
    ],
    includes: [
      "Lead capture, routing, and first-response workflows",
      "Reminders, follow-up triggers, and qualification steps",
      "CRM updates and handoff logic in the right order",
    ],
    problems: [
      "Slow response times",
      "Inconsistent follow-up",
      "Leads slipping between channels or owners",
    ],
    outcomes: [
      "Faster lead response",
      "Fewer dropped opportunities",
      "Less manual sales admin",
    ],
    fit: "Best for lean agencies still handling lead replies manually across forms, inboxes, DMs, or CRMs.",
  },
  {
    title: "Client Reporting Automation",
    description:
      "Weekly and monthly reporting takes too much manual time in many agencies. I pull data from the right tools, format reports clearly, and deliver them automatically on schedule so reporting stops eating up the week.",
    bullets: [
      "Recurring reporting work gets pulled out of the weekly scramble.",
      "Clients receive more consistent reports on schedule with fewer manual errors.",
      "Teams spend less time copying numbers and more time explaining what matters.",
    ],
    includes: [
      "Scheduled data pulls from the right reporting sources",
      "Automated report formatting and delivery",
      "Checks to reduce broken inputs and missed numbers",
    ],
    problems: [
      "Weekly report rebuilds",
      "Copy-paste reporting work",
      "Last-minute pressure before client delivery",
    ],
    outcomes: [
      "Automated client reporting",
      "More reliable reporting cycles",
      "Time saved every week",
    ],
    fit: "Best for performance, SEO, and cross-channel agencies producing recurring reports for multiple clients.",
  },
  {
    title: "Client Onboarding & Ops Automation",
    description:
      "Messy onboarding creates broken handoffs, forgotten steps, and inconsistent client setup. I automate onboarding tasks, internal handoffs, approvals, and recurring workflows so the process becomes cleaner and more dependable.",
    bullets: [
      "Each new client starts from the same clear process instead of a scattered checklist.",
      "Internal tasks, reminders, approvals, and handoffs trigger automatically from one action.",
      "The team spends less time chasing what was missed and more time moving work forward.",
    ],
    includes: [
      "Onboarding triggers and task creation",
      "Approvals, reminders, and handoff rules",
      "Recurring workflows for internal operational steps",
    ],
    problems: [
      "Messy onboarding",
      "Broken handoffs",
      "Forgotten steps after a deal closes",
    ],
    outcomes: [
      "Cleaner onboarding",
      "More consistent internal workflows",
      "Less repetitive admin work",
    ],
    fit: "Best for small agency teams that feel onboarding strain as soon as new clients start arriving faster.",
  },
  {
    title: "AI Workflow Design & Tool Integration",
    description:
      "Most agencies do not need more tools. They need the right systems connected properly. I connect CRMs, forms, spreadsheets, PM tools, and communication tools into reliable automation workflows that remove operational bottlenecks.",
    bullets: [
      "Disconnected tools become one dependable workflow instead of a fragile chain of manual fixes.",
      "Information moves automatically between the systems your team already uses.",
      "The result is cleaner day-to-day operations without hiring extra headcount immediately.",
    ],
    includes: [
      "Workflow mapping and bottleneck diagnosis",
      "Plain-English integration design across key systems",
      "Reliability checks and cleaner handoff logic",
    ],
    problems: [
      "Too many tools badly connected",
      "Duplicate entry across systems",
      "Workflows that break when people get busy",
    ],
    outcomes: [
      "Cleaner systems",
      "Fewer manual handoffs",
      "More reliable day-to-day operations",
    ],
    fit: "Best for agencies that already have a stack in place but know the systems are not connected cleanly enough.",
  },
  {
    title: "AI Assistants / Internal AI Systems",
    description:
      "Repetitive questions and micro-tasks add up fast inside small teams. I build simple internal AI helpers for operational tasks, knowledge retrieval, and process assistance so repeated work gets lighter without adding more noise.",
    bullets: [
      "Common internal questions get answered faster with a scoped, useful helper.",
      "Small operational tasks stop pulling senior team members into repeat work.",
      "Process knowledge becomes easier to access for the people doing the work day to day.",
    ],
    includes: [
      "Internal AI helpers for common operational questions",
      "Knowledge retrieval and process assistance",
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
    fit: "Best when the core workflow is already clear and there is a practical internal use case worth supporting.",
  },
];

export const offerPath = [
  {
    title: "Free Agency AI Automation Checklist",
    description:
      "A practical, low-friction resource for spotting the workflows worth automating first, identifying where manual work is hiding, and seeing where your systems are still too disconnected.",
    bullets: [
      "Useful immediately for lean agencies that feel stretched.",
      "Helps identify the highest-value bottleneck to fix first.",
      "A simple way to get clarity before adding more tools or more headcount.",
    ],
    cta: siteConfig.primaryCta,
    href: "/checklist",
    featured: false,
  },
  {
    title: "Free Automation Audit",
    description:
      "A focused diagnostic for identifying the highest-value workflow bottleneck in your agency. This is not a vague free chat. It is a practical conversation about what is too manual, what should be fixed first, and what the sensible next step looks like.",
    bullets: [
      "You leave with clearer priorities and a practical recommendation.",
      "Best for agencies that know something feels too manual but want help diagnosing the right fix.",
      "A lower-pressure way to get clarity before committing to a build.",
    ],
    cta: siteConfig.secondaryCta,
    href: siteConfig.calendly,
    featured: false,
  },
  {
    title: "Fixed-Scope AI Automation Sprint",
    description:
      "The main paid offer: one clear operational bottleneck, one scoped solution, one defined timeline, and one professional implementation process. Built as a focused 2 to 4 week sprint that feels easier to buy than an open-ended consulting engagement.",
    bullets: [
      "Clear scope before build so everyone knows exactly what is being solved.",
      "Weekly progress updates, fast communication, revisions during handoff, and short post-launch support are included.",
      "A professional, lower-risk way to fix the right bottleneck without buying a huge engagement.",
    ],
    cta: siteConfig.secondaryCta,
    href: siteConfig.calendly,
    featured: true,
    note: "If something inside the agreed sprint scope is not working as specified at handoff, it gets fixed before sign-off. The promise is around scope clarity and implementation quality, not exaggerated outcome guarantees.",
  },
  {
    title: "Ongoing Optimization Support / Retainer",
    description:
      "Available only after the sprint, as the natural next step once the first automation is live. Useful for refinement, maintenance, and the next workflow once the first system is already working.",
    bullets: [
      "Keeps improvements focused instead of turning into a vague retainer.",
      "Useful for iterative optimization, added workflows, and operational fine-tuning.",
      "Best once the first automation is live and your team is using it day to day.",
    ],
    cta: siteConfig.secondaryCta,
    href: siteConfig.calendly,
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
      "We look at where manual work is costing time, creating inconsistency, or slowing down the team. The goal is to identify the highest-value workflow bottleneck, not to pile on more tools.",
  },
  {
    title: "Design the automation system",
    description:
      "I map the workflow, define scope, and decide what should happen automatically versus what should stay human. You see the plan before the build starts.",
  },
  {
    title: "Build and implement",
    description:
      "The system gets built with reliable implementation and clean integrations. You get steady communication, weekly progress updates, and a defined timeline throughout the sprint.",
  },
  {
    title: "Refine and optimize",
    description:
      "After launch, we test, adjust, and hand over a workflow your team can actually use. If ongoing support makes sense, it starts from a live system rather than a vague retainer.",
  },
];

export const proofCards = [
  {
    title: "Example scenario: lead follow-up system",
    description:
      "Clearly labeled as an example, not client work. This is the kind of system built for agencies where leads arrive through forms and inboxes but follow-up still depends on whoever notices first.",
    bullets: [
      "Every inquiry triggers a first response, routing logic, qualification steps, and reminder follow-up.",
      "The CRM stays cleaner because updates happen automatically instead of depending on memory.",
      "The operational improvement is faster lead handling, fewer dropped opportunities, and less sales admin.",
    ],
  },
  {
    title: "What an Automation Sprint includes",
    description:
      "Professional delivery matters before there are testimonials to show. The sprint is designed to feel clear, dependable, and beginner-safe to buy.",
    bullets: [
      "Workflow map, implementation, testing, handoff guidance, revisions during handoff, and short post-launch support.",
      "Defined scope before build so the project stays focused.",
      "Communication standards that keep the work clear instead of disappearing into a black box.",
    ],
  },
  {
    title: "Example scenario: reporting workflow",
    description:
      "Clearly labeled as an example, not client work. This is the kind of reporting system built for agencies that manually rebuild the same report every week.",
    bullets: [
      "Recurring data pulls, report formatting, and scheduled delivery happen automatically.",
      "Checks help catch broken inputs before a report goes out to a client.",
      "The operational improvement is less reporting scramble, fewer manual errors, and more reliable delivery.",
    ],
  },
];

export const faqItems = [
  {
    question: "What kinds of agencies do you work with?",
    answer:
      "The best fit is lean marketing agencies and small agency teams doing too much manually across lead follow-up, reporting, onboarding, and internal ops.",
  },
  {
    question: "What tools can you integrate?",
    answer:
      "Most common agency tools are fair game: CRMs, forms, spreadsheets, PM tools, reporting tools, email, and communication platforms. The exact tools matter less than fixing the right workflow.",
  },
  {
    question: "Do I need a big team or existing tech stack first?",
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
      "The work is custom to the bottleneck being fixed. Reusable patterns help move faster, but the system is scoped around the agency's actual workflow, not forced into a generic template.",
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
  "10 workflows agencies can automate first",
  "Signs your lead follow-up, reporting, or onboarding process is still too manual",
  "A quick self-assessment to spot where your systems are too disconnected",
  "Simple guidance for choosing the highest-value bottleneck to fix first",
];

export const articles = [
  {
    title: "5 AI workflows every marketing agency should automate first",
    blurb:
      "A practical breakdown of the first operational workflows worth tightening before adding more software.",
  },
  {
    title: "Why most agencies don't have a lead problem - they have a follow-up problem",
    blurb:
      "A look at how lead leakage happens in small agency teams and what a better response system looks like.",
  },
  {
    title: "The weekly reporting process your team should stop doing manually",
    blurb:
      "Why repeated reporting work becomes an operations problem and how to turn it into a dependable workflow.",
  },
];
