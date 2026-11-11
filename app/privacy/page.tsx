import { ProsePage } from "@/components/pages/Pages";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Website privacy", "How the Curious Roots Wellness website handles your information.", "/privacy");

export default function Page() {
  return (
    <ProsePage title="Website privacy" intro="Plain-language notes on what this website does and doesn't do with your information.">
      <h2>What this page covers</h2>
      <p>
        This page is about the website only. How your health information is handled once you become a client is described in
        the Notice of Privacy Practices you receive during intake, and your records are kept in Jane, a secure, HIPAA-compliant
        practice management system.
      </p>
      <h2>The contact + waitlist form</h2>
      <p>
        When you use the contact form, what you type is sent to {site.clinician} by email so she can follow up with you. Email
        is not encrypted, so please keep personal health details brief. You&rsquo;ll be asked to acknowledge this before the
        form sends.
      </p>
      <h2>Booking and the client portal</h2>
      <p>
        The &ldquo;Book now&rdquo; and &ldquo;Client portal&rdquo; buttons take you to Jane at curiousrootswellness.janeapp.com.
        Anything you enter there is handled under Jane&rsquo;s own privacy and security practices.
      </p>
      <h2>Texting</h2>
      <p>
        Text messages to {site.textLine} aren&rsquo;t a secure channel. They&rsquo;re best for scheduling and quick questions,
        not detailed health information.
      </p>
      <h2>Cookies and tracking</h2>
      <p>
        This site doesn&rsquo;t sell your information or use advertising trackers. Your reading-comfort choices (like larger text
        or calm motion) are saved only in your own browser so they stay put between visits.
      </p>
      <h2>Not for emergencies</h2>
      <p>
        The website, form and text line aren&rsquo;t monitored around the clock. If you&rsquo;re in crisis, call or text 988,
        text HOME to 741741, or call 911.
      </p>
      <h2>Questions</h2>
      <p>Text {site.textLine} or use the contact form, and Sarah will be happy to answer.</p>
    </ProsePage>
  );
}
