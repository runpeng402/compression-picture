import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Passport Photo Size Compressor – Prepare Images for Online Submission",
  description:
    "Compress passport photos to meet digital upload size requirements. Ideal for government portals, renewals, and identity submissions.",
};

const FAQ = [
  {
    q: "What size should a passport photo be for online submission?",
    a: "Most systems accept photos between 50KB and 200KB, depending on the country.",
  },
  {
    q: "Why was my passport photo rejected?",
    a: "Common reasons include excessive file size, incorrect resolution, or low clarity.",
  },
  {
    q: "Is 100KB a good size for passport photos?",
    a: "Yes. 100KB is widely compatible and maintains good clarity.",
  },
  {
    q: "Does compression affect biometric quality?",
    a: "This tool preserves facial detail required for biometric checks.',
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

export default function PassportPhotoSizePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <ImageCompressorTool
        initialTargetSize="100"
        titleOverride="Passport Photo Size Compressor"
      />

      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-6 text-sm text-slate-600 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Why compress a passport photo for online portals?
        </h2>
        <p>
          Many immigration and identity systems require passport photos under a specific
          file-size limit. Compressing ensures your image uploads successfully.
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
