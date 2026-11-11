import type { ReactNode } from "react";
import { site } from "@/config/site";

/** Margin note used only during the early prototype review. Renders nothing on the live site. */
export function PrototypeNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  if (!site.prototypeMode) return null;
  return (
    <aside className={`proto-note ${className}`} aria-label="Prototype note">
      <span className="proto-note__pin" aria-hidden="true" />
      {children}
    </aside>
  );
}
