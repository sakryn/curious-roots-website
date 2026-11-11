"use client";

import { footerNav, legalNav } from "@/content/nav";
import { site } from "@/config/site";
import { Action } from "@/components/ui/Action";
import { Meadow, type MeadowStem } from "@/components/botanicals/Motion";
import { Logo } from "./Header";

const FOOTER_MEADOW: MeadowStem[] = [
  { kind: "daisy", left: 2.5, h: 7, layer: 1, seed: 2 },
  { kind: "lilac", left: 6, h: 9.5, layer: 0, seed: 11 },
  { kind: "dandelion", left: 10, h: 6.5, layer: 2, seed: 3 },
  { kind: "seedhead", left: 22, h: 8.5, layer: 0, hideOnMobile: true, seed: 5 },
  { kind: "daisy", left: 26, h: 6, layer: 2, hideOnMobile: true, seed: 6 },
  { kind: "lilac", left: 41, h: 8, layer: 1, hideOnMobile: true, seed: 4 },
  { kind: "umbel", left: 45, h: 9.5, layer: 0, hideOnMobile: true, sketch: true, seed: 7 },
  { kind: "daisy", left: 48, h: 6.5, layer: 2, seed: 8 },
  { kind: "lilac", left: 66, h: 10.5, layer: 0, seed: 9 },
  { kind: "dandelion", left: 69.5, h: 7, layer: 1, hideOnMobile: true, seed: 10 },
  { kind: "daisy", left: 73, h: 6, layer: 2, hideOnMobile: true, seed: 12 },
  { kind: "seedhead", left: 86, h: 9, layer: 1, seed: 13 },
  { kind: "lilac", left: 90, h: 12, layer: 0, seed: 14 },
  { kind: "daisy", left: 93.5, h: 7, layer: 2, seed: 15 },
  { kind: "dandelion", left: 96.5, h: 6.5, layer: 1, seed: 16 },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer on-dark">
      <Meadow stems={FOOTER_MEADOW} className="site-footer__meadow" />
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Action link="home" variant="text" sprout={false} className="site-footer__logo">
            <span className="site-footer__medallion" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/mark.png" alt="" width={400} height={481} />
            </span>
            <Logo light />
          </Action>
          <p className="site-footer__who">
            {site.clinician}, {site.postNominals}
          </p>
          <dl className="site-footer__contact">
            <div>
              <dt>Office</dt>
              <dd>
                {site.addressLines[0]}
                <br />
                {site.addressLines[1]}
              </dd>
            </div>
            <div>
              <dt>Text line</dt>
              <dd>
                <a href={site.textLineHref}>{site.textLine}</a>
                <span className="site-footer__note">Texts reach me faster than calls.</span>
              </dd>
            </div>
            <div>
              <dt>Fax</dt>
              <dd>{site.fax}</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{site.hours}</dd>
            </div>
          </dl>
        </div>

        {footerNav.map((col) => (
          <nav key={col.heading} className="site-footer__col" aria-label={col.heading}>
            <h2>{col.heading}</h2>
            <ul>
              {col.items.map((item) => (
                <li key={item.label}>
                  <Action link={item.link} variant="text" sprout={false}>
                    {item.label}
                  </Action>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="site-footer__crisis">
          <h2>{site.crisisHeading}</h2>
          <ul>
            {site.crisisLines.map((c) => (
              <li key={c.label}>
                <strong>{c.label}</strong>
                <span>{c.detail}</span>
              </li>
            ))}
          </ul>
          <p className="site-footer__crisis-note">This website, the text line and the contact form aren&rsquo;t monitored for emergencies.</p>
        </div>
      </div>

      <div className="site-footer__base">
        <p>
          &copy; {year} {site.name}. Healing from the roots up.
        </p>
        <ul>
          {legalNav.map((item) => (
            <li key={item.label}>
              <Action link={item.link} variant="text" sprout={false}>
                {item.label}
              </Action>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
