import { site } from "./site";

/**
 * Every button and link on the site points at one of these keys,
 * so a URL only ever needs changing in one place.
 */
export type LinkKey =
  | "requestAppointment"
  | "patientPortal"
  | "contact"
  | "waitlist"
  | "textLine"
  | "directions"
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
  | "insurance"
  | "consultation"
  | "privacy"
  | "accessibility"
  | "partnerAdalynRose"
  | "partnerCatapallo";

export interface LinkTarget {
  /** Where this goes. `null` = not decided yet (renders as a highlighted placeholder). */
  href: string | null;
  /** Opens in a new tab (Jane, partner sites). */
  external?: boolean;
  /** Analytics event name, used by src/lib/analytics.ts. */
  event: string;
  /** Only used if prototypeMode is switched back on. */
  prototypeNote: string;
}

export const links: Record<LinkKey, LinkTarget> = {
  requestAppointment: {
    href: site.jane,
    external: true,
    event: "cta_book",
    prototypeNote: "Opens Sarah's Jane booking site.",
  },
  patientPortal: {
    href: site.jane,
    external: true,
    event: "cta_client_portal",
    prototypeNote: "Opens Jane, where current clients sign in.",
  },
  contact: { href: "/contact", event: "nav_contact", prototypeNote: "Goes to the contact page." },
  waitlist: { href: "/contact#reach-out", event: "cta_waitlist", prototypeNote: "Goes to the contact + waitlist form." },
  textLine: { href: site.textLineHref, event: "cta_text_line", prototypeNote: "Opens a text message to Sarah." },
  directions: {
    href: site.mapsUrl,
    external: true,
    event: "cta_directions",
    prototypeNote: "Opens directions in Google Maps.",
  },
  meetSarah: { href: "/about", event: "nav_about", prototypeNote: "Goes to the About page." },
  home: { href: "/", event: "nav_home", prototypeNote: "Goes to the homepage." },
  therapy: { href: "/therapy", event: "nav_therapy", prototypeNote: "Goes to the Services page." },
  neurodivergence: {
    href: "/adhd-neurodivergence",
    event: "nav_neurodivergence",
    prototypeNote: "Goes to the ADHD + neurodivergence page.",
  },
  trauma: { href: "/trauma-therapy", event: "nav_trauma", prototypeNote: "Goes to the trauma therapy page." },
  childrenFamilies: {
    href: "/children-teens-families",
    event: "nav_children",
    prototypeNote: "Goes to the children, teens + families page.",
  },
  grief: { href: "/grief", event: "nav_grief", prototypeNote: "Goes to the grief + transitions page." },
  about: { href: "/about", event: "nav_about", prototypeNote: "Goes to the About page." },
  partnerships: { href: "/partnerships", event: "nav_partnerships", prototypeNote: "Goes to the Partnerships page." },
  faq: { href: "/faq", event: "nav_faq", prototypeNote: "Goes to the FAQ." },
  insurance: { href: "/therapy#insurance", event: "nav_insurance", prototypeNote: "Goes to insurance + rates." },
  consultation: {
    href: "/consultation-training",
    event: "nav_consultation",
    prototypeNote: "Goes to the Consultation + Education page.",
  },
  privacy: { href: "/privacy", event: "nav_privacy", prototypeNote: "Privacy page." },
  accessibility: { href: "/accessibility", event: "nav_accessibility", prototypeNote: "Accessibility page." },
  partnerAdalynRose: {
    href: "https://www.adalynrose.org",
    external: true,
    event: "partner_adalyn_rose",
    prototypeNote: "Opens the Adalyn Rose Foundation website.",
  },
  partnerCatapallo: {
    href: "https://www.catapallovr.com",
    external: true,
    event: "partner_catapallovr",
    prototypeNote: "Opens the CatapalloVR website.",
  },
};
