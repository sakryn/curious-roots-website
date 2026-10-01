import type { ReactNode } from "react";

/**
 * A handwritten-style margin note for Sarah's review.
 * Visible only while "Show notes" is on in the prototype bar.
 */
export function PrototypeNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <aside className={`proto-note ${className}`} aria-label="Prototype note">
      <span className="proto-note__pin" aria-hidden="true" />
      {children}
    </aside>
  );
}
