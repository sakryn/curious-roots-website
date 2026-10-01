"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

/**
 * Site-wide experience settings:
 *  - calm: visitor-controlled "calm motion" switch (on top of the OS setting)
 *  - notes: prototype annotations for Sarah's review
 *  - toast: the message a prototype button shows instead of navigating
 */
interface ExperienceState {
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

const CALM_KEY = "cr-calm-motion";

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const osReduced = useReducedMotion() ?? false;
  const [calm, setCalmState] = useState(false);
  const [notes, setNotes] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(CALM_KEY) === "1") setCalmState(true);
    } catch {
      /* storage unavailable: default to motion on */
    }
  }, []);

  const setCalm = useCallback((v: boolean) => {
    setCalmState(v);
    try {
      localStorage.setItem(CALM_KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const stillness = osReduced || calm;

  useEffect(() => {
    document.documentElement.dataset.still = stillness ? "true" : "false";
    document.documentElement.dataset.notes = notes ? "true" : "false";
  }, [stillness, notes]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 5200);
  }, []);

  const value = useMemo(
    () => ({ calm, setCalm, stillness, notes, setNotes, toast, showToast }),
    [calm, setCalm, stillness, notes, toast, showToast],
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
