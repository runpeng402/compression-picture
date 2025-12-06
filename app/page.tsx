// app/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { SIZES_KB } from "@/lib/compressionSizes";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// -------------------------------
// 首页 SEO Metadata（加入 PixSize + ExactSize 品牌）
// -------------------------------
export const metadata: Metadata = {
  title: "PixSize – Compress Images to Exact Size (KB or MB) | ExactSize Engine",
  description:
    "PixSize is a free online image compressor powered by the ExactSize engine. Compress JPG or PNG to an exact size in KB or MB for forms, passport photos, visa uploads, and email attachments.",
  alternates: {
    canonical: "https://compresstokb.com",
  },
  openGraph: {
    title: "PixSize – Compress Images to Exact Size (KB or MB)",
    description:
      "Use PixSize, powered by the ExactSize engine, to reduce your images to an exact KB/MB size. Fast, private, and perfect for online submissions.",
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

// -------------------------------
// 自动生成紧凑的内链列表
// -------------------------------
const POPULAR_SIZES = SIZES_KB.filter((n) => n <= 500).slice(0, 20); // 取前 20 个

const POPULAR_SIZE_LINKS = POPULAR_SIZES.map((size) => ({
  label: `${size}KB`,
  href: `/compress-to-${size}kb`,
  title: `Compress image to ${size}KB`,
}));

const FORMATS = [
  { label: "JPG to 50KB", href: "/jpg-to-50kb" },
  { label: "PNG to 50KB", href: "/png-to-50kb" },
  { label: "Passport Photo Size", href: "/passport-photo-size" },
  { label: "Visa Photo Compressor", href: "/visa-photo-compressor" },
];

// -------------------------------
// 首页渲染
// -------------------------------
export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PixSize – ExactSize Image Compressor",
    url: "https://compresstokb.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://compresstokb.com/compress-to-{search_term_string}kb",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 主工具组件（顶部大工具区域） */}
      <ImageCompressorTool titleOverride="Compress Images to Exact Size" />

      {/* 品牌介绍区：PixSize + ExactSize */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-4">
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          PixSize – Exact Size Image Compressor
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          PixSize is a lightweight image compressor brand built on the{" "}
          <span className="font-medium">ExactSize</span> engine. It focuses on
          one thing only: helping you compress JPG or PNG files to an{" "}
          <span className="font-medium">exact file size in KB or MB</span>,
          ideal for online forms, job portals, passport and visa submissions,
          and email attachments.
        </p>
      </section>

      {/* 内链区块（增强 SEO，只保留这一块，避免重复） */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Popular Compressions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Popular Sizes */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Popular Sizes (Exact KB)
            </h3>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
              {POPULAR_SIZE_LINKS.map((item, index) => (
                <span key={item.href} className="inline-flex items-center">
                  <a
                    href={item.href}
                    title={item.title}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {item.label}
                  </a>
                  {index < POPULAR_SIZE_LINKS.length - 1 && (
                    <span className="text-slate-300 mx-1.5">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Popular Formats */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Popular Formats
            </h3>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
              {FORMATS.map((item, index) => (
                <span key={item.href} className="inline-flex items-center">
                  <a
                    href={item.href}
                    title={item.label}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {item.label}
                  </a>
                  {index < FORMATS.length - 1 && (
                    <span className="text-slate-300 mx-1.5">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
