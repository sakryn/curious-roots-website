"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { frontDesk } from "@/content/home";
import {
  availabilityOrder,
  availabilityStates,
  currentAvailability,
  type AvailabilityStatus,
} from "@/config/availability";
import { site } from "@/config/site";
import { Action } from "@/components/ui/Action";
import { Rich } from "@/components/ui/Rich";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Sprig, StatusGlyph } from "@/components/botanicals/Glyphs";
import { Flower } from "@/components/botanicals/Wildflowers";

/**
 * The digital front desk: one panel for people who are new, one for people
 * who already work with Sarah.
 */
export function FrontDesk() {
  const [status, setStatus] = useState<AvailabilityStatus>(currentAvailability);
  const state = availabilityStates[status];

  return (
    <section className="section desk" aria-labelledby="desk-title" id="availability">
      <div className="wrap">
        <Reveal className="section-head">
          <Label n="V">Availability</Label>
          <h2 id="desk-title" className="section-title">
            {frontDesk.heading}
          </h2>
        </Reveal>

        <div className="desk__grid">
          <Reveal className="desk-panel desk-panel--new">
            <p className="desk-panel__label">{frontDesk.availabilityLabel}</p>
            <div className="availability" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={status}
                  className="availability__state"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <StatusGlyph stage={state.glyph} className="availability__glyph" />
                  <div>
                    <h3 className="availability__label">
                      {state.label}
                      {site.prototypeMode && <span className="demo-tag">Demo</span>}
                    </h3>
                    <p className="availability__msg">
                      <Rich text={state.message} />
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              {state.cta && (
                <Action link={state.cta.link} className="availability__cta">
                  {state.cta.label}
                </Action>
              )}
            </div>

            {site.prototypeMode && (
              <fieldset className="demo-switch">
                <legend>{frontDesk.demoLabel}</legend>
                <p className="demo-switch__hint">{frontDesk.demoHint}</p>
                <div className="demo-switch__options">
                  {availabilityOrder.map((s) => (
                    <label key={s} className={`demo-switch__opt ${s === status ? "is-on" : ""}`}>
                      <input
                        type="radio"
                        name="availability-demo"
                        value={s}
                        checked={s === status}
                        onChange={() => setStatus(s)}
                      />
                      <StatusGlyph stage={availabilityStates[s].glyph} className="demo-switch__glyph" />
                      <span>{availabilityStates[s].label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </Reveal>

          <Reveal className="desk-panel desk-panel--portal on-dark" delay={0.12}>
            <div className="desk-panel__art" aria-hidden="true">
              <Flower kind="fern" seed={41} />
              <Flower kind="seedhead" seed={12} />
            </div>
            <h3 className="desk-panel__title">{frontDesk.portal.heading}</h3>
            <p>{frontDesk.portal.body}</p>
            <ul className="portal-list">
              {frontDesk.portal.features.map((f) => (
                <li key={f}>
                  <Sprig className="portal-list__leaf" />
                  {f}
                </li>
              ))}
            </ul>
            <Action link={frontDesk.portal.cta.link} variant="light" sprout={false}>
              {frontDesk.portal.cta.label}
            </Action>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
