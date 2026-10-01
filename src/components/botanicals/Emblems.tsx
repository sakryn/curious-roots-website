"use client";

import { useMemo } from "react";
import { rng, smooth, wobble, f, rootSystem, soilHatch, type Pt, type Rng, type RootStroke } from "@/lib/ink";
import { InkSvg, add, leaf, ring, closed, type Out } from "./Wildflowers";

/**
 * Small engraved plates that carry meaning: the four specialty emblems,
 * the "How I work" motifs, education icons, availability stages, and the
 * logo mark. Same ink language as the plants.
 */

/* ------------------------------ shared ------------------------------ */

function rootsInto(o: Out, strokes: RootStroke[], tone = "sep") {
  for (const s of strokes) {
    const w = s.kind === "root" ? (s.depth < 1 ? "l1" : s.depth < 2 ? "l2" : "l3") : "l3";
    const stage = s.t < 0.5 ? "s1" : s.t < 1.3 ? "s2" : "s3";
    const extra = s.kind === "hair" || s.kind === "hatch" ? " lh" : "";
    add(o, s.d, `l ${w} ${tone}${extra} ${stage}`);
  }
}

function soil(o: Out, r: Rng, x0: number, x1: number, y: number, seed: number) {
  const pts: Pt[] = [];
  for (let x = x0; x <= x1; x += (x1 - x0) / 8) pts.push([x, y + (r() - 0.5) * 1.6]);
  add(o, smooth(pts), "l l2 sep s0");
  rootsInto(o, soilHatch((x0 + x1) / 2, y, (x1 - x0) * 0.9, seed, 6));
}

/* ------------------------------ specialty emblems ------------------------------ */

/** Trauma + the nervous system: a small plant above, a root system below that reads as nerves. */
function nerve(): Out {
  const o: Out = [];
  const r = rng(71);
  soil(o, r, 18, 142, 74, 3);
  add(o, wobble([80, 74], [80, 34], r, 1, 4), "l l1 s0");
  leaf(o, r, [80, 52], -Math.PI / 2 - 0.9, 24, 6, { veins: 3, hatch: true });
  leaf(o, r, [80, 46], -Math.PI / 2 + 0.85, 22, 5.5, { veins: 3 });
  add(o, `M80 34 c-3 -5 -1 -10 3 -10 c3 1 2 5 -1 5`, "l l2 s1");
  rootsInto(
    o,
    rootSystem({ x: 80, y: 75, angle: Math.PI / 2, length: 118, seed: 19, maxDepth: 4, spread: 1.2, branching: 3, wander: 0.2, gravity: 0.05, nodules: true, bounds: { x0: 6, y0: 74, x1: 154, y1: 198 } }),
  );
  return o;
}

/** ADHD + autism: a skeleton leaf, every vein connected to every other by more than one path. */
function network(scale = 1, detail = true): Out {
  const o: Out = [];
  const r = rng(29);
  const cx = 80;
  const y0 = 178;
  const y1 = 16;
  const W = 52;
  const yAt = (t: number) => y0 - (y0 - y1) * t;
  const wAt = (t: number) => W * Math.pow(Math.sin(Math.PI * Math.min(1, t)), 0.78) * (1 - 0.22 * t);
  const L: Pt[] = [];
  const R: Pt[] = [];
  const n = 18;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const ser = i > 0 && i < n ? (i % 2 ? 1.04 : 0.97) : 1;
    L.push([cx - wAt(t) * ser, yAt(t)]);
    R.push([cx + wAt(t) * ser, yAt(t)]);
  }
  const outline = closed(L, [...R].reverse());
  add(o, outline, "fl w-ochre w-faint s1");
  add(o, outline, "l l1 sep s0");
  add(o, `M${cx} 198 L${cx} ${y0}`, "l l1 sep s0");
  add(o, wobble([cx, y0], [cx, y1 + 4], r, 0.8, 6), "l l1 sep s0");
  const secs = detail ? 7 : 5;
  const secPts: { side: number; pts: Pt[] }[] = [];
  for (let i = 0; i < secs; i++) {
    const t = 0.1 + (i / secs) * 0.8;
    for (const side of [-1, 1]) {
      const start: Pt = [cx, yAt(t)];
      const tEnd = Math.min(0.97, t + 0.1);
      const end: Pt = [cx + side * wAt(tEnd) * 0.86, yAt(tEnd)];
      const ctrl: Pt = [cx + side * wAt(t) * 0.5, yAt(t) - 4];
      const pts: Pt[] = [];
      for (let k = 0; k <= 8; k++) {
        const u = k / 8;
        pts.push([
          (1 - u) * (1 - u) * start[0] + 2 * (1 - u) * u * ctrl[0] + u * u * end[0],
          (1 - u) * (1 - u) * start[1] + 2 * (1 - u) * u * ctrl[1] + u * u * end[1],
        ]);
      }
      secPts.push({ side, pts });
      add(o, smooth(pts), "l l2 sep s1");
    }
  }
  // loops along the margin and cross-veins between neighbors: the network
  for (const side of [-1, 1]) {
    const mine = secPts.filter((s) => s.side === side);
    for (let i = 0; i < mine.length - 1; i++) {
      const a = mine[i].pts;
      const b = mine[i + 1].pts;
      const ea = a[a.length - 1];
      const eb = b[b.length - 1];
      add(o, `M${f(ea[0])} ${f(ea[1])} Q${f(ea[0] + side * 4)} ${f((ea[1] + eb[1]) / 2)} ${f(eb[0])} ${f(eb[1])}`, "l l3 sep s2");
      const cross = detail ? [2, 4, 6] : [3, 6];
      for (const k of cross) {
        add(o, wobble(a[k], b[Math.min(8, k + 1)], r, 0.9, 3), "l l3 s3");
      }
      if (detail) {
        const m1 = a[3];
        const m2 = b[5];
        const mid: Pt = [(m1[0] + m2[0]) / 2 + (r() - 0.5) * 3, (m1[1] + m2[1]) / 2];
        add(o, `M${f(a[5][0])} ${f(a[5][1])} L${f(mid[0])} ${f(mid[1])} L${f(b[3][0])} ${f(b[3][1])}`, "l l3 lh s3");
      }
    }
  }
  void scale;
  return o;
}

/** Children, teens + families: three stems of different heights, one shared root system. */
function kin(): Out {
  const o: Out = [];
  const r = rng(44);
  soil(o, r, 18, 142, 112, 9);
  // tallest: a small umbel
  const tall = [[80, 112], [77, 80], [72, 50], [68, 24]] as Pt[];
  add(o, smooth(tall), "l l1 s0");
  leaf(o, r, [76, 74], -Math.PI / 2 - 1, 20, 4.5, { veins: 3, hatch: true });
  for (let k = 0; k < 9; k++) {
    const a = -Math.PI + 0.35 + (k / 8) * (Math.PI - 0.7);
    const e: Pt = [68 + Math.cos(a) * 14, 24 + Math.sin(a) * 8 - 2];
    add(o, `M68 24 L${f(e[0])} ${f(e[1])}`, "l l3 s2");
    add(o, ring(e[0], e[1], 1.1), "l l3 s3");
  }
  // middle: leaves and a closed bud
  const mid = [[81, 112], [86, 90], [94, 68], [98, 50]] as Pt[];
  add(o, smooth(mid), "l l1 s0");
  leaf(o, r, [89, 82], -0.35, 18, 4.5, { veins: 3 });
  leaf(o, r, [93, 70], -Math.PI + 0.5, 15, 4, { veins: 2, hatch: true });
  add(o, `M98 50 c-4 -3 -4 -10 0 -14 c4 4 4 11 0 14z`, "fl w-lavender s2");
  add(o, `M98 50 c-4 -3 -4 -10 0 -14 c4 4 4 11 0 14z`, "l l2 s2");
  add(o, `M98 50 l-3 -4 M98 50 l3 -4`, "l l3 s3");
  // smallest: a seedling with two seed leaves
  add(o, smooth([[80, 112], [82, 100], [84, 90]]), "l l2 s0");
  add(o, `M84 90 c-6 -1 -10 -4 -10 -8 c5 0 9 3 10 8z`, "l l2 s1");
  add(o, `M84 90 c5 -2 9 -6 8 -10 c-5 1 -8 5 -8 10z`, "l l2 s1");
  add(o, `M84 90 c-6 -1 -10 -4 -10 -8 c5 0 9 3 10 8z`, "fl hf s2");
  // shared roots, woven together
  rootsInto(o, rootSystem({ x: 80, y: 113, angle: Math.PI / 2, length: 76, seed: 5, maxDepth: 3, spread: 1, branching: 2.4, bounds: { x0: 8, y0: 112, x1: 152, y1: 198 } }));
  rootsInto(o, rootSystem({ x: 77, y: 113, angle: Math.PI / 2 + 0.5, length: 50, seed: 8, maxDepth: 2, spread: 0.9, branching: 2, bounds: { x0: 8, y0: 112, x1: 152, y1: 198 } }));
  rootsInto(o, rootSystem({ x: 83, y: 113, angle: Math.PI / 2 - 0.5, length: 52, seed: 13, maxDepth: 2, spread: 0.9, branching: 2, bounds: { x0: 8, y0: 112, x1: 152, y1: 198 } }));
  return o;
}

/** Grief + life transitions: seed, dormant bulb, first growth. */
function seasons(): Out {
  const o: Out = [];
  const r = rng(61);
  soil(o, r, 6, 154, 112, 17);
  // i. seed resting in the soil
  const seed = `M22 134 c2 -6 12 -8 16 -3 c2 5 -6 9 -12 8 c-3 -1 -4 -3 -4 -5z`;
  add(o, seed, "fl hx s1");
  add(o, seed, "l l2 sep s1");
  add(o, `M25 133 q5 -3 11 -2`, "l l3 sep s2");
  // ii. dormant bulb, dry tunic, a few roots, a withered tip above ground
  const bulb = `M80 118 c-12 2 -16 14 -12 22 c3 5 21 5 24 0 c4 -8 0 -20 -12 -22z`;
  add(o, bulb, "fl w-ochre s1");
  add(o, bulb, "l l1 sep s1");
  for (const k of [-6, -1, 4]) add(o, `M80 119 Q${f(80 + k * 1.6)} 130 ${f(80 + k * 1.2)} 143`, "l l3 sep s2");
  add(o, `M80 118 L80 112 Q78 104 82 98 q2 -2 1 -6`, "l l2 sep s2");
  rootsInto(o, rootSystem({ x: 80, y: 144, angle: Math.PI / 2, length: 30, seed: 21, maxDepth: 2, spread: 1.2, branching: 2.4, bounds: { x0: 50, y0: 140, x1: 110, y1: 198 } }));
  // iii. first growth: stem, unfurling leaves, roots taking hold
  add(o, wobble([130, 112], [131, 66], r, 0.8, 4), "l l1 s0");
  leaf(o, r, [130, 92], -Math.PI / 2 - 0.85, 20, 5.5, { veins: 3, hatch: true });
  leaf(o, r, [131, 82], -Math.PI / 2 + 0.8, 18, 5, { veins: 3 });
  add(o, `M131 66 c-4 -3 -3 -9 1 -10 c4 0 4 5 1 6`, "l l2 s1");
  rootsInto(o, rootSystem({ x: 130, y: 113, angle: Math.PI / 2, length: 58, seed: 33, maxDepth: 3, spread: 1, branching: 2.4, bounds: { x0: 104, y0: 112, x1: 158, y1: 198 } }));
  // faint guide marks under each stage
  for (const x of [30, 80, 130]) add(o, `M${x - 6} 196 L${x + 6} 196`, "l l3 lh sep s0");
  return o;
}

export type EmblemKind = "nerve" | "network" | "kin" | "seasons";

const emblemBuilders: Record<EmblemKind, () => Out> = { nerve, network: () => network(), kin, seasons };

export function Emblem({ kind, className = "" }: { kind: EmblemKind; className?: string }) {
  const els = useMemo(() => emblemBuilders[kind](), [kind]);
  return <InkSvg els={els} viewBox="0 0 160 200" className={`emblem emblem--${kind} ${className}`} />;
}

/* ------------------------------ "How I work" motifs ------------------------------ */

function growthRings(): Out {
  const o: Out = [];
  const r = rng(3);
  for (let k = 0; k < 6; k++) {
    const rad = 4 + k * 3.4;
    const pts: Pt[] = [];
    for (let i = 0; i <= 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const rr = rad * (1 + (r() - 0.5) * 0.07 + (Math.cos(a) > 0 ? 0.06 : 0));
      pts.push([24 + Math.cos(a) * rr, 24 + Math.sin(a) * rr * 0.94]);
    }
    pts[16] = pts[0];
    add(o, smooth(pts), `l ${k === 5 ? "l1" : "l3"} sep s${Math.min(3, Math.floor(k / 2))}`);
  }
  add(o, `M24 24 l9 -8 M24 24 l-5 11`, "l l3 sep s3");
  return o;
}

function twining(): Out {
  const o: Out = [];
  const a: Pt[] = [];
  const b: Pt[] = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    a.push([24 + Math.sin(t * 7) * 6, 44 - t * 34]);
    b.push([24 + Math.sin(t * 7 + Math.PI) * 6, 44 - t * 34]);
  }
  add(o, smooth(a), "l l1 s0");
  add(o, smooth(b), "l l2 sep s0");
  const r = rng(9);
  leaf(o, r, a[10], -Math.PI / 2 - 0.7, 10, 3.4, { veins: 2 });
  leaf(o, r, b[10], -Math.PI / 2 + 0.7, 10, 3.4, { veins: 2, hatch: true });
  return o;
}

function trowel(): Out {
  const o: Out = [];
  const blade = `M30 6 C38 8 42 14 40 20 L27 31 C24 30 19 25 18 22 Z`;
  add(o, blade, "fl hf s1");
  add(o, blade, "l l1 s0");
  add(o, `M30 8 L23 27`, "l l3 s2");
  add(o, `M22 27 L15 34`, "l l2 sep s0");
  const handle = `M15 34 L8 41 C6 43 4 42 4 40 C4 38 6 37 7 35 L13 30 Z`;
  add(o, handle, "fl w-ochre s1");
  add(o, handle, "l l1 sep s0");
  add(o, `M12 33 L6 39 M10 33 L5 37`, "l l3 sep s2");
  return o;
}

function nerveSmall(): Out {
  const o: Out = [];
  add(o, `M10 10 L38 10`, "l l2 sep s0");
  rootsInto(o, rootSystem({ x: 24, y: 10, angle: Math.PI / 2, length: 32, seed: 4, maxDepth: 3, spread: 1.1, branching: 2, echo: false, bounds: { x0: 2, y0: 9, x1: 46, y1: 46 } }));
  add(o, `M24 10 L24 3 M24 6 q-4 -2 -5 -5 M24 5 q3 -2 5 -4`, "l l2 s1");
  return o;
}

function seedEmbryo(): Out {
  const o: Out = [];
  const coat = `M24 5 C36 6 42 18 40 28 C38 38 30 44 22 43 C12 42 7 32 8 22 C9 12 15 5 24 5Z`;
  add(o, coat, "fl w-ochre s0");
  add(o, coat, "l l1 sep s0");
  add(o, `M24 8 C33 9 38 18 37 27 C36 35 30 40 23 40`, "l l3 sep s1");
  // the curled embryo inside
  add(o, `M20 32 C15 28 15 20 21 16 C27 13 32 18 30 24 C29 28 24 29 22 26 C21 24 23 22 25 23`, "l l2 s2");
  add(o, `M20 32 C18 34 18 37 20 38`, "l l3 s3");
  add(o, `M20 32 C15 28 15 20 21 16 C24 15 18 22 20 32Z`, "fl hf s3");
  return o;
}

function miniLeafNet(): Out {
  // a reduced skeleton leaf for small sizes
  const o: Out = [];
  const r = rng(5);
  const pts: Pt[] = [];
  const outline = `M24 44 C12 38 7 26 10 16 C13 8 19 4 24 3 C29 4 35 8 38 16 C41 26 36 38 24 44Z`;
  add(o, outline, "l l1 sep s0");
  add(o, `M24 44 L24 6`, "l l2 sep s0");
  for (let i = 0; i < 4; i++) {
    const y = 36 - i * 8;
    add(o, `M24 ${y} Q${17 - i} ${y - 3} ${12 + i * 0.8} ${y - 8}`, "l l3 sep s1");
    add(o, `M24 ${y} Q${31 + i} ${y - 3} ${36 - i * 0.8} ${y - 8}`, "l l3 sep s1");
    if (i < 3) {
      add(o, wobble([18, y - 3], [18, y - 11], r, 0.6, 2), "l l3 s2");
      add(o, wobble([30, y - 3], [30, y - 11], r, 0.6, 2), "l l3 s2");
    }
    pts.push([24, y]);
  }
  return o;
}

export type MotifKind = "trauma" | "nd" | "relational" | "practical" | "nervous" | "individual";

const motifBuilders: Record<MotifKind, () => Out> = {
  trauma: growthRings,
  nd: miniLeafNet,
  relational: twining,
  practical: trowel,
  nervous: nerveSmall,
  individual: seedEmbryo,
};

export function Motif({ kind, className = "" }: { kind: MotifKind; className?: string }) {
  const els = useMemo(() => motifBuilders[kind](), [kind]);
  return <InkSvg els={els} viewBox="0 0 48 48" className={`motif ${className}`} />;
}

/* ------------------------------ education icons ------------------------------ */

function specimenSheet(): Out {
  const o: Out = [];
  const r = rng(2);
  add(o, `M10 4 H38 V44 H10 Z`, "l l2 sep s0");
  add(o, `M14 40 H24 M14 37 H22`, "l l3 sep s2");
  add(o, wobble([24, 36], [26, 10], r, 0.8, 3), "l l2 s1");
  leaf(o, r, [25, 26], -Math.PI / 2 - 0.9, 10, 3, { veins: 2, hatch: true });
  leaf(o, r, [25.5, 18], -Math.PI / 2 + 0.9, 9, 2.8, { veins: 2 });
  add(o, `M20 30 h8 M22 14 h7`, "l l3 sep s3");
  return o;
}

function openBook(): Out {
  const o: Out = [];
  const r = rng(6);
  add(o, `M24 12 C18 8 10 8 4 10 V40 C10 38 18 38 24 42 C30 38 38 38 44 40 V10 C38 8 30 8 24 12 Z`, "l l2 sep s0");
  add(o, `M24 12 V42`, "l l2 sep s0");
  for (const y of [18, 23, 28, 33]) add(o, `M8 ${y} C12 ${y - 1} 17 ${y - 1} 20 ${y + 1}`, "l l3 sep lh s1");
  add(o, wobble([34, 36], [33, 14], r, 0.6, 3), "l l2 s1");
  for (let i = 0; i < 6; i++) {
    const y = 34 - i * 3.6;
    const l = 6 - i * 0.7;
    add(o, `M33.6 ${y} q-${f(l * 0.5)} -2 -${f(l)} -1 M33.6 ${f(y - 1)} q${f(l * 0.5)} -2 ${f(l)} -1`, "l l3 s2");
  }
  return o;
}

function stakedSapling(): Out {
  const o: Out = [];
  const r = rng(8);
  add(o, `M30 44 L30 6`, "l l1 sep s0");
  add(o, `M29 6 l1 -3 l1 3`, "l l3 sep s0");
  add(o, smooth([[22, 44], [23, 34], [27, 26], [28, 14]]), "l l2 s0");
  add(o, `M27 27 c1.5 -1.5 3.5 -1.5 4 0 c-0.5 1.5 -2.5 2 -4 0z M28 18 c1.5 -1.5 3.5 -1.5 4 0 c-0.5 1.5 -2.5 2 -4 0z`, "l l3 sep s2");
  leaf(o, r, [25, 32], -Math.PI + 0.4, 9, 3, { veins: 2, hatch: true });
  leaf(o, r, [27.6, 20], -Math.PI / 2 - 0.9, 9, 2.8, { veins: 2 });
  leaf(o, r, [28, 14], -Math.PI / 2 + 0.3, 8, 2.6, { veins: 2 });
  add(o, `M6 44 H42`, "l l2 sep s0");
  return o;
}

function trellis(): Out {
  const o: Out = [];
  const r = rng(12);
  for (const x of [4, 13, 22]) {
    add(o, `M${x} 44 L${x + 22} 4`, "l l3 sep s0");
    add(o, `M${48 - x} 44 L${26 - x} 4`, "l l3 sep s0");
  }
  add(o, `M4 4 H44 V44 H4 Z`, "l l2 sep s0");
  const v: Pt[] = [];
  for (let i = 0; i <= 8; i++) v.push([24 + Math.sin(i * 1.2) * 7, 44 - i * 4.6]);
  add(o, smooth(v), "l l1 s1");
  leaf(o, r, v[3], -0.4, 8, 3, { veins: 2, hatch: true });
  leaf(o, r, v[6], -Math.PI + 0.4, 8, 3, { veins: 2 });
  return o;
}

const offeringBuilders = [specimenSheet, openBook, stakedSapling, trellis];

export function OfferingIcon({ index, className = "" }: { index: number; className?: string }) {
  const els = useMemo(() => offeringBuilders[index % offeringBuilders.length](), [index]);
  return <InkSvg els={els} viewBox="0 0 48 48" className={`motif ${className}`} />;
}

/* ------------------------------ availability: a flower's life cycle ------------------------------ */

function stage(kind: "bloom" | "half" | "bud" | "seed"): Out {
  const o: Out = [];
  const r = rng(kind.length * 7);
  add(o, wobble([32, 64], [32, 26], r, 0.8, 4), "l l1 s0");
  leaf(o, r, [32, 50], -Math.PI / 2 - 0.95, 15, 4, { veins: 2, hatch: true });
  const C: Pt = [32, 20];
  if (kind === "bloom" || kind === "half") {
    const n = kind === "bloom" ? 6 : 3;
    for (let k = 0; k < n; k++) {
      const a = kind === "bloom" ? (k / n) * Math.PI * 2 - Math.PI / 2 : -Math.PI / 2 + (k - 1) * 0.6;
      const tip: Pt = [C[0] + Math.cos(a) * 14, C[1] + Math.sin(a) * 12];
      const l: Pt = [C[0] + Math.cos(a - 0.7) * 10, C[1] + Math.sin(a - 0.7) * 9];
      const rr: Pt = [C[0] + Math.cos(a + 0.7) * 10, C[1] + Math.sin(a + 0.7) * 9];
      const sh = `M${f(C[0])} ${f(C[1])} Q${f(l[0])} ${f(l[1])} ${f(tip[0])} ${f(tip[1])} Q${f(rr[0])} ${f(rr[1])} ${f(C[0])} ${f(C[1])}Z`;
      add(o, sh, "fl w-ochre s2");
      add(o, sh, "l l2 s2");
      add(o, `M${f(C[0])} ${f(C[1])} L${f(C[0] + Math.cos(a) * 9)} ${f(C[1] + Math.sin(a) * 8)}`, "l l3 s3");
    }
    if (kind === "half") add(o, `M32 26 c-5 -1 -8 -4 -8 -7 M32 26 c5 -1 8 -4 8 -7`, "l l2 s2");
    add(o, ring(C[0], C[1], 2.2), "fl hx s3");
    add(o, ring(C[0], C[1], 2.2), "l l2 sep s3");
  } else if (kind === "bud") {
    const bud = `M32 26 C26 22 26 12 32 6 C38 12 38 22 32 26Z`;
    add(o, bud, "fl w-lavender s2");
    add(o, bud, "l l2 s2");
    add(o, `M32 26 C30 20 30 12 32 7`, "l l3 s3");
    add(o, `M32 26 c-4 -1 -6 -4 -6 -7 M32 26 c4 -1 6 -4 6 -7`, "l l2 s2");
  } else {
    for (let k = 0; k < 22; k++) {
      const a = (k / 22) * Math.PI * 2;
      if (k % 7 === 3) continue;
      const e: Pt = [C[0] + Math.cos(a) * 13, C[1] + Math.sin(a) * 13];
      add(o, `M${f(C[0])} ${f(C[1])} L${f(e[0])} ${f(e[1])}`, "l l3 s2");
      add(o, `M${f(e[0])} ${f(e[1])} l${f(Math.cos(a - 0.4) * 2.4)} ${f(Math.sin(a - 0.4) * 2.4)} M${f(e[0])} ${f(e[1])} l${f(Math.cos(a + 0.4) * 2.4)} ${f(Math.sin(a + 0.4) * 2.4)}`, "l l3 s3");
    }
    add(o, ring(C[0], C[1], 1.8), "fl hx s2");
  }
  return o;
}

export function StatusGlyph({ stage: s, className = "" }: { stage: "bloom" | "half" | "bud" | "seed"; className?: string }) {
  const els = useMemo(() => stage(s), [s]);
  return <InkSvg els={els} viewBox="0 0 64 64" className={`status-glyph ${className}`} />;
}

/* ------------------------------ logo + small marks ------------------------------ */

function logo(): Out {
  const o: Out = [];
  const r = rng(77);
  add(o, ring(24, 24, 22.5), "l l2 s0");
  add(o, ring(24, 24, 20.4), "l l3 s0");
  add(o, smooth([[7, 25.5], [16, 24.6], [24, 25], [32, 24.4], [41, 25.4]]), "l l2 sep s0");
  add(o, `M24 25 V12`, "l l1 s0");
  add(o, `M24 17 C19.5 17 16.5 13.5 16.5 10 C20.5 10 24 12.6 24 17Z`, "fl hf s1");
  add(o, `M24 17 C19.5 17 16.5 13.5 16.5 10 C20.5 10 24 12.6 24 17Z`, "l l2 s1");
  add(o, `M24 14.5 C28.5 14.5 31.5 11.5 31.5 7.5 C27.5 7.5 24 10 24 14.5Z`, "l l2 s1");
  add(o, `M24 17 L19 12 M24 14.5 L28.5 10`, "l l3 s1");
  rootsInto(o, rootSystem({ x: 24, y: 25.5, angle: Math.PI / 2, length: 16, seed: 31, maxDepth: 2, spread: 1.2, branching: 2.6, echo: false, hairs: false, bounds: { x0: 6, y0: 25, x1: 42, y1: 43 } }));
  void r;
  return o;
}

export function LogoMark({ className = "" }: { className?: string }) {
  const els = useMemo(() => logo(), []);
  return <InkSvg els={els} viewBox="0 0 48 48" className={`logo-mark ${className}`} />;
}

/** A small engraved sprig used as a list mark. */
export function Sprig({ className = "" }: { className?: string }) {
  const els = useMemo(() => {
    const o: Out = [];
    const r = rng(4);
    add(o, `M3 15 Q8 9 14 2`, "l l2 s0");
    leaf(o, r, [7, 10], -1.9, 6, 2, { veins: 1, hatch: true });
    leaf(o, r, [10, 6.5], -0.5, 5.5, 1.8, { veins: 1 });
    return o;
  }, []);
  return <InkSvg els={els} viewBox="0 0 16 16" className={`sprig ${className}`} />;
}
