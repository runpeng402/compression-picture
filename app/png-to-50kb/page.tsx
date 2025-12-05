// app/jpg-to-50kb/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// -----------------------
// Metadata（专业增强版）
// -----------------------
export const metadata: Metadata = {
  title: "Compress JPG to 50KB – Free Online JPG Compressor | ExactSize",
  description:
    "Compress JPG images to exactly 50KB using our fast, accurate, and secure online compressor. Ideal for job portals, resumes, school submissions, and systems requiring strict JPG size limits.",
  alternates: {
    canonical: "https://compresstokb.com/jpg-to-50kb",
  },
  openGraph: {
    title: "Compress JPG to 50KB – Exact JPG Size Tool",
    description:
      "Free online JPG compressor to reduce JPG/JPEG images to exactly 50KB. High quality, private, and instant.",
    url: "https://compresstokb.com/jpg-to-50kb",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=JPG+to+50KB&subtitle=Exact+Size+Compressor&size=50KB",
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
      a: "Simply upload your JPG image, enter 50KB as your target, and download the optimized output instantly.",
    },
    {
      q: "Why do job portals or online forms require 50KB JPG files?",
      a: "Many application systems enforce a strict 50KB JPG limit to ensure fast uploads and compatibility with older verification systems.",
    },
    {
      q: "Will compressing to 50KB reduce quality?",
      a: "Some loss occurs, but this tool optimizes JPG images to maintain clarity while meeting the exact size requirement.",
    },
    {
      q: "Is 50KB enough for resumes or profile photos?",
      a: "Yes, 50KB JPG images are widely accepted by HR systems, ATS platforms, and university portals.",
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
    name: "Compress JPG to 50KB",
    url: "https://compresstokb.com/jpg-to-50kb",
    description:
      "Free online tool to compress JPG images to exactly 50KB for forms, uploads, and documents.",
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
        initialTargetSize="50"
        titleOverride="Compress JPG to 50KB"
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
