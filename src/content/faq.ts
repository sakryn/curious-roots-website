/**
 * FAQ content, drawn from Sarah's current site. Anything in [BRACKETS] still
 * needs Sarah's confirmation and is highlighted on the page until replaced.
 */
export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "start",
    label: "Getting started",
    items: [
      {
        id: "accepting",
        q: "Are you accepting new clients?",
        a: "Yes. I'm currently accepting new clients, both in person at my office and by telehealth. You can book a first appointment through Jane, text my line, or send a note through the contact form.",
      },
      {
        id: "start",
        q: "How do I get started?",
        a: "Whatever's easiest for you: book through Jane (the 'Book now' button), text 484-650-3368, or fill out the contact form. You don't need to know exactly what you need first. Tell me a little about what's going on and I'll suggest a next step.",
      },
      {
        id: "contact-best",
        q: "What's the best way to reach you?",
        a: "Text or the contact form. I'm a solo practice with no front desk, and I can't answer the phone while I'm in session, so calls go to voicemail. A text reaches me faster, and we can always schedule a time to talk by phone.",
      },
      {
        id: "hours",
        q: "What are your hours?",
        a: "I don't have set office hours. Sessions are by appointment only, so reach out and we'll find a time that works.",
      },
      {
        id: "location",
        q: "Where are you located?",
        a: "4453 Penn Ave, Suite 4, Sinking Spring, PA 19608. The office is in the Tollhouse Shops, right off Penn Ave.",
      },
      {
        id: "telehealth",
        q: "Do you offer telehealth?",
        a: "Yes. I see clients in person in Sinking Spring and by telehealth anywhere in Pennsylvania.",
      },
    ],
  },
  {
    id: "fit",
    label: "Is this a fit?",
    items: [
      {
        id: "fit-who",
        q: "Who do you work with?",
        a: "Children, adolescents, teens and adults, plus parents and families. Common reasons people come in: ADHD and neurodivergence, trauma, anxiety and emotional overwhelm, grief and loss, depression and mood, self-esteem, life transitions, and feeling stuck.",
      },
      {
        id: "fit-ages",
        q: "What ages do you see?",
        a: "Children, teens and adults. If you're wondering whether I'm a good fit for your child's age or stage, send a note and ask.",
      },
      {
        id: "nd-diagnosis",
        q: "Do I need an ADHD diagnosis to work with you?",
        a: "No. Plenty of people come to me wondering, not knowing. If you'd like answers, I also offer ADHD clinical assessments: a 90-minute assessment plus a 60-minute feedback session, $350.",
      },
      {
        id: "nd-affirming",
        q: "What does neurodivergent-affirming actually mean?",
        a: "It means I'm not trying to make you or your child act more typical. We work on what's genuinely hard, like overwhelm, burnout or relationships, and we keep what works about the way your brain does things. (I'm a therapist with ADHD myself, so this one's personal.)",
      },
      {
        id: "trauma-look",
        q: "What does trauma therapy with you look like?",
        a: "Slower than people expect, in a good way. We build a safe space and coping skills first, and only move toward hard memories when your nervous system is ready. You set the pace.",
      },
    ],
  },
  {
    id: "cost",
    label: "Insurance + cost",
    items: [
      {
        id: "insurance",
        q: "Do you accept insurance?",
        a: "Yes. I'm in network with Aetna, Capital Blue Cross, Highmark Blue Cross Blue Shield, Optum, HealthChoices Berks, UPMC Commercial plans and UPMC CHIP plans. Coverage varies, so it's worth checking your deductible, copay and coinsurance with your plan.",
      },
      {
        id: "self-pay",
        q: "What if you're out of network with my plan?",
        a: "I offer self-pay rates, and I can provide a superbill you can submit to your insurance for possible out-of-network reimbursement. Ask me for current self-pay rates.",
      },
      {
        id: "keegan",
        q: "Is there help with the cost of grief therapy for parents who've lost a baby?",
        a: "Yes. Through the Keegan Cares partnership with the Adalyn Rose Foundation, funded therapy is available for parents grieving a baby lost during pregnancy, infancy or early childhood. Reach out to me, or complete the program's referral form.",
      },
    ],
  },
  {
    id: "pros",
    label: "For professionals",
    items: [
      {
        id: "supervision",
        q: "Do you offer clinical supervision?",
        a: "Yes, for licensed social workers (LSWs) in Pennsylvania. Individual supervision is $70; group supervision is $55 and only runs when a group forms. Supervision toward the LCSW is currently unavailable. Send a note through the contact form to check for openings.",
      },
      {
        id: "consult",
        q: "Do you consult with schools or other clinicians?",
        a: "Yes. I offer clinical consultation, school and organizational consultation, and custom training on ADHD, neurodiversity, trauma-informed care and emotional regulation. See Consultation + Education for details and rates.",
      },
    ],
  },
  {
    id: "clients",
    label: "Current clients",
    items: [
      {
        id: "portal",
        q: "I'm already a client. How do I reschedule or send a message?",
        a: "Sign in to the client portal on Jane (the 'Client portal' button at the top of every page). Scheduling, forms and secure messages all live there.",
      },
      {
        id: "portal-help",
        q: "I can't get into the portal. What now?",
        a: "Use the 'Forgot password' link on the Jane sign-in page first. If you're still stuck, text me and I'll help.",
      },
    ],
  },
];

export const allFaqItems = faqCategories.flatMap((c) => c.items);
