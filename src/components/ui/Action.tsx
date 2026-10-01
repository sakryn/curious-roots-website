"use client";

import type { ReactNode, MouseEvent } from "react";
import { links, type LinkKey } from "@/config/links";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { useExperience } from "@/lib/experience";
import { Sprout } from "@/components/botanicals/Glyphs";

type Variant = "primary" | "secondary" | "quiet" | "light" | "text";

interface ActionProps {
  link: LinkKey;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Show the small sprout that grows on hover (primary buttons). */
  sprout?: boolean;
  onAfter?: () => void;
}

/**
 * The one component every button and link on the site goes through.
 *
 * Prototype mode: renders a <button> that explains where it will go.
 * Live mode: renders a real <a> to the URL in src/config/links.ts.
 */
export function Action({ link, children, variant = "primary", className = "", sprout, onAfter }: ActionProps) {
  const target = links[link];
  const { showToast } = useExperience();
  const cls = `action action--${variant} ${className}`.trim();
  const showSprout = sprout ?? variant === "primary";

  const inner = (
    <>
      {showSprout && <Sprout className="action__sprout" />}
      <span className="action__label">{children}</span>
    </>
  );

  const live = !site.prototypeMode && target.href;

  if (live) {
    return (
      <a
        className={cls}
        href={target.href!}
        {...(target.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={() => {
          track(target.event);
          onAfter?.();
        }}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      data-prototype-link={link}
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        track(target.event, { prototype: "true" });
        showToast(target.prototypeNote);
        onAfter?.();
      }}
    >
      {inner}
    </button>
  );
}
