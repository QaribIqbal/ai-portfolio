export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type DentalGuide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  shortAnswer: string;
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  disclaimer?: string;
  published: string;
};

export const dentalGuides: DentalGuide[] = [
  {
    slug: "missed-call-text-back",
    title: "What is missed-call text-back for dental clinics?",
    metaTitle: "What Is Missed-Call Text-Back for Dental Clinics?",
    description:
      "A plain-English guide for Australian dental practices: how missed-call text-back works, when calls get missed, and what a good text-back message includes.",
    shortAnswer:
      "Missed-call text-back sends an SMS automatically when a call to your clinic goes unanswered, so the caller can reply to book instead of ringing the next clinic. It runs in the SMS tool your clinic already uses, and replies go to your front desk.",
    sections: [
      {
        heading: "How it works",
        bullets: [
          "A patient calls and nobody can pick up: reception is busy, it's lunch, or it's after hours.",
          "Within about a minute, the caller gets a text from your clinic's number explaining you missed their call and how to book.",
          "The patient replies by text, and the reply is forwarded to your front desk to confirm the appointment.",
        ],
      },
      {
        heading: "When dental clinics miss calls",
        paragraphs: [
          "Most missed calls aren't about effort. They happen at predictable times: when reception is serving a patient at the desk, over lunch, after hours, and when there is no set process for calling missed numbers back.",
          "A 2026 vendor study of 26 practices found 38% of calls went unanswered. A free Missed-Call Leak Audit maps where your own clinic's calls are going.",
        ],
      },
      {
        heading: "What a good text-back message includes",
        bullets: [
          "Your clinic's name, so the patient knows who is texting.",
          "A short apology for missing the call.",
          "One clear way to book, usually 'reply with a time that suits'.",
          "No clinical advice. Clinical or urgent questions go to your team.",
        ],
      },
      {
        heading: "What you need to get started",
        paragraphs: [
          "Usually nothing new. The text-back is set up inside the phone and SMS tools your clinic already has, and your patient data stays in your clinic's systems.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does missed-call text-back replace our receptionist?",
        answer:
          "No. It catches the calls reception can't reach and hands every reply back to your front desk to book.",
      },
      {
        question: "Do we need new phone software?",
        answer: "No. It runs in the SMS/email tool your clinic already uses.",
      },
      {
        question: "How fast is it live?",
        answer: "48 hours from access to your system.",
      },
    ],
    published: "2026-10-08",
  },
  {
    slug: "health-fund-extras-reset",
    title: "Health fund extras reset: a 31 December reactivation guide for dental clinics",
    metaTitle: "Health Fund Extras Reset: 31 December Reactivation Guide for Dental Clinics",
    description:
      "How Australian dental clinics can remind existing patients before extras limits reset, using compliant SMS and email that stays within health advertising rules.",
    shortAnswer:
      "If patients have extras cover, many funds reset annual limits on 31 December. Some funds use a different date, such as 1 July or the membership anniversary, so patients should check with their own fund. A reactivation campaign reminds existing patients before their limits reset, without pressure or outcome claims.",
    sections: [
      {
        heading: "Who to contact",
        bullets: [
          "Existing patients who gave express consent to receive messages, or who attended within the last 24 months.",
          "Patients grouped by health fund, so the timing and wording match their cover.",
          "Never patients who have opted out. Every message carries a STOP opt-out.",
        ],
      },
      {
        heading: "Wording that stays within health advertising rules",
        paragraphs: [
          "Health advertising in Australia must not use testimonials, create unreasonable expectations of benefit, or encourage unnecessary use of health services. Keep reminders factual and conditional.",
        ],
        bullets: [
          "Good: \"If you have extras cover, most funds reset on 31 Dec. Reply to book a check-up.\"",
          "Avoid: urgency, scare tactics, discounts framed as a reason to have treatment, or any promise about clinical results.",
        ],
      },
      {
        heading: "How the campaign runs",
        bullets: [
          "Segment patients by health fund.",
          "Write the SMS + email sequence for you.",
          "Run it inside your clinic's own messaging system, so patient data never leaves the clinic.",
          "Report every recovered booking: messages sent, replies, appointments recovered.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do all health funds reset extras on 31 December?",
        answer:
          "No. Many do, but some use a different date such as 1 July or the membership anniversary. Patients should check with their own fund.",
      },
      {
        question: "What does a reactivation campaign cost?",
        answer:
          "The 31 December Reactivation Campaign is a fixed AUD 490, live within 48 hours of access, with a pilot guarantee in writing before we start.",
      },
    ],
    disclaimer:
      "General information only. Check each patient's fund and the current AHPRA advertising guidelines before sending.",
    published: "2026-10-08",
  },
  {
    slug: "sms-rules-australian-dental-clinics",
    title: "SMS rules for Australian dental clinics: the basics",
    metaTitle: "SMS Marketing Rules for Australian Dental Clinics: The Basics",
    description:
      "The essentials of consent, sender identification, unsubscribes and health advertising for dental clinics sending SMS in Australia.",
    shortAnswer:
      "Under the Spam Act 2003, commercial SMS needs the recipient's consent, must identify your clinic, and must include a working way to unsubscribe, actioned within 5 working days. Health advertising must also follow the AHPRA advertising guidelines, and patient information is covered by the Privacy Act.",
    sections: [
      {
        heading: "Consent",
        paragraphs: [
          "Consent can be express (the patient agreed to receive messages) or, in limited cases, inferred from an existing relationship. Keep a record of how consent was given.",
        ],
      },
      {
        heading: "Identify the sender and offer an unsubscribe",
        bullets: [
          "Every commercial message should clearly name your clinic.",
          "Include a simple opt-out, such as replying STOP.",
          "Action unsubscribe requests within 5 working days, and don't message that number again.",
        ],
      },
      {
        heading: "Health advertising rules",
        bullets: [
          "No testimonials about clinical care.",
          "No claims that create unreasonable expectations of results.",
          "No pressure tactics that encourage unnecessary treatment.",
        ],
      },
      {
        heading: "Patient data",
        paragraphs: [
          "Patient information is personal and health information under the Privacy Act. The safest approach is to keep it inside your clinic's own systems and run messaging from there, rather than exporting lists to outside tools.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a text-back to someone who just called us a marketing message?",
        answer:
          "A direct reply to a patient's own enquiry is generally treated differently from a promotional message, but it should still identify your clinic. Reactivation and promotional messages need consent and an unsubscribe.",
      },
      {
        question: "Does the campaign include an opt-out?",
        answer:
          "Yes. Every message carries a STOP opt-out, and replies are forwarded to your front desk.",
      },
    ],
    disclaimer:
      "General information only, not legal advice. See ACMA guidance on the Spam Act and the AHPRA advertising guidelines for full requirements.",
    published: "2026-10-08",
  },
];

export function getGuide(slug: string) {
  return dentalGuides.find((guide) => guide.slug === slug);
}
