"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav } from "@/content/nav";
import { site } from "@/config/site";
import { Action } from "@/components/ui/Action";
import { LogoMark } from "@/components/botanicals/Glyphs";
import { Flower } from "@/components/botanicals/Wildflowers";
import { useExperience } from "@/lib/experience";

export function PrototypeBar() {
  const { notes, setNotes } = useExperience();
  if (!site.prototypeMode) return null;
  return (
    <div className="proto-bar">
      <p>
        <strong>Prototype for Sarah&rsquo;s review.</strong> <span className="proto-bar__more">Buttons and links aren&rsquo;t connected yet.</span>
      </p>
      <button type="button" className="proto-bar__toggle" aria-pressed={notes} onClick={() => setNotes(!notes)}>
        <span className="switch" aria-hidden="true" />
        Notes
      </button>
    </div>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <LogoMark className="logo__mark" />
      <span className="logo__words">
        <span className="logo__name">Curious Roots</span>
        <span className="logo__sub">Wellness</span>
      </span>
    </span>
  );
}

function CalmToggle({ withLabel = false }: { withLabel?: boolean }) {
  const { calm, setCalm } = useExperience();
  return (
    <button
      type="button"
      className={`calm-toggle ${withLabel ? "calm-toggle--labeled" : ""}`}
      aria-pressed={calm}
      onClick={() => setCalm(!calm)}
      title={calm ? "Motion is calmed. Turn animation back on." : "Calm the motion on this site"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {calm ? <path d="M4 12 H20" /> : <path d="M3 12 C6 6 9 6 12 12 S18 18 21 12" />}
      </svg>
      <span className={withLabel ? "" : "sr-only"}>{calm ? "Calm motion is on" : "Calm motion"}</span>
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <PrototypeBar />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-header__inner">
          <Action link="home" variant="text" sprout={false} className="site-header__home">
            <Logo />
            <span className="sr-only">Curious Roots Wellness home</span>
          </Action>

          <nav className="site-nav" aria-label="Main">
            <ul>
              {primaryNav.slice(1).map((item) => (
                <li key={item.link}>
                  <Action link={item.link} variant="text">
                    {item.label}
                  </Action>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <CalmToggle />
            <Action link="patientPortal" variant="quiet" className="site-header__portal">
              Patient portal
            </Action>
            <Action link="requestAppointment" className="site-header__cta">
              Request an appointment
            </Action>
            <button
              type="button"
              className={`menu-button ${open ? "is-open" : ""}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
            >
              <span className="menu-button__lines" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="menu-button__label">{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("button, a");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => panel.current?.querySelector<HTMLElement>("button, a")?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          ref={panel}
          initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
          transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg className="mobile-menu__root" viewBox="0 0 60 600" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M30 0 C20 120 44 200 30 320 C18 420 40 500 28 600"
              className="rt rt--1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.45, 0, 0.2, 1] }}
            />
          </svg>
          <div className="mobile-menu__top">
            <Logo />
            <button type="button" className="menu-button is-open" onClick={onClose}>
              <span className="menu-button__lines" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="menu-button__label">Close</span>
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className="mobile-menu__list">
              {primaryNav.map((item, i) => (
                <motion.li
                  key={item.link}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.4 }}
                >
                  <Action link={item.link} variant="text" sprout={false}>
                    {item.label}
                  </Action>
                </motion.li>
              ))}
            </ul>
          </nav>
          <motion.div
            className="mobile-menu__actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <Action link="requestAppointment">Request an appointment</Action>
            <Action link="patientPortal" variant="secondary" sprout={false}>
              Patient portal
            </Action>
            <CalmToggle withLabel />
          </motion.div>
          <div className="mobile-menu__flowers" aria-hidden="true">
            <Flower kind="bell" seed={3} />
            <Flower kind="grass" seed={5} />
            <Flower kind="umbel" seed={9} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Thumb-reach appointment bar on phones. Appears once the hero CTAs scroll away. */
export function MobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const target = document.querySelector("[data-hero-ctas]");
    if (!target) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0), {
      threshold: 0,
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="mobile-cta"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Action link="requestAppointment">Request an appointment</Action>
          <Action link="patientPortal" variant="secondary" sprout={false} className="mobile-cta__portal">
            Portal
          </Action>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
