import type { LinkKey } from "@/config/links";

/**
 * The four main reasons people find Sarah. Each has its own page.
 * Copy is drawn from Sarah's current Services page, in plain language.
 */
export type { PlantKind as FlowerKind } from "@/components/botanicals/Wildflowers";
import type { PlantKind as FlowerKind } from "@/components/botanicals/Wildflowers";
import type { EmblemKind } from "@/components/botanicals/Emblems";

export interface Feature {
  label: string;
  title: string;
  body: string;
  price?: string;
  priceNote?: string;
  steps: string[];
  cta?: { label: string; link: LinkKey };
}

export interface Specialty {
  id: string;
  link: LinkKey;
  flower: FlowerKind;
  emblem: EmblemKind;
  /** Plate caption under the emblem, field-guide style. */
  caption: string;
  title: string;
  /** One line. Shows on the card. */
  hook: string;
  /** Two or three sentences. Shows when expanded and on the specialty page. */
  detail: string;
  /** "This might be for you if..." */
  forYouIf: string[];
  /** Specialty page only. */
  page: {
    slug: string;
    metaTitle: string;
    metaDescription: string;
    heading: string;
    /** Big list panel: "What we can work on" */
    listTitle: string;
    list: string[];
    sessionsTitle: string;
    sessions: { title: string; body: string }[];
    feature?: Feature;
    faqIds: string[];
  };
}

export const specialties: Specialty[] = [
  {
    id: "neurodivergence",
    link: "neurodivergence",
    flower: "lilac",
    emblem: "network",
    caption: "Leaf skeleton, every path connected",
    title: "ADHD + neurodivergence",
    hook: "Your brain isn't a problem to fix. It's a brain to understand.",
    detail:
      "Strengths-based and affirming. We look at how your brain works, how your environment helps or gets in the way, and what supports would actually make life easier. The goal isn't to make you more neurotypical. It's a life that fits your brain.",
    forYouIf: [
      "You were diagnosed recently, or you've started to wonder",
      "You're worn out from masking, people-pleasing or burnout",
      "Your kid's teachers see a behavior problem and you see a kid who's overwhelmed",
    ],
    page: {
      slug: "adhd-neurodivergence",
      metaTitle: "ADHD therapy + assessment in Sinking Spring, PA",
      metaDescription:
        "Neurodivergent-affirming ADHD therapy and ADHD clinical assessments with Sarah Snyder, LCSW, ADHD-CCSP, in Sinking Spring, PA and by telehealth across Pennsylvania.",
      heading: "Different wiring. Not wrong wiring.",
      listTitle: "ADHD-informed therapy can help with",
      list: [
        "Executive functioning",
        "Organization + time management",
        "Emotional regulation",
        "Rejection sensitivity + self-esteem",
        "Burnout",
        "Masking + people-pleasing",
        "Finding and using your strengths",
        "Routines that are actually realistic",
        "Work, school, parenting + relationships",
        "Moving away from shame-based coping",
      ],
      sessionsTitle: "What sessions feel like",
      sessions: [
        { title: "Fidgeting welcome", body: "Move, doodle, pace, take breaks. Your brain gets to show up the way it does." },
        { title: "Real-life tools", body: "We build systems for the things that are actually hard: overwhelm, transitions, follow-through." },
        { title: "From someone who gets it", body: "I'm a therapist with ADHD myself. You won't have to explain why 'just try harder' never worked." },
      ],
      feature: {
        label: "ADHD clinical assessment",
        title: "A clear, thorough look at what's going on.",
        body: "A comprehensive assessment of symptoms, history and day-to-day functioning, and how they show up across the different areas of your life. You leave with answers and a plan.",
        price: "$350",
        priceNote: "90-minute assessment + 60-minute feedback session",
        steps: [
          "Diagnostic assessment",
          "Clinical interview + history",
          "Symptom + functioning review",
          "Standardized measures",
          "Diagnostic feedback",
          "Recommendations for next steps",
        ],
        cta: { label: "Ask about an assessment", link: "contact" },
      },
      faqIds: ["nd-diagnosis", "nd-affirming", "insurance"],
    },
  },
  {
    id: "trauma",
    link: "trauma",
    flower: "daisy",
    emblem: "nerve",
    caption: "Root and nerve",
    title: "Trauma + the nervous system",
    hook: "For when your body is still reacting to something your mind knows is over.",
    detail:
      "Trauma can show up in the body, in emotions, in relationships, in boundaries and in your sense of safety. We work at a pace you lead, with safety, choice and collaboration at the center, and we build steadiness before we go anywhere hard.",
    forYouIf: [
      "You startle, shut down or snap, and you're not always sure why",
      "You've done talk therapy before and it only went so far",
      "You want to understand your reactions, not just manage them",
    ],
    page: {
      slug: "trauma-therapy",
      metaTitle: "Trauma therapy in Sinking Spring, PA",
      metaDescription:
        "Trauma-informed, somatic, nervous-system-aware therapy with Sarah Snyder, LCSW, CCTP-II, in Sinking Spring, PA and by telehealth across Pennsylvania.",
      heading: "Trauma lives in the body, so that's where we start.",
      listTitle: "What we may draw on",
      list: [
        "Trauma-informed care",
        "Somatic, body-based approaches",
        "Mindfulness",
        "Nervous system regulation",
        "Parts-informed work",
        "Cognitive + behavioral strategies",
        "Grounding + coping skills",
      ],
      sessionsTitle: "How it unfolds",
      sessions: [
        { title: "A safe place first", body: "Before we go near hard memories, we build a safe space and coping skills you can feel working." },
        { title: "You set the pace", body: "You decide how close we get to difficult things, and when. 'Not today' is always an answer." },
        { title: "Body and story", body: "We notice what happens in your body as we talk, and use it as information, not something to push past." },
      ],
      faqIds: ["trauma-look", "start", "insurance"],
    },
  },
  {
    id: "families",
    link: "childrenFamilies",
    flower: "dandelion",
    emblem: "kin",
    caption: "Three stems, one root",
    title: "Children, teens + families",
    hook: "Behavior is communication. We get curious about what's underneath.",
    detail:
      "Kids and teens get a supportive space to build emotional awareness, coping skills, confidence and connection. Parents get non-judgmental support and realistic strategies, so what we practice has somewhere to go at home and at school.",
    forYouIf: [
      "Your child's big feelings are running the household",
      "Your teen will talk, just not to you right now",
      "You want parenting support that fits the kid you actually have",
    ],
    page: {
      slug: "children-teens-families",
      metaTitle: "Therapy for children, teens + families in Sinking Spring, PA",
      metaDescription:
        "Therapy for children, teens and families with Sarah Snyder, LCSW, in Sinking Spring, PA. Trauma-informed, neurodivergent-affirming and parent-inclusive.",
      heading: "Help for the kid, and for the people who love them.",
      listTitle: "Kids + teens come in for",
      list: [
        "Big emotions",
        "Anxiety",
        "ADHD",
        "Regulation difficulties",
        "School stress",
        "Behavioral concerns",
        "Self-esteem",
        "Grief",
        "Family changes",
        "Trauma",
        "Social difficulties",
      ],
      sessionsTitle: "Family therapy + parent support",
      sessions: [
        { title: "Parent-focused sessions", body: "Time just for you to understand what's going on and what helps." },
        { title: "Family sessions", body: "Strengthening connection and communication with everyone in the room." },
        { title: "Psychoeducation", body: "Plain-language explanations of what your child's brain and body are doing." },
        { title: "Strategies for home + school", body: "Practical, realistic tools you can actually use on a Tuesday night." },
      ],
      faqIds: ["fit-ages", "start", "nd-affirming"],
    },
  },
  {
    id: "grief",
    link: "grief",
    flower: "seedhead",
    emblem: "seasons",
    caption: "Seed, dormancy, return",
    title: "Grief + life transitions",
    hook: "Grief isn't only about death. Any big change can leave a loss behind.",
    detail:
      "Grief can come with changes in relationships, identity, expectations or the direction of your life. I make space for complicated feelings and the many ways grief shows up, for children, teens and adults.",
    forYouIf: [
      "Someone important died, recently or years ago",
      "A child in your family is grieving and you're not sure how to help",
      "A big change has knocked everything loose",
    ],
    page: {
      slug: "grief",
      metaTitle: "Grief counseling in Sinking Spring, PA",
      metaDescription:
        "Grief, loss and life-transition therapy for children, teens and adults with Sarah Snyder, LCSW, CGCS-CA, in Sinking Spring, PA.",
      heading: "There's no right way to grieve. There are kinder ways to carry it.",
      listTitle: "I support people through",
      list: [
        "Bereavement",
        "Family changes",
        "Divorce or separation",
        "Major life transitions",
        "Identity changes",
        "Relationship loss",
        "Unexpected changes",
        "Childhood + adolescent grief",
        "Grief that comes with understanding your neurodivergence later in life",
      ],
      sessionsTitle: "How we hold it",
      sessions: [
        { title: "No timeline", body: "Whether the loss was last month or ten years ago, it counts." },
        { title: "Kids grieve differently", body: "Children often grieve in bursts and through play. I help families understand what they're seeing." },
        { title: "Room for both", body: "We make space for the loss and for the parts of life that keep going." },
      ],
      faqIds: ["keegan", "start", "fit-who"],
    },
  },
];
