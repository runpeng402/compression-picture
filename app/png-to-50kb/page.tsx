import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "PNG to 50KB – Free Online PNG Size Compressor",
  description:
    "Compress PNG images to exactly 50KB. Useful for portals, email uploads, logos, icons, and digital forms with strict size limits.",
};

const FAQ = [
  {
    q: "How do I compress a PNG to 50KB?",
    a: "Upload your PNG above, set the target to 50KB, and download a perfectly optimized version.",
  },
  {
    q: "Why is PNG compression important?",
    a: "PNG images preserve sharp edges and transparency, but they can be large. Compressing reduces upload errors and improves performance.",
  },
  {
    q: "Does PNG to 50KB preserve transparency?",
    a: "Yes. The compressor maintains transparency whenever possible while achieving the target size.",
  },
  {
    q: "Is 50KB enough for icons and logos?",
    a: "Yes. Most icons, badges, signatures, and digital graphics remain clear at 50KB.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function PNG50KBPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <ImageCompressorTool
        initialTargetSize="50"
        titleOverride="PNG to 50KB – Exact Size Compressor"
      />

      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-6 text-sm text-slate-600 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Why compress a PNG to 50KB?
        </h2>
        <p>
          PNG files are often much larger than JPG due to transparency support.
          Reducing a PNG to <strong>50KB</strong> ensures faster uploads and
          compatibility with online forms and email systems.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          Frequently Asked Questions
        </h3>

        <ul className="list-disc list-inside space-y-2">
          {FAQ.map((item, i) => (
            <li key={i}>
              <strong>{item.q}</strong>
              <br />
              {item.a}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
