"use client";

import { site } from "@/config/site";
import { Action } from "@/components/ui/Action";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Flower } from "@/components/botanicals/Wildflowers";
import { RootSpine } from "@/components/botanicals/Motion";
import { ContactForm } from "./ContactForm";
import { Location } from "./LocationEducation";

const WAYS = [
  {
    flower: "daisy" as const,
    n: "i",
    title: "New here? Book now",
    body: "Pick a first appointment time that works for you on Jane, my secure scheduling system.",
    action: { link: "requestAppointment" as const, label: "Book on Jane" },
  },
  {
    flower: "lilac" as const,
    n: "ii",
    title: "Text the practice line",
    body: "I can't answer calls while I'm in session, and there's no front desk. A text reaches me faster, and we'll set up a time to talk by phone.",
    action: { link: "textLine" as const, label: `Text ${site.textLine}` },
  },
  {
    flower: "dandelion" as const,
    n: "iii",
    title: "Send a note or join the waitlist",
    body: "Not ready to book, have a question, or want a spot on the waitlist? The form below comes straight to me.",
    action: { link: "waitlist" as const, label: "Go to the form" },
  },
];

export function ContactPage() {
  return (
    <div className="grow-zone grow-zone--inner">
      <RootSpine />
      <section className="section ways" aria-labelledby="ways-title">
        <div className="wrap">
          <Reveal className="section-head">
            <Label n="I">Three ways in</Label>
            <h2 id="ways-title" className="section-title section-title--md">
              Whatever&rsquo;s easiest for you.
            </h2>
          </Reveal>
          <ol className="ways__grid">
            {WAYS.map((w, i) => (
              <li key={w.title}>
                <Reveal delay={i * 0.1} className="way">
                  <span className="way__art" aria-hidden="true">
                    <Flower kind={w.flower} seed={i + 7} />
                  </span>
                  <span className="way__n" aria-hidden="true">
                    {w.n}.
                  </span>
                  <h3 className="way__title">{w.title}</h3>
                  <p>{w.body}</p>
                  <Action link={w.action.link} variant={i === 0 ? "primary" : "secondary"} sprout={i === 0}>
                    {w.action.label}
                  </Action>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="ways__portal">
            Already a client? <Action link="patientPortal" variant="text" sprout={false} className="text-link">Sign in to the client portal</Action>
          </p>
        </div>
      </section>

      <section className="section reach" id="reach-out" aria-labelledby="reach-title">
        <div className="wrap reach__grid">
          <Reveal className="reach__intro">
            <Label n="II">Contact + waitlist form</Label>
            <h2 id="reach-title" className="section-title section-title--md">
              Send me a note.
            </h2>
            <p>
              Thank you for your interest. Fill this out and I&rsquo;ll follow up personally. You don&rsquo;t need to have it all
              figured out; a sentence or two is plenty.
            </p>
            <p className="reach__tag">We look forward to supporting you in healing from the roots up.</p>
          </Reveal>
          <Reveal className="reach__form" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <Location n="III" />
    </div>
  );
}
