import type { LinkKey } from "@/config/links";

export interface NavItem {
  label: string;
  link: LinkKey;
}

export const primaryNav: NavItem[] = [
  { label: "Home", link: "home" },
  { label: "Therapy", link: "therapy" },
  { label: "ADHD + Neurodivergence", link: "neurodivergence" },
  { label: "About Sarah", link: "about" },
  { label: "Partnerships", link: "partnerships" },
  { label: "FAQ", link: "faq" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "For clients",
    items: [
      { label: "Request an appointment", link: "requestAppointment" },
      { label: "Patient portal", link: "patientPortal" },
      { label: "FAQ", link: "faq" },
    ],
  },
  {
    heading: "The practice",
    items: [
      { label: "About Sarah", link: "about" },
      { label: "Therapy", link: "therapy" },
      { label: "Partnerships", link: "partnerships" },
      { label: "Professional consultation", link: "consultation" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", link: "privacy" },
  { label: "Accessibility", link: "accessibility" },
  { label: "Terms + website disclaimer", link: "terms" },
];
