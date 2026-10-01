import type { LinkKey } from "./links";

/**
 * CURRENT AVAILABILITY
 *
 * To change what the site says about openings, change ONE word below.
 * Options: "accepting" | "limited" | "waitlist-open" | "waitlist-closed"
 *
 * In the prototype this is shown as a labeled demo state, not a real claim.
 */
export const currentAvailability: AvailabilityStatus = "waitlist-open";

export type AvailabilityStatus = "accepting" | "limited" | "waitlist-open" | "waitlist-closed";

export interface AvailabilityState {
  label: string;
  message: string;
  /** Which flower stage represents this state. */
  glyph: "bloom" | "half" | "bud" | "seed";
  cta: { label: string; link: LinkKey } | null;
}

export const availabilityStates: Record<AvailabilityStatus, AvailabilityState> = {
  accepting: {
    label: "Accepting new clients",
    message: "I have openings right now. Send a request and I'll be in touch within [CONFIRM response time].",
    glyph: "bloom",
    cta: { label: "Request an appointment", link: "requestAppointment" },
  },
  limited: {
    label: "Limited availability",
    message: "A few openings, mostly [CONFIRM days or times]. Send a request and I'll tell you honestly what fits.",
    glyph: "half",
    cta: { label: "Request an appointment", link: "requestAppointment" },
  },
  "waitlist-open": {
    label: "Waitlist open",
    message: "My schedule is full, but the waitlist is open. Add your name and I'll reach out as spots open.",
    glyph: "bud",
    cta: { label: "Join the waitlist", link: "requestAppointment" },
  },
  "waitlist-closed": {
    label: "Waitlist closed",
    message: "My caseload and waitlist are both full right now. The FAQ has a few places to look in the meantime.",
    glyph: "seed",
    cta: { label: "Read the FAQ", link: "faq" },
  },
};

export const availabilityOrder: AvailabilityStatus[] = ["accepting", "limited", "waitlist-open", "waitlist-closed"];
