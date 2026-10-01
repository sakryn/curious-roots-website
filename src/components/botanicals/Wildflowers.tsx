"use client";

import { useMemo, type CSSProperties } from "react";
import { rng, smooth, wobble, offsetLine, f, type Pt, type Rng } from "@/lib/ink";

/**
 * Engraved botanical plates.
 *
 * Every plant is drawn procedurally in a 120 x 320 viewBox, rooted at
 * bottom-center (60, 320), in the manner of a pen-and-ink field-guide plate:
 * fine lines in two inks, hatched shading, and only the faintest wash of
 * color on a petal or pod. The same seed always draws the same plant.
 *
 * Stroke classes (see globals.css):
 *   l1 main line, l2 secondary, l3 hairline, sep = sepia ink
 *   hf hatched fill, hx crosshatched fill
 *   w-* faint watercolor wash (ochre, lavender, burgundy, blue, rust, rose)
 * Stage classes s0..s3 order the draw-on animation: stem, leaves, flower, detail.
 */

export type PlantKind =
  | "fern"
  | "umbel"
  | "umbelDry"
  | "seedhead"
  | "grass"
  | "pod"
  | "teasel"
  | "bell"
  | "hellebore"
  | "rose"
  | "vine";

interface El {
  d: string;
  c: string;
}

export type Out = El[];

const BASE: Pt = [60, 320];

/* ------------------------------ helpers ------------------------------ */

export const add = (o: Out, d: string, c: string) => {
  if (d) o.push({ d, c });
};

/** Closed shape from two edges that share start and end points. */
export function closed(a: Pt[], b: Pt[]) {
  return smooth(a) + smooth(b).replace(/^M/, " L") + "Z";
}

function along(a: Pt, b: Pt, t: number): Pt {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

/** A stem as a list of points from the base upward, with a gentle bend. */
function stemPts(r: Rng, from: Pt, to: Pt, bend: number, n = 7): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const p = along(from, to, t);
    p[0] += Math.sin(t * Math.PI) * bend + (i > 0 && i < n ? (r() - 0.5) * 1.4 : 0);
    pts.push(p);
  }
  return pts;
}

function pointAt(pts: Pt[], t: number): { p: Pt; ang: number } {
  const i = Math.min(pts.length - 2, Math.max(0, Math.floor(t * (pts.length - 1))));
  const local = t * (pts.length - 1) - i;
  const a = pts[i];
  const b = pts[i + 1];
  return { p: along(a, b, local), ang: Math.atan2(b[1] - a[1], b[0] - a[0]) };
}

interface LeafOpts {
  veins?: number;
  hatch?: boolean;
  serrate?: boolean;
  wash?: string;
  stage?: string;
  /** width profile exponent: <1 fuller, >1 narrower */
  shape?: number;
}

/** A leaf with outline, midrib, side veins and optional hatching on one half. */
export function leaf(o: Out, r: Rng, base: Pt, ang: number, len: number, wid: number, opts: LeafOpts = {}) {
  const st = opts.stage ?? "s1";
  const n = 9;
  const ax: Pt[] = [];
  const L: Pt[] = [];
  const R: Pt[] = [];
  const bend = (r() - 0.5) * 0.35;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = ang + bend * t;
    const p: Pt = [base[0] + Math.cos(a) * len * t, base[1] + Math.sin(a) * len * t];
    ax.push(p);
    let w = wid * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.05)), opts.shape ?? 0.85) * (1 - t * 0.15);
    if (opts.serrate && i > 0 && i < n) w *= i % 2 ? 1.12 : 0.9;
    const nx = -Math.sin(a);
    const ny = Math.cos(a);
    L.push([p[0] + nx * w * (1 + (r() - 0.5) * 0.08), p[1] + ny * w]);
    R.push([p[0] - nx * w, p[1] - ny * w * (1 + (r() - 0.5) * 0.08)]);
  }
  L[0] = R[0] = ax[0];
  L[n] = R[n] = ax[n];
  const outline = closed(L, [...R].reverse());
  if (opts.wash) add(o, outline, `fl ${opts.wash} ${st}`);
  if (opts.hatch) add(o, closed(L, [...ax].reverse()), `fl hf ${st}`);
  add(o, outline, `l l2 ${st}`);
  add(o, smooth(ax.slice(0, n)), `l l3 ${st}`);
  const veins = opts.veins ?? 4;
  for (let v = 1; v <= veins; v++) {
    const t = v / (veins + 1);
    const i = Math.round(t * n * 0.9);
    const p = ax[i];
    const e1 = L[Math.min(n, i + 1)];
    const e2 = R[Math.min(n, i + 1)];
    add(o, `M${f(p[0])} ${f(p[1])} Q${f((p[0] + e1[0]) / 2)} ${f((p[1] + e1[1]) / 2 + 0.6)} ${f(e1[0] * 0.85 + p[0] * 0.15)} ${f(e1[1] * 0.85 + p[1] * 0.15)}`, `l l3 ${st}`);
    add(o, `M${f(p[0])} ${f(p[1])} Q${f((p[0] + e2[0]) / 2)} ${f((p[1] + e2[1]) / 2 + 0.6)} ${f(e2[0] * 0.85 + p[0] * 0.15)} ${f(e2[1] * 0.85 + p[1] * 0.15)}`, `l l3 ${st}`);
  }
}

/** A tiny circle as a path, so it can be drawn on like a stroke. */
export const ring = (x: number, y: number, rad: number) =>
  `M${f(x - rad)} ${f(y)} a${f(rad)} ${f(rad)} 0 1 0 ${f(rad * 2)} 0 a${f(rad)} ${f(rad)} 0 1 0 ${f(-rad * 2)} 0`;

/** A double-line stem, the way engravers draw a ridged stalk. */
function stalk(o: Out, r: Rng, pts: Pt[], gap = 1.1, cls = "l1") {
  add(o, smooth(pts), `l ${cls} s0`);
  add(o, smooth(offsetLine(pts.slice(0, -1), gap, r, 0.3)), "l l3 s0");
}

/* ------------------------------ species ------------------------------ */

function fern(r: Rng, crozier = r() < 0.3): Out {
  const o: Out = [];
  const lean = (r() - 0.5) * 18;
  const top: Pt = [60 + lean, 34];
  const rachis = stemPts(r, BASE, top, (r() - 0.5) * 16, 10);
  stalk(o, r, rachis, 1);
  if (crozier) {
    const [tx, ty] = top;
    add(o, `M${f(tx)} ${f(ty)} c${f(-2)} -10 10 -14 12 -6 c2 6 -5 8 -6 4 c-0.6 -2 1.4 -3 2.2 -1.6`, "l l2 s2");
  }
  const count = 15;
  for (let i = 1; i <= count; i++) {
    const t = 0.1 + (i / count) * 0.86;
    const { p, ang } = pointAt(rachis, t);
    const L = 44 * Math.pow(Math.sin(Math.PI * (0.18 + t * 0.78)), 0.8) * (1 - t * 0.35) + 2;
    for (const side of [-1, 1]) {
      const a = ang + side * (1.05 + (r() - 0.5) * 0.12) + (side > 0 ? 0 : 0);
      const base: Pt = [p[0] + side * 0.4, p[1] - (side > 0 ? 1.5 : 0)];
      const lobes = Math.max(3, Math.round(L / 4.4));
      const up: Pt[] = [];
      const dn: Pt[] = [];
      const axis: Pt[] = [];
      const steps = lobes * 3;
      const lw = Math.max(2.6, L * 0.2);
      for (let k = 0; k <= steps; k++) {
        const u = k / steps;
        const bend = a + side * -0.18 * u;
        const q: Pt = [base[0] + Math.cos(bend) * L * u, base[1] + Math.sin(bend) * L * u];
        axis.push(q);
        const scallop = 0.45 + 0.55 * Math.abs(Math.sin(u * lobes * Math.PI));
        const w = lw * Math.pow(1 - u, 0.55) * scallop;
        const nx = -Math.sin(bend);
        const ny = Math.cos(bend);
        up.push([q[0] + nx * w, q[1] + ny * w]);
        dn.push([q[0] - nx * w, q[1] - ny * w]);
      }
      up[0] = dn[0] = axis[0];
      up[steps] = dn[steps] = axis[steps];
      if (i % 3 === 0) add(o, closed(dn, [...axis].reverse()), "fl hf s1");
      add(o, closed(up, [...dn].reverse()), "l l2 s1");
      if (L > 14) add(o, smooth(axis.slice(0, Math.round(steps * 0.8))), "l l3 s1");
    }
  }
  return o;
}

function umbel(r: Rng, dry = false): Out {
  const o: Out = [];
  const lean = (r() - 0.5) * 24;
  const C: Pt = [60 + lean, dry ? 84 : 96];
  const stem = stemPts(r, BASE, C, (r() - 0.5) * 14, 9);
  stalk(o, r, stem, 1.2);

  // finely divided basal leaf
  const lb = pointAt(stem, 0.16);
  const side = r() < 0.5 ? -1 : 1;
  const lr: Pt[] = [];
  for (let i = 0; i <= 6; i++) {
    const t = i / 6;
    lr.push([lb.p[0] + side * t * 40, lb.p[1] - t * 46 - Math.sin(t * Math.PI) * 6]);
  }
  add(o, smooth(lr), "l l2 s1");
  for (let i = 1; i < 6; i++) {
    const q = lr[i];
    for (const s of [-1, 1]) {
      const a = -Math.PI / 2 + side * 0.5 + s * 0.9;
      const l = 9 - i;
      const e: Pt = [q[0] + Math.cos(a) * l, q[1] + Math.sin(a) * l];
      add(o, wobble(q, e, r, 0.4, 2), "l l3 s1");
      add(o, `M${f(e[0])} ${f(e[1])} l${f(Math.cos(a - 0.5) * 3)} ${f(Math.sin(a - 0.5) * 3)} M${f(e[0])} ${f(e[1])} l${f(Math.cos(a + 0.5) * 3)} ${f(Math.sin(a + 0.5) * 3)}`, "l l3 s1");
    }
  }

  // involucre bracts
  for (let i = 0; i < 5; i++) {
    const a = Math.PI / 2 + (i - 2) * 0.45;
    const e: Pt = [C[0] + Math.cos(a) * 9, C[1] + Math.sin(a) * 9];
    add(o, wobble(C, e, r, 0.6, 2), "l l3 s2");
    add(o, `M${f(e[0])} ${f(e[1])} l${f(-2)} 3 M${f(e[0])} ${f(e[1])} l2 3`, "l l3 s2");
  }

  // rays + umbellets
  const rays = 13;
  for (let i = 0; i < rays; i++) {
    const a = -Math.PI + 0.25 + (i / (rays - 1)) * (Math.PI - 0.5);
    const R = 34 + (r() - 0.5) * 6;
    let e: Pt;
    if (dry) {
      // curls inward into a "bird's nest"
      e = [C[0] + Math.cos(a) * R * 0.55, C[1] - 30 - Math.abs(Math.sin(a)) * 4 + Math.abs(Math.cos(a)) * 8];
      const ctrl: Pt = [C[0] + Math.cos(a) * R * 1.1, C[1] - 10];
      add(o, `M${f(C[0])} ${f(C[1])} Q${f(ctrl[0])} ${f(ctrl[1])} ${f(e[0])} ${f(e[1])}`, "l l3 sep s2");
      for (let k = 0; k < 4; k++) {
        const sa = -Math.PI / 2 + (k - 1.5) * 0.4;
        add(o, ring(e[0] + Math.cos(sa) * 2.4, e[1] + Math.sin(sa) * 2.4, 0.8), "l l3 sep s3");
      }
    } else {
      e = [C[0] + Math.cos(a) * R * 1.12, C[1] + Math.sin(a) * R * 0.66 - 4];
      add(o, wobble(C, e, r, 0.6, 3), "l l3 s2");
      const fl = 7;
      for (let k = 0; k < fl; k++) {
        const sa = -Math.PI + 0.35 + (k / (fl - 1)) * (Math.PI - 0.7);
        const sl = 4 + r() * 1.6;
        const fe: Pt = [e[0] + Math.cos(sa) * sl, e[1] + Math.sin(sa) * sl * 0.9];
        add(o, `M${f(e[0])} ${f(e[1])} L${f(fe[0])} ${f(fe[1])}`, "l l3 s3");
        add(o, ring(fe[0], fe[1], 0.95), "l l3 s3");
      }
    }
  }
  // the single dark floret at the heart of Queen Anne's lace
  if (!dry) add(o, ring(C[0] + 0.5, C[1] - 26, 1.5), "fl w-burgundy-solid s3");
  return o;
}

function seedhead(r: Rng): Out {
  const o: Out = [];
  const lean = (r() - 0.5) * 20;
  const C: Pt = [60 + lean, 66];
  const stem = stemPts(r, BASE, [C[0], C[1] + 6], (r() - 0.5) * 10, 9);
  add(o, smooth(stem), "l l1 s0");
  // grass-like leaves
  for (const s of [-1, 1]) {
    leaf(o, r, [60, 318], -Math.PI / 2 + s * (0.22 + r() * 0.2), 120 + r() * 50, 3.4, { veins: 0, shape: 1.4 });
  }
  // receptacle
  add(o, ring(C[0], C[1], 3.2), "fl hx s2");
  add(o, ring(C[0], C[1], 3.2), "l l2 sep s2");
  const n = 38;
  for (let i = 0; i < n; i++) {
    if (r() < 0.14) continue; // a few seeds already gone
    const a = (i / n) * Math.PI * 2 + (r() - 0.5) * 0.1;
    const R = 27 + (r() - 0.5) * 3;
    const d: Pt = [Math.cos(a), Math.sin(a)];
    const s0: Pt = [C[0] + d[0] * 3.6, C[1] + d[1] * 3.6];
    const s1: Pt = [C[0] + d[0] * 8, C[1] + d[1] * 8];
    const tip: Pt = [C[0] + d[0] * R, C[1] + d[1] * R];
    add(o, `M${f(s0[0])} ${f(s0[1])} L${f(s1[0])} ${f(s1[1])}`, "l l2 sep s2");
    add(o, `M${f(s1[0])} ${f(s1[1])} L${f(tip[0])} ${f(tip[1])}`, "l l3 s3");
    for (let k = -2; k <= 2; k++) {
      const pa = a + k * 0.32;
      add(o, `M${f(tip[0])} ${f(tip[1])} l${f(Math.cos(pa) * 3.6)} ${f(Math.sin(pa) * 3.6)}`, "l l3 s3");
    }
  }
  return o;
}

function grass(r: Rng): Out {
  const o: Out = [];
  const culms = 2 + Math.floor(r() * 2);
  for (let c = 0; c < culms; c++) {
    const lean = (r() - 0.5) * 50;
    const top: Pt = [60 + lean, 40 + r() * 60];
    const pts = stemPts(r, [60 + (r() - 0.5) * 6, 320], top, (r() - 0.5) * 18, 9);
    add(o, smooth(pts), "l l2 s0");
    for (const t of [0.3, 0.55, 0.75]) {
      const { p, ang } = pointAt(pts, t);
      add(o, `M${f(p[0] + Math.sin(ang) * 1.6)} ${f(p[1] - Math.cos(ang) * 1.6)} l${f(-Math.sin(ang) * 3.2)} ${f(Math.cos(ang) * 3.2)}`, "l l3 s0");
    }
    // nodding spikelets (oat-like)
    const tip = pts[pts.length - 1];
    const branches = 4 + Math.floor(r() * 3);
    for (let b = 0; b < branches; b++) {
      const { p } = pointAt(pts, 0.82 + (b / branches) * 0.18);
      const dir = b % 2 ? 1 : -1;
      const end: Pt = [p[0] + dir * (8 + r() * 10), p[1] + 6 + r() * 10];
      add(o, `M${f(p[0])} ${f(p[1])} Q${f(p[0] + dir * 6)} ${f(p[1] - 4)} ${f(end[0])} ${f(end[1])}`, "l l3 s2");
      const L = 7 + r() * 3;
      const a = Math.PI / 2 + dir * -0.3;
      const ax: Pt = [end[0] + Math.cos(a) * L, end[1] + Math.sin(a) * L];
      const nx = -Math.sin(a) * 2;
      const ny = Math.cos(a) * 2;
      const mid = along(end, ax, 0.45);
      add(o, `M${f(end[0])} ${f(end[1])} Q${f(mid[0] + nx)} ${f(mid[1] + ny)} ${f(ax[0])} ${f(ax[1])} Q${f(mid[0] - nx)} ${f(mid[1] - ny)} ${f(end[0])} ${f(end[1])}Z`, "l l3 sep s3");
      if (b % 2 === 0) add(o, `M${f(end[0])} ${f(end[1])} Q${f(mid[0] + nx)} ${f(mid[1] + ny)} ${f(ax[0])} ${f(ax[1])} L${f(mid[0])} ${f(mid[1])}Z`, "fl hf s3");
    }
    add(o, ring(tip[0], tip[1], 0.6), "l l3 s2");
  }
  for (let b = 0; b < 4; b++) {
    const a = -Math.PI / 2 + (r() - 0.5) * 1.1;
    leaf(o, r, [60 + (r() - 0.5) * 6, 319], a, 70 + r() * 70, 2.4, { veins: 0, shape: 1.6, stage: "s0" });
  }
  return o;
}

function pod(r: Rng): Out {
  const o: Out = [];
  const lean = (r() - 0.5) * 22;
  const top: Pt = [60 + lean, 118];
  const stem = stemPts(r, BASE, top, (r() - 0.5) * 20, 9);
  stalk(o, r, stem, 1);
  // lobed stem leaf
  const lp = pointAt(stem, 0.3);
  leaf(o, r, lp.p, lp.ang - 0.9, 42, 7, { veins: 4, serrate: true, hatch: true });
  // capsule
  const cx = top[0];
  const h = 52;
  const w = 15;
  const L: Pt[] = [];
  const R: Pt[] = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const ww = w * Math.pow(Math.sin(Math.PI * (0.08 + t * 0.84)), 0.7);
    L.push([cx - ww, top[1] - t * h]);
    R.push([cx + ww, top[1] - t * h]);
  }
  L[0] = R[0] = [cx, top[1]];
  const capsule = closed(L, [...R].reverse());
  add(o, capsule, "fl w-ochre s2");
  add(o, closed(R, [...R.map(([, y]) => [cx + 2, y] as Pt)].reverse()), "fl hx s2");
  add(o, capsule, "l l1 sep s2");
  for (let m = -3; m <= 3; m++) {
    if (m === 0) continue;
    const pts = L.map(([, y], i) => [cx + (R[i][0] - cx) * (m / 3.6), y] as Pt);
    add(o, smooth(pts), "l l3 sep s3");
  }
  // stigmatic crown
  const ty = top[1] - h;
  add(o, `M${f(cx - 11)} ${f(ty + 2)} Q${f(cx)} ${f(ty - 5)} ${f(cx + 11)} ${f(ty + 2)} Q${f(cx)} ${f(ty + 4)} ${f(cx - 11)} ${f(ty + 2)}Z`, "l l2 sep s3");
  for (let k = 0; k < 9; k++) {
    const x = cx - 9 + k * 2.25;
    add(o, `M${f(cx)} ${f(ty)} L${f(x)} ${f(ty + 1.5 - Math.abs(k - 4) * 0.5)}`, "l l3 sep s3");
  }
  return o;
}

function teasel(r: Rng): Out {
  const o: Out = [];
  const lean = (r() - 0.5) * 14;
  const top: Pt = [60 + lean, 92];
  const stem = stemPts(r, BASE, top, (r() - 0.5) * 8, 10);
  stalk(o, r, stem, 1.2);
  // prickles
  for (let i = 1; i < stem.length - 1; i++) {
    const p = stem[i];
    const s = i % 2 ? 1 : -1;
    add(o, `M${f(p[0])} ${f(p[1])} l${f(s * 2.6)} ${f(-1.4)}`, "l l3 sep s0");
  }
  // clasping opposite leaves
  for (const t of [0.38, 0.62]) {
    const { p, ang } = pointAt(stem, t);
    leaf(o, r, p, ang - 0.75, 40 - t * 12, 5.5, { veins: 5, hatch: t < 0.5 });
    leaf(o, r, p, ang + 0.75, 40 - t * 12, 5.5, { veins: 5 });
  }
  // the head
  const cx = top[0];
  const hb = top[1];
  const H = 42;
  const W = 10;
  const L: Pt[] = [];
  const R: Pt[] = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const ww = W * Math.pow(Math.sin(Math.PI * (0.06 + t * 0.88)), 0.6);
    L.push([cx - ww, hb - t * H]);
    R.push([cx + ww, hb - t * H]);
  }
  L[0] = R[0] = [cx, hb];
  const head = closed(L, [...R].reverse());
  add(o, head, "fl w-rust s2");
  add(o, head, "fl hx s2");
  add(o, head, "l l1 sep s2");
  for (let i = 1; i < 10; i++) {
    add(o, `M${f(L[i][0])} ${f(L[i][1])} l-2.4 -1.6 M${f(R[i][0])} ${f(R[i][1])} l2.4 -1.6`, "l l3 sep s3");
  }
  // involucral bracts curving up around the head
  for (let b = 0; b < 6; b++) {
    const s = b % 2 ? 1 : -1;
    const reach = 26 + b * 5 + r() * 6;
    add(o, `M${f(cx)} ${f(hb)} C${f(cx + s * (8 + b * 2))} ${f(hb - 4)} ${f(cx + s * (14 + b * 1.5))} ${f(hb - reach * 0.5)} ${f(cx + s * (9 + b * 1.2))} ${f(hb - reach)}`, "l l3 s3");
  }
  return o;
}

function bell(r: Rng): Out {
  const o: Out = [];
  const lean = (r() - 0.5) * 14;
  const top: Pt = [60 + lean + 18, 54];
  const stem = stemPts(r, BASE, top, -14 + (r() - 0.5) * 8, 10);
  add(o, smooth(stem), "l l1 s0");
  // arching tip
  add(o, `M${f(top[0])} ${f(top[1])} q6 -8 12 -2`, "l l2 s0");
  for (const t of [0.18, 0.32, 0.46]) {
    const { p, ang } = pointAt(stem, t);
    const s = t === 0.32 ? 1 : -1;
    leaf(o, r, p, ang + s * 0.7, 30 - t * 20, 5, { veins: 3, hatch: s < 0 });
  }
  // nodding bells
  const bells = [0.62, 0.76, 0.88, 1];
  bells.forEach((t, i) => {
    const { p } = pointAt(stem, Math.min(0.999, t));
    const s = i % 2 ? 1 : -1;
    const hang: Pt = [p[0] + s * 8, p[1] + 5];
    add(o, `M${f(p[0])} ${f(p[1])} Q${f(p[0] + s * 7)} ${f(p[1] - 4)} ${f(hang[0])} ${f(hang[1])}`, "l l2 s2");
    const len = 15 - i * 1.5;
    const wid = 7 - i * 0.5;
    const tilt = s * 0.25;
    const [x, y] = hang;
    const ca = Math.cos(tilt);
    const sa = Math.sin(tilt);
    const T = (dx: number, dy: number): string => `${f(x + dx * ca - dy * sa)} ${f(y + dx * sa + dy * ca)}`;
    const shape =
      `M${T(-1.6, 0)} C${T(-wid * 0.8, len * 0.25)} ${T(-wid * 0.8, len * 0.7)} ${T(-wid, len)}` +
      ` L${T(-wid * 0.55, len - 1.8)} L${T(-wid * 0.15, len + 0.6)} L${T(wid * 0.25, len - 1.6)} L${T(wid * 0.6, len + 0.4)} L${T(wid, len)}` +
      ` C${T(wid * 0.8, len * 0.7)} ${T(wid * 0.8, len * 0.25)} ${T(1.6, 0)}Z`;
    add(o, shape, "fl w-blue s2");
    add(o, shape, "l l2 s2");
    add(o, `M${T(-0.4, 1)} Q${T(-wid * 0.3, len * 0.6)} ${T(-wid * 0.55, len - 1.8)} M${T(0.4, 1)} Q${T(wid * 0.25, len * 0.6)} ${T(wid * 0.25, len - 1.6)}`, "l l3 s3");
    add(o, `M${T(wid * 0.35, len * 0.3)} l${f(1.2)} ${f(len * 0.5)} M${T(wid * 0.55, len * 0.35)} l${f(1)} ${f(len * 0.4)}`, "l l3 s3");
  });
  return o;
}

function hellebore(r: Rng): Out {
  const o: Out = [];
  const lean = (r() - 0.5) * 16;
  const C: Pt = [60 + lean, 92];
  const stem = stemPts(r, BASE, [C[0], C[1] + 10], (r() - 0.5) * 18, 9);
  stalk(o, r, stem, 1.1);
  // palmate leaf on its own stalk
  const lp: Pt = [60 + (r() < 0.5 ? -26 : 26), 210];
  add(o, wobble([60, 318], lp, r, 2, 4), "l l2 s0");
  for (let k = 0; k < 7; k++) {
    const a = -Math.PI / 2 + (k - 3) * 0.38;
    leaf(o, r, lp, a, 34 - Math.abs(k - 3) * 4, 4.2, { veins: 3, serrate: true, hatch: k % 3 === 0 });
  }
  // outward-facing flower, tilted
  const petals = 5;
  for (let k = 0; k < petals; k++) {
    const a = -Math.PI / 2 + (k / petals) * Math.PI * 2 + 0.2;
    const tip: Pt = [C[0] + Math.cos(a) * 25, C[1] + Math.sin(a) * 20];
    const l: Pt = [C[0] + Math.cos(a - 0.85) * 21, C[1] + Math.sin(a - 0.85) * 17];
    const rr: Pt = [C[0] + Math.cos(a + 0.85) * 21, C[1] + Math.sin(a + 0.85) * 17];
    const shape = `M${f(C[0])} ${f(C[1])} Q${f(l[0])} ${f(l[1])} ${f(tip[0])} ${f(tip[1])} Q${f(rr[0])} ${f(rr[1])} ${f(C[0])} ${f(C[1])}Z`;
    add(o, shape, "fl w-burgundy s2");
    add(o, shape, "l l2 s2");
    for (const v of [-0.22, 0, 0.22]) {
      const ve: Pt = [C[0] + Math.cos(a + v) * 19, C[1] + Math.sin(a + v) * 15];
      add(o, `M${f(C[0] + Math.cos(a) * 5)} ${f(C[1] + Math.sin(a) * 4)} L${f(ve[0])} ${f(ve[1])}`, "l l3 s3");
    }
  }
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2;
    const e: Pt = [C[0] + Math.cos(a) * 6.5, C[1] + Math.sin(a) * 5.5];
    add(o, `M${f(C[0])} ${f(C[1])} L${f(e[0])} ${f(e[1])}`, "l l3 sep s3");
    add(o, ring(e[0], e[1], 0.6), "l l3 sep s3");
  }
  // a nodding bud
  const bs = pointAt(stem, 0.78);
  const bud: Pt = [bs.p[0] - 18, bs.p[1] + 8];
  add(o, `M${f(bs.p[0])} ${f(bs.p[1])} Q${f(bs.p[0] - 12)} ${f(bs.p[1] - 10)} ${f(bud[0])} ${f(bud[1])}`, "l l2 s2");
  add(o, `M${f(bud[0])} ${f(bud[1])} c-5 2 -6 10 -1 13 c5 -2 6 -10 1 -13z`, "fl w-burgundy s2");
  add(o, `M${f(bud[0])} ${f(bud[1])} c-5 2 -6 10 -1 13 c5 -2 6 -10 1 -13z`, "l l2 s2");
  return o;
}

function rose(r: Rng): Out {
  const o: Out = [];
  const top: Pt = [70 + (r() - 0.5) * 10, 70];
  const stem = stemPts(r, BASE, top, -18, 11);
  stalk(o, r, stem, 1);
  // thorns
  for (let i = 1; i < stem.length - 1; i++) {
    const { p, ang } = pointAt(stem, i / (stem.length - 1));
    const s = i % 2 ? 1 : -1;
    const nx = -Math.sin(ang) * s;
    const ny = Math.cos(ang) * s;
    add(o, `M${f(p[0] + Math.cos(ang) * 2)} ${f(p[1] + Math.sin(ang) * 2)} L${f(p[0] + nx * 4 - Math.cos(ang) * 1.5)} ${f(p[1] + ny * 4 - Math.sin(ang) * 1.5)} L${f(p[0] - Math.cos(ang) * 2)} ${f(p[1] - Math.sin(ang) * 2)}`, "l l3 sep s0");
  }
  // compound leaves
  for (const t of [0.3, 0.55]) {
    const { p, ang } = pointAt(stem, t);
    const s = t < 0.4 ? -1 : 1;
    const ra = ang + s * 0.9;
    const rl = 34;
    const end: Pt = [p[0] + Math.cos(ra) * rl, p[1] + Math.sin(ra) * rl];
    add(o, wobble(p, end, r, 0.6, 3), "l l2 s1");
    for (let k = 1; k <= 2; k++) {
      const q = along(p, end, k / 2.6);
      leaf(o, r, q, ra - 0.9, 13, 4.2, { veins: 3, serrate: true });
      leaf(o, r, q, ra + 0.9, 13, 4.2, { veins: 3, serrate: true, hatch: k === 1 });
    }
    leaf(o, r, end, ra, 14, 4.6, { veins: 3, serrate: true });
  }
  // the open flower
  const C: Pt = [top[0], top[1] - 6];
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
    const p1: Pt = [C[0] + Math.cos(a - 0.55) * 15, C[1] + Math.sin(a - 0.55) * 13];
    const p2: Pt = [C[0] + Math.cos(a + 0.55) * 15, C[1] + Math.sin(a + 0.55) * 13];
    const notch: Pt = [C[0] + Math.cos(a) * 15, C[1] + Math.sin(a) * 13];
    const shape = `M${f(C[0])} ${f(C[1])} Q${f(p1[0] - Math.cos(a) * 2)} ${f(p1[1] - Math.sin(a) * 2)} ${f(p1[0])} ${f(p1[1])} Q${f((p1[0] + notch[0]) / 2 + Math.cos(a) * 3)} ${f((p1[1] + notch[1]) / 2 + Math.sin(a) * 3)} ${f(notch[0])} ${f(notch[1])} Q${f((p2[0] + notch[0]) / 2 + Math.cos(a) * 3)} ${f((p2[1] + notch[1]) / 2 + Math.sin(a) * 3)} ${f(p2[0])} ${f(p2[1])} Q${f(p2[0] - Math.cos(a) * 2)} ${f(p2[1] - Math.sin(a) * 2)} ${f(C[0])} ${f(C[1])}Z`;
    add(o, shape, "fl w-rose s2");
    add(o, shape, "l l2 s2");
    add(o, `M${f(C[0] + Math.cos(a) * 4)} ${f(C[1] + Math.sin(a) * 4)} L${f(C[0] + Math.cos(a) * 11)} ${f(C[1] + Math.sin(a) * 9.5)}`, "l l3 s3");
  }
  for (let k = 0; k < 14; k++) {
    const a = (k / 14) * Math.PI * 2;
    const e: Pt = [C[0] + Math.cos(a) * 4.2, C[1] + Math.sin(a) * 3.8];
    add(o, ring(e[0], e[1], 0.6), "l l3 sep s3");
  }
  // two hips
  const hp = pointAt(stem, 0.72);
  [[-16, 8], [-8, 18]].forEach(([dx, dy], i) => {
    const h: Pt = [hp.p[0] + dx, hp.p[1] + dy];
    add(o, `M${f(hp.p[0])} ${f(hp.p[1])} Q${f(hp.p[0] + dx * 0.4)} ${f(hp.p[1] - 4)} ${f(h[0])} ${f(h[1] - 5)}`, "l l3 s2");
    const hip = `M${f(h[0])} ${f(h[1] - 5)} c-5 1 -6 9 0 11 c6 -2 5 -10 0 -11z`;
    add(o, hip, "fl w-rust s2");
    add(o, `M${f(h[0])} ${f(h[1] - 5)} c3 1 5 5 3 9 c2 -4 0 -8 -3 -9z`, "fl hx s3");
    add(o, hip, "l l2 sep s2");
    add(o, `M${f(h[0])} ${f(h[1] + 6)} l-2 3 M${f(h[0])} ${f(h[1] + 6)} l2 3 M${f(h[0])} ${f(h[1] + 6)} l0 3.4`, "l l3 sep s3");
    void i;
  });
  return o;
}

function vine(r: Rng): Out {
  const o: Out = [];
  // two strands twining around an unseen support
  const strandA: Pt[] = [];
  const strandB: Pt[] = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const y = 320 - t * 270;
    const amp = 9 * (1 - t * 0.4);
    strandA.push([60 + Math.sin(t * 9) * amp, y]);
    strandB.push([60 + Math.sin(t * 9 + Math.PI) * amp * 0.7, y - 3]);
  }
  add(o, smooth(strandA), "l l1 s0");
  add(o, smooth(strandB.slice(0, 11)), "l l2 sep s0");
  // heart-shaped leaves
  for (let k = 1; k <= 5; k++) {
    const p = strandA[k * 3];
    if (!p) continue;
    const s = k % 2 ? 1 : -1;
    const tip: Pt = [p[0] + s * 26, p[1] + 6];
    const sh = `M${f(p[0])} ${f(p[1])} C${f(p[0] + s * 6)} ${f(p[1] - 10)} ${f(p[0] + s * 20)} ${f(p[1] - 8)} ${f(tip[0])} ${f(tip[1])} C${f(p[0] + s * 18)} ${f(p[1] + 10)} ${f(p[0] + s * 6)} ${f(p[1] + 10)} ${f(p[0] + s * 4)} ${f(p[1] + 2)} Z`;
    if (k % 2 === 0) add(o, sh, "fl hf s1");
    add(o, sh, "l l2 s1");
    add(o, `M${f(p[0] + s * 4)} ${f(p[1] + 1)} Q${f(p[0] + s * 14)} ${f(p[1] - 1)} ${f(tip[0] - s * 2)} ${f(tip[1] - 0.5)}`, "l l3 s1");
    for (const v of [0.4, 0.65]) {
      const q: Pt = [p[0] + s * (4 + 20 * v), p[1] - 1 + v * 2];
      add(o, `M${f(q[0])} ${f(q[1])} l${f(s * 4)} -5 M${f(q[0])} ${f(q[1])} l${f(s * 4)} 5`, "l l3 s1");
    }
    // tendril
    const tp = strandA[k * 3 - 1];
    if (tp) add(o, `M${f(tp[0])} ${f(tp[1])} q${f(-s * 10)} -4 ${f(-s * 12)} -12 q-1 -5 ${f(s * 3)} -5 q3 1 1 4`, "l l3 s2");
  }
  // a single trumpet flower near the top
  const fp = strandA[14];
  const fx = fp[0] + 4;
  const fy = fp[1] - 8;
  const T = (dx: number, dy: number) => `${f(fx + dx)} ${f(fy + dy)}`;
  const trumpet = `M${T(-1.6, 12)} C${T(-3, 2)} ${T(-10, -4)} ${T(-13, -10)} A13 4.5 0 0 1 ${T(13, -10)} C${T(10, -4)} ${T(3, 2)} ${T(1.6, 12)}Z`;
  add(o, trumpet, "fl w-lavender s2");
  add(o, trumpet, "l l2 s2");
  add(o, `M${T(-13, -10)} A13 4.5 0 0 0 ${T(13, -10)}`, "l l3 s3");
  for (const k of [-8, -3.5, 1.5, 6.5]) add(o, `M${T(k * 0.12, 10)} Q${T(k * 0.6, -2)} ${T(k, -6.2)}`, "l l3 s3");
  add(o, `M${T(-1.6, 12)} l-3 4 M${T(1.6, 12)} l3 4`, "l l3 s3");
  return o;
}

const builders: Record<PlantKind, (r: Rng) => Out> = {
  fern: (r) => fern(r),
  umbel: (r) => umbel(r),
  umbelDry: (r) => umbel(r, true),
  seedhead,
  grass,
  pod,
  teasel,
  bell,
  hellebore,
  rose,
  vine,
};

const seedOf = (kind: string, seed: number) => {
  let h = seed * 9973;
  for (let i = 0; i < kind.length; i++) h = (h * 31 + kind.charCodeAt(i)) | 0;
  return h >>> 0;
};

export function plantElements(kind: PlantKind, seed = 1): Out {
  return builders[kind](rng(seedOf(kind, seed)));
}

/* ------------------------------ render ------------------------------ */

interface PlantProps {
  kind: PlantKind;
  seed?: number;
  className?: string;
  style?: CSSProperties;
  /** Seconds of sway offset so neighbors never move in unison. */
  phase?: number;
  /** Draw only the upper part, fading toward the ground (an unfinished sketch). */
  sketch?: boolean;
}

export function Plant({ kind, seed = 1, className = "", style, phase = 0, sketch }: PlantProps) {
  const els = useMemo(() => plantElements(kind, seed), [kind, seed]);
  return (
    <svg
      viewBox="0 0 120 320"
      className={`plant plant--${kind} ${sketch ? "plant--sketch" : ""} ${className}`}
      style={{ ...style, ["--phase" as string]: `${-phase}s` }}
      aria-hidden="true"
      focusable="false"
    >
      <g className="plant__sway">
        {els.map((e, i) =>
          e.c.startsWith("l ") ? (
            <path key={i} d={e.d} className={e.c} pathLength={1} />
          ) : (
            <path key={i} d={e.d} className={e.c} />
          ),
        )}
      </g>
    </svg>
  );
}

/** Renders any list of ink elements (used by emblems and icons). */
export function InkSvg({
  els,
  viewBox,
  className = "",
  title,
}: {
  els: { d: string; c: string }[];
  viewBox: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={`plant ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {els.map((e, i) =>
        e.c.startsWith("l ") ? <path key={i} d={e.d} className={e.c} pathLength={1} /> : <path key={i} d={e.d} className={e.c} />,
      )}
    </svg>
  );
}

/** Back-compat name used across sections. */
export function Flower({ kind, ...p }: Omit<PlantProps, "kind"> & { kind: PlantKind }) {
  return <Plant kind={kind} {...p} />;
}

export const plantKinds = Object.keys(builders) as PlantKind[];

/**
 * Shared hatching patterns. Rendered once per page; plants reference them
 * from CSS (fill: url(#ink-hatch)), so dark sections can swap the ink.
 */
export function InkDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="ink-hatch" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="2.4" stroke="#5b4634" strokeWidth="0.5" />
        </pattern>
        <pattern id="ink-cross" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <line x1="0" y1="0" x2="0" y2="2.6" stroke="#5b4634" strokeWidth="0.45" />
          <line x1="0" y1="0" x2="2.6" y2="0" stroke="#5b4634" strokeWidth="0.35" />
        </pattern>
        <pattern id="ink-hatch-light" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="2.4" stroke="#b7c19a" strokeWidth="0.5" />
        </pattern>
        <pattern id="ink-cross-light" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <line x1="0" y1="0" x2="0" y2="2.6" stroke="#b7c19a" strokeWidth="0.45" />
          <line x1="0" y1="0" x2="2.6" y2="0" stroke="#b7c19a" strokeWidth="0.35" />
        </pattern>
        <pattern id="ink-hatch-wide" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#6b5038" strokeWidth="0.6" />
        </pattern>
      </defs>
    </svg>
  );
}

/** Old name kept so existing imports keep working. */
export const FlowerDefs = InkDefs;
