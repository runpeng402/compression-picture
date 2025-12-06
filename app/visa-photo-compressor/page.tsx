// app/visa-photo-compressor/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Visa Photo Compressor (Exact 200KB) – PixSize",
  description:
    "Use PixSize to compress visa photos to an exact size of 200KB. Works for U.S. DS-160, Schengen visa, Canada, Australia, UK, Singapore, India and more online visa systems that require strict file size limits.",
  alternates: {
    canonical: "https://compresstokb.com/visa-photo-compressor",
  },
  openGraph: {
    title: "Visa Photo Compressor – Exact 200KB Online Tool | PixSize",
    description:
      "Free online visa photo compressor by PixSize to reduce images to exactly 200KB while preserving facial clarity. Ideal for DS-160, Schengen and other digital visa applications.",
    url: "https://compresstokb.com/visa-photo-compressor",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=Visa+Photo&subtitle=Exact+200KB+Compressor&size=200KB",
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
      a: "Most online visa systems recommend a file size between 100KB and 240KB, depending on the country and platform. Many portals set a hard limit around 200KB.",
    },
    {
      q: "Why was my visa photo rejected?",
      a: "Common reasons include file size being too large, wrong dimensions, incorrect background, or unclear facial details that fail automated checks.",
    },
    {
      q: "Is 200KB safe for visa photo uploads?",
      a: "Yes. 200KB works for many major visa systems, including U.S. DS-160, Schengen, Canada, Australia, UK, Singapore and others, providing a good balance of clarity and size.",
    },
    {
      q: "Will compression reduce biometric accuracy?",
      a: "PixSize compresses while aiming to keep essential facial detail intact, so your visa photo remains clear enough for biometric verification and manual review.",
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
    name: "Visa Photo Compressor (Exact 200KB) – PixSize",
    url: "https://compresstokb.com/visa-photo-compressor",
    description:
      "Use PixSize to compress visa photos to exactly 200KB. Precise, browser-based image compression for digital visa applications.",
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
        titleOverride="Visa Photo Compressor (200KB Exact Size)"
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
