// app/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// ✅ 性能优化：延迟加载 SEO 内容组件
const LazySEOContent = dynamic(
  () => import("@/components/LazySEOContent"),
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
      {/* ✅ 性能优化：使用 Next.js Script 组件优化 JSON-LD 加载 */}
      <Script
        id="json-ld-site"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite) }}
      />

      <Script
        id="json-ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* 主工具组件（内部会渲染 1 套 Popular Compressions） */}
      <ImageCompressorTool titleOverride="Compress Images to Exact Size" />

      {/* ✅ 性能优化：延迟加载 SEO 内容，减少初始 CLS */}
      <LazySEOContent faqItems={FAQ_ITEMS} />
    </>
  );
}
