"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { Sprout } from "@/components/botanicals/Glyphs";
import { StatusGlyph } from "@/components/botanicals/Glyphs";

/**
 * Contact + waitlist form. Submissions are emailed straight to Sarah
 * (the same way her Squarespace form works today) through Web3Forms.
 *
 * Setup: create a free access key at web3forms.com using Sarah's email,
 * then add it in Vercel as NEXT_PUBLIC_WEB3FORMS_KEY. Until then the form
 * explains that it isn't connected yet and points people to the text line.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const WHO = ["Myself", "My child or teen", "My family", "I'm a professional or organization"];
const TOPICS = [
  "ADHD + neurodivergence",
  "An ADHD assessment",
  "Trauma",
  "Anxiety or overwhelm",
  "Grief or a life transition",
  "Child, teen or family support",
  "Joining the waitlist",
  "Consultation or training",
  "Clinical supervision",
  "Something else",
];
const FORMATS = ["In person", "Telehealth", "Either is fine"];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    if (!ACCESS_KEY) {
      setStatus("error");
      setError(`The form isn't connected yet. Please text ${site.textLine} instead.`);
      return;
    }
    const topics = data.getAll("topics").join(", ");
    const payload = {
      access_key: ACCESS_KEY,
      subject: `New website message: ${data.get("name")} (${data.get("who") || "contact form"})`,
      from_name: "Curious Roots website",
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone") || "(not given)",
      "OK to text": data.get("okText") ? "Yes" : "No",
      "Who it's for": data.get("who") || "(not given)",
      "Reaching out about": topics || "(not given)",
      "Preferred format": data.get("format") || "(not given)",
      Insurance: data.get("insurance") || "(not given)",
      "How they heard": data.get("heard") || "(not given)",
      message: data.get("message") || "(no message)",
      "Consent to unencrypted email": "Yes",
    };
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        track("form_contact_sent");
        form.reset();
      } else {
        throw new Error(json.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError(`That didn't go through. Please try again, or text ${site.textLine}.`);
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <StatusGlyph stage="bloom" className="form-done__glyph" />
        <h3>Thank you. Your note is on its way to Sarah.</h3>
        <p>
          She reads every message herself and will follow up as soon as she&rsquo;s out of session. If anything is urgent,
          text <a href={site.textLineHref}>{site.textLine}</a>. In a crisis, call or text 988.
        </p>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={onSubmit} noValidate={false}>
      <input type="checkbox" name="botcheck" className="cform__hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <fieldset className="cform__set">
        <legend>Who is this for?</legend>
        <div className="chips">
          {WHO.map((w) => (
            <label key={w} className="chip-opt">
              <input type="radio" name="who" value={w} />
              <span>{w}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="cform__row">
        <label className="field">
          <span className="field__label">
            Your name <em>required</em>
          </span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span className="field__label">
            Email <em>required</em>
          </span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <div className="cform__row">
        <label className="field">
          <span className="field__label">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="check check--inline">
          <input type="checkbox" name="okText" value="yes" />
          <span>It&rsquo;s okay to text me at this number</span>
        </label>
      </div>

      <fieldset className="cform__set">
        <legend>What are you reaching out about? Pick any that fit.</legend>
        <div className="chips">
          {TOPICS.map((t) => (
            <label key={t} className="chip-opt">
              <input type="checkbox" name="topics" value={t} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="cform__set">
        <legend>In person or telehealth?</legend>
        <div className="chips">
          {FORMATS.map((t) => (
            <label key={t} className="chip-opt">
              <input type="radio" name="format" value={t} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="cform__row">
        <label className="field">
          <span className="field__label">Insurance plan, if you&rsquo;re using one</span>
          <input name="insurance" />
        </label>
        <label className="field">
          <span className="field__label">How did you hear about me?</span>
          <input name="heard" />
        </label>
      </div>

      <label className="field">
        <span className="field__label">Anything you&rsquo;d like me to know</span>
        <span className="field__hint">A sentence or two is plenty. Please keep personal health details brief; we can talk through the rest together.</span>
        <textarea name="message" rows={4} />
      </label>

      <label className="check consent">
        <input type="checkbox" name="consent" required />
        <span>
          I understand that information sent through this form is unencrypted electronic communication. By submitting, I agree to hold
          Curious Roots Wellness harmless for unauthorized use, disclosure or access of protected health information sent this way.
        </span>
      </label>

      {status === "error" && (
        <p className="cform__error" role="alert">
          {error}
        </p>
      )}

      <div className="cform__submit">
        <button type="submit" className="action action--primary" disabled={status === "sending"}>
          <Sprout className="action__sprout" />
          <span className="action__label">{status === "sending" ? "Sending…" : "Yes, send my note"}</span>
        </button>
        <p className="cform__crisis">
          Not for emergencies. In a crisis, call or text <strong>988</strong> or call <strong>911</strong>.
        </p>
      </div>
    </form>
  );
}
