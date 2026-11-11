"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

/**
 * Site-wide reading + accessibility settings, chosen by the visitor in the
 * "Reading comfort" panel and remembered on their device:
 *  - calm: stop decorative motion (on top of the OS "reduce motion" setting)
 *  - text: larger text
 *  - contrast: stronger contrast, no faded art behind text
 *  - readable: extra letter + line spacing, left-aligned, no italics
 *  - links: underline every link
 */
export interface Prefs {
  calm: boolean;
  text: "normal" | "large" | "larger";
  contrast: boolean;
  readable: boolean;
  links: boolean;
}

const DEFAULT_PREFS: Prefs = { calm: false, text: "normal", contrast: false, readable: false, links: false };

interface ExperienceState {
  prefs: Prefs;
  setPref: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void;
  resetPrefs: () => void;
  /** Back-compat */
  calm: boolean;
  setCalm: (v: boolean) => void;
  /** true when the OS asks for reduced motion OR the visitor turned on calm motion */
  stillness: boolean;
  notes: boolean;
  setNotes: (v: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const Ctx = createContext<ExperienceState | null>(null);

const KEY = "cr-reading-prefs";

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const osReduced = useReducedMotion() ?? false;
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [notes, setNotes] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(raw) });
      else if (localStorage.getItem("cr-calm-motion") === "1") setPrefs({ ...DEFAULT_PREFS, calm: true });
    } catch {
      /* storage unavailable: defaults */
    }
  }, []);

  const save = (p: Prefs) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {
      /* ignore */
    }
  };

  const setPref = useCallback(<K extends keyof Prefs>(k: K, v: Prefs[K]) => {
    setPrefs((prev) => {
      const next = { ...prev, [k]: v };
      save(next);
      return next;
    });
  }, []);

  const resetPrefs = useCallback(() => {
    setPrefs(DEFAULT_PREFS);
    save(DEFAULT_PREFS);
  }, []);

  const setCalm = useCallback((v: boolean) => setPref("calm", v), [setPref]);

  const stillness = osReduced || prefs.calm;

  useEffect(() => {
    const d = document.documentElement.dataset;
    d.still = stillness ? "true" : "false";
    d.notes = notes ? "true" : "false";
    d.text = prefs.text;
    d.contrast = prefs.contrast ? "true" : "false";
    d.readable = prefs.readable ? "true" : "false";
    d.links = prefs.links ? "true" : "false";
  }, [stillness, notes, prefs]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 5200);
  }, []);

  const value = useMemo(
    () => ({
      prefs,
      setPref,
      resetPrefs,
      calm: prefs.calm,
      setCalm,
      stillness,
      notes,
      setNotes,
      toast,
      showToast,
    }),
    [prefs, setPref, resetPrefs, setCalm, stillness, notes, toast, showToast],
  );

  return (
    <Ctx.Provider value={value}>
      <MotionConfig reducedMotion={stillness ? "always" : "never"}>{children}</MotionConfig>
    </Ctx.Provider>
  );
}

export function useExperience() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useExperience must be used inside <ExperienceProvider>");
  return v;
}

/** Shorthand: should decorative motion be switched off? */
export function useStillness() {
  return useExperience().stillness;
}
