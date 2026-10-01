import { Fragment } from "react";

/**
 * Renders copy and turns any [BRACKETED PLACEHOLDER] into a highlighted
 * "needs confirmation" mark, so unverified details are impossible to miss.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[") && p.endsWith("]") ? (
          <mark key={i} className="confirm" title="Needs Sarah's confirmation before launch">
            {p.slice(1, -1)}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
