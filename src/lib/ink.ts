/**
 * Pen-and-ink geometry helpers.
 *
 * Everything botanical on the site is drawn procedurally from a fixed seed,
 * so each plant and root looks hand-drawn (slightly irregular) but renders
 * identically on the server and in the browser.
 */

export type Rng = () => number;

/** Small deterministic PRNG (mulberry32). */
export function rng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const f = (n: number) => (Math.round(n * 10) / 10).toString();

export type Pt = [number, number];

/** Smooth curve through points (Catmull-Rom converted to cubic Béziers). */
export function smooth(pts: Pt[], tension = 0.5): string {
  if (pts.length < 2) return "";
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  if (pts.length === 2) return d + ` L${f(pts[1][0])} ${f(pts[1][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const t = tension / 3;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** A slightly wavering line between two points, like a pen stroke. */
export function wobble(a: Pt, b: Pt, r: Rng, amt = 0.8, segs = 3): string {
  const pts: Pt[] = [a];
  for (let i = 1; i < segs; i++) {
    const t = i / segs;
    const nx = -(b[1] - a[1]);
    const ny = b[0] - a[0];
    const len = Math.hypot(nx, ny) || 1;
    const o = (r() - 0.5) * 2 * amt;
    pts.push([a[0] + (b[0] - a[0]) * t + (nx / len) * o, a[1] + (b[1] - a[1]) * t + (ny / len) * o]);
  }
  pts.push(b);
  return smooth(pts);
}

/** Offsets a polyline sideways: used for the second "echo" line of an engraving. */
export function offsetLine(pts: Pt[], dist: number, r: Rng, jitter = 0.4): Pt[] {
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const o = dist + (r() - 0.5) * jitter;
    return [p[0] - (dy / len) * o, p[1] + (dx / len) * o] as Pt;
  });
}

/* ------------------------------------------------------------------ */
/* Root systems                                                        */
/* ------------------------------------------------------------------ */

export type RootKind = "root" | "echo" | "hair" | "hatch" | "nodule";

export interface RootStroke {
  d: string;
  /** 0 = main root, higher = finer feeder roots */
  depth: number;
  /** When this stroke should start drawing, 0..~5 (in "generations") */
  t: number;
  kind: RootKind;
}

export interface RootOptions {
  x: number;
  y: number;
  /** radians; PI/2 points straight down */
  angle: number;
  length: number;
  seed: number;
  maxDepth?: number;
  /** how much each root meanders */
  wander?: number;
  /** pull toward straight down (0..1) */
  gravity?: number;
  /** children per root, roughly */
  branching?: number;
  /** angle range of side roots, radians */
  spread?: number;
  hairs?: boolean;
  echo?: boolean;
  nodules?: boolean;
  /** stop roots from leaving this box */
  bounds?: { x0: number; y0: number; x1: number; y1: number };
  maxStrokes?: number;
}

/**
 * Grows a full branching root system: a main root, side roots, thin feeder
 * roots and, at the tips, root hairs. Returned strokes carry a depth and a
 * start time so the system can be drawn generation by generation.
 */
export function rootSystem(o: RootOptions): RootStroke[] {
  const r = rng(o.seed);
  const maxDepth = o.maxDepth ?? 4;
  const wander = o.wander ?? 0.28;
  const gravity = o.gravity ?? 0.08;
  const branching = o.branching ?? 2.6;
  const spread = o.spread ?? 1.0;
  const maxStrokes = o.maxStrokes ?? 420;
  const out: RootStroke[] = [];
  const b = o.bounds;

  const grow = (x: number, y: number, ang: number, len: number, depth: number, t0: number) => {
    if (out.length > maxStrokes || len < 4) return;
    const step = Math.max(3.2, Math.min(14, len / 7));
    const n = Math.max(3, Math.round(len / step));
    const pts: Pt[] = [[x, y]];
    const angles: number[] = [ang];
    let a = ang;
    let cx = x;
    let cy = y;
    for (let i = 0; i < n; i++) {
      a += (r() - 0.5) * wander + (Math.PI / 2 - a) * gravity;
      cx += Math.cos(a) * step;
      cy += Math.sin(a) * step;
      if (b && (cx < b.x0 || cx > b.x1 || cy < b.y0 || cy > b.y1)) break;
      pts.push([cx, cy]);
      angles.push(a);
    }
    if (pts.length < 2) return;
    out.push({ d: smooth(pts), depth, t: t0, kind: "root" });
    if ((o.echo ?? true) && depth <= 1 && pts.length > 3) {
      const echo = offsetLine(pts.slice(0, Math.ceil(pts.length * 0.8)), depth === 0 ? 1.6 : 1.1, r);
      out.push({ d: smooth(echo), depth: depth + 0.5, t: t0 + 0.15, kind: "echo" });
    }

    // side roots
    if (depth < maxDepth) {
      const kids = Math.max(1, Math.round(branching * (0.6 + r() * 0.8) * (depth === 0 ? 1.6 : 1)));
      for (let k = 0; k < kids; k++) {
        const at = 1 + Math.floor((0.12 + r() * 0.8) * (pts.length - 2));
        const p = pts[at];
        if (!p) continue;
        const side = r() < 0.5 ? -1 : 1;
        const ca = angles[at] + side * (0.35 + r() * spread);
        const cl = len * (0.32 + r() * 0.38) * (1 - (at / pts.length) * 0.45);
        grow(p[0], p[1], ca, cl, depth + 1, t0 + 0.4 + (at / pts.length) * 0.9);
      }
    }

    // nodules: tiny swellings on mid-depth roots
    if (o.nodules && depth === 2 && r() < 0.5) {
      const p = pts[Math.floor(pts.length / 2)];
      const rad = 1 + r() * 1.2;
      out.push({
        d: `M${f(p[0] - rad)} ${f(p[1])} a${f(rad)} ${f(rad)} 0 1 0 ${f(rad * 2)} 0 a${f(rad)} ${f(rad)} 0 1 0 ${f(-rad * 2)} 0`,
        depth,
        t: t0 + 1,
        kind: "nodule",
      });
    }

    // root hairs on the finest roots
    if ((o.hairs ?? true) && depth >= maxDepth - 1) {
      for (let i = 1; i < pts.length; i += 1) {
        if (r() < 0.45) continue;
        const p = pts[i];
        const ha = angles[i] + (r() < 0.5 ? -1 : 1) * (0.9 + r() * 0.7);
        const hl = 1.6 + r() * 3.2;
        out.push({
          d: `M${f(p[0])} ${f(p[1])} L${f(p[0] + Math.cos(ha) * hl)} ${f(p[1] + Math.sin(ha) * hl)}`,
          depth: depth + 1,
          t: t0 + 0.9 + (i / pts.length) * 0.6,
          kind: "hair",
        });
      }
    }
  };

  grow(o.x, o.y, o.angle, o.length, 0, 0);
  return out;
}

/**
 * Etched soil around a root crown: little groups of short parallel strokes,
 * some crossed, like the ground line on an antique specimen plate.
 */
export function soilHatch(cx: number, cy: number, w: number, seed: number, groups = 7): RootStroke[] {
  const r = rng(seed);
  const out: RootStroke[] = [];
  for (let g = 0; g < groups; g++) {
    const gx = cx + (r() - 0.5) * w;
    const gy = cy + 2 + r() * 10;
    const ang = 2.2 + (r() - 0.5) * 0.3;
    const count = 3 + Math.floor(r() * 4);
    const len = 3 + r() * 4;
    const cross = r() < 0.35;
    for (let i = 0; i < count; i++) {
      const x = gx + i * 1.9;
      out.push({
        d: `M${f(x)} ${f(gy)} l${f(Math.cos(ang) * len)} ${f(Math.sin(ang) * len)}`,
        depth: 3,
        t: 0.2 + r() * 0.6,
        kind: "hatch",
      });
      if (cross && i % 2 === 0) {
        out.push({
          d: `M${f(x - 1)} ${f(gy + len * 0.6)} l${f(len * 0.9)} ${f(-len * 0.45)}`,
          depth: 3,
          t: 0.5 + r() * 0.5,
          kind: "hatch",
        });
      }
    }
  }
  return out;
}

/** Stroke width (in px, non-scaling) for a root of a given depth. */
export function rootWidth(s: RootStroke, scale = 1) {
  if (s.kind === "hair" || s.kind === "hatch") return 0.45 * scale;
  if (s.kind === "echo") return 0.5 * scale;
  if (s.kind === "nodule") return 0.6 * scale;
  return [2.1, 1.35, 0.9, 0.62, 0.48, 0.4][Math.min(5, Math.floor(s.depth))] * scale;
}
