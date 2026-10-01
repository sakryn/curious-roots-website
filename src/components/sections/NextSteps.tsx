"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { steps } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

const ROMAN = ["I", "II", "III", "IV"];
import { PrototypeNote } from "@/components/ui/PrototypeNote";
import { RootGrow } from "@/components/botanicals/Motion";
import { useStillness } from "@/lib/experience";

export function NextSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStillness();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const full = useMotionValue(1);
  const p = still ? full : smooth;

  return (
    <section className="section steps" aria-labelledby="steps-title">
      <RootGrow variant="low" className="steps__roots" />
      <div className="wrap">
        <Reveal className="section-head">
          <Label n="IV">Beginning</Label>
          <h2 id="steps-title" className="section-title">
            {steps.heading}
          </h2>
          <p className="section-intro">{steps.intro}</p>
        </Reveal>

        <div className="steps__flow" ref={ref}>
          <svg className="steps__path steps__path--h" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className="rt rt--hair steps__track" d="M40 20 C200 4 300 36 500 20 C700 4 800 36 960 20" />
            <motion.path className="rt rt--1" d="M40 20 C200 4 300 36 500 20 C700 4 800 36 960 20" style={{ pathLength: p }} />
            <motion.path className="rt rt--echo" d="M40 23 C200 7 300 39 500 23 C700 7 800 39 960 23" style={{ pathLength: p }} />
          </svg>
          <svg className="steps__path steps__path--v" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className="rt rt--hair steps__track" d="M20 20 C6 200 34 300 20 500 C6 700 34 800 20 980" />
            <motion.path className="rt rt--1" d="M20 20 C6 200 34 300 20 500 C6 700 34 800 20 980" style={{ pathLength: p }} />
            <motion.path className="rt rt--echo" d="M23 20 C9 200 37 300 23 500 C9 700 37 800 23 980" style={{ pathLength: p }} />
          </svg>

          <ol className="steps__list">
          {steps.items.map((s, i) => (
            <li key={s.title} className={`step ${i === 2 ? "step--key" : ""}`}>
              <span className="step__num" aria-hidden="true">
                {ROMAN[i]}
              </span>
              <div className="step__body">
                <h3>
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p>{s.body}</p>
                {s.note && <PrototypeNote>{s.note}</PrototypeNote>}
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
