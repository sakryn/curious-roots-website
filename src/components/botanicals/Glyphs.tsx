/**
 * Small marks. Most engraved art lives in Emblems.tsx; this file keeps the
 * button sprout, the chevron, and re-exports for older imports.
 */
export { LogoMark, StatusGlyph, Sprig, Motif, OfferingIcon } from "./Emblems";

/** Tiny pen-drawn sprout that unfurls inside primary buttons on hover. */
export function Sprout({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
      <path className="sprout__stem" d="M10 18.5 C10 15 9.6 12 10 9" />
      <path className="sprout__leaf sprout__leaf--l" d="M10 11.5 C6.2 11.6 4.2 8.8 4 5.6 C7.2 5.8 9.6 8 10 11.5z M10 11.5 L6 7.4" />
      <path className="sprout__leaf sprout__leaf--r" d="M10 9.4 C13.6 9.2 15.8 6.6 16 3.4 C12.8 3.6 10.4 5.8 10 9.4z M10 9.4 L13.8 5.4" />
    </svg>
  );
}

/** Kept for older imports: an engraved sprig. */
export { Sprig as Leaf } from "./Emblems";

export function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path d="M3 6 L8 11 L13 6" />
    </svg>
  );
}
