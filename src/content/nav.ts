import type { LinkKey } from "@/config/links";

export interface NavItem {
  label: string;
  link: LinkKey;
}

export const primaryNav: NavItem[] = [
  { label: "Home", link: "home" },
  { label: "About", link: "about" },
  { label: "Services", link: "therapy" },
  { label: "Consultation + Education", link: "consultation" },
  { label: "FAQ", link: "faq" },
  { label: "Contact", link: "contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Start here",
    items: [
      { label: "New here? Book now", link: "requestAppointment" },
      { label: "Client portal", link: "patientPortal" },
      { label: "Contact + waitlist", link: "contact" },
      { label: "Insurance + rates", link: "insurance" },
      { label: "FAQ", link: "faq" },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "All services", link: "therapy" },
      { label: "ADHD + neurodivergence", link: "neurodivergence" },
      { label: "Trauma + the nervous system", link: "trauma" },
      { label: "Children, teens + families", link: "childrenFamilies" },
      { label: "Grief + life transitions", link: "grief" },
      { label: "Consultation + education", link: "consultation" },
      { label: "Partnerships", link: "partnerships" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", link: "privacy" },
  { label: "Accessibility", link: "accessibility" },
];
