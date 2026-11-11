"use client";

import type { ReactNode } from "react";
import { Hero } from "@/components/sections/Hero";
import { FitFinder } from "@/components/sections/FitFinder";
import { AboutSarah } from "@/components/sections/AboutSarah";
import { HowIWork } from "@/components/sections/HowIWork";
import { NextSteps } from "@/components/sections/NextSteps";
import { FrontDesk } from "@/components/sections/FrontDesk";
import { Partnerships } from "@/components/sections/Partnerships";
import { Faq } from "@/components/sections/Faq";
import { Location, Education } from "@/components/sections/LocationEducation";
import { TherapyLooks, InsurancePanel, FeatureBlock, NotSure } from "@/components/sections/Extras";
import { RootSpine, Meadow, HeroRoots, type MeadowStem, type RootOrigin } from "@/components/botanicals/Motion";
import { Action } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Flower, type PlantKind } from "@/components/botanicals/Wildflowers";
import type { Specialty } from "@/content/specialties";
import { allFaqItems } from "@/content/faq";
import { site } from "@/config/site";

/** The homepage, top to bottom. One continuous landscape. */
export function HomePage() {
  return (
    <>
      <Hero />
      <div className="grow-zone">
        <RootSpine />
        <FitFinder />
        <AboutSarah />
        <TherapyLooks />
        <HowIWork />
        <NextSteps />
        <FrontDesk />
        <InsurancePanel n="VII" />
        <Partnerships />
        <Faq />
        <Location />
      </div>
      <Education />
    </>
  );
}

const PAGE_MEADOW: MeadowStem[] = [
  { kind: "daisy", left: 62, h: 7, layer: 0, sketch: true, hideOnMobile: true, seed: 3 },
  { kind: "dandelion", left: 68, h: 7.5, layer: 1, hideOnMobile: true, seed: 5 },
  { kind: "lilac", left: 74, h: 13, layer: 0, seed: 8 },
  { kind: "daisy", left: 79, h: 10, layer: 2, tilt: -8, seed: 4 },
  { kind: "seedhead", left: 84, h: 11, layer: 1, seed: 6 },
  { kind: "lilac", left: 89, h: 9, layer: 2, seed: 9 },
  { kind: "daisy", left: 94, h: 8, layer: 1, seed: 12 },
  { kind: "dandelion", left: 96.5, h: 6, layer: 2, seed: 2 },
];

const PAGE_ROOTS: RootOrigin[] = [
  { x: 68, length: 120, depth: 3, seed: 14, wide: true },
  { x: 74, length: 160, depth: 3, seed: 22 },
  { x: 84, length: 130, depth: 3, seed: 36 },
  { x: 94, length: 110, depth: 3, seed: 41 },
];

/** Shared top-of-page treatment for every inner page. */
export function PageHeader({
  title,
  intro,
  kicker,
  flower = "daisy",
  photo = false,
  children,
}: {
  title: string;
  intro?: string;
  kicker?: string;
  flower?: PlantKind;
  /** Fade Sarah's wildflower photo in behind the heading. */
  photo?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`page-head ${photo ? "page-head--photo" : ""}`}>
      {photo && <span className="page-head__photo" aria-hidden="true" />}
      <div className="wrap page-head__inner">
        <span className="page-head__flower" aria-hidden="true">
          <Flower kind={flower} seed={2} />
        </span>
        {kicker && <p className="page-head__kicker">{kicker}</p>}
        <h1 className="page-head__title">{title}</h1>
        {intro && <p className="page-head__intro">{intro}</p>}
        {children}
      </div>
      <div className="page-head__ground" aria-hidden="true">
        <Meadow stems={PAGE_MEADOW} />
      </div>
      <div className="page-head__soil">
        <HeroRoots origins={PAGE_ROOTS} delay={0.6} />
      </div>
    </section>
  );
}

/** Inner pages get the same growing spine and closing CTA. */
export function InnerPage({ children, closing = true, education = true }: { children: ReactNode; closing?: boolean; education?: boolean }) {
  return (
    <>
      <div className="grow-zone grow-zone--inner">
        <RootSpine />
        {children}
        {closing && <ClosingCta />}
      </div>
      {education && <Education />}
    </>
  );
}

function ClosingCta() {
  return (
    <section className="section closing">
      <Reveal className="wrap closing__inner">
        <h2 className="section-title section-title--md">Sound like what you&rsquo;re looking for?</h2>
        <div className="closing__actions">
          <Action link="requestAppointment">New here? Book now</Action>
          <Action link="contact" variant="secondary" sprout={false}>
            Send a note
          </Action>
        </div>
        <p className="closing__text">
          Or text <a href={site.textLineHref}>{site.textLine}</a>.
        </p>
      </Reveal>
    </section>
  );
}

/** Template for the four specialty pages. */
export function SpecialtyPage({ s }: { s: Specialty }) {
  const faqs = allFaqItems.filter((f) => s.page.faqIds.includes(f.id));
  return (
    <>
      <PageHeader title={s.page.heading} kicker={s.title} intro={s.detail} flower={s.flower}>
        <div className="page-head__actions">
          <Action link="requestAppointment">New here? Book now</Action>
          <Action link="contact" variant="secondary" sprout={false}>
            Ask a question
          </Action>
        </div>
      </PageHeader>
      <InnerPage closing={false}>
        <section className="section specialty">
          <div className="wrap specialty__grid">
            <Reveal className="specialty__for">
              <Label n="I">{s.page.listTitle}</Label>
              <ul className="tag-list tag-list--lg">
                {s.page.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <div className="specialty__fit">
                <h2 className="mini-head">This might be for you if</h2>
                <ul className="leaf-list">
                  {s.forYouIf.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <div className="specialty__sessions">
              <Label n="II">{s.page.sessionsTitle}</Label>
              <ul>
                {s.page.sessions.map((x, i) => (
                  <li key={x.title} className="session-card">
                    <Reveal delay={i * 0.08}>
                      <h3>{x.title}</h3>
                      <p>{x.body}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {s.page.feature && <FeatureBlock f={s.page.feature} />}
        <Faq items={faqs} showHeading n="III" />
        <NotSure
          heading="Not sure this is the right fit? That's okay."
          body="You don't need a diagnosis or a plan. Tell me a little about what's going on and I'll suggest a next step."
        />
      </InnerPage>
    </>
  );
}

/** Simple prose page (privacy, accessibility). */
export function ProsePage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <PageHeader title={title} intro={intro} flower="seedhead" />
      <div className="grow-zone grow-zone--inner">
        <section className="section prose-section">
          <div className="wrap">
            <div className="prose">{children}</div>
          </div>
        </section>
      </div>
    </>
  );
}
