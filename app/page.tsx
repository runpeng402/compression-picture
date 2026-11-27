import { Metadata } from "next";
import ImageCompressorTool from "@/components/ImageCompressorTool";
import { SITE_FORMER_NAME, SITE_NAME, SITE_URL, buildPageMetadata, jsonLdScript } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Compress Image to KB Online – Exact Size JPG, PNG & WebP | ${SITE_NAME}`,
  description: `${SITE_NAME} (formerly ${SITE_FORMER_NAME}) is a free online image compressor that reduces JPG, PNG and WebP images to an exact size in KB or MB, such as 20KB, 50KB or 200KB. Runs in your browser, no upload.`,
  path: "/",
  ogTitle: SITE_NAME,
  ogSize: "Compress Image to KB",
});

const FAQ_ITEMS = [
  {
    q: `What does ${SITE_NAME} do?`,
    a: `${SITE_NAME}, formerly called ${SITE_FORMER_NAME}, compresses JPG, PNG and WebP images to a file size you choose in KB or MB. Instead of a quality slider, you enter the limit you need, such as 50KB, and the tool lowers quality and, if needed, resolution until the file fits.`,
  },
  {
    q: "When do I need an image under a specific KB size?",
    a: "Many online systems set a maximum file size, for example 20KB, 50KB, 100KB or 200KB. Common cases are job portals, exam and university applications, government forms, visa applications and email attachments.",
  },
  {
    q: "Will compressing to a small size reduce image quality?",
    a: "Reaching a smaller file size always removes some detail. The tool keeps the highest quality that still fits your target, so text usually stays readable and faces stay recognisable. Very small targets such as 5KB or 10KB also reduce the image dimensions.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. Compression runs entirely in your browser on your own device. Your photos, ID scans and documents are not sent to or stored on our servers.",
  },
  {
    q: "Which formats are supported?",
    a: "You can compress JPG, JPEG, PNG and WebP files up to 100MB. The output keeps the original format. You can also compress up to 100 images at once in batch mode and download them as a ZIP file.",
  },
];

export default function HomePage() {
  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    alternateName: SITE_FORMER_NAME,
    url: SITE_URL,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Compress JPG, PNG and WebP images to an exact file size in KB or MB directly in your browser.",
  };

  const jsonLdSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_FORMER_NAME,
    url: SITE_URL,
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdSite)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdApp)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdFaq)} />

      <ImageCompressorTool titleOverride="Compress Image to KB or MB (Exact Size)" />

      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-10 mt-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Compress images to the exact size a form asks for
        </h2>
        <p className="text-sm text-slate-600 mb-3">
          Most image compressors only make a file &quot;smaller&quot;. {SITE_NAME} lets you{" "}
          <strong>set the exact limit in KB or MB</strong>, then finds the highest quality that still fits
          under it. That is what you need when an upload form rejects anything above{" "}
          <strong>20KB, 50KB, 100KB, 200KB or 500KB</strong>.
        </p>
        <p className="text-sm text-slate-600 mb-3">
          Typical uses include photos and signatures for job and exam applications, scans for government and
          university portals, visa photos, profile pictures, and attachments for email or messaging apps with
          upload limits.
        </p>
        <h3 className="text-base font-semibold text-slate-800 mt-6 mb-2">How to compress an image to a specific size</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 mb-3">
          <li>Upload a JPG, PNG or WebP image (or switch to batch mode for several files).</li>
          <li>Enter the target size in KB, or pick a preset such as 50KB or 1MB.</li>
          <li>Click <strong>Compress Now</strong> and download the result.</li>
        </ol>
        <p className="text-sm text-slate-600">
          All processing happens in your browser. Your images are <strong>never uploaded</strong>, so passport
          photos, ID documents and personal pictures stay on your device. No registration and no watermark.
        </p>
      </section>

      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-16">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 text-sm text-slate-600">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q}>
              <h3 className="font-medium text-slate-800">{item.q}</h3>
              <p className="mt-1">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
