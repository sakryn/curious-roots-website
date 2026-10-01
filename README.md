# Curious Roots Wellness: website prototype

A visual prototype of Sarah Snyder's practice website. Built with Next.js (App Router) for Vercel.
**Nothing is wired up yet.** Every button shows a short "Prototype" message explaining where it will go.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (Vercel runs this)
npm run preview:build  # optional: one self-contained HTML file of the homepage in /preview-dist
```

Deploy: import the folder into Vercel. No environment variables are needed.

## Where things live

| To change...                                  | Edit                              |
| --------------------------------------------- | --------------------------------- |
| Any button's real URL (EHR intake, portal...) | `src/config/links.ts`             |
| Turn off prototype mode / allow indexing      | `src/config/site.ts`              |
| Current availability (one word)               | `src/config/availability.ts`      |
| Address, fax, credentials, crisis wording     | `src/config/site.ts`              |
| Homepage copy (Sarah's voice)                 | `src/content/home.ts`             |
| The four specialties + their pages            | `src/content/specialties.ts`      |
| FAQ                                           | `src/content/faq.ts`              |
| Partners (add one = add one entry)            | `src/content/partners.ts`         |
| Navigation                                    | `src/content/nav.ts`              |
| Sarah's photo                                 | add `/public/images/sarah.jpg`, set `PHOTO_SRC` in `src/components/sections/AboutSarah.tsx` |
| Analytics                                     | `src/lib/analytics.ts` (every button already calls `track()`) |

Anything written in `[SQUARE BRACKETS]` renders as a striped yellow "needs confirmation" mark, so nothing unverified can ship by accident.

## Going live checklist

1. Fill in every `href: null` in `src/config/links.ts` (EHR intake form, patient portal, partner sites, legal pages).
2. Set `prototypeMode: false` and `noIndex: false` in `src/config/site.ts`.
3. Replace every `[CONFIRM ...]` placeholder. Search the repo for `[` in `src/config` and `src/content`.
4. Add reviewed crisis/emergency language, privacy policy, accessibility statement and terms.
5. Add Sarah's photo and partner logos.

## Needs Sarah's confirmation

- Current practice address (the old site is inconsistent)
- Fax number
- License type/number, degree, trauma training, telehealth states
- Youngest age she sees; whether she offers ADHD/autism assessment
- Insurance participation, fees, payment methods
- Telehealth and in-person availability
- Response time for new requests; current availability state
- Portal support process
- Adalyn Rose Foundation / Keegan Cares partnership description
- Every line of draft copy in `src/content/home.ts` (written in her voice, but she should make it hers)

## How the design system works

Art direction: a Victorian botanical field journal, brought quietly to life.

- **Ink engine** (`src/lib/ink.ts`): seeded, hand-irregular pen lines. Everything is drawn in code, so it is crisp at any size and each plant always looks the same.
- **Plants** (`src/components/botanicals/Wildflowers.tsx`): engraved specimens with hatching and only faint washes of muted color. The species are fern, Queen Anne's lace (fresh and dried), seed head, oat grass, poppy pod, teasel, harebell, hellebore, briar rose and twining vine.
- **Roots** (`src/components/botanicals/Motion.tsx`):
  - `HeroRoots`: full branching root systems with feeder roots, root hairs and echo lines, inked in on load.
  - `RootSpine`: a taproot that grows down the page with scroll, branching into a network at each section.
  - `RootGrow`: corner root networks that ink in when a section scrolls into view.
- **Emblems** (`src/components/botanicals/Emblems.tsx`): specialty plates.
  - Trauma: root and nerve.
  - ADHD and autism: a leaf skeleton where every path connects.
  - Families: three stems sharing one root.
  - Grief: seed, dormancy, return.
  - Also the "How I work" motifs, education icons, availability life cycle and logo.
- **Motion**: plants ink themselves in (stem, then leaves, flowers, detail), sway gently, drift in parallax layers and lean toward the pointer. Reduced motion and the "calm motion" switch show every drawing fully inked and still.
- **Type**: Fraunces with italic accents and small-capital editorial labels; Atkinson Hyperlegible Next for body text.

## Page architecture (SEO-ready)

`/`, `/about`, `/therapy`, `/trauma-therapy`, `/adhd-autism-neurodivergence`, `/children-teens-families`, `/grief`, `/consultation-training`, `/partnerships`, `/faq`, plus `sitemap.xml`, `robots.txt` and LocalBusiness-style structured data in `src/lib/seo.ts`.
