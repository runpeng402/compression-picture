// app/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { SIZES_KB } from "@/lib/compressionSizes";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// -------------------------------
// 首页 SEO Metadata
// -------------------------------
export const metadata: Metadata = {
  title: "Compress Image to Exact Size (KB or MB) – Free Online Image Compressor",
  description:
    "Free online image compression tool to reduce your JPG or PNG to an exact size in KB or MB. Perfect for forms, online submissions, passport photos, visa uploads, and email attachments.",
  alternates: {
    canonical: "https://compresstokb.com",
  },
  openGraph: {
    title: "Compress Image to Exact Size – Free JPG/PNG Compressor | ExactSize",
    description:
      "Reduce your image to an exact KB/MB size. 100% private. Fast and accurate online image compressor.",
    url: "https://compresstokb.com",
    type: "website",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=ExactSize&subtitle=Free+Image+Compressor&size=Online+Tool",
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
    name: "ExactSize Image Compressor",
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

      {/* 主工具组件 */}
      <ImageCompressorTool titleOverride="Compress Image to Exact Size" />

      {/* 内链区块（增强 SEO） */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Popular Compressions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Popular Sizes */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Popular Sizes
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
