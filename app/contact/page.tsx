import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME, buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Contact | ${SITE_NAME}`,
  description: `Contact the ${SITE_NAME} team with questions, bug reports or feature requests.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPage title="Contact">
      <p>
        We read every message. Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <h2>Reporting a problem</h2>
      <p>To help us fix an issue quickly, please include:</p>
      <ul>
        <li>The page address you were using and the target size you entered.</li>
        <li>The image format and its original file size.</li>
        <li>Your browser and device, for example Chrome on Android.</li>
      </ul>
      <p>Please do not send personal photos or documents. A description of the problem is enough.</p>
      <h2>Requests</h2>
      <p>
        Need a size preset, a specific exam or form requirement, or a new format? Let us know and we will consider adding
        it.
      </p>
    </LegalPage>
  );
}
