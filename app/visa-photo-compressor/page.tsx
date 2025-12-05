// app/visa-photo-compressor/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Visa Photo Compressor – Reduce Visa Photo to 200KB | ExactSize",
  description:
    "Compress visa photos to exactly 200KB. Works for U.S. DS-160, Schengen visa, Canada, Australia, UK, Singapore, India, and more.",
  alternates: {
    canonical: "https://compresstokb.com/visa-photo-compressor",
  },
  openGraph: {
    title: "Visa Photo Compressor – 200KB Online Tool",
    description:
      "Free online visa photo compressor to reduce images to 200KB instantly.",
    url: "https://compresstokb.com/visa-photo-compressor",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=Visa+Photo&subtitle=200KB+Compressor&size=200KB",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// -----------------------
// 页面主体
// -----------------------
export default function VisaPhotoPage() {
  const FAQ = [
    {
      q: "What is the required size for a visa photo?",
      a: "Most visa systems recommend a file size between 100KB and 240KB, depending on the country.",
    },
    {
      q: "Why was my visa photo rejected?",
      a: "Common reasons include large file size, wrong dimensions, or unclear facial details.",
    },
    {
      q: "Is 200KB safe for visa photo uploads?",
      a: "Yes. 200KB works for U.S. visa (DS-160), Schengen, Canada, Australia, and many others.",
    },
    {
      q: "Will compression reduce biometric accuracy?",
      a: "No. This tool compresses while keeping essential facial clarity required for verification.",
    },
  ];

  const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const jsonLdPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Visa Photo Compressor (200KB)",
    url: "https://compresstokb.com/visa-photo-compressor",
    description: "Compress visa photos to exactly 200KB.",
  };

  return (
    <>
      {/* JSON-LD 页面 Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPage) }}
      />

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* 工具主体 */}
      <ImageCompressorTool
        initialTargetSize="200"
        titleOverride="Visa Photo Compressor (200KB)"
      />

      {/* 页面 FAQ 内容 */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-sm text-slate-600">
          {FAQ.map((item, idx) => (
            <div key={idx}>
              <p className="font-medium text-slate-800">{item.q}</p>
              <p className="mt-1">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
