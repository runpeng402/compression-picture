// app/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { SIZES_KB } from "@/lib/compressionSizes";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// -------------------------------
// 首页 SEO Metadata（已切换为 PixSize 品牌 + Exact Size 功能）
// -------------------------------
export const metadata: Metadata = {
  title: "Compress Images to Exact Size (KB or MB) – PixSize",
  description:
    "PixSize is an online image compression tool that lets you compress images to an exact file size in KB or MB while preserving clarity. Perfect for forms, online submissions, passport photos, visa uploads, and email attachments.",
  alternates: {
    canonical: "https://compresstokb.com",
  },
  openGraph: {
    title: "PixSize – Exact Size Image Compression",
    description:
      "Compress images to precise sizes such as 20KB, 50KB, 100KB or 200KB using PixSize. Fast, free, and 100% private — all processing happens in your browser.",
    url: "https://compresstokb.com",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=PixSize&subtitle=Exact+Size+Image+Compressor&size=Online+Tool",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// -------------------------------
// 自动生成紧凑的内链列表（保留不动，只是品牌 + 文案升级）
// -------------------------------
const POPULAR_SIZES = SIZES_KB.filter((n) => n <= 500).slice(0, 20); // 取前 20 个

const POPULAR_SIZE_LINKS = POPULAR_SIZES.map((size) => ({
  label: `${size}KB`,
  href: `/compress-to-${size}kb`,
  title: `Compress image to ${size}KB with exact size control`,
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
    name: "PixSize – Exact Size Image Compression",
    url: "https://compresstokb.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://compresstokb.com/compress-to-{search_term_string}kb",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      {/* JSON-LD（保留，加强网站实体信号） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 主工具组件：这里内部已经用 PixSize 品牌 + Exact Size 文案 */}
      <ImageCompressorTool titleOverride="Compress Images to Exact Size (KB or MB)" />

      {/* 内链区块（增强 SEO，保留原来的 Popular 区块） */}
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
