"use client";

import { partnershipsCopy } from "@/content/home";
import { partners } from "@/content/partners";
import { Action } from "@/components/ui/Action";
import { Rich } from "@/components/ui/Rich";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { PrototypeNote } from "@/components/ui/PrototypeNote";
import { Flower } from "@/components/botanicals/Wildflowers";
import { RootGrow } from "@/components/botanicals/Motion";

export function Partnerships({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="section partners" aria-labelledby="partners-title">
      <RootGrow variant="corner" className="partners__roots" />
      <div className="wrap">
        {showHeading && (
          <Reveal className="section-head">
            <Label n="VI">Partners</Label>
            <h2 id="partners-title" className="section-title">
              {partnershipsCopy.heading}
            </h2>
            <p className="section-intro">{partnershipsCopy.intro}</p>
          </Reveal>
        )}

        <ul className="partners__list">
          {partners.map((p, i) => (
            <li key={p.id}>
              <Reveal className="partner" delay={i * 0.1}>
                <div className="partner__art" aria-hidden="true">
                  <Flower kind={p.flower} seed={i + 2} />
                </div>
                <div className="partner__body">
                  <p className="partner__area">
                    {p.area}
                    {p.status && <span className="partner__status">{p.status}</span>}
                  </p>
                  <h3 className="partner__name">{p.name}</h3>
                  <div className="partner__logo" aria-hidden="true">
                    {p.logo ? <img src={p.logo} alt="" /> : <span>Logo</span>}
                  </div>
                  <p>
                    <Rich text={p.body} />
                  </p>
                  <Action link={p.link} variant="text" sprout={false} className="text-link">
                    {p.linkLabel}
                  </Action>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <PrototypeNote className="partners__note">
          Partners live in one list in the content files. Adding a new partner is one new entry; the cards and Partnerships page update themselves.
        </PrototypeNote>
      </div>
    </section>
  );
}
