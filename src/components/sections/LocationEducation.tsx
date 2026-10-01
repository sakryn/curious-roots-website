"use client";

import { location, education } from "@/content/home";
import { site } from "@/config/site";
import { Action } from "@/components/ui/Action";
import { Rich } from "@/components/ui/Rich";
import { Reveal } from "@/components/ui/Reveal";
import { OfferingIcon } from "@/components/botanicals/Glyphs";
import { Label } from "@/components/ui/Label";
import { useMemo } from "react";
import { rng, smooth, f, type Pt } from "@/lib/ink";

/** An engraved contour sketch of the hills around town. Purely decorative. */
function SurveyMap() {
  const paths = useMemo(() => {
    const r = rng(8);
    const hills: { cx: number; cy: number; rx: number; ry: number; n: number }[] = [
      { cx: 92, cy: 74, rx: 78, ry: 48, n: 7 },
      { cx: 246, cy: 148, rx: 70, ry: 40, n: 6 },
      { cx: 270, cy: 36, rx: 44, ry: 26, n: 4 },
    ];
    const contours: string[] = [];
    for (const h of hills) {
      const wob = Array.from({ length: 12 }, () => 0.82 + r() * 0.3);
      for (let k = 0; k < h.n; k++) {
        const s = 1 - k / h.n;
        const pts: Pt[] = [];
        for (let i = 0; i <= 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          const w = wob[i % 12] * (1 + (r() - 0.5) * 0.05);
          pts.push([h.cx + Math.cos(a) * h.rx * s * w, h.cy + Math.sin(a) * h.ry * s * w]);
        }
        pts[12] = pts[0];
        contours.push(smooth(pts));
      }
    }
    const stream: Pt[] = [[0, 168], [40, 160], [80, 172], [130, 150], [170, 112], [196, 102], [230, 98], [320, 88]];
    const stream2 = stream.map(([x, y]) => [x, y + 3] as Pt);
    const hatch: string[] = [];
    for (let i = 0; i < 26; i++) {
      const x = 20 + r() * 280;
      const y = 186 + r() * 10;
      hatch.push(`M${f(x)} ${f(y)} l4 -3`);
    }
    return { contours, stream: smooth(stream), stream2: smooth(stream2), hatch: hatch.join(" ") };
  }, []);
  return (
    <svg viewBox="0 0 320 200" className="survey" role="img" aria-label="Engraved contour sketch of the hills around Sinking Spring">
      <rect x="2" y="2" width="316" height="196" className="survey__frame" />
      <rect x="6" y="6" width="308" height="188" className="survey__frame survey__frame--in" />
      {paths.contours.map((d, i) => (
        <path key={i} d={d} className="survey__contour" />
      ))}
      <path d={paths.stream} className="survey__stream" />
      <path d={paths.stream2} className="survey__stream survey__stream--b" />
      <path d={paths.hatch} className="survey__hatch" />
      <g transform="translate(184 96)" className="survey__mark">
        <circle r="6" />
        <circle r="1.6" className="fill" />
        <path d="M-10 0 H-7 M7 0 H10 M0 -10 V-7 M0 7 V10" />
      </g>
      <text x="196" y="88" className="survey__label">Sinking Spring</text>
      <text x="40" y="60" className="survey__label survey__label--sm">Hills</text>
      <g transform="translate(290 168)" className="survey__compass">
        <path d="M0 -14 L3 0 L0 14 L-3 0Z" />
        <path d="M0 -14 L3 0 L0 0Z" className="fill" />
        <path d="M-12 0 H12" />
        <text y="-17" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
import { Flower } from "@/components/botanicals/Wildflowers";
import { Parallax } from "@/components/botanicals/Motion";

export function Location() {
  return (
    <section className="section location" aria-labelledby="location-title">
      <div className="wrap location__grid">
        <Reveal className="location__map" as="div">
          <figure>
            <SurveyMap />
            <figcaption className="plate-caption">
              <span>Pl. VIII.</span> {site.town}, {site.state}, after a survey sketch
            </figcaption>
          </figure>
        </Reveal>

        <div className="location__info">
          <Reveal>
            <Label n="VIII">Location</Label>
            <h2 id="location-title" className="section-title">
              {location.heading}
            </h2>
          </Reveal>
          <dl className="location__list">
            <div>
              <dt>{location.officeLabel}</dt>
              <dd>
                <Rich text={site.address} />
              </dd>
            </div>
            <div>
              <dt>{location.faxLabel}</dt>
              <dd>
                <Rich text={site.fax} />
              </dd>
            </div>
          </dl>
          <div className="location__privacy">
            <h3>{location.privacyHeading}</h3>
            <p>{location.privacyBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section className="section education on-dark" aria-labelledby="edu-title">
      <svg className="education__edge" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80 V40 C200 10 360 60 560 44 C780 26 940 0 1140 24 C1280 40 1380 30 1440 20 V80z" />
      </svg>
      <Parallax speed={0.2} className="education__ghost education__ghost--a">
        <Flower kind="fern" sketch seed={51} />
      </Parallax>
      <Parallax speed={0.4} className="education__ghost education__ghost--b">
        <Flower kind="teasel" sketch seed={7} />
      </Parallax>
      <div className="wrap education__grid">
        <Reveal className="education__intro">
          <Label>For professionals</Label>
          <h2 id="edu-title" className="section-title">
            {education.heading}
          </h2>
          <p>{education.body}</p>
          <Action link={education.cta.link} variant="light" sprout={false}>
            {education.cta.label}
          </Action>
        </Reveal>
        <ul className="education__offers">
          {education.offerings.map((o, i) => {
            return (
              <li key={o.title}>
                <OfferingIcon index={i} className="education__icon" />
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
