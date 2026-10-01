/**
 * Every button and link on the site points at one of these keys.
 *
 * To go live: fill in `href`. That's it. The <Action> component renders a real
 * link as soon as an href exists and `site.prototypeMode` is false.
 *
 * `prototypeNote` is what Sarah sees when she taps the button in the prototype.
 */
export type LinkKey =
  | "requestAppointment"
  | "patientPortal"
  | "meetSarah"
  | "home"
  | "therapy"
  | "neurodivergence"
  | "trauma"
  | "childrenFamilies"
  | "grief"
  | "about"
  | "partnerships"
  | "faq"
  | "consultation"
  | "privacy"
  | "accessibility"
  | "terms"
  | "partnerAdalynRose"
  | "partnerCatapallo";

export interface LinkTarget {
  /** Where this goes once live. `null` = not decided yet. */
  href: string | null;
  /** Opens in a new tab (EHR, partner sites). */
  external?: boolean;
  /** Analytics event name, used by src/lib/analytics.ts. */
  event: string;
  /** What the prototype tells Sarah this button will do. */
  prototypeNote: string;
}

export const links: Record<LinkKey, LinkTarget> = {
  requestAppointment: {
    href: null, // e.g. the EHR's secure intake / appointment-request URL
    external: true,
    event: "cta_request_appointment",
    prototypeNote:
      "Opens your secure intake form in your EHR. Requests land with you for review; nobody books themselves into your calendar.",
  },
  patientPortal: {
    href: null, // e.g. the EHR's client portal login URL
    external: true,
    event: "cta_patient_portal",
    prototypeNote: "Opens your EHR's client portal login.",
  },
  meetSarah: { href: "/about", event: "nav_about", prototypeNote: "Goes to your full About page." },
  home: { href: "/", event: "nav_home", prototypeNote: "Goes to the homepage." },
  therapy: { href: "/therapy", event: "nav_therapy", prototypeNote: "Goes to the Therapy overview page." },
  neurodivergence: {
    href: "/adhd-autism-neurodivergence",
    event: "nav_neurodivergence",
    prototypeNote: "Goes to the ADHD + autism page.",
  },
  trauma: { href: "/trauma-therapy", event: "nav_trauma", prototypeNote: "Goes to the trauma therapy page." },
  childrenFamilies: {
    href: "/children-teens-families",
    event: "nav_children",
    prototypeNote: "Goes to the children, teens + families page.",
  },
  grief: { href: "/grief", event: "nav_grief", prototypeNote: "Goes to the grief + transitions page." },
  about: { href: "/about", event: "nav_about", prototypeNote: "Goes to your full About page." },
  partnerships: { href: "/partnerships", event: "nav_partnerships", prototypeNote: "Goes to the Partnerships page." },
  faq: { href: "/faq", event: "nav_faq", prototypeNote: "Goes to the full FAQ page." },
  consultation: {
    href: "/consultation-training",
    event: "nav_consultation",
    prototypeNote: "Goes to the Education + Consultation page, separate from therapy intake.",
  },
  privacy: { href: null, event: "nav_privacy", prototypeNote: "Privacy policy page (copy pending review)." },
  accessibility: {
    href: null,
    event: "nav_accessibility",
    prototypeNote: "Accessibility statement page (copy pending review).",
  },
  terms: { href: null, event: "nav_terms", prototypeNote: "Terms + website disclaimer page (copy pending review)." },
  partnerAdalynRose: {
    href: null,
    external: true,
    event: "partner_adalyn_rose",
    prototypeNote: "Opens the Adalyn Rose Foundation / Keegan Cares website.",
  },
  partnerCatapallo: {
    href: "https://www.catapallovr.com",
    external: true,
    event: "partner_catapallovr",
    prototypeNote: "Opens the CatapalloVR website.",
  },
};
