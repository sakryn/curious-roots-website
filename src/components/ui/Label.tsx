import type { ReactNode } from "react";

/**
 * Small editorial label above a section heading: a roman numeral, a few
 * words in small capitals, and a thin rule running out to the margin.
 */
export function Label({ n, children, className = "" }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label ${className}`}>
      {n && <span className="label__n">{n}</span>}
      <span className="label__t">{children}</span>
      <span className="label__rule" aria-hidden="true" />
    </p>
  );
}
