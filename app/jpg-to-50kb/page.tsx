// app/jpg-to-50kb/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// -----------------------
// Metadata（PixSize + Exact Size 增强版）
// -----------------------
export const metadata: Metadata = {
  title: "Compress JPG to 50KB (Exact Size) – PixSize",
  description:
    "Use PixSize to compress JPG images to exactly 50KB. Fast, accurate and secure online JPG compressor, ideal for job portals, resumes, school submissions and systems that require strict 50KB JPG limits.",
  alternates: {
    canonical: "https://compresstokb.com/jpg-to-50kb",
  },
  openGraph: {
    title: "Compress JPG to 50KB – Exact JPG Size Tool | PixSize",
    description:
      "Free online JPG compressor by PixSize to reduce JPG/JPEG images to exactly 50KB while preserving clarity. Perfect for online forms, ATS systems and university portals.",
    url: "https://compresstokb.com/jpg-to-50kb",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=JPG+to+50KB&subtitle=Exact+Size+JPG+Compressor&size=50KB",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// -----------------------
// 页面主体
// -----------------------
export default function JpgTo50kbPage() {
  const FAQ = [
    {
      q: "How do I compress a JPG to 50KB?",
      a: "Upload your JPG image, set 50KB as the target size, and then download the optimized file. PixSize automatically adjusts quality and resolution to hit as close as possible to 50KB.",
    },
    {
      q: "Why do job portals or online forms require 50KB JPG files?",
      a: "Many job portals, HR systems and government forms enforce a strict 50KB JPG limit to ensure fast uploads, consistent storage and compatibility with older verification systems.",
    },
    {
      q: "Will compressing to 50KB reduce quality?",
      a: "Some quality loss is inevitable at 50KB, but PixSize tries to preserve as much clarity as possible while meeting the exact size requirement, so your resume photo or document image remains readable.",
    },
    {
      q: "Is 50KB enough for resumes or profile photos?",
      a: "Yes. A 50KB JPG is widely accepted by HR systems, ATS platforms and university portals, and is usually sufficient for small profile photos, ID images or document scans.",
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
    name: "Compress JPG to 50KB – PixSize",
    url: "https://compresstokb.com/jpg-to-50kb",
    description:
      "Free online tool by PixSize to compress JPG images to exactly 50KB for job portals, online forms and document uploads that require strict JPG size limits.",
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

      {/* 工具主体：默认目标 50KB，标题强调 Exact Size */}
      <ImageCompressorTool
        initialTargetSize="50"
        titleOverride="Compress JPG to 50KB (Exact Size)"
      />

      {/* 页面 FAQ 文本内容（增强排名） */}
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
