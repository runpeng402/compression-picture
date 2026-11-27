import { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_NAME, buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `About ${SITE_NAME}`,
  description: `${SITE_NAME} is a free browser-based tool for compressing images to an exact file size in KB or MB for online forms and uploads.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <LegalPage title={`About ${SITE_NAME}`}>
      <p>
        {SITE_NAME} is a free online tool that compresses JPG, PNG and WebP images to the exact file size you need,
        such as 20KB, 50KB, 100KB or 1MB.
      </p>
      <h2>Why we built it</h2>
      <p>
        Online application forms for jobs, exams, universities, visas and government services often reject images
        that are over a strict size limit. Most compressors only make a file &quot;smaller&quot;, which means trying again
        and again until it fits. {SITE_NAME} lets you enter the limit once and get a file that fits under it.
      </p>
      <h2>How it works</h2>
      <ul>
        <li>You choose a target size in KB or MB.</li>
        <li>The tool lowers image quality step by step and, if needed, the image dimensions until the file fits.</li>
        <li>Everything runs in your browser. Your images are never uploaded to our servers.</li>
      </ul>
      <h2>What it does not do</h2>
      <p>
        {SITE_NAME} changes file size only. It does not crop photos, replace backgrounds or check official photo
        rules such as head position. Always check the requirements published by the organisation you are applying to.
      </p>
      <h2>Contact</h2>
      <p>
        Questions, bug reports or suggestions are welcome at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        See also our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalPage>
  );
}
