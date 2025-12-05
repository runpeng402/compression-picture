import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Visa Photo Compressor – Prepare Photos for Online Visa Applications",
  description:
    "Compress visa photos to meet digital upload requirements for U.S. DS-160, Schengen, Canada, Australia, UK, and more.",
};

const FAQ = [
  {
    q: "What is the required size for a visa photo?",
    a: "Most visa systems require photo sizes between 50KB and 240KB depending on the country.",
  },
  {
    q: "Why does the visa system reject my photo?",
    a: "Common reasons include excessive file size, incorrect dimensions, or low clarity.",
  },
  {
    q: "Is 100KB a good size for visa photos?",
    a: "Yes. 100KB is accepted by most global visa platforms and retains good clarity.",
  },
  {
    q: "Does compression affect facial recognition?",
    a: "No. This compressor maintains essential facial detail needed for biometric checks.",
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

export default function VisaPhotoCompressorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <ImageCompressorTool
        initialTargetSize="100"
        titleOverride="Visa Photo Compressor"
      />

      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-6 text-sm text-slate-600 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Why compress visa photos?
        </h2>
        <p>
          Visa platforms often enforce strict upload limits. Compressing your photo prevents
          upload failures and ensures smooth application processing.
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
