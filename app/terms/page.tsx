import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, CONTENT_UPDATED, SITE_NAME, buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Terms of Use | ${SITE_NAME}`,
  description: `Terms for using the free ${SITE_NAME} image compression tool.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated={CONTENT_UPDATED}>
      <p>By using {SITE_NAME}, you agree to these terms.</p>
      <h2>Free service</h2>
      <p>
        {SITE_NAME} is provided free of charge, as is, without warranties of any kind. We aim to keep the tool accurate
        and available but cannot guarantee that it will always work or meet every requirement.
      </p>
      <h2>Your responsibility</h2>
      <ul>
        <li>Only process images you have the right to use.</li>
        <li>
          Check the compressed file against the official requirements of the form or organisation you submit it to.
          We are not responsible for rejected applications.
        </li>
        <li>Keep a copy of your original image. Compression permanently removes detail from the output file.</li>
      </ul>
      <h2>Acceptable use</h2>
      <p>Do not use the site to break the law, or attempt to disrupt or overload the service.</p>
      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {SITE_NAME} is not liable for any loss or damage arising from the use of the
        site or its output.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms. The date above shows the latest version.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
