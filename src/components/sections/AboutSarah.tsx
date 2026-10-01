"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/components/ui/Label";
import { about } from "@/content/home";
import { site } from "@/config/site";
import { Action } from "@/components/ui/Action";
import { Rich } from "@/components/ui/Rich";
import { Reveal } from "@/components/ui/Reveal";
import { PrototypeNote } from "@/components/ui/PrototypeNote";
import { Chevron, Sprig } from "@/components/botanicals/Glyphs";
import { Flower } from "@/components/botanicals/Wildflowers";
import { Parallax, RootGrow } from "@/components/botanicals/Motion";

/** Set to "/images/sarah.jpg" (in /public) once Sarah sends a photo. */
const PHOTO_SRC: string | null = null;

/** An oval plate frame, like a portrait tipped into an old naturalist's book. */
const OVAL = "M200 22 C302 22 368 112 368 214 C368 316 298 386 200 386 C102 386 32 316 32 214 C32 112 98 22 200 22Z";

function PortraitFrame() {
  const clipId = useId().replace(/:/g, "");
  return (
    <figure className="portrait">
      <div className="portrait__plate">
        <svg viewBox="0 0 400 410" className="portrait__svg" role="img" aria-label={PHOTO_SRC ? "Sarah Snyder" : "Placeholder for Sarah's photo"}>
          <defs>
            <clipPath id={`oval-${clipId}`}>
              <path d={OVAL} />
            </clipPath>
            <linearGradient id={`ph-${clipId}`} x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0" stopColor="#d6dbbf" />
              <stop offset="1" stopColor="#a7b48a" />
            </linearGradient>
          </defs>
          <g clipPath={`url(#oval-${clipId})`}>
            {PHOTO_SRC ? (
              <image href={PHOTO_SRC} x="0" y="0" width="400" height="410" preserveAspectRatio="xMidYMid slice" />
            ) : (
              <>
                <rect width="400" height="410" fill={`url(#ph-${clipId})`} />
                <rect width="400" height="410" className="portrait__hatch" />
                <path d="M200 120 C236 120 256 150 254 186 C252 222 230 248 200 248 C170 248 148 222 146 186 C144 150 164 120 200 120Z" className="portrait__ph-line" />
                <path d="M86 410 C96 320 140 278 200 278 C260 278 304 320 314 410" className="portrait__ph-line" />
              </>
            )}
          </g>
          <path d={OVAL} className="portrait__ring" />
          <path d={OVAL} className="portrait__ring portrait__ring--outer" transform="translate(200 204) scale(1.045) translate(-200 -204)" />
        </svg>
        {!PHOTO_SRC && <span className="portrait__label">Sarah&rsquo;s photo here</span>}
        <Parallax speed={0.22} className="portrait__spray portrait__spray--a">
          <Flower kind="fern" seed={31} />
        </Parallax>
        <Parallax speed={0.1} className="portrait__spray portrait__spray--b">
          <Flower kind="umbel" seed={14} />
        </Parallax>
        <Parallax speed={0.16} className="portrait__spray portrait__spray--c">
          <Flower kind="grass" seed={22} />
        </Parallax>
        <RootGrow variant="low" className="portrait__roots" />
      </div>
      <figcaption className="plate-caption">
        <span>Pl. II.</span> Sarah Snyder, therapist
      </figcaption>
    </figure>
  );
}

export function AboutSarah() {
  const [open, setOpen] = useState(false);
  const credId = useId();
  return (
    <section className="section about" aria-labelledby="about-title" id="about">
      <div className="wrap about__grid">
        <Reveal className="about__visual">
          <PortraitFrame />
        </Reveal>

        <div className="about__text">
          <Reveal>
            <Label n="II">Meet Sarah</Label>
            <h2 id="about-title" className="section-title about__title">
              {about.heading}
            </h2>
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.08 * (i + 1)}>
              <p className={i === 0 ? "about__lede" : ""}>{p}</p>
            </Reveal>
          ))}

          <ul className="promises">
            {about.promises.map((p) => (
              <li key={p.title}>
                <Sprig className="promises__leaf" />
                <strong>{p.title}</strong>
                <span>{p.body}</span>
              </li>
            ))}
          </ul>

          <div className="credentials">
            <button
              type="button"
              className="credentials__toggle"
              aria-expanded={open}
              aria-controls={credId}
              onClick={() => setOpen(!open)}
            >
              {about.credentialsLabel}
              <Chevron className="chev" />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  id={credId}
                  className="credentials__list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {site.credentials.map((c) => (
                    <li key={c}>
                      <Rich text={c} />
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="about__actions">
            <Action link={about.link.link} variant="secondary" sprout={false}>
              {about.link.label}
            </Action>
          </div>

          <PrototypeNote>
            Draft copy in Sarah&rsquo;s voice. Nothing here states a fact about her history; she should rewrite anything that doesn&rsquo;t sound like her.
          </PrototypeNote>
        </div>
      </div>
    </section>
  );
}
