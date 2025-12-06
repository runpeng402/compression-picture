// app/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { SIZES_KB } from "@/lib/compressionSizes";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// -------------------------------
// 首页 SEO Metadata（PixSize + ExactSize）
// -------------------------------
export const metadata: Metadata = {
  title: "PixSize – Compress Images to Exact Size (KB or MB)",
  description:
    "PixSize is a lightweight exact-size image compressor built on the ExactSize engine. Compress JPG or PNG images to an exact file size in KB or MB – perfect for passports, visa photos, job portals, school submissions, and online forms.",
  alternates: {
    canonical: "https://compresstokb.com",
  },
  openGraph: {
    title: "PixSize – Exact Size Image Compressor",
    description:
      "Free online tool by PixSize to compress images to an exact size in KB or MB. 100% browser-side, fast, and private. Ideal for passport photos, visa uploads, resumes, and any system with strict file size limits.",
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
// 自动生成紧凑的内链列表
// -------------------------------
const POPULAR_SIZES = SIZES_KB.filter((n) => n <= 500).slice(0, 20);

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
    name: "PixSize – Exact Size Image Compressor",
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

      {/* 内链区块（只保留这一块 Popular Compressions） */}
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

      {/* 品牌 + 长文案 SEO 区块（替代你之前那段长文字） */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-16">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          PixSize – Exact Size Image Compressor
        </h2>

        <div className="space-y-3 text-sm leading-relaxed text-slate-700">
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
            maximum file size such as 50KB, 100KB, 200KB, or 500KB.
          </p>

          <p>
            All compression is performed in your browser. Your images are{" "}
            <strong>not stored on a server</strong>, which means your passport
            photos, ID documents, and personal images stay on your own device.
          </p>

          <p className="font-medium text-slate-800 mt-4">
            Typical use cases for PixSize:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Submitting passport or visa photos with a fixed KB limit</li>
            <li>Uploading resumes and profile photos to job portals or ATS</li>
            <li>Compressing student ID / exam registration photos</li>
            <li>
              Adjusting document images for email attachments and legacy
              systems
            </li>
          </ul>

          <p>
            Whether you need <strong>JPG to 50KB</strong>,{" "}
            <strong>PNG to 50KB</strong>, or a custom exact size such as 123KB
            or 1MB, PixSize and the ExactSize engine are designed to give you
            precise and reliable results every time.
          </p>
        </div>
      </section>
    </>
  );
}
