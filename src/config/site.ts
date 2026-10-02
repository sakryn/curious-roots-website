/**
 * Practice-wide settings.
 *
 * Anything wrapped in [SQUARE BRACKETS] is a placeholder that must be
 * confirmed with Sarah before launch. The UI highlights these automatically
 * so nothing unverified can slip through unnoticed.
 */
export const site = {
  /** While true, every button shows a "prototype" message instead of navigating. */
  prototypeMode: true,

  /** While true, search engines are told not to index the site. Flip at launch. */
  noIndex: true,

  name: "Curious Roots Wellness",
  shortName: "Curious Roots",
  clinician: "Sarah Snyder",
  town: "Sinking Spring",
  state: "Pennsylvania",
  stateAbbr: "PA",
  url: "https://www.curiousrootswellness.org",

  address: "4453 Penn Ave, Suite 4, Sinking Spring, PA 19608",
  fax: "610-546-7075",

  /** Shown in "the formal stuff". From Sarah's email signature. */
  postNominals: "MSW, LCSW, CCTP-II, ADHD-CCSP, CGCS-CA",
  credentials: [
    "MSW, Master of Social Work",
    "LCSW, Licensed Clinical Social Worker",
    "CCTP-II, Certified Clinical Trauma Professional, Level II",
    "ADHD-CCSP, ADHD Clinical Services Provider",
    "CGCS-CA, Child and Adolescent Grief Counseling Specialist",
    "Member of NASW, CHADD and the National Alliance for Children's Grief",
  ],

  /** Crisis language, taken from Sarah's own email signature. */
  crisisHeading: "If you're in crisis",
  crisisLines: [
    { label: "988 Suicide & Crisis Lifeline", detail: "Call or text 988" },
    { label: "Crisis Text Line", detail: "Text HOME to 741741" },
    { label: "Emergency services", detail: "Call 911 for immediate physical danger" },
  ],
} as const;

export type Site = typeof site;
