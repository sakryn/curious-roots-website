import type { LinkKey } from "@/config/links";

/**
 * Homepage copy, built from Sarah's current site and her own words.
 * Edit freely: every line on the homepage lives in this file.
 */

export const hero = {
  kicker: "Curious Roots Wellness · Sarah Snyder, LCSW",
  headline: ["Healing from", "the roots up."],
  sub: "Trauma-informed, neurodivergent-affirming therapy for children, teens and adults.",
  support:
    "Therapy here is about more than managing symptoms. Together we get curious about the roots: how what you've lived through shows up in your mind, your body, your relationships and your everyday life. Then we build practical tools for change.",
  where: "In person in Sinking Spring, PA, and by telehealth anywhere in Pennsylvania.",
  primary: { label: "New here? Book now", link: "requestAppointment" as LinkKey },
  secondary: { label: "Meet Sarah", link: "meetSarah" as LinkKey },
};

export const fit = {
  heading: "Support for where you are right now.",
  intro: "Most people find me for one of these. Plenty arrive with more than one, and that's okay.",
  forYouIfLabel: "This might be for you if",
  also: "I also help with anxiety and emotional overwhelm, depression and mood, self-esteem, stress and burnout, and feeling stuck.",
};

export const looks = {
  label: "What therapy can look like",
  heading: "Therapy doesn't have to look one way.",
  intro: "Depending on what you need, our work together may include:",
  closing: "Your therapy should fit you, not the other way around.",
  items: [
    { title: "Understanding your nervous system", body: "Why your body reacts the way it does, and how to work with it instead of against it." },
    { title: "ADHD + executive functioning strategies", body: "Systems for time, focus, follow-through and overwhelm that fit how your brain actually works." },
    { title: "Self-understanding + self-compassion", body: "Trading the inner critic for curiosity about why you do what you do." },
    { title: "Emotional regulation skills", body: "Ways to ride out big feelings without being swept away by them." },
    { title: "Mindfulness + grounding", body: "Small, doable ways to come back to the present when things feel like too much." },
    { title: "Processing difficult experiences", body: "At your pace, once there's enough steadiness to do it safely." },
    { title: "Practical tools for everyday life", body: "Something to try on Tuesday, not only insight." },
    { title: "Exploring patterns + triggers", body: "Noticing what sets things off, and the old survival strategies underneath." },
    { title: "Body-based, somatic approaches", body: "Breath, movement and noticing, because healing isn't only a thinking exercise." },
    { title: "Relationships + communication", body: "Saying what you need, setting boundaries, and feeling more connected." },
  ],
};

export const about = {
  heading: "Hi, I'm Sarah. I'm so glad you're here.",
  paragraphs: [
    "If you've found your way here, something may feel heavy, uncertain or overwhelming right now. You don't have to carry it alone. I created Curious Roots to be a place where you can take a deep breath, where you don't need to have everything figured out, and where therapy feels human instead of cold or clinical.",
    "I'm also a therapist with ADHD. I wasn't diagnosed until I was 20, after years of being told to try harder and stop talking. So when I say I'm neurodivergent-affirming, I mean it personally as well as professionally.",
  ],
  promises: [
    { title: "Fidgeting welcome", body: "Bring the fidget, the snack, the restless leg." },
    { title: "Your pace", body: "'Not today' is always an answer." },
    { title: "No one-size-fits-all", body: "We tailor the work to you, not the other way around." },
  ],
  credentialsLabel: "Credentials + training",
  link: { label: "More about me", link: "about" as LinkKey },
};

export const approach = {
  heading: "How I work",
  center: "Curiosity, compassion + collaboration.",
  nodes: [
    { id: "trauma", title: "Trauma-informed", body: "Safety, choice and pacing come first. You lead; I follow your nervous system's cues." },
    { id: "nd", title: "Neurodivergent-affirming", body: "We build a life that fits your brain, not one that makes you look more typical." },
    { id: "relational", title: "Collaborative", body: "Genuine and rooted in trust. I bring the clinical knowledge; you're the expert on you." },
    { id: "practical", title: "Practical", body: "You leave with real tools for home, school, work and relationships." },
    { id: "nervous", title: "Body-aware", body: "Somatic, mindfulness-based work alongside the talking." },
    { id: "individual", title: "Tailored", body: "I draw on ACT, CBT, IFS-informed and person-centered approaches, chosen for you." },
  ],
};

export const steps = {
  heading: "What happens when you reach out",
  intro: "No phone tag, no mystery. Here's the whole path.",
  items: [
    {
      title: "Take a look around",
      body: "If something here sounds like you, that's usually a good sign. You don't need to know exactly what you need.",
      note: null as string | null,
    },
    {
      title: "Book, text or send a note",
      body: "Book a first appointment through Jane, text my line, or send a note through the contact form. Whatever's easiest for you.",
      note: null as string | null,
    },
    {
      title: "I follow up personally",
      body: "I read every message myself and will get back to you personally.",
      note: null as string | null,
    },
    {
      title: "We begin",
      body: "Your paperwork, scheduling and secure messages all live in the Jane client portal from there.",
      note: null as string | null,
    },
  ],
};

export const frontDesk = {
  heading: "Where things stand",
  availabilityLabel: "Current availability",
  demoLabel: "Demo states",
  demoHint: "",
  portal: {
    heading: "Already working with me?",
    body: "Everything between sessions lives in one secure place on Jane.",
    features: ["Schedule or reschedule", "Fill out paperwork", "Send a secure message"],
    cta: { label: "Sign in to the client portal", link: "patientPortal" as LinkKey },
  },
};

export const partnershipsCopy = {
  heading: "People I partner with",
  intro: "A few organizations whose work overlaps with mine. Each partnership exists because it helps the people I see.",
};

export const faqCopy = {
  heading: "Questions people usually ask",
  intro: "If yours isn't here, text me or send a note. Questions are always fair game.",
};

export const location = {
  heading: "Finding me",
  officeLabel: "Office",
  textLabel: "Text line",
  faxLabel: "Fax",
  hoursLabel: "Hours",
};

export const education = {
  heading: "Specialized support beyond the therapy room.",
  body: "I also consult with clinicians, schools and organizations about ADHD, neurodivergence and trauma, and support parents and adults who want practical, everyday strategies.",
  offerings: [
    { title: "Clinical consultation", body: "For mental health professionals: case conceptualization, assessment and ADHD-focused services." },
    { title: "School + organizational consultation", body: "Staff consultation, student support and professional development." },
    { title: "ADHD education + parent support", body: "Practical strategies for routines, regulation, school, work and relationships." },
    { title: "Custom training", body: "ADHD, neurodiversity, trauma-informed care and emotional regulation for your team." },
  ],
  cta: { label: "Explore consultation + education", link: "consultation" as LinkKey },
};
