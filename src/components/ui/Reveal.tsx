"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/** Gentle rise-into-place. Used sparingly: section headings and a few key blocks. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "header";
}) {
  const M = as === "header" ? motion.header : motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
