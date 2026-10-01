"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { approach } from "@/content/home";
import { Motif, type MotifKind } from "@/components/botanicals/Emblems";
import { Label } from "@/components/ui/Label";

const MOTIF: Record<string, MotifKind> = {
  trauma: "trauma",
  nd: "nd",
  relational: "relational",
  practical: "practical",
  nervous: "nervous",
  individual: "individual",
};
import { Reveal } from "@/components/ui/Reveal";
import { useStillness } from "@/lib/experience";
import { Parallax } from "@/components/botanicals/Motion";
import { Flower } from "@/components/botanicals/Wildflowers";

interface Geo {
  w: number;
  h: number;
  cx: number;
  cy: number;
  pts: [number, number][];
}

/** Measures the real positions of the center and each icon so the roots always connect. */
function useDiagramGeometry() {
  const box = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const icons = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const measure = () => {
      const b = box.current?.getBoundingClientRect();
      const c = center.current?.getBoundingClientRect();
      if (!b || !c || window.innerWidth < 980) return setGeo(null);
      const pts = icons.current.map((el) => {
        const r = el!.getBoundingClientRect();
        return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top] as [number, number];
      });
      setGeo({ w: b.width, h: b.height, cx: c.left + c.width / 2 - b.left, cy: c.top + c.height / 2 - b.top, pts });
    };
    measure();
    const late = setTimeout(measure, 1200);
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(late);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return { box, center, icons, geo };
}

export function HowIWork() {
  const [hot, setHot] = useState<number | null>(null);
  const still = useStillness();
  const { box, center, icons, geo } = useDiagramGeometry();

  return (
    <section className="section approach" aria-labelledby="approach-title">
      <Parallax speed={0.3} className="approach__ghost">
        <Flower kind="umbelDry" sketch className="plant--ghost" seed={9} />
      </Parallax>
      <div className="wrap">
        <Reveal className="section-head section-head--center">
          <Label n="III">The approach</Label>
          <h2 id="approach-title" className="section-title">
            {approach.heading}
          </h2>
        </Reveal>

        <div className="approach__diagram" ref={box}>
          {geo && (
            <svg
              className="approach__links"
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              width={geo.w}
              height={geo.h}
              aria-hidden="true"
              focusable="false"
            >
              {geo.pts.map(([x, y], i) => {
                const mx = (x + geo.cx) / 2;
                const d = `M${geo.cx} ${geo.cy} C${mx} ${geo.cy + (y - geo.cy) * 0.2} ${mx} ${y} ${x} ${y}`;
                const e = `M${geo.cx} ${geo.cy + 2.5} C${mx} ${geo.cy + 2.5 + (y - geo.cy) * 0.2} ${mx} ${y + 2.5} ${x} ${y + 2.5}`;
                const hx = (geo.cx + x) / 2;
                const hy = (geo.cy + y) / 2 + (y - geo.cy) * 0.15;
                const dir = x > geo.cx ? 1 : -1;
                const hairs = `M${hx} ${hy} l${dir * 8} ${-6} M${hx + dir * 14} ${hy + (y - geo.cy) * 0.12} l${dir * 6} 7 M${hx - dir * 16} ${hy - (y - geo.cy) * 0.1} l${dir * 5} -8`;
                const cls = `approach__link ${hot === i ? "is-hot" : ""}`;
                const draw = still
                  ? {}
                  : {
                      initial: { pathLength: 0 },
                      whileInView: { pathLength: 1 },
                      viewport: { once: true, amount: 0.4 },
                      transition: { duration: 1.4, delay: 0.3 + i * 0.12, ease: [0.45, 0, 0.2, 1] as const },
                    };
                return (
                  <g key={i} className={cls}>
                    <motion.path d={d} className="rt rt--1" {...draw} />
                    <motion.path d={e} className="rt rt--echo" {...draw} />
                    <motion.path d={hairs} className="rt rt--hair" {...draw} />
                  </g>
                );
              })}
            </svg>
          )}

          <div className="approach__center" ref={center}>
            <svg className="approach__seal" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
              <circle cx="100" cy="100" r="96" />
              <circle cx="100" cy="100" r="90" className="thin" />
              <circle cx="100" cy="100" r="86" className="dots" />
            </svg>
            <p>{approach.center}</p>
          </div>

          <ul className="approach__nodes" role="list">
            {approach.nodes.map((n, i) => {
              return (
                <motion.li
                  key={n.id}
                  className={`approach-node approach-node--${i} ${hot === i ? "is-hot" : ""}`}
                  onPointerEnter={() => setHot(i)}
                  onPointerLeave={() => setHot(null)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                >
                  <span className="approach-node__icon" ref={(el) => { icons.current[i] = el; }}>
                    <Motif kind={MOTIF[n.id]} />
                  </span>
                  <span className="approach-node__text">
                    <strong>{n.title}</strong>
                    <span>{n.body}</span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
