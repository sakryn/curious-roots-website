/**
 * FAQ content. Anything in [BRACKETS] still needs Sarah's confirmation and is
 * highlighted on the page until it's replaced.
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
    id: "fit",
    label: "Is this a fit?",
    items: [
      {
        id: "fit-who",
        q: "Who do you work with?",
        a: "Children, teens, adults and families. Most of my work centers on trauma, ADHD, autism and other kinds of neurodivergence, grief and loss, and emotional regulation.",
      },
      {
        id: "fit-ages",
        q: "What ages do you see?",
        a: "Kids, teens and adults. [CONFIRM youngest age Sarah sees.]",
      },
      {
        id: "nd-diagnosis",
        q: "Do I need an ADHD or autism diagnosis to work with you?",
        a: "No. Plenty of people come to me wondering, not knowing. [CONFIRM whether Sarah offers diagnostic assessment or refers out.]",
      },
      {
        id: "nd-affirming",
        q: "What does neurodivergent-affirming actually mean?",
        a: "It means I'm not trying to make you or your child act more typical. We work on what's genuinely hard, like overwhelm, burnout, or relationships, and we keep what works about the way your brain does things.",
      },
      {
        id: "trauma-look",
        q: "What does trauma therapy with you look like?",
        a: "Slower than people expect, in a good way. We build steadiness first and only move toward hard memories when your nervous system is ready. You set the pace.",
      },
    ],
  },
  {
    id: "start",
    label: "Getting started",
    items: [
      {
        id: "start",
        q: "How do I get started?",
        a: "Send a request through the secure appointment form. I read every request myself and I'll reach out about next steps. Nobody gets booked automatically.",
      },
      {
        id: "waitlist",
        q: "Is there a waitlist?",
        a: "Sometimes. The availability panel on the homepage always shows where things stand, and I keep it current.",
      },
      {
        id: "email",
        q: "Can I just email you instead?",
        a: "Please use the secure request form. Regular email isn't a good place for personal health information, and the form gets your request to me safely.",
      },
    ],
  },
  {
    id: "cost",
    label: "Cost + insurance",
    items: [
      { id: "insurance", q: "Do you take insurance?", a: "[CONFIRM insurance participation and out-of-network options with Sarah.]" },
      { id: "fees", q: "What are your fees?", a: "[CONFIRM session fees and accepted payment methods with Sarah.]" },
    ],
  },
  {
    id: "sessions",
    label: "Sessions + location",
    items: [
      { id: "telehealth", q: "Do you offer telehealth?", a: "[CONFIRM telehealth availability and states served.]" },
      { id: "in-person", q: "Do you offer in-person sessions?", a: "[CONFIRM in-person availability.] My office is at 4453 Penn Ave, Suite 4, in Sinking Spring." },
      { id: "location", q: "Where is your office?", a: "4453 Penn Ave, Suite 4, Sinking Spring, PA 19608." },
    ],
  },
  {
    id: "clients",
    label: "Current clients",
    items: [
      {
        id: "portal",
        q: "I'm already a client. How do I reschedule or send a message?",
        a: "Use the patient portal. It's where scheduling, forms and secure messages all live.",
      },
      { id: "portal-help", q: "I can't get into the portal. What now?", a: "[CONFIRM portal support process with Sarah.]" },
    ],
  },
];

export const allFaqItems = faqCategories.flatMap((c) => c.items);
