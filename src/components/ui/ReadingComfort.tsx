"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useExperience, type Prefs } from "@/lib/experience";

/**
 * "Reading comfort": the site's accessibility controls.
 * A button in the header (and the phone menu) opens a small panel where a
 * visitor can calm the motion, enlarge text, raise contrast, add reading
 * spacing and underline links. Choices are remembered on their device.
 */
export function ComfortButton({ withLabel = false }: { withLabel?: boolean }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const { prefs } = useExperience();
  const active = prefs.calm || prefs.contrast || prefs.readable || prefs.links || prefs.text !== "normal";

  return (
    <>
      <button
        ref={btn}
        type="button"
        className={`comfort-btn ${withLabel ? "comfort-btn--labeled" : ""} ${active ? "is-active" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        title="Reading comfort and accessibility"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="10.2" />
          <circle cx="12" cy="6.9" r="1.6" className="fill" />
          <path d="M6.6 9.6 C9 10.4 15 10.4 17.4 9.6 M12 10.6 V14.2 M12 14.2 L9.4 18.6 M12 14.2 L14.6 18.6" />
        </svg>
        <span className={withLabel ? "" : "sr-only"}>Reading comfort</span>
      </button>
      <ComfortPanel open={open} onClose={() => { setOpen(false); btn.current?.focus(); }} />
    </>
  );
}

function ComfortPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { prefs, setPref, resetPrefs } = useExperience();
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("button, input");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => panel.current?.querySelector<HTMLElement>("button")?.focus(), 40);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  const toggles: { k: Exclude<keyof Prefs, "text">; title: string; body: string }[] = [
    { k: "calm", title: "Calm the motion", body: "Stops the growing roots, swaying flowers and drifting art." },
    { k: "contrast", title: "Stronger contrast", body: "Darker text and plainer backgrounds." },
    { k: "readable", title: "Easier reading", body: "More space between letters and lines, no italics." },
    { k: "links", title: "Underline links", body: "Makes every link easy to spot." },
  ];
  const sizes: { v: Prefs["text"]; label: string; aria: string }[] = [
    { v: "normal", label: "A", aria: "Standard text" },
    { v: "large", label: "A+", aria: "Large text" },
    { v: "larger", label: "A++", aria: "Largest text" },
  ];

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="comfort-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            className="comfort-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="comfort-panel__head">
              <h2 id={titleId}>Reading comfort</h2>
              <button type="button" className="comfort-panel__close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <p className="comfort-panel__intro">Make this site easier on your eyes and brain. Your choices stay on this device.</p>

            <fieldset className="comfort-size">
              <legend>Text size</legend>
              <div>
                {sizes.map((s) => (
                  <button
                    key={s.v}
                    type="button"
                    aria-pressed={prefs.text === s.v}
                    aria-label={s.aria}
                    className={`comfort-size__opt comfort-size__opt--${s.v}`}
                    onClick={() => setPref("text", s.v)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <ul className="comfort-list">
              {toggles.map((t) => (
                <li key={t.k}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs[t.k]}
                    className="comfort-switch"
                    onClick={() => setPref(t.k, !prefs[t.k])}
                  >
                    <span className="comfort-switch__text">
                      <strong>{t.title}</strong>
                      <span>{t.body}</span>
                    </span>
                    <span className="comfort-switch__track" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <button type="button" className="comfort-reset" onClick={resetPrefs}>
              Reset to default
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
