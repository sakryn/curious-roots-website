"use client";

import { site } from "@/config/site";
import { looks } from "@/content/home";
import { services, aboutPage, consultation } from "@/content/services";
import { Action } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Flower, type PlantKind } from "@/components/botanicals/Wildflowers";
import { Sprig } from "@/components/botanicals/Glyphs";
import { Parallax, RootGrow } from "@/components/botanicals/Motion";
import type { Feature } from "@/content/specialties";

const SPECIMENS: PlantKind[] = ["daisy", "lilac", "dandelion", "seedhead", "umbel", "bell", "hellebore", "rose", "pod", "vine"];
const roman = (n: number) => ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"][n] ?? String(n + 1);

/* ------------------------------------------------------------------ */
/* What therapy can look like: a herbarium drawer of ten specimens.    */
/* ------------------------------------------------------------------ */

export function TherapyLooks({ n = "III" }: { n?: string }) {
  return (
    <section className="section looks" aria-labelledby="looks-title">
      <RootGrow variant="corner" className="looks__roots" />
      <div className="wrap">
        <Reveal className="section-head looks__head">
          <Label n={n}>{looks.label}</Label>
          <h2 id="looks-title" className="section-title">
            {looks.heading}
          </h2>
          <p className="section-intro">{looks.intro}</p>
        </Reveal>
        <ol className="looks__grid">
          {looks.items.map((it, i) => (
            <li key={it.title} className="specimen">
              <Reveal delay={(i % 5) * 0.06} className="specimen__inner">
                <span className="specimen__art" aria-hidden="true">
                  <Flower kind={SPECIMENS[i % SPECIMENS.length]} seed={i + 3} />
                </span>
                <span className="specimen__no" aria-hidden="true">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="specimen__title">{it.title}</h3>
                <p className="specimen__body">{it.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="looks__closing">
          <p>{looks.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Individual therapy: what people come in for + approaches glossary.  */
/* ------------------------------------------------------------------ */

export function IndividualTherapy() {
  const it = services.individual;
  return (
    <section className="section individual" aria-labelledby="individual-title">
      <div className="wrap individual__grid">
        <Reveal className="individual__intro">
          <Label n="II">{it.label}</Label>
          <h2 id="individual-title" className="section-title section-title--md">
            {it.heading}
          </h2>
          <p className="section-intro">{it.body}</p>
          <h3 className="mini-head">{it.concernsTitle}</h3>
          <ul className="tag-list">
            {it.concerns.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="glossary" delay={0.1}>
          <h3 className="glossary__title">{it.modalitiesTitle}</h3>
          <p className="glossary__intro">{it.modalitiesIntro}</p>
          <dl>
            {it.modalities.map((m) => (
              <div key={m.name} className="glossary__row">
                <dt>{m.name}</dt>
                <dd>{m.plain}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Insurance + payment                                                 */
/* ------------------------------------------------------------------ */

export function InsurancePanel({ n = "V" }: { n?: string }) {
  const ins = services.insurance;
  return (
    <section className="section insurance" id="insurance" aria-labelledby="insurance-title">
      <div className="wrap insurance__grid">
        <Reveal className="insurance__intro">
          <Label n={n}>{ins.label}</Label>
          <h2 id="insurance-title" className="section-title section-title--md">
            {ins.heading}
          </h2>
          <p>{ins.body}</p>
        </Reveal>
        <Reveal className="ledger" delay={0.1}>
          <p className="ledger__head">{ins.inNetworkTitle}</p>
          <ul className="ledger__plans">
            {site.insurance.map((p) => (
              <li key={p}>
                <Sprig className="ledger__leaf" />
                {p}
              </li>
            ))}
          </ul>
          <div className="ledger__rows">
            <p>
              <strong>{ins.selfPay}</strong>
              <span>Ask me for current rates.</span>
            </p>
            <p>
              <strong>Superbills</strong>
              <span>{ins.superbill}</span>
            </p>
            <p className="ledger__price">
              <strong>{ins.assessment.label}</strong>
              <span>{ins.assessment.note}</span>
              <em>{ins.assessment.price}</em>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Keegan Cares callout                                                */
/* ------------------------------------------------------------------ */

export function KeeganCares() {
  const k = services.keegan;
  return (
    <section className="section keegan" aria-labelledby="keegan-title">
      <div className="wrap">
        <Reveal className="keegan__card">
          <span className="keegan__art" aria-hidden="true">
            <Flower kind="rose" seed={4} />
          </span>
          <div>
            <Label>{k.label}</Label>
            <h2 id="keegan-title" className="section-title section-title--sm">
              {k.heading}
            </h2>
            <p>{k.body}</p>
            <div className="keegan__actions">
              <Action link="contact" variant="primary">
                Reach out to Sarah
              </Action>
              <Action link="partnerAdalynRose" variant="secondary" sprout={false}>
                Learn more about ARF
              </Action>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Specialty feature (ADHD assessment): a stepped process + price.     */
/* ------------------------------------------------------------------ */

export function FeatureBlock({ f }: { f: Feature }) {
  return (
    <section className="section feature" aria-labelledby="feature-title">
      <div className="wrap feature__grid">
        <Reveal className="feature__intro">
          <Label>{f.label}</Label>
          <h2 id="feature-title" className="section-title section-title--md">
            {f.title}
          </h2>
          <p>{f.body}</p>
          {f.price && (
            <p className="price-tag">
              <span className="price-tag__amt">{f.price}</span>
              <span className="price-tag__note">{f.priceNote}</span>
            </p>
          )}
          {f.cta && (
            <Action link={f.cta.link} variant="primary">
              {f.cta.label}
            </Action>
          )}
        </Reveal>
        <ol className="feature__steps">
          {f.steps.map((s, i) => (
            <li key={s}>
              <Reveal delay={i * 0.07} className="feature__step">
                <span className="feature__num" aria-hidden="true">
                  {roman(i)}
                </span>
                <span>{s}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* "Not sure?" closing band                                            */
/* ------------------------------------------------------------------ */

export function NotSure({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="section closing">
      <Reveal className="wrap closing__inner">
        <h2 className="section-title section-title--md">{heading}</h2>
        <p className="closing__body">{body}</p>
        <div className="closing__actions">
          <Action link="requestAppointment">New here? Book now</Action>
          <Action link="contact" variant="secondary" sprout={false}>
            Send a note
          </Action>
          <Action link="faq" variant="text" sprout={false} className="text-link">
            Read the FAQ
          </Action>
        </div>
        <p className="closing__text">
          Or text <a href={site.textLineHref}>{site.textLine}</a>
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About page: the approach, the letter, the story, the specialties.   */
/* ------------------------------------------------------------------ */

export function AboutApproach() {
  const a = aboutPage.approach;
  return (
    <section className="section about-approach" aria-labelledby="ap-title">
      <div className="wrap about-approach__grid">
        <Reveal>
          <Label n="I">{a.label}</Label>
          <h2 id="ap-title" className="section-title section-title--md">
            {a.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="about-approach__text">
          {a.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "lede" : ""}>
              {p}
            </p>
          ))}
          <Action link="contact" variant="primary">
            Get started
          </Action>
        </Reveal>
      </div>
    </section>
  );
}

export function Letter() {
  const l = aboutPage.letter;
  return (
    <section className="section letter" aria-labelledby="letter-title">
      <Parallax speed={0.25} className="letter__flower letter__flower--a">
        <Flower kind="lilac" seed={8} />
      </Parallax>
      <Parallax speed={0.15} className="letter__flower letter__flower--b">
        <Flower kind="daisy" seed={19} />
      </Parallax>
      <div className="wrap">
        <Reveal className="letter__paper">
          <Label>{l.label}</Label>
          <h2 id="letter-title" className="sr-only">
            A letter from Sarah
          </h2>
          {l.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "letter__open" : ""}>
              {p}
            </p>
          ))}
          <p className="letter__sign">
            Warmly,
            <span>{l.signoff}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Story() {
  const s = aboutPage.story;
  return (
    <section className="section story" aria-labelledby="story-title">
      <div className="wrap story__grid">
        <Reveal>
          <Label n="III">{s.label}</Label>
          <h2 id="story-title" className="section-title section-title--md">
            {s.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="story__text">
          {s.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function SpecialtyIndex() {
  return (
    <section className="section index" aria-labelledby="index-title">
      <div className="wrap">
        <Reveal className="section-head">
          <Label n="IV">Index of specialties</Label>
          <h2 id="index-title" className="section-title section-title--md">
            {aboutPage.specialtiesTitle}
          </h2>
        </Reveal>
        <ol className="index__list">
          {aboutPage.specialties.map((s, i) => (
            <li key={s}>
              <span className="index__n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="index__t">{s}</span>
              <span className="index__dots" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Consultation + education                                            */
/* ------------------------------------------------------------------ */

export function ConsultGroups() {
  return (
    <section className="section consult" aria-label="Consultation and education services">
      <div className="wrap">
        <Reveal className="consult__how">
          <h2 className="section-title section-title--sm">{consultation.howLabel}</h2>
          <p className="section-intro">{consultation.howBody}</p>
        </Reveal>
        {consultation.groups.map((g, gi) => (
          <div key={g.id} className="consult__group" id={g.id}>
            <Reveal className="consult__group-head">
              <span className="consult__art" aria-hidden="true">
                <Flower kind={g.flower} seed={gi + 5} />
              </span>
              <div>
                <Label n={roman(gi).toUpperCase()}>{g.audience}</Label>
                <h3 className="consult__title">{g.label}</h3>
                <p>{g.summary}</p>
              </div>
            </Reveal>
            <ul className="offer-grid">
              {g.offerings.map((o, i) => (
                <li key={o.title}>
                  <Reveal delay={i * 0.08} className="offer">
                    <p className="offer__meta">
                      <span>{o.format}</span>
                      <span>{o.who}</span>
                    </p>
                    <h4 className="offer__title">{o.title}</h4>
                    <p className="offer__body">{o.body}</p>
                    <p className="offer__price">{o.price}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Supervision() {
  const s = consultation.supervision;
  return (
    <section className="section supervision" id="supervision" aria-labelledby="sup-title">
      <div className="wrap supervision__grid">
        <Reveal>
          <Label n="IV">{s.label}</Label>
          <h2 id="sup-title" className="section-title section-title--md">
            {s.heading}
          </h2>
          <p>{s.body}</p>
          <p className="notice">{s.notice}</p>
        </Reveal>
        <Reveal delay={0.1} className="ledger">
          <p className="ledger__head">Areas of focus</p>
          <ul className="ledger__plans">
            {s.interests.map((x) => (
              <li key={x}>
                <Sprig className="ledger__leaf" />
                {x}
              </li>
            ))}
          </ul>
          <div className="ledger__rows">
            {s.rates.map((r) => (
              <p key={r.title} className="ledger__price">
                <strong>{r.title}</strong>
                <span>{"note" in r ? r.note : "Per session"}</span>
                <em>{r.price}</em>
              </p>
            ))}
          </div>
          <Action link="contact" variant="secondary" sprout={false}>
            Check for openings
          </Action>
        </Reveal>
      </div>
    </section>
  );
}
