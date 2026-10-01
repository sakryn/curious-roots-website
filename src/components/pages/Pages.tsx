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
import { RootSpine, Meadow, HeroRoots, type MeadowStem, type RootOrigin } from "@/components/botanicals/Motion";
import { Action } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Flower } from "@/components/botanicals/Wildflowers";
import type { Specialty } from "@/content/specialties";
import { allFaqItems } from "@/content/faq";

/** The homepage, top to bottom. One continuous landscape. */
export function HomePage() {
  return (
    <>
      <Hero />
      <div className="grow-zone">
        <RootSpine />
        <FitFinder />
        <AboutSarah />
        <HowIWork />
        <NextSteps />
        <FrontDesk />
        <Partnerships />
        <Faq />
        <Location />
      </div>
      <Education />
    </>
  );
}

const PAGE_MEADOW: MeadowStem[] = [
  { kind: "grass", left: 64, h: 7, layer: 0, sketch: true, hideOnMobile: true, seed: 3 },
  { kind: "teasel", left: 70, h: 10, layer: 1, hideOnMobile: true, seed: 5 },
  { kind: "umbel", left: 78, h: 13, layer: 0, seed: 8 },
  { kind: "fern", left: 83, h: 8.5, layer: 2, tilt: -8, seed: 4 },
  { kind: "seedhead", left: 89, h: 11, layer: 1, seed: 6 },
  { kind: "grass", left: 95, h: 8, layer: 2, seed: 9 },
];

const PAGE_ROOTS: RootOrigin[] = [
  { x: 70, length: 120, depth: 3, seed: 14, wide: true },
  { x: 78, length: 160, depth: 3, seed: 22 },
  { x: 89, length: 130, depth: 3, seed: 36 },
];

/** Shared top-of-page treatment for every inner page. */
export function PageHeader({ title, intro, flower = "bell" }: { title: string; intro?: string; flower?: Specialty["flower"] }) {
  return (
    <section className="page-head">
      <div className="wrap page-head__inner">
        <span className="page-head__flower" aria-hidden="true">
          <Flower kind={flower} seed={2} />
        </span>
        <h1 className="page-head__title">{title}</h1>
        {intro && <p className="page-head__intro">{intro}</p>}
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
export function InnerPage({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grow-zone grow-zone--inner">
        <RootSpine />
        {children}
        <ClosingCta />
      </div>
      <Education />
    </>
  );
}

function ClosingCta() {
  return (
    <section className="section closing">
      <Reveal className="wrap closing__inner">
        <h2 className="section-title">Sound like what you&rsquo;re looking for?</h2>
        <div className="closing__actions">
          <Action link="requestAppointment">Request an appointment</Action>
          <Action link="faq" variant="secondary" sprout={false}>
            Read the FAQ
          </Action>
        </div>
      </Reveal>
    </section>
  );
}

/** Template for the four specialty pages. */
export function SpecialtyPage({ s }: { s: Specialty }) {
  const faqs = allFaqItems.filter((f) => s.page.faqIds.includes(f.id));
  return (
    <>
      <PageHeader title={s.page.heading} intro={s.detail} flower={s.flower} />
      <InnerPage>
        <section className="section specialty">
          <div className="wrap specialty__grid">
            <Reveal className="specialty__for">
              <h2 className="section-title section-title--sm">This might be for you if</h2>
              <ul className="leaf-list leaf-list--lg">
                {s.forYouIf.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Reveal>
            <div className="specialty__sessions">
              <h2 className="section-title section-title--sm">What sessions feel like</h2>
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
        <Faq items={faqs} showHeading />
      </InnerPage>
    </>
  );
}
