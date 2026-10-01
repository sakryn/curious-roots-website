"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqCopy } from "@/content/home";
import { faqCategories, type FaqItem } from "@/content/faq";
import { Rich } from "@/components/ui/Rich";
import { Reveal } from "@/components/ui/Reveal";
import { Label } from "@/components/ui/Label";
import { Action } from "@/components/ui/Action";

export function Faq({
  items,
  showHeading = true,
  showAllLink = true,
}: {
  /** Pass a subset (specialty pages) to skip the category picker. */
  items?: FaqItem[];
  showHeading?: boolean;
  showAllLink?: boolean;
}) {
  const [cat, setCat] = useState(faqCategories[0].id);
  const list = items ?? faqCategories.find((c) => c.id === cat)!.items;

  return (
    <section className="section faq" aria-labelledby="faq-title" id="faq">
      <div className="wrap faq__grid">
        {showHeading && (
          <Reveal className="section-head faq__head">
            <Label n="VII">Questions</Label>
            <h2 id="faq-title" className="section-title">
              {faqCopy.heading}
            </h2>
            <p className="section-intro">{faqCopy.intro}</p>
          </Reveal>
        )}

        <div className="faq__body">
          {!items && (
            <div className="faq__cats" role="group" aria-label="Question topics">
              {faqCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`tab ${c.id === cat ? "is-on" : ""}`}
                  aria-pressed={c.id === cat}
                  onClick={() => setCat(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          <ul className="faq__list" key={cat}>
            {list.map((item, i) => (
              <FaqRow key={item.id} item={item} defaultOpen={i === 0 && !items} />
            ))}
          </ul>
          {showAllLink && (
            <Action link="faq" variant="text" sprout={false} className="text-link">
              See every question
            </Action>
          )}
        </div>
      </div>
    </section>
  );
}

function FaqRow({ item, defaultOpen }: { item: FaqItem; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <li className={`faq-row ${open ? "is-open" : ""}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          <span>{item.q}</span>
          <span className="faq-row__icon" aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="faq-row__a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              <Rich text={item.a} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
