import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, CONTENT_UPDATED, SITE_NAME, SITE_URL, buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `How ${SITE_NAME} handles your data. Images are compressed in your browser and never uploaded to our servers.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={CONTENT_UPDATED}>
      <p>
        This policy explains what happens to your data when you use {SITE_NAME} at {SITE_URL}.
      </p>
      <h2>Your images stay on your device</h2>
      <p>
        Image compression runs entirely in your web browser. The images you select are read and processed on your own
        device and are not uploaded to, stored on or viewed by our servers.
      </p>
      <h2>Information collected automatically</h2>
      <p>
        Like most websites, our hosting provider may record standard technical request data, such as IP address,
        browser type, requested page and time of access, to deliver the site, keep it secure and diagnose errors. We do
        not use this data to identify you.
      </p>
      <h2>Cookies, analytics and advertising</h2>
      <p>
        We may use privacy-respecting analytics to understand which pages are useful, and we may show advertising in
        the future. If we add services that use cookies or similar technologies, we will update this policy and, where
        required by law, ask for your consent first.
      </p>
      <h2>Children</h2>
      <p>{SITE_NAME} is a general-purpose tool and does not knowingly collect personal information from children.</p>
      <h2>Changes to this policy</h2>
      <p>We will post any changes on this page and update the date above.</p>
      <h2>Contact</h2>
      <p>
        For privacy questions, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
