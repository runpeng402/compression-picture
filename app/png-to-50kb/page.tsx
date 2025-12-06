// app/png-to-50kb/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// -----------------------
// Metadata（PixSize + PNG 专项增强版）
// -----------------------
export const metadata: Metadata = {
  title: "Compress PNG to 50KB (Exact Size) – PixSize",
  description:
    "Use PixSize to compress PNG images to exactly 50KB. Ideal for web forms, UI icons, logos, transparent PNG uploads and systems that require strict PNG size limits.",
  alternates: {
    canonical: "https://compresstokb.com/png-to-50kb",
  },
  openGraph: {
    title: "Compress PNG to 50KB – Exact PNG Size Tool | PixSize",
    description:
      "Free online PNG compressor by PixSize to reduce PNG images to exactly 50KB while keeping transparency and clarity whenever possible.",
    url: "https://compresstokb.com/png-to-50kb",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=PNG+to+50KB&subtitle=Exact+Size+PNG+Compressor&size=50KB",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// -----------------------
// 页面主体
// -----------------------
export default function PngTo50kbPage() {
  const FAQ = [
    {
      q: "How do I compress a PNG to 50KB?",
      a: "Upload your PNG image, set 50KB as the target size, and PixSize will automatically optimize the image so that the final file is as close as possible to 50KB.",
    },
    {
      q: "Why do some platforms require 50KB PNG files?",
      a: "Many design systems, dashboards and online forms restrict PNG size to around 50KB to keep interfaces fast, reduce bandwidth usage and ensure quick uploads.",
    },
    {
      q: "Will compressing a PNG to 50KB remove transparency?",
      a: "PixSize tries to preserve transparency where possible. However, very large PNGs with alpha channels may need stronger compression or resizing to hit 50KB.",
    },
    {
      q: "Is 50KB enough for logos or UI icons?",
      a: "Yes. 50KB is usually sufficient for web logos, buttons, UI icons and simple graphics, especially when the image dimensions are not too large.",
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
    name: "Compress PNG to 50KB – PixSize",
    url: "https://compresstokb.com/png-to-50kb",
    description:
      "Free online tool by PixSize to compress PNG images to exactly 50KB for logos, UI icons and online PNG uploads that require strict file size limits.",
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

      {/* 工具主体：默认目标 50KB，标题强调 PNG + Exact Size */}
      <ImageCompressorTool
        initialTargetSize="50"
        titleOverride="Compress PNG to 50KB (Exact Size)"
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
