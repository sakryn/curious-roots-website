import { PageHeader } from "@/components/pages/Pages";
import { ContactPage } from "@/components/sections/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contact + waitlist",
  "Book with Sarah Snyder through Jane, text the practice line, or send a note through the secure contact and waitlist form. Sinking Spring, PA.",
  "/contact",
);

export default function Page() {
  return (
    <>
      <PageHeader
        title="Let's connect."
        kicker="Contact + waitlist"
        intro="I'm currently accepting new clients, in person at my office and by telehealth. Pick whichever way of reaching out feels easiest."
        flower="lilac"
        photo
      />
      <ContactPage />
    </>
  );
}
