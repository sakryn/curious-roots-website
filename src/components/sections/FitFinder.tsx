"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fit } from "@/content/home";
import { specialties, type Specialty } from "@/content/specialties";
import { Action } from "@/components/ui/Action";
import { Emblem } from "@/components/botanicals/Emblems";
import { Chevron } from "@/components/botanicals/Glyphs";
import { RootGrow } from "@/components/botanicals/Motion";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";

const ROMAN = ["i", "ii", "iii", "iv"];
// Where each branch lands, in a 1000-wide coordinate space (column centers).
const ENDS = [125, 375, 625, 875];

export function FitFinder({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const [active, setActive] = useState<number | null>(null);
  const H = headingLevel === 2 ? "h2" : "h3";

  return (
    <section className="section fit" aria-labelledby="fit-title">
      <RootGrow variant="corner" className="fit__roots" flip />
      <div className="wrap">
        <Reveal className="section-head">
          <Label n="I">Who I work with</Label>
          <H id="fit-title" className="section-title">
            {fit.heading}
          </H>
          <p className="section-intro">{fit.intro}</p>
        </Reveal>

        <svg className="fit__branches" viewBox="0 0 1000 110" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className="rt rt--1" d="M-20 12 C90 30 210 4 340 20 C470 36 560 6 690 18 C800 28 900 8 1020 18" />
          <path className="rt rt--echo" d="M-20 15 C90 33 210 7 340 23 C470 39 560 9 690 21 C800 31 900 11 1020 21" />
          {ENDS.map((x, i) => (
            <g key={x} className={`fit__branch ${active === i ? "is-active" : ""}`}>
              <path
                className="rt rt--2"
                d={`M${x + (i % 2 ? 30 : -40)} ${i % 2 ? 14 : 20} C${x + (i % 2 ? 10 : -20)} 50 ${x + (i % 2 ? -12 : 14)} 80 ${x} 110`}
              />
              <path className="rt rt--hair" d={`M${x + (i % 2 ? 14 : -18)} 60 l${i % 2 ? 12 : -12} 6 M${x + (i % 2 ? 6 : -6)} 82 l${i % 2 ? -10 : 10} 7`} />
            </g>
          ))}
        </svg>

        <ul className="fit__grid">
          {specialties.map((s, i) => (
            <FitColumn key={s.id} s={s} index={i} active={active === i} onActive={(on) => setActive(on ? i : null)} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FitColumn({
  s,
  index,
  active,
  onActive,
}: {
  s: Specialty;
  index: number;
  active: boolean;
  onActive: (on: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <motion.li
      className={`fit-col fit-col--${s.id} ${active ? "is-active" : ""} ${open ? "is-open" : ""}`}
      onPointerEnter={() => onActive(true)}
      onPointerLeave={() => onActive(false)}
      onFocus={() => onActive(true)}
      onBlur={() => onActive(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="fit-col__node" aria-hidden="true" />
      <figure className="fit-col__plate">
        <div className="fit-col__art">
          <Emblem kind={s.emblem} />
        </div>
        <figcaption>
          <span>Fig. {ROMAN[index]}.</span> {s.caption}
        </figcaption>
      </figure>
      <h3 className="fit-col__title">{s.title}</h3>
      <p className="fit-col__hook">{s.hook}</p>

      <button type="button" className="fit-col__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {fit.forYouIfLabel}
        <Chevron className="chev" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="fit-col__more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="leaf-list">
              {s.forYouIf.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="fit-col__detail">{s.detail}</p>
            <Action link={s.link} variant="text" sprout={false} className="text-link">
              More about {s.title.toLowerCase().replace("adhd", "ADHD")}
            </Action>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
