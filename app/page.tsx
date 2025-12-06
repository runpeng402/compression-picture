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
  title: "PixSize – Compress Images to Exact Size (KB or MB)",
  description:
    "PixSize is a lightweight exact size image compressor. Compress JPG or PNG images to an exact file size in KB or MB for online forms, job portals, passport and visa submissions.",
  alternates: {
    canonical: "https://compresstokb.com",
  },
  openGraph: {
    title: "PixSize – Exact Size Image Compressor",
    description:
      "Compress images to an exact size in KB or MB with PixSize, powered by the ExactSize engine. Ideal for passports, visas, job portals, and online forms.",
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
// 首页 Popular 链接（只保留一套）
// -------------------------------

const POPULAR_SIZE_LINKS = [
  { label: "5KB", href: "/compress-to-5kb" },
  { label: "8KB", href: "/compress-to-8kb" },
  { label: "10KB", href: "/compress-to-10kb" },
  { label: "15KB", href: "/compress-to-15kb" },
  { label: "20KB", href: "/compress-to-20kb" },
  { label: "30KB", href: "/compress-to-30kb" },
  { label: "40KB", href: "/compress-to-40kb" },
  { label: "50KB", href: "/compress-to-50kb" },
  { label: "60KB", href: "/compress-to-60kb" },
  { label: "70KB", href: "/compress-to-70kb" },
  { label: "80KB", href: "/compress-to-80kb" },
  { label: "90KB", href: "/compress-to-90kb" },
  { label: "100KB", href: "/compress-to-100kb" },
  { label: "150KB", href: "/compress-to-150kb" },
  { label: "200KB", href: "/compress-to-200kb" },
  { label: "250KB", href: "/compress-to-250kb" },
  { label: "300KB", href: "/compress-to-300kb" },
  { label: "400KB", href: "/compress-to-400kb" },
  { label: "500KB", href: "/compress-to-500kb" },
  { label: "600KB", href: "/compress-to-600kb" },
  { label: "800KB", href: "/compress-to-800kb" },
  { label: "900KB", href: "/compress-to-900kb" },
  // 下面这几个是你首页原来就有的 1MB / 2MB / 5MB / 10MB
  { label: "1MB", href: "/compress-to-1000kb" },
  { label: "2MB", href: "/compress-to-2000kb" },
  { label: "5MB", href: "/compress-to-5000kb" },
  { label: "10MB", href: "/compress-to-10000kb" },
];

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
    name: "PixSize – Exact Size Image Compressor Tools",
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
      <ImageCompressorTool titleOverride="Compress Images to Exact Size" />

      {/* ✅ 只保留一套 Popular + 品牌介绍 + SEO 文案 */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Popular Compressions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Popular Sizes */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Popular Sizes (Exact KB / MB)
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
              {POPULAR_SIZE_LINKS.map((item, index) => (
                <span key={item.href} className="inline-flex items-center">
                  <a
                    href={item.href}
                    title={`Compress image to ${item.label}`}
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

        {/* 品牌 + SEO 文案 */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600 space-y-3">
          <h3 className="text-base font-semibold text-slate-900">
            PixSize – Exact Size Image Compressor
          </h3>
          <p>
            PixSize is a lightweight image compressor brand built on the{" "}
            <strong>ExactSize</strong> engine. It focuses on one thing only:
            helping you compress JPG or PNG files to an{" "}
            <strong>exact file size in KB or MB</strong>, instead of just
            giving you a rough “smaller file”.
          </p>
          <p>
            This makes PixSize especially suitable for{" "}
            <strong>online forms, job portals, passport and visa systems</strong>
            , education portals, and government websites that strictly require a
            maximum file size such as <strong>50KB, 100KB, 200KB, or 500KB</strong>.
          </p>
          <p>
            All compression is performed in your browser. Your images are{" "}
            <strong>not stored on a server</strong>, which means your passport
            photos, ID documents, and personal images stay on your own device.
          </p>
        </div>
      </section>
    </>
  );
}
