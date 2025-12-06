// app/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// -------------------------------
// 首页 SEO Metadata
// -------------------------------
export const metadata: Metadata = {
  title:
    "PixSize – Compress Images to Exact Size (KB or MB) | Exact Size Image Compressor",
  description:
    "PixSize is a free online image compressor that lets you reduce JPG or PNG images to an exact file size in KB or MB. Perfect for passports, visa systems, job portals, and online forms that require strict file size limits.",
  alternates: {
    canonical: "https://compresstokb.com",
  },
  openGraph: {
    title: "PixSize – Compress Images to Exact Size (KB or MB)",
    description:
      "Precise image compression powered by PixSize and the ExactSize engine – reduce any image to an exact file size while keeping it clear and usable for passports, forms, job portals and more.",
    url: "https://compresstokb.com",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=PixSize&subtitle=Exact+Size+Image+Compressor&size=Free+Online+Tool",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// FAQ 内容（同时用于页面展示 & JSON-LD）
const FAQ_ITEMS = [
  {
    q: "What is PixSize – Exact Size Image Compressor?",
    a: "PixSize is a lightweight image compressor brand built on the ExactSize engine. It focuses on one thing only: helping you compress JPG or PNG images to an exact file size in KB or MB, instead of just giving you a rough smaller file.",
  },
  {
    q: "When do I need an exact KB or MB file size?",
    a: "Many online systems have strict file size limits such as 50KB, 100KB, 200KB or 500KB. Common examples include job portals, government forms, university applications, passport and visa photo uploads.",
  },
  {
    q: "Will compressing to an exact size reduce image quality?",
    a: "Some compression is necessary to hit an exact file size, but PixSize optimizes your image to balance quality and size. In most cases text remains readable and faces stay clear enough for identity verification.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. All compression is performed directly in your browser. Your images are not stored on a server, which means your passport photos, ID documents, and personal pictures stay on your own device.",
  },
  {
    q: "Which formats does PixSize support?",
    a: "PixSize currently supports JPG, JPEG, PNG and WebP files. You can set any exact target size in KB or MB, or use quick presets like 50KB, 100KB, 200KB and 1MB.",
  },
];

// -------------------------------
// 首页渲染
// -------------------------------
export default function HomePage() {
  const jsonLdSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PixSize – Exact Size Image Compressor",
    url: "https://compresstokb.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://compresstokb.com/compress-to-{search_term_string}kb",
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD：站点信息 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite) }}
      />

      {/* JSON-LD：FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* 主工具组件（内部会渲染 1 套 Popular Compressions） */}
      <ImageCompressorTool titleOverride="Compress Images to Exact Size" />

      {/* 品牌 + 长文 SEO 介绍 */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-10 mt-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          PixSize – Exact Size Image Compressor
        </h2>
        <p className="text-sm text-slate-600 mb-3">
          <strong>PixSize</strong> is a lightweight image compressor brand built
          on the <strong>ExactSize</strong> engine. It focuses on one thing
          only: helping you compress JPG or PNG files to an{" "}
          <strong>exact file size in KB or MB</strong>, instead of just giving
          you a rough “smaller file”.
        </p>
        <p className="text-sm text-slate-600 mb-3">
          This makes PixSize especially suitable for{" "}
          <strong>online forms, job portals, passport and visa systems</strong>,
          education portals, and government websites that strictly require a
          maximum file size such as <strong>50KB, 100KB, 200KB, or 500KB</strong>
          . You can also use it to prepare profile photos, ID document scans,
          and attachments for email or messaging tools that enforce upload
          limits.
        </p>
        <p className="text-sm text-slate-600 mb-3">
          Unlike traditional “compress image” tools that only provide a
          percentage slider, PixSize lets you{" "}
          <strong>set a precise target</strong> in KB or MB. The ExactSize
          engine then automatically adjusts compression parameters and re-encodes
          your image so that the final file size is as close as possible to your
          target, while preserving visual clarity.
        </p>
        <p className="text-sm text-slate-600">
          All compression is performed in your browser. Your images are{" "}
          <strong>not stored on a server</strong>, which means your passport
          photos, ID documents, and personal images stay on your own device. You
          can use PixSize directly in the browser without registration, download
          the result instantly, and repeat the process as many times as needed.
        </p>
      </section>

      {/* FAQ 文本（与 JSON-LD 对应） */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-16">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Frequently Asked Questions about Exact Size Compression
        </h2>
        <div className="space-y-4 text-sm text-slate-600">
          {FAQ_ITEMS.map((item, idx) => (
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
