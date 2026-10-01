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
  url: "https://www.curiousrootswellness.com",

  address: "[CONFIRM CURRENT PRACTICE ADDRESS WITH SARAH]",
  fax: "[PRACTICE FAX NUMBER]",

  /** Shown in "the formal stuff". Every item needs Sarah's confirmation. */
  credentials: [
    "[License type + number: confirm]",
    "[Degree: confirm]",
    "[Trauma training / certifications: confirm]",
    "[States licensed for telehealth: confirm]",
  ],

  /** Reviewed crisis language goes here. Intentionally left as a placeholder. */
  crisisNotice:
    "[Crisis + emergency language pending Sarah's clinical and legal review]",
} as const;

export type Site = typeof site;
