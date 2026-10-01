import type { LinkKey } from "@/config/links";

/**
 * The four reasons people usually find Sarah.
 * Each has an engraved emblem (a quiet botanical metaphor) and a plant
 * used where a smaller mark is needed.
 */
export type { PlantKind as FlowerKind } from "@/components/botanicals/Wildflowers";
import type { PlantKind as FlowerKind } from "@/components/botanicals/Wildflowers";
import type { EmblemKind } from "@/components/botanicals/Emblems";

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
    sessions: { title: string; body: string }[];
    faqIds: string[];
  };
}

export const specialties: Specialty[] = [
  {
    id: "trauma",
    link: "trauma",
    flower: "fern",
    emblem: "nerve",
    caption: "Root and nerve",
    title: "Trauma + the nervous system",
    hook: "For when your body is still reacting to something your mind knows is over.",
    detail:
      "We work with what your nervous system is doing now, not only the story of what happened. Talking is part of it. So is noticing, pacing, and building a steadiness you can actually feel.",
    forYouIf: [
      "You startle, shut down, or snap, and you're not always sure why",
      "You've done talk therapy before and it only went so far",
      "You want to understand your reactions, not just manage them",
    ],
    page: {
      slug: "trauma-therapy",
      metaTitle: "Trauma therapy in Sinking Spring, PA",
      metaDescription:
        "Trauma-informed, nervous-system-aware therapy with Sarah Snyder for children, teens, adults and families in Sinking Spring, Pennsylvania.",
      heading: "Trauma lives in the body, so that's where we start.",
      sessions: [
        { title: "Steadiness first", body: "Before we go anywhere hard, we build ways to come back to calm that actually work for you." },
        { title: "Your pace", body: "You decide how close we get to difficult memories, and when. 'Not today' is always an answer." },
        { title: "Body and story", body: "We pay attention to what happens in your body as we talk, and use it as information." },
      ],
      faqIds: ["trauma-look", "start", "fit-ages"],
    },
  },
  {
    id: "neurodivergence",
    link: "neurodivergence",
    flower: "bell",
    emblem: "network",
    caption: "Leaf skeleton, every path connected",
    title: "ADHD + autism",
    hook: "Your brain isn't a problem to fix. It's a brain to understand.",
    detail:
      "I'm neurodivergent-affirming, which means we're not trying to make you look more typical. We figure out how your brain works, what it needs, and how to build a life that fits it.",
    forYouIf: [
      "You were diagnosed recently, or you've started to wonder",
      "You're worn out from masking at work, school, or home",
      "Your kid's teachers see a behavior problem and you see a kid who's overwhelmed",
    ],
    page: {
      slug: "adhd-autism-neurodivergence",
      metaTitle: "ADHD + autism therapy in Sinking Spring, PA",
      metaDescription:
        "Neurodivergent-affirming therapy for ADHD and autism with Sarah Snyder, for kids, teens, adults and families in Sinking Spring, Pennsylvania.",
      heading: "Different wiring. Not wrong wiring.",
      sessions: [
        { title: "Fidgeting welcome", body: "Move, doodle, pace, take breaks. Your brain gets to show up the way it does." },
        { title: "Real-life tools", body: "We build systems for the things that are actually hard: overwhelm, transitions, burnout, follow-through." },
        { title: "Unmasking, gently", body: "We make room to figure out which coping strategies serve you and which ones cost too much." },
      ],
      faqIds: ["nd-diagnosis", "nd-affirming", "fit-ages"],
    },
  },
  {
    id: "families",
    link: "childrenFamilies",
    flower: "umbel",
    emblem: "kin",
    caption: "Three stems, one root",
    title: "Children, teens + families",
    hook: "Kids don't need to sit still to do good work.",
    detail:
      "Sessions with younger clients often involve play, movement, and a lot of curiosity. When it helps, parents are part of the work, so what we practice in my office has somewhere to go at home.",
    forYouIf: [
      "Your child's big feelings are running the household",
      "Your teen will talk, just not to you right now",
      "You want parenting support that fits the kid you actually have",
    ],
    page: {
      slug: "children-teens-families",
      metaTitle: "Therapy for children, teens + families in Sinking Spring, PA",
      metaDescription:
        "Therapy for children, teens and families with Sarah Snyder in Sinking Spring, Pennsylvania. Trauma-informed, neurodivergent-affirming, and parent-inclusive.",
      heading: "Help for the kid, and for the people who love them.",
      sessions: [
        { title: "Play is the work", body: "With younger kids, play and movement are how we get to the real stuff." },
        { title: "Teens get respect", body: "Teens get their own space and a real say in what we work on." },
        { title: "Parents in the loop", body: "You'll get practical ways to support what we're building, without losing your kid's trust." },
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
    hook: "Loss doesn't follow the five stages in order.",
    detail:
      "Grief shows up sideways: in sleep, in anger, in a sudden need to reorganize every closet. I help children and adults carry loss in a way that still leaves room for the rest of life.",
    forYouIf: [
      "Someone important died, recently or years ago",
      "A child in your family is grieving and you're not sure how to help",
      "A big change has knocked everything loose",
    ],
    page: {
      slug: "grief",
      metaTitle: "Grief counseling in Sinking Spring, PA",
      metaDescription:
        "Grief and loss therapy for children, teens, adults and families with Sarah Snyder in Sinking Spring, Pennsylvania.",
      heading: "There's no right way to grieve. There are kinder ways to carry it.",
      sessions: [
        { title: "No timeline", body: "Whether the loss was last month or ten years ago, it counts." },
        { title: "Kids grieve differently", body: "Children often grieve in bursts and through play. I help families understand what they're seeing." },
        { title: "Room for both", body: "We make space for the loss and for the parts of life that keep going." },
      ],
      faqIds: ["start", "fit-ages", "fit-who"],
    },
  },
];
