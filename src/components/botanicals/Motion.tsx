"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useStillness } from "@/lib/experience";
import { rootSystem, soilHatch, smooth, offsetLine, rng, f, type RootStroke, type Pt } from "@/lib/ink";
import { Flower, type PlantKind } from "./Wildflowers";

/* ------------------------------------------------------------------ */
/* Parallax: drifts its children at a different speed than the page.   */
/* ------------------------------------------------------------------ */

export function Parallax({
  speed = 0.2,
  children,
  className,
  style,
}: {
  speed?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStillness();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 140, -speed * 140]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: still ? 0 : y }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared root rendering                                               */
/* ------------------------------------------------------------------ */

const rootClass = (s: RootStroke) => {
  if (s.kind === "hair" || s.kind === "hatch") return "rt rt--hair";
  if (s.kind === "echo") return "rt rt--echo";
  if (s.kind === "nodule") return "rt rt--nodule";
  return `rt rt--${Math.min(4, Math.floor(s.depth))}`;
};

/** Static set of root strokes that inks itself in, generation by generation. */
function RootStrokes({ strokes, delay = 0, pace = 0.55 }: { strokes: RootStroke[]; delay?: number; pace?: number }) {
  return (
    <>
      {strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          className={rootClass(s)}
          pathLength={1}
          style={{ ["--d" as string]: `${(delay + s.t * pace).toFixed(2)}s` }}
        />
      ))}
    </>
  );
}

function useSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setSize((prev) =>
        Math.abs(prev.w - el.offsetWidth) < 2 && Math.abs(prev.h - el.offsetHeight) < 24 ? prev : { w: el.offsetWidth, h: el.offsetHeight },
      );
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

/* ------------------------------------------------------------------ */
/* RootGrow: a root network that creeps in from a section edge when    */
/* the section scrolls into view.                                      */
/* ------------------------------------------------------------------ */

const ROOT_SETS = {
  corner: { x: 4, y: 236, angle: -0.95, length: 210, seed: 41, gravity: 0, branching: 2.6 },
  low: { x: 0, y: 228, angle: -0.22, length: 250, seed: 57, gravity: 0, branching: 2.4 },
};

export function RootGrow({
  variant = "corner",
  className = "",
  flip = false,
}: {
  variant?: keyof typeof ROOT_SETS;
  className?: string;
  flip?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const v = ROOT_SETS[variant];
  const strokes = useMemo(
    () =>
      rootSystem({
        x: v.x,
        y: v.y,
        angle: v.angle,
        length: v.length,
        seed: v.seed,
        gravity: v.gravity,
        wander: 0.3,
        maxDepth: 4,
        spread: 1.05,
        branching: v.branching,
        bounds: { x0: 0, y0: 0, x1: 240, y1: 240 },
      }),
    [v],
  );
  return (
    <svg
      ref={ref}
      viewBox="0 0 240 240"
      className={`root-grow ${inView ? "ink-draw" : "ink-wait"} ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <RootStrokes strokes={strokes} pace={0.5} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* RootSpine: one taproot that grows down the whole page as you        */
/* scroll, putting out a full root network toward each section.        */
/* ------------------------------------------------------------------ */

export const SPINE = {
  desktop: { w: 124, x: 46, amp: 16, step: 300 },
  mobile: { w: 46, x: 15, amp: 5, step: 250 },
};

interface SpineNode {
  at: number;
  strokes: RootStroke[];
  sprout: { x: number; y: number; kind: number } | null;
}

function buildSpine(h: number, mobile: boolean) {
  const g = mobile ? SPINE.mobile : SPINE.desktop;
  const r = rng(Math.round(h / 50) + (mobile ? 7 : 3));
  const n = Math.max(2, Math.round(h / g.step));
  const pts: Pt[] = [];
  for (let i = 0; i <= n * 3; i++) {
    const y = (i / (n * 3)) * h;
    const x = g.x + Math.sin(i * 0.47 + 0.4) * g.amp + (r() - 0.5) * (mobile ? 2 : 5);
    pts.push([i === 0 ? g.x : x, y]);
  }
  const d = smooth(pts);
  const echo = smooth(offsetLine(pts, mobile ? 1.4 : 2.2, r, 0.8));

  const nodes: SpineNode[] = [];
  for (let i = 1; i < n; i++) {
    const p = pts[i * 3];
    const rightward = mobile || i % 3 !== 2;
    const reach = rightward ? g.w - p[0] - 4 : p[0] - 4;
    const strokes = rootSystem({
      x: p[0],
      y: p[1],
      angle: rightward ? 0.55 + (r() - 0.5) * 0.3 : Math.PI - 0.55,
      length: reach * (mobile ? 1.7 : 1.6),
      seed: 100 + i * 17 + (mobile ? 5 : 0),
      maxDepth: mobile ? 3 : 4,
      wander: 0.34,
      gravity: 0.03,
      spread: 1.1,
      branching: mobile ? 1.8 : 2.8,
      echo: !mobile,
      maxStrokes: mobile ? 70 : 220,
      bounds: { x0: 0, y0: p[1] - 30, x1: g.w, y1: p[1] + (mobile ? 120 : 220) },
    });
    for (let k = 0; k < (mobile ? 4 : 12); k++) {
      const hp = pts[Math.min(pts.length - 1, i * 3 + 1 + (k % 2))];
      const s = k % 2 ? 1 : -1;
      const len = 3 + r() * 6;
      strokes.push({ d: `M${f(hp[0])} ${f(hp[1] + k * 6)} l${f(s * len)} ${f(len * 0.6)}`, depth: 4, t: 1 + r(), kind: "hair" });
    }
    const last = strokes.find((s) => s.depth === 0 && s.kind === "root");
    let sprout: SpineNode["sprout"] = null;
    if (rightward && last) {
      const m = last.d.match(/(-?[\d.]+) (-?[\d.]+)$/);
      if (m) sprout = { x: parseFloat(m[1]), y: parseFloat(m[2]), kind: i % 3 };
    }
    nodes.push({ at: p[1] / h, strokes, sprout });
  }
  return { d, echo, nodes, w: g.w };
}

function SpineNodeView({ node, progress }: { node: SpineNode; progress: MotionValue<number> }) {
  const g0 = useTransform(progress, [node.at - 0.004, node.at + 0.02], [0, 1], { clamp: true });
  const g1 = useTransform(progress, [node.at + 0.004, node.at + 0.03], [0, 1], { clamp: true });
  const g2 = useTransform(progress, [node.at + 0.012, node.at + 0.04], [0, 1], { clamp: true });
  const g3 = useTransform(progress, [node.at + 0.02, node.at + 0.05], [0, 1], { clamp: true });
  const bloom = useTransform(progress, [node.at + 0.035, node.at + 0.06], [0, 1], { clamp: true });
  const mv = [g0, g1, g2, g3];
  return (
    <g>
      {node.strokes.map((s, i) => {
        const gen = Math.min(3, Math.floor(s.t / 0.7));
        return <motion.path key={i} d={s.d} className={rootClass(s)} style={{ pathLength: mv[gen], opacity: mv[gen] }} />;
      })}
      {node.sprout && (
        <motion.g style={{ opacity: bloom }}>
          <SpineSprout {...node.sprout} />
        </motion.g>
      )}
    </g>
  );
}

/** Small engraved forms at the tips: a fern crozier, a seed pod, a tiny umbel. */
function SpineSprout({ x, y, kind }: { x: number; y: number; kind: number }) {
  if (kind === 0) {
    return (
      <g transform={`translate(${f(x)} ${f(y)})`} className="sprout-ink">
        <path d="M0 0 C-1 -8 2 -14 7 -15 C12 -15 13 -9 9 -8 C6 -7 6 -11 8 -11" />
        <path d="M1 -6 l-4 -2 M1.5 -10 l-3.5 -3" />
      </g>
    );
  }
  if (kind === 1) {
    return (
      <g transform={`translate(${f(x)} ${f(y)})`} className="sprout-ink">
        <path d="M0 0 C1 -5 0 -9 0 -12" />
        <path d="M0 -12 C-4 -13 -4 -21 0 -24 C4 -21 4 -13 0 -12Z" className="sprout-ink__pod" />
        <path d="M-2 -14 C-2.5 -18 -1.5 -21 0 -23 M2 -14 C2.5 -18 1.5 -21 0 -23" />
      </g>
    );
  }
  const rays = [-0.9, -0.45, 0, 0.45, 0.9];
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} className="sprout-ink">
      <path d="M0 0 L0 -12" />
      {rays.map((a) => (
        <path key={a} d={`M0 -12 L${f(Math.sin(a) * 7)} ${f(-12 - Math.cos(a) * 5)}`} />
      ))}
      {rays.map((a) => (
        <circle key={`c${a}`} cx={f(Math.sin(a) * 7)} cy={f(-12 - Math.cos(a) * 5)} r="0.9" />
      ))}
    </g>
  );
}

function useSpineGeometry(ref: React.RefObject<HTMLDivElement | null>) {
  const [dims, setDims] = useState({ h: 0, mobile: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setDims((prev) => {
        const next = { h: el.offsetHeight, mobile: window.innerWidth < 760 };
        return Math.abs(prev.h - next.h) < 40 && prev.mobile === next.mobile ? prev : next;
      });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ref]);
  return dims;
}

export function RootSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStillness();
  const { h, mobile } = useSpineGeometry(ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 90%"] });
  const smoothP = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });
  const full = useMotionValue(1);
  const progress = still ? full : smoothP;
  const geo = useMemo(() => (h > 0 ? buildSpine(h, mobile) : null), [h, mobile]);

  return (
    <div ref={ref} className="root-spine" aria-hidden="true">
      {geo && (
        <svg width={geo.w} height={h} viewBox={`0 0 ${geo.w} ${h}`} focusable="false">
          <motion.path d={geo.d} className="rt rt--spine" style={{ pathLength: progress }} />
          <motion.path d={geo.echo} className="rt rt--echo" style={{ pathLength: progress }} />
          {geo.nodes.map((n, i) => (
            <SpineNodeView key={i} node={n} progress={progress} />
          ))}
        </svg>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HeroRoots: the one orchestrated moment. Under the soil line, a full */
/* root network inks itself in beneath the plants on the horizon.      */
/* ------------------------------------------------------------------ */

export interface RootOrigin {
  /** % from left, matching the plant above */
  x: number;
  length: number;
  depth?: number;
  seed: number;
  /** only on wide screens */
  wide?: boolean;
}

export function HeroRoots({ origins, delay = 1.1 }: { origins: RootOrigin[]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { w, h } = useSize(ref);
  const mobile = w > 0 && w < 760;

  const strokes = useMemo(() => {
    if (!w || !h) return [];
    const all: RootStroke[] = [];
    origins
      .filter((o) => !(mobile && o.wide))
      .forEach((o, idx) => {
        const x = (o.x / 100) * w;
        const len = Math.min(h * 0.95, o.length * (mobile ? 0.62 : 1));
        all.push(
          ...rootSystem({
            x,
            y: 0,
            angle: Math.PI / 2 + (rng(o.seed)() - 0.5) * 0.3,
            length: len,
            seed: o.seed,
            maxDepth: mobile ? Math.min(3, o.depth ?? 4) : (o.depth ?? 4),
            wander: 0.32,
            gravity: 0.05,
            spread: 1.2,
            branching: 3,
            nodules: true,
            maxStrokes: mobile ? 90 : 260,
            bounds: { x0: 0, y0: -2, x1: w, y1: h },
          }).map((s) => ({ ...s, t: s.t + idx * 0.15 })),
        );
        all.push(...soilHatch(x, 0, mobile ? 30 : 60, o.seed + 1, mobile ? 3 : 5));
      });
    return all;
  }, [w, h, origins, mobile]);

  return (
    <div ref={ref} className="hero-roots" aria-hidden="true">
      {strokes.length > 0 && (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="ink-draw" focusable="false">
          <RootStrokes strokes={strokes} delay={delay} pace={0.6} />
        </svg>
      )}
    </div>
  );
}

/** The taproot that leaves the hero and becomes the page-long spine. */
export function HeroTaproot() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const u = () => setMobile(window.innerWidth < 760);
    u();
    window.addEventListener("resize", u);
    return () => window.removeEventListener("resize", u);
  }, []);
  const g = mobile ? SPINE.mobile : SPINE.desktop;
  const strokes = useMemo(() => {
    const r = rng(5);
    const pts: Pt[] = [];
    const sx = mobile ? g.x + 2 : g.w + 46;
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const x = sx + (g.x - sx) * (t * t * (3 - 2 * t)) + (i > 0 && i < 10 ? (r() - 0.5) * 3 : 0);
      pts.push([x, t * 300]);
    }
    const out: RootStroke[] = [
      { d: smooth(pts), depth: 0, t: 0, kind: "root" },
      { d: smooth(offsetLine(pts, 2, r, 0.6)), depth: 0.5, t: 0.2, kind: "echo" },
    ];
    for (let k = 1; k < 9; k++) {
      const p = pts[k];
      const s = k % 2 ? 1 : -1;
      out.push({ d: `M${f(p[0])} ${f(p[1])} l${f(s * (4 + r() * 6))} ${f(4 + r() * 5)}`, depth: 4, t: 0.8 + k * 0.1, kind: "hair" });
    }
    return out;
  }, [mobile, g]);
  return (
    <svg className="hero-taproot ink-draw" width={g.w + 60} height="300" viewBox={`0 0 ${g.w + 60} 300`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <RootStrokes strokes={strokes} delay={1.2} pace={0.9} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Meadow: engraved plants along a ground line, in depth layers that   */
/* drift at different speeds, lean toward the pointer, and ink         */
/* themselves in when they come into view.                             */
/* ------------------------------------------------------------------ */

export interface MeadowStem {
  kind: PlantKind;
  seed?: number;
  /** % from left */
  left: number;
  /** height in rem at desktop size */
  h: number;
  /** 0 back, 1 middle, 2 front */
  layer: 0 | 1 | 2;
  /** degrees of lean */
  tilt?: number;
  /** an unfinished sketch that fades toward the ground */
  sketch?: boolean;
  phase?: number;
  hideOnMobile?: boolean;
}

export function Meadow({
  stems,
  className = "",
  interactive = false,
  delay = 0,
}: {
  stems: MeadowStem[];
  className?: string;
  interactive?: boolean;
  /** seconds before the plants start inking in */
  delay?: number;
}) {
  const still = useStillness();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const pointer = useMotionValue(0);
  const lean = useSpring(pointer, { stiffness: 30, damping: 14 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useEffect(() => {
    if (!interactive || still) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.set((e.clientX / window.innerWidth) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, still, pointer]);

  return (
    <div ref={ref} className={`meadow ${inView ? "ink-draw" : "ink-wait"} ${className}`} aria-hidden="true">
      {([0, 1, 2] as const).map((layer) => (
        <MeadowLayer
          key={layer}
          layer={layer}
          stems={stems.filter((s) => s.layer === layer)}
          lean={lean}
          scroll={scrollYProgress}
          still={still}
          delay={delay}
        />
      ))}
    </div>
  );
}

function MeadowLayer({
  layer,
  stems,
  lean,
  scroll,
  still,
  delay,
}: {
  layer: 0 | 1 | 2;
  stems: MeadowStem[];
  lean: MotionValue<number>;
  scroll: MotionValue<number>;
  still: boolean;
  delay: number;
}) {
  const depth = [0.4, 0.75, 1.2][layer];
  const rotate = useTransform(lean, [-1, 1], [-2.2 * depth, 2.2 * depth]);
  const x = useTransform(lean, [-1, 1], [-5 * depth, 5 * depth]);
  const y = useTransform(scroll, [0, 1], [10 * depth, -18 * depth]);
  return (
    <motion.div className={`meadow__layer meadow__layer--${layer}`} style={still ? undefined : { x, y }}>
      {stems.map((s, i) => (
        <motion.div
          key={i}
          className={`meadow__stem ${s.hideOnMobile ? "meadow__stem--wide" : ""}`}
          style={{
            left: `${s.left}%`,
            ["--h" as string]: `${s.h}rem`,
            ["--d" as string]: `${(delay + layer * 0.25 + i * 0.16).toFixed(2)}s`,
            ...(still ? {} : { rotate }),
          }}
        >
          <div className="meadow__tilt" style={s.tilt ? { transform: `rotate(${s.tilt}deg)` } : undefined}>
            <Flower kind={s.kind} seed={s.seed ?? i + layer * 7} sketch={s.sketch} phase={s.phase ?? i * 0.9 + layer * 1.7} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export { Flower };
