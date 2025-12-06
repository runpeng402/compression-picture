// app/passport-photo-size/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Passport Photo Size Compressor (Exact 200KB) – PixSize",
  description:
    "Use PixSize to compress passport photos to an exact size of 200KB. Works for USA, China, India, UK, Canada, Australia, Singapore, and most international online passport systems that require strict file size limits.",
  alternates: {
    canonical: "https://compresstokb.com/passport-photo-size",
  },
  openGraph: {
    title: "Passport Photo Size Compressor – Exact 200KB Image Tool | PixSize",
    description:
      "Free online passport photo compressor by PixSize to reduce images to exactly 200KB while maintaining biometric clarity. Ideal for digital passport and ID photo uploads.",
    url: "https://compresstokb.com/passport-photo-size",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=Passport+Photo&subtitle=Exact+200KB+Compressor&size=200KB",
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
      a: "Most countries require a digital passport photo between 100KB and 200KB for online submission. Some systems explicitly require a maximum of 200KB.",
    },
    {
      q: "Why does my passport photo get rejected?",
      a: "Common issues include oversized files, incorrect dimensions, low facial clarity, or failing biometric checks. Compressing to an exact KB size often helps meet upload rules.",
    },
    {
      q: "Is 200KB suitable for passport photo uploads?",
      a: "Yes. 200KB is widely accepted by many global passport systems, including those in the USA, UK, China, India, Canada and Australia, as a safe and clear size for biometric review.",
    },
    {
      q: "Will compression affect biometric recognition?",
      a: "PixSize aims to maintain essential biometric clarity while reducing file size, so your passport photo remains sharp enough for automated verification and manual review.",
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
    name: "Passport Photo Size Compressor – PixSize",
    url: "https://compresstokb.com/passport-photo-size",
    description:
      "Use PixSize to compress passport photos to exactly 200KB. Precise, browser-based image compression for digital passport and ID photo uploads.",
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

      {/* 工具主体：默认目标 200KB，标题强调 Exact Size */}
      <ImageCompressorTool
        initialTargetSize="200"
        titleOverride="Passport Photo Size Compressor (200KB Exact Size)"
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
