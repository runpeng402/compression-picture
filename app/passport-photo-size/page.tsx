// app/passport-photo-size/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Passport Photo Size Compressor – Reduce Photo to 200KB | ExactSize",
  description:
    "Compress passport photos to exactly 200KB. Works for USA, China, India, UK, Canada, Australia, Singapore, and most international passport submission systems.",
  alternates: {
    canonical: "https://compresstokb.com/passport-photo-size",
  },
  openGraph: {
    title: "Passport Photo Size Compressor – 200KB Online Tool",
    description:
      "Free online passport photo compressor to reduce images to 200KB instantly with preserved clarity.",
    url: "https://compresstokb.com/passport-photo-size",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=Passport+Photo&subtitle=200KB+Compressor&size=200KB",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// -----------------------
// 页面主体
// -----------------------
export default function PassportPhotoPage() {
  const FAQ = [
    {
      q: "What is the required size for a digital passport photo?",
      a: "Most countries require a digital passport photo between 100KB and 200KB for online submission.",
    },
    {
      q: "Why gets my passport photo rejected?",
      a: "Common issues include oversized files, incorrect dimensions, or low facial clarity.",
    },
    {
      q: "Is 200KB suitable for passport photo uploads?",
      a: "Yes. 200KB is widely accepted by global passport systems including USA, UK, China, and Australia.",
    },
    {
      q: "Will compression affect biometric recognition?",
      a: "This tool maintains essential biometric clarity while reducing size.",
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
    name: "Passport Photo Size Compressor",
    url: "https://compresstokb.com/passport-photo-size",
    description: "Compress passport photos to exactly 200KB.",
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
        titleOverride="Passport Photo Size (200KB)"
      />

      {/* 页面 FAQ 文本 */}
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
