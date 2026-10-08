export const DENTAL_INSTAGRAM_URL = "https://www.instagram.com/qaribiqbal92";

// Owner sets the recorded demo's embed URL (YouTube /embed/ or Loom /embed/). While null, the demo section is not rendered.
export const DENTAL_DEMO_VIDEO_URL: string | null = null;

export const dentalMeta = {
  title: "Missed-Call Text-Back + Patient Reactivation for Dental Clinics",
  description:
    "Free Missed-Call Leak Audit for Australian dental clinics. 60-second SMS text-back and a fixed-price AUD 490 reactivation campaign before the 31 December extras reset.",
};

export const dentalHero = {
  title: "Missed calls become booked appointments.",
  subtitle:
    "For Australian dental clinics: a 60-second SMS text-back for the calls your front desk can't reach, plus a patient reactivation campaign before health-fund extras reset on 31 December.",
  primaryCta: "Get the free Missed-Call Leak Audit",
  secondaryCta: "See the reactivation campaign",
};

export const dentalProblems = [
  "A 2026 vendor study of 26 practices found 38% of calls went unanswered.",
  "A missed call with no text-back usually books with the next clinic.",
  "If you have extras cover, most funds reset on 31 Dec.",
];

export const dentalOffer = {
  heading: "The 31 December Reactivation Campaign",
  what: "We reactivate your existing patients with a compliant SMS + email sequence built around the extras reset: segment by health fund, write the copy, run it inside your clinic's own messaging system, and report every recovered booking.",
  price: "Fixed price: AUD 490. Live within 48 hours of access.",
  ongoing:
    "Ongoing: Missed-call text-back + monthly reactivation, AUD 649/month. Founding price for the first 3 practices.",
  guarantee:
    "Pilot guarantee: if the campaign recovers zero appointments in 30 days, the pilot fee is refunded. Conditions in writing before we start.",
};

export const dentalSteps = [
  {
    title: "Free Leak Audit",
    description:
      "we map where calls and patients are leaking: voicemail, lunch, after-hours, no callback queue.",
  },
  {
    title: "Build inside your system",
    description:
      "the campaign runs in the SMS/email tool your clinic already uses. Your patient data never leaves your clinic.",
  },
  {
    title: "Weekly proof",
    description: "a simple report: messages sent, replies, appointments recovered.",
  },
];

export const dentalAuditForm = {
  labels: {
    clinicName: "Clinic name",
    name: "Your name",
    email: "Work email",
    phone: "Phone (optional)",
    smsTool: "What do you currently use for patient SMS? (optional)",
    consent:
      "I confirm this enquiry is about my clinic's own systems. Do not send patient data through this form.",
  },
  help: {
    phone: "Australian mobile or landline.",
    smsTool: "For example, the SMS feature in your practice software, or a separate SMS app.",
  },
  fallback: {
    message: "The form didn't go through. You can send the same details by email instead:",
    link: "Email my audit request",
    subject: "Missed-Call Leak Audit request",
  },
  submit: "Request my free Leak Audit",
  success: "Request received. Your audit summary arrives by email within one business day.",
  note: "The Leak Audit is free until 6 November 2026.",
};

export const dentalFaqs = [
  {
    question: "Does our patient data leave the clinic?",
    answer:
      "No. Campaigns run inside your existing messaging system. We segment and write; your data stays with you.",
  },
  {
    question: "Is the messaging compliant?",
    answer:
      "Yes. Sends go only to patients with express consent or who attended within the last 24 months, every message carries a STOP opt-out, and replies are forwarded to your front desk.",
  },
  {
    question: "What if we have no SMS tool?",
    answer:
      "We set up a sending number for you as a fallback, with every reply forwarded to your front desk the same day.",
  },
  {
    question: "How fast is it live?",
    answer: "48 hours from access to your system.",
  },
  {
    question: "What does it cost?",
    answer:
      "The 31 December Reactivation Campaign is a fixed AUD 490. Ongoing missed-call text-back + monthly reactivation is AUD 649/month, the founding price for the first 3 practices.",
  },
  {
    question: "Do we need new software?",
    answer: "No. The campaign runs in the SMS/email tool your clinic already uses.",
  },
];

export const dentalStickyCta = "Get the free Leak Audit";

export const dentalFinalCta = {
  heading: "Find out what missed calls are costing your clinic.",
  button: "Get the free Missed-Call Leak Audit",
  instagramLink: "Prefer to talk first? DM 'AUDIT' on Instagram",
};

export const dentalDemoTitle = "Missed-call text-back and reactivation demo";

export const brandHome = {
  meta: {
    title: "Missed-Call Recovery for Australian Dental Clinics",
    description:
      "Missed-call text-back and patient reactivation for Australian dental clinics. Fixed-price AUD 490 campaign and a free Missed-Call Leak Audit until 6 November 2026.",
  },
  eyebrow: "Qarib Iqbal / Missed-call and lost-patient recovery",
  headlineLead: "I plug ",
  headlineKey: "missed-call and lost-patient recovery",
  headlineTail:
    " into the phones your dental practice already has, and every week I show you the appointments it booked.",
  freeNote: "The Leak Audit is free until 6 November 2026.",
  offerHeading: "Fixed price, written guarantee",
  offerLink: "Full campaign details",
  agencies: {
    heading: "Run a marketing agency?",
    body: "The same systems, delivered as automation sprints, voice agents and reporting workflows for agencies and their clients.",
    link: "For agencies",
  },
};

export const dentalTrustChips = [
  "No new software",
  "Patient data stays in your clinic",
  "Live within 48 hours of access",
  "Fixed price, written guarantee",
];

export const dentalStat = {
  value: "38%",
  label: "of calls went unanswered",
  source: "A 2026 vendor study of 26 practices.",
};

export const dentalIllustration = {
  label: "Illustration: an example text-back conversation",
  missedCall: "Missed call",
  missedCallDetail: "Reception busy",
  messages: [
    {
      from: "clinic",
      text: "Hi, it's [Your clinic]. Sorry we missed your call. Reply with a time that suits and we'll book you in.",
    },
    { from: "patient", text: "Tomorrow afternoon if you have anything?" },
    { from: "clinic", text: "Done. You're booked for tomorrow afternoon. See you then." },
  ],
  footer: "Sent automatically when a call goes unanswered",
};

export const dentalOfferBullets = [
  "Patients segmented by health fund",
  "SMS + email copy written for you",
  "Runs inside your clinic's own messaging system",
  "Every recovered booking reported",
];

export const dentalLeakCheck = {
  eyebrow: "Leak check",
  heading: "Where is your clinic leaking calls?",
  intro: "Tap each one that sounds like your practice.",
  questions: [
    "Calls go to voicemail when reception is busy",
    "Nobody answers the phone over lunch",
    "After-hours calls go unanswered",
    "There's no set process to call missed numbers back",
  ],
  resultNone: "None of these yet. The audit checks the rest of your call flow.",
  resultSome: "common leak points selected. The free Leak Audit maps exactly where those calls go.",
  cta: "Map my leaks in the free audit",
};
