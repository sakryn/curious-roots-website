import { ProsePage } from "@/components/pages/Pages";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Accessibility", "Accessibility at Curious Roots Wellness, online and in the office.", "/accessibility");

export default function Page() {
  return (
    <ProsePage title="Accessibility" intro="Everyone deserves a site, and a practice, that works with their brain and body.">
      <h2>Reading comfort controls</h2>
      <p>
        Look for the round <strong>Reading comfort</strong> button at the top of every page (it&rsquo;s inside the Menu on
        phones). From there you can:
      </p>
      <ul>
        <li>Calm the motion: stops the growing roots, swaying flowers and drifting art</li>
        <li>Make text larger, in two steps</li>
        <li>Turn on stronger contrast</li>
        <li>Turn on easier reading: more space between letters and lines, and no italics</li>
        <li>Underline every link</li>
      </ul>
      <p>Your choices are remembered on your device. If your device is already set to reduce motion, the site respects that automatically.</p>
      <h2>How the site is built</h2>
      <p>
        This site is designed to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at the AA level. It uses a typeface
        designed for legibility, works with a keyboard alone, supports screen readers, and has a &ldquo;Skip to content&rdquo;
        link at the top of every page.
      </p>
      <h2>In sessions</h2>
      <p>
        Fidgeting, movement, breaks and snacks are welcome. If something about the office, telehealth or paperwork gets in your
        way, tell me and we&rsquo;ll figure out what works.
      </p>
      <h2>Something not working?</h2>
      <p>
        If any part of this site is hard to use, please text {site.textLine} or use the contact form and let me know. I&rsquo;ll
        fix it.
      </p>
    </ProsePage>
  );
}
