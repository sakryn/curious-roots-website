"use client";

import type { ReactNode, MouseEvent } from "react";
import Link from "next/link";
import { links, type LinkKey } from "@/config/links";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { useExperience } from "@/lib/experience";
import { Sprout } from "@/components/botanicals/Glyphs";

type Variant = "primary" | "secondary" | "quiet" | "light" | "text" | "accent";

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
 * URLs live in src/config/links.ts.
 */
export function Action({ link, children, variant = "primary", className = "", sprout, onAfter }: ActionProps) {
  const target = links[link];
  const { showToast } = useExperience();
  const cls = `action action--${variant} ${className}`.trim();
  const showSprout = sprout ?? (variant === "primary" || variant === "accent");

  const inner = (
    <>
      {showSprout && <Sprout className="action__sprout" />}
      <span className="action__label">{children}</span>
      {target.external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (!site.prototypeMode && target.href) {
    const href = target.href;
    const onClick = () => {
      track(target.event);
      onAfter?.();
    };
    if (href.startsWith("/")) {
      return (
        <Link className={cls} href={href} onClick={onClick}>
          {inner}
        </Link>
      );
    }
    return (
      <a
        className={cls}
        href={href}
        {...(target.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={onClick}
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
