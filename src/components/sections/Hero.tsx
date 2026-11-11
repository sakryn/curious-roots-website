"use client";

import { motion } from "framer-motion";
import { hero } from "@/content/home";
import { Action } from "@/components/ui/Action";
import { HeroRoots, HeroTaproot, Meadow, Parallax, type MeadowStem, type RootOrigin } from "@/components/botanicals/Motion";
import { Flower } from "@/components/botanicals/Wildflowers";
import { useStillness } from "@/lib/experience";

/**
 * Irregular groupings, the way plants actually stand in a field: a tall
 * specimen with companions, a few unfinished sketches set further back.
 */
const HERO_MEADOW: MeadowStem[] = [
  // far left, faint
  { kind: "daisy", left: 2.5, h: 7, layer: 0, sketch: true, hideOnMobile: true, seed: 4 },
  { kind: "seedhead", left: 5.5, h: 9, layer: 0, sketch: true, hideOnMobile: true, tilt: -6, seed: 2 },
  // mid group
  { kind: "umbel", left: 57, h: 11, layer: 0, sketch: true, hideOnMobile: true, seed: 5, tilt: 4 },
  { kind: "daisy", left: 60.5, h: 8, layer: 1, hideOnMobile: true, seed: 9 },
  { kind: "dandelion", left: 64.5, h: 8.5, layer: 1, hideOnMobile: true, seed: 2, tilt: -3 },
  { kind: "lilac", left: 69, h: 13.5, layer: 0, hideOnMobile: true, seed: 3 },
  // the specimen group
  { kind: "daisy", left: 75, h: 12, layer: 1, tilt: -8, seed: 7 },
  { kind: "lilac", left: 79.5, h: 19, layer: 0, seed: 3 },
  { kind: "daisy", left: 83.5, h: 14.5, layer: 2, seed: 6, tilt: 5 },
  { kind: "dandelion", left: 86.5, h: 10, layer: 1, seed: 12 },
  { kind: "seedhead", left: 89.5, h: 15, layer: 0, seed: 8, tilt: 4 },
  { kind: "lilac", left: 92.5, h: 11, layer: 2, seed: 4, tilt: -4 },
  { kind: "daisy", left: 96, h: 9, layer: 1, sketch: true, seed: 13, tilt: 10 },
  { kind: "dandelion", left: 97, h: 6.5, layer: 2, seed: 15 },
];

const HERO_ROOTS: RootOrigin[] = [
  { x: 5, length: 150, depth: 3, seed: 21, wide: true },
  { x: 60, length: 170, depth: 3, seed: 33, wide: true },
  { x: 69, length: 230, depth: 4, seed: 45, wide: true },
  { x: 80, length: 340, depth: 5, seed: 11 },
  { x: 89.5, length: 250, depth: 4, seed: 27 },
  { x: 96, length: 160, depth: 3, seed: 61 },
];

export function Hero() {
  const still = useStillness();
  // Always declare initial + animate, so text can never get stuck invisible
  // when a visitor's "calm motion" setting loads after the first paint.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: still ? { duration: 0 } : { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Parallax speed={0.18} className="hero__photo">
        <span className="hero__photo-img" />
      </Parallax>
      <Parallax speed={0.35} className="hero__drift hero__drift--a">
        <Flower kind="lilac" sketch className="plant--ghost" seed={21} />
      </Parallax>
      <Parallax speed={0.6} className="hero__drift hero__drift--b">
        <Flower kind="seedhead" sketch className="plant--ghost" seed={30} />
      </Parallax>

      <div className="hero__above">
        <motion.p className="hero__kicker" {...rise(0)}>
          {hero.kicker}
        </motion.p>
        <h1 id="hero-title" className="hero__title">
          {hero.headline.map((line, i) => (
            <motion.span key={line} className={`hero__line hero__line--${i}`} {...rise(0.1 + i * 0.18)}>
              {line}
            </motion.span>
          ))}
        </h1>
      </div>

      <div className="hero__ground" aria-hidden="true">
        <svg className="hero__soil-line" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0 22 C160 18 300 24 480 21 C700 17 860 25 1060 21 C1220 18 1340 22 1440 20 L1440 40 L0 40z" />
          <path className="hero__soil-edge" d="M0 22 C160 18 300 24 480 21 C700 17 860 25 1060 21 C1220 18 1340 22 1440 20" />
          <path className="hero__soil-edge hero__soil-edge--2" d="M0 25 C200 22 340 27 520 24 C760 21 900 27 1100 24 C1260 22 1360 25 1440 23" />
        </svg>
        <Meadow stems={HERO_MEADOW} interactive delay={0.9} className="hero__meadow" />
      </div>

      <div className="hero__soil">
        <HeroRoots origins={HERO_ROOTS} delay={1.6} />
        <HeroTaproot />
        <p className="hero__plate" aria-hidden="true">
          <span>Fig. 1.</span> Bellis, Syringa + Taraxacum, root systems intact
        </p>
        <div className="hero__copy">
          <motion.p className="hero__sub" {...rise(0.55)}>
            {hero.sub}
          </motion.p>
          <motion.p className="hero__support" {...rise(0.7)}>
            {hero.support}
          </motion.p>
          <motion.p className="hero__where" {...rise(0.78)}>
            {hero.where}
          </motion.p>
          <motion.div className="hero__ctas" data-hero-ctas {...rise(0.85)}>
            <Action link={hero.primary.link}>{hero.primary.label}</Action>
            <Action link={hero.secondary.link} variant="secondary" sprout={false}>
              {hero.secondary.label}
            </Action>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
