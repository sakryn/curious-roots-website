"use client";

import { footerNav, legalNav } from "@/content/nav";
import { site } from "@/config/site";
import { Action } from "@/components/ui/Action";
import { Rich } from "@/components/ui/Rich";
import { PrototypeNote } from "@/components/ui/PrototypeNote";
import { Meadow, type MeadowStem } from "@/components/botanicals/Motion";
import { Logo } from "./Header";

const FOOTER_MEADOW: MeadowStem[] = [
  { kind: "grass", left: 2, h: 7, layer: 1, seed: 2 },
  { kind: "umbel", left: 6, h: 10, layer: 0, sketch: true, seed: 11 },
  { kind: "fern", left: 9.5, h: 7.5, layer: 2, tilt: 8, seed: 3 },
  { kind: "seedhead", left: 22, h: 9, layer: 0, hideOnMobile: true, seed: 5 },
  { kind: "grass", left: 25, h: 6, layer: 2, hideOnMobile: true, seed: 6 },
  { kind: "pod", left: 41, h: 8, layer: 1, hideOnMobile: true, seed: 4 },
  { kind: "umbelDry", left: 44, h: 9.5, layer: 0, hideOnMobile: true, sketch: true, seed: 7 },
  { kind: "grass", left: 47, h: 6.5, layer: 2, seed: 8 },
  { kind: "teasel", left: 66, h: 10.5, layer: 0, seed: 9 },
  { kind: "bell", left: 69.5, h: 8, layer: 1, hideOnMobile: true, seed: 10 },
  { kind: "grass", left: 72, h: 5.5, layer: 2, hideOnMobile: true, seed: 12 },
  { kind: "fern", left: 86, h: 9, layer: 1, tilt: -10, seed: 13 },
  { kind: "umbel", left: 90, h: 12, layer: 0, seed: 14 },
  { kind: "hellebore", left: 93.5, h: 6.5, layer: 2, seed: 15 },
  { kind: "grass", left: 97.5, h: 7, layer: 1, seed: 16 },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer on-dark">
      <Meadow stems={FOOTER_MEADOW} className="site-footer__meadow" />
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Logo />
          <p>
            {site.clinician}
            <br />
            {site.town}, {site.state}
          </p>
          <dl className="site-footer__contact">
            <div>
              <dt>Fax</dt>
              <dd>
                <Rich text={site.fax} />
              </dd>
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
          <Rich text={site.crisisNotice} />
          <PrototypeNote>Crisis and emergency wording should come from Sarah after clinical and legal review. Left blank on purpose.</PrototypeNote>
        </div>
      </div>

      <div className="site-footer__base">
        <p>
          &copy; {year} {site.name}
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
