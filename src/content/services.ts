/**
 * Services, about-page and consultation content, drawn from Sarah's current site.
 */

export const services = {
  heading: "Therapy that starts with understanding, not judgment.",
  intro:
    "Whether you're facing ADHD, anxiety, trauma, grief, emotional overwhelm, family challenges or a big life transition, the work is collaborative, individualized, and rooted in your brain, your body and what you've lived through. You don't need to know what you need before reaching out.",
  individual: {
    label: "Individual therapy",
    heading: "Therapy isn't about becoming someone else.",
    body: "It's about understanding yourself more deeply and getting support for the changes you want to make. I work with children, adolescents, teens and adults.",
    concernsTitle: "People come in for",
    concerns: [
      "Anxiety + chronic worry",
      "Emotional overwhelm + regulation",
      "Depression + mood",
      "ADHD + executive functioning",
      "Self-esteem",
      "Life transitions",
      "Relationships + communication",
      "Stress + burnout",
      "Trauma",
      "Grief + loss",
      "Feeling stuck or disconnected from yourself",
    ],
    modalitiesTitle: "Approaches I draw from",
    modalitiesIntro: "Chosen for you, not off a script. In plain language:",
    modalities: [
      { name: "Trauma-informed care", plain: "Safety, choice and your pace come first." },
      { name: "Somatic approaches", plain: "Working with the body, not just the thoughts." },
      { name: "Mindfulness-based", plain: "Noticing the present moment without judging it." },
      { name: "ACT", plain: "Acceptance + Commitment Therapy: making room for hard feelings while moving toward what matters." },
      { name: "CBT", plain: "Cognitive Behavioral Therapy: noticing how thoughts, feelings and actions feed each other." },
      { name: "IFS-informed", plain: "Getting to know the different 'parts' of you, with compassion." },
      { name: "Person-centered", plain: "You're the expert on your life. I follow your lead." },
    ],
  },
  insurance: {
    label: "Insurance + payment",
    heading: "Paying for therapy, plainly.",
    body: "I work with a range of insurance plans and also offer self-pay. Coverage varies by plan, so it's worth confirming your deductible, copay and coinsurance with your insurance company. I'm happy to help you figure out what to ask.",
    inNetworkTitle: "In network with",
    selfPay: "Self-pay rates available",
    superbill: "Out of network? I can provide a superbill for possible reimbursement.",
    assessment: { label: "ADHD clinical assessment", price: "$350", note: "90-min assessment + 60-min feedback" },
  },
  keegan: {
    label: "Keegan Cares partnership",
    heading: "Funded grief therapy for parents.",
    body: "Through the Adalyn Rose Foundation, Keegan Cares offers funded therapy for parents grieving a baby lost during pregnancy, infancy or early childhood, so cost isn't a barrier to support. Reach out to me directly, or complete the referral form through the program.",
  },
  notSure: {
    heading: "Not sure which service is right for you? That's okay.",
    body: "You don't have to diagnose yourself or have a plan. Tell me a little about what's going on and I'll suggest a next step.",
  },
};

export const aboutPage = {
  heading: "Meet Sarah.",
  intro: "Therapy should be a place to slow down, feel supported, and be fully yourself.",
  card: {
    heading: "The person you'd be working with.",
    paragraphs: [
      "I'm Sarah Snyder, a Licensed Clinical Social Worker and the founder of Curious Roots Wellness. I work with children, teens, adults and families, with specialized training in trauma, ADHD and child and adolescent grief.",
      "You can see me in person at my office in the Tollhouse Shops in Sinking Spring, or by telehealth from anywhere in Pennsylvania.",
    ],
  },
  approach: {
    label: "My approach",
    heading: "Curiosity, compassion + collaboration.",
    paragraphs: [
      "My approach is rooted in curiosity, compassion and collaboration. We explore how past experiences and nervous system patterns shape the present, so healing can happen from the roots up.",
      "I work with children, adolescents and adults navigating trauma, ADHD and life transitions, and I tailor therapy to each person's pace and needs. The focus is on understanding your experiences, strengthening your connection with yourself, and supporting your growth.",
      "Above all, I want to help you reconnect with yourself and move forward with greater clarity, steadiness and self-trust.",
    ],
  },
  letter: {
    label: "The heart behind Curious Roots",
    paragraphs: [
      "Hi, I'm Sarah. I'm so glad you're here.",
      "If you've found your way to this page, it may be because something feels heavy, uncertain or overwhelming right now. Wherever you are in your journey, I want you to know you don't have to carry it alone.",
      "I created Curious Roots Wellness to be more than a therapy practice. I wanted it to be a space where you can take a deep breath, where you don't need to have everything figured out, and where therapy feels human instead of cold or clinical.",
      "So many of us spend our energy just getting through the day or managing symptoms. But lasting healing often starts when we get curious about what lies beneath the surface.",
      "I'm not here to tell you who to be. I'm here to help you understand your story, recognize the patterns that once helped you survive, and find ways forward that feel authentic and aligned.",
      "Therapy should be collaborative, genuine and rooted in trust. I bring clinical knowledge, curiosity and compassion, and I tailor the work to you rather than handing you a one-size-fits-all plan.",
      "Whether you're new to therapy or coming back to it, thank you for being here. I hope this is the beginning of something meaningful.",
    ],
    signoff: "Sarah",
  },
  story: {
    label: "A little more about me",
    heading: "A therapist with ADHD.",
    paragraphs: [
      "I'm open about this because it matters: I'm a therapist with ADHD, and I wasn't diagnosed until I was 20. Growing up I was the talkative, dramatic, task-avoidant kid who kept hearing 'she just needs to try harder' and 'she just needs to stop talking.'",
      "Then I got to college, did everything I was supposed to do, and nothing clicked. Getting diagnosed changed how I understood myself. I went on to finish school with top grades, and now I run my own practice.",
      "So when you tell me that 'just try harder' never worked for you, I believe you. I have the education and the certifications, and I also have the lived experience.",
      "I'm also a big reader, which may be why this site looks a little like an old botanical field guide. Books are comfort to me, and I want this practice to feel the same way: cozy, curious and safe.",
    ],
  },
  specialtiesTitle: "Specialties",
  specialties: [
    "Neurodivergence",
    "ADHD",
    "Trauma",
    "Anxiety",
    "Depression",
    "Somatic work",
    "Grief + loss",
    "Self-harm",
    "Suicidal ideation",
    "Self-esteem",
    "Behavioral concerns",
    "Emotional regulation",
    "Life transitions",
    "Mood-related disorders",
  ],
};

export interface Offering {
  title: string;
  price: string;
  format: string;
  who: string;
  body: string;
}

export const consultation = {
  heading: "Consultation + Education",
  intro: "Specialized support beyond the therapy room: for clinicians, schools and organizations, and for parents and adults who want practical, everyday strategies.",
  howLabel: "What does this look like?",
  howBody: "It can be a single conversation, ongoing support, or something built around your needs.",
  groups: [
    {
      id: "clinical",
      label: "Clinical consultation",
      audience: "For mental health professionals",
      summary:
        "Support with ADHD, neurodivergence, trauma, emotional regulation, assessment and complex clinical presentations: case conceptualization, assessment considerations, treatment planning, neurodivergent-affirming practice, and building ADHD-focused services.",
      flower: "lilac" as const,
      offerings: [
        { title: "ADHD Clinical Consultation", price: "$125", format: "60 minutes", who: "Clinicians", body: "Case conceptualization, treatment planning, ADHD presentations and neurodivergent-affirming care." },
        { title: "ADHD Assessment Consultation", price: "$150", format: "60 minutes", who: "Clinicians", body: "Assessment processes, clinical and differential considerations, documentation and feedback." },
        { title: "Practice Consultation", price: "$175", format: "60 minutes", who: "Clinicians", body: "Developing or expanding ADHD-focused services within your practice." },
      ] as Offering[],
    },
    {
      id: "parents",
      label: "ADHD education + parent support",
      audience: "For parents, caregivers and adults",
      summary:
        "Practical strategies for executive functioning, emotional regulation, routines, school or work challenges and relationships, built to fit everyday life.",
      flower: "daisy" as const,
      offerings: [
        { title: "ADHD Parent Consultation", price: "$125", format: "60 minutes", who: "Parents + caregivers", body: "Understanding your child's ADHD, with strategies for home, school, routines and emotional regulation." },
        { title: "ADHD Parent Support Package", price: "$325", format: "3 sessions", who: "Parents + caregivers", body: "Education, individualized strategies and follow-up support." },
        { title: "Adult ADHD Consultation + Psychoeducation", price: "$125", format: "60 minutes", who: "Adults", body: "Executive functioning, emotional regulation, work, relationships and daily life." },
      ] as Offering[],
    },
    {
      id: "schools",
      label: "School + organizational consultation",
      audience: "For schools and organizations",
      summary:
        "Support around ADHD, neurodivergence, emotional regulation and complex behavioral or emotional presentations: staff consultation, student support, professional development and customized training.",
      flower: "dandelion" as const,
      offerings: [
        { title: "ADHD + Neurodiversity Consultation", price: "$150", format: "60 minutes", who: "Schools + organizations", body: "Student needs, executive functioning, emotional regulation and neurodivergent presentations." },
        { title: "Staff Consultation", price: "$150", format: "60 minutes", who: "Schools + organizations", body: "Collaborating on student needs, behavioral or emotional concerns, and strategies for staff." },
        { title: "Training + Professional Development", price: "Custom", format: "Built for you", who: "Schools, organizations + teams", body: "ADHD, neurodiversity, trauma-informed care, emotional regulation and related topics." },
      ] as Offering[],
    },
  ],
  supervision: {
    label: "Clinical supervision",
    heading: "Supervision that builds confidence.",
    body: "Collaborative, supportive, trauma-informed and curious rather than judgmental. Supervision focuses on clinical confidence, professional identity, case conceptualization and growth beyond your training.",
    interests: [
      "Trauma-informed practice",
      "Neurodivergence + ADHD",
      "Child + adolescent mental health",
      "Somatic approaches",
      "Clinical conceptualization",
      "Ethical decision-making",
      "Professional development",
    ],
    rates: [
      { title: "Individual supervision", price: "$70" },
      { title: "Group supervision", price: "$55", note: "When a group forms" },
    ],
    notice: "For licensed social workers (LSWs) in Pennsylvania. LCSW supervision is currently unavailable.",
  },
  notSure: {
    heading: "Not sure what you need? That's okay.",
    body: "Services can be tailored. Reach out and we'll figure out the best fit together.",
  },
};
