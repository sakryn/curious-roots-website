/**
 * Practice-wide settings. Change a detail here and it updates everywhere.
 *
 * Anything wrapped in [SQUARE BRACKETS] in the copy files is a detail that
 * still needs Sarah's confirmation. The page highlights it so nothing
 * unverified can slip through unnoticed.
 */
export const site = {
  /**
   * Leave false. (true turns every button into a "this will go to..." message,
   * which was only for the early prototype review.)
   */
  prototypeMode: false,

  /**
   * While true, search engines are told not to index the site.
   * Flip to false on launch day, once the domain points here.
   */
  noIndex: true,

  name: "Curious Roots Wellness",
  shortName: "Curious Roots",
  clinician: "Sarah Snyder",
  town: "Sinking Spring",
  state: "Pennsylvania",
  stateAbbr: "PA",
  url: "https://www.curiousrootswellness.org",

  address: "4453 Penn Ave, Suite 4, Sinking Spring, PA 19608",
  addressLines: ["4453 Penn Ave, Suite 4", "Sinking Spring, PA 19608"],
  landmark: "In the Tollhouse Shops, right off Penn Ave",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=4453+Penn+Ave+Suite+4+Sinking+Spring+PA+19608",
  fax: "610-546-7075",

  /** Sarah's text line. Calls go to voicemail while she's in session, so texting is best. */
  textLine: "484-650-3368",
  textLineHref: "sms:+14846503368",

  /** Jane: one link does both. New visitors can book; current clients sign in at the top. */
  jane: "https://curiousrootswellness.janeapp.com",

  hours: "By appointment only",
  formats: "In person in Sinking Spring, PA, and by telehealth anywhere in Pennsylvania",

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

  /** Insurance, from Sarah's current FAQ. */
  insurance: [
    "Aetna",
    "Capital Blue Cross",
    "Highmark Blue Cross Blue Shield",
    "Optum",
    "HealthChoices Berks",
    "UPMC Commercial plans",
    "UPMC CHIP plans",
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
