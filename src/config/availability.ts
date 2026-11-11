import type { LinkKey } from "./links";

/**
 * CURRENT AVAILABILITY
 *
 * To change what the site says about openings, change ONE word below.
 * Options: "accepting" | "limited" | "waitlist-open" | "waitlist-closed"
 */
export const currentAvailability: AvailabilityStatus = "accepting";

export type AvailabilityStatus = "accepting" | "limited" | "waitlist-open" | "waitlist-closed";

export interface AvailabilityState {
  label: string;
  message: string;
  /** Which flower stage represents this state. */
  glyph: "bloom" | "half" | "bud" | "seed";
  cta: { label: string; link: LinkKey } | null;
  secondary?: { label: string; link: LinkKey };
}

export const availabilityStates: Record<AvailabilityStatus, AvailabilityState> = {
  accepting: {
    label: "Accepting new clients",
    message: "I have openings, in person in Sinking Spring and by telehealth across Pennsylvania. Book through Jane, or send a note and I'll follow up.",
    glyph: "bloom",
    cta: { label: "Book now", link: "requestAppointment" },
    secondary: { label: "Send a note first", link: "contact" },
  },
  limited: {
    label: "Limited availability",
    message: "A few openings left. Book through Jane to see what's open, or send a note and I'll tell you honestly what fits.",
    glyph: "half",
    cta: { label: "See open times", link: "requestAppointment" },
    secondary: { label: "Send a note", link: "contact" },
  },
  "waitlist-open": {
    label: "Waitlist open",
    message: "My schedule is full right now, but the waitlist is open. Add your name and I'll reach out as spots open.",
    glyph: "bud",
    cta: { label: "Join the waitlist", link: "waitlist" },
  },
  "waitlist-closed": {
    label: "Waitlist closed",
    message: "My caseload and waitlist are both full right now. The FAQ has a few places to look in the meantime.",
    glyph: "seed",
    cta: { label: "Read the FAQ", link: "faq" },
  },
};

export const availabilityOrder: AvailabilityStatus[] = ["accepting", "limited", "waitlist-open", "waitlist-closed"];
