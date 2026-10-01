import type { LinkKey } from "@/config/links";

/**
 * Homepage copy, written in Sarah's voice.
 * DRAFT: Sarah should read every line and change anything that doesn't
 * sound like her. Nothing here states a fact about her history or training.
 */

export const hero = {
  headline: ["Healing from", "the roots up."],
  sub: "Trauma-informed, neurodivergent-affirming therapy with Sarah Snyder in Sinking Spring, Pennsylvania.",
  support:
    "I work with kids, teens, adults and families who are sorting through trauma, ADHD, autism, grief, and the big feelings that tend to come along with all of it.",
  primary: { label: "Request an appointment", link: "requestAppointment" as LinkKey },
  secondary: { label: "Meet Sarah", link: "meetSarah" as LinkKey },
};

export const fit = {
  heading: "Is this the kind of therapy you're looking for?",
  intro: "Most people find me for one of these four reasons. Plenty arrive with more than one.",
  forYouIfLabel: "This might be for you if",
};

export const about = {
  heading: "Hi, I'm Sarah.",
  paragraphs: [
    "I started Curious Roots because I kept meeting people who had been told, one way or another, that they were too much. Too sensitive, too distracted, too stuck. Most of them weren't any of those things. They were having very reasonable reactions to brains and histories nobody had taken the time to understand.",
    "So that's where I start: curious, not corrective. I pay close attention to what your nervous system is telling us, I'm comfortable with tangents (some of the best work happens there), and I'll be honest with you about what I'm noticing.",
  ],
  promises: [
    { title: "Fidgeting welcome", body: "Bring the fidget, the snack, the restless leg." },
    { title: "Breaks are fine", body: "Need a minute? Take it. No explanation required." },
    { title: "Ask me anything", body: "Questions about how therapy works are always fair game." },
  ],
  credentialsLabel: "The formal stuff",
  link: { label: "More about me", link: "about" as LinkKey },
};

export const approach = {
  heading: "How I work",
  center: "There isn't one right way for a brain or a nervous system to work.",
  nodes: [
    { id: "trauma", title: "Trauma-informed", body: "We go at a pace your body can handle. 'Not today' is always allowed." },
    { id: "nd", title: "Neurodivergent-affirming", body: "Different isn't broken. We build around how you actually work." },
    { id: "relational", title: "Relational", body: "The relationship is part of the work, so I show up as a real person." },
    { id: "practical", title: "Practical", body: "You leave with something to try on Tuesday, not only insight." },
    { id: "nervous", title: "Nervous-system aware", body: "We notice what your body is doing, then work with it." },
    { id: "individual", title: "Individualized", body: "No script. The plan fits your age, your family, your goals." },
  ],
};

export const steps = {
  heading: "What happens after you reach out",
  intro: "No mystery, and no automatic booking. Here's the whole path.",
  items: [
    {
      title: "See if we're a fit",
      body: "Look around. If something here sounds like you, that's usually a good sign.",
      note: null as string | null,
    },
    {
      title: "Request an appointment",
      body: "A short, secure form. It goes to my practice system, not an inbox.",
      note: "Connects to your EHR's secure intake form.",
    },
    {
      title: "I review every request",
      body: "I read what you share myself. If I'm the right fit, I'll reach out personally to set things up.",
      note: "You stay in control. Requests wait for your review; nothing books itself.",
    },
    {
      title: "We begin",
      body: "Scheduling, paperwork and secure messages all live in the client portal from here.",
      note: "Hands off to your EHR's patient portal.",
    },
  ],
};

export const frontDesk = {
  heading: "Where things stand",
  availabilityLabel: "Current availability",
  demoLabel: "Demo states",
  demoHint: "Prototype preview. Tap to see each version. Sarah changes this with one word in the settings file.",
  portal: {
    heading: "Already working with me?",
    body: "Everything between sessions lives in one secure place.",
    features: ["Schedule or reschedule", "Fill out paperwork", "Send a secure message"],
    cta: { label: "Open the patient portal", link: "patientPortal" as LinkKey },
  },
};

export const partnershipsCopy = {
  heading: "People I partner with",
  intro: "A few organizations whose work overlaps with mine. Each partnership exists because it helps the people I see.",
};

export const faqCopy = {
  heading: "Questions people usually ask",
  intro: "If yours isn't here, it can go in your appointment request.",
};

export const location = {
  heading: "Finding me",
  officeLabel: "Office",
  faxLabel: "Fax",
  privacyHeading: "Why there's no email or phone number here",
  privacyBody:
    "So your private information goes through a secure channel from the very first message. The request form gets to me just as quickly.",
};

export const education = {
  heading: "Looking for consultation or training?",
  body: "I also work with clinicians, schools and organizations who want to understand ADHD and neurodivergence better, and with parents who could use a thinking partner.",
  offerings: [
    { title: "Professional consultation", body: "Case consultation for clinicians and helping professionals." },
    { title: "ADHD + neurodiversity education", body: "Clear, practical teaching without the jargon." },
    { title: "Parent support", body: "For parents who want a plan that fits their particular kid." },
    { title: "Custom training", body: "Built for schools and organizations, around your real situations." },
  ],
  cta: { label: "Explore education + consultation", link: "consultation" as LinkKey },
};
