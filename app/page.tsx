// app/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

// 动态加载主工具组件
const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// ✅ 首页 Meta：对“compress image to kb / mb”这类核心词更友好
export const metadata: Metadata = {
  title: "Compress Image to Exact Size in KB or MB – Free Online Image Compressor",
  description:
    "Free online tool to compress images to an exact file size in KB or MB. Supports JPG, PNG, and WEBP. Perfect for job applications, passport photos, visa photos, and online forms.",
  openGraph: {
    title: "Compress Image to Exact Size in KB or MB – Free Online Image Compressor",
    description:
      "Precise image size control. Compress JPG, PNG, or WEBP to a specific KB or MB value. No signup, instant compression in your browser.",
    url: "https://compresstokb.com",
    siteName: "ExactSize",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 主工具 */}
      <ImageCompressorTool />

      {/* ✅ 首页 SEO 介绍区块（给用户 & 搜索引擎看的文字说明） */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-6 text-sm text-slate-600 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Compress Images to an Exact File Size in KB or MB
        </h2>
        <p>
          ExactSize is a free online image compressor that lets you reduce your
          image file size to a precise target value. Instead of guessing quality
          levels or running multiple exports, you simply enter a number such as{" "}
          <strong>50KB</strong>, <strong>100KB</strong>, or{" "}
          <strong>500KB</strong>, and the tool automatically optimizes your JPG,
          PNG, or WEBP image to match.
        </p>
        <p>
          This is especially useful for{" "}
          <strong>online forms, job application systems, school portals, visa
          and passport platforms</strong> that require strict file size limits.
          Many websites reject images that are even 1KB too large. ExactSize
          helps you avoid trial-and-error by targeting the exact size you need.
        </p>
        <p>
          All compression happens directly in your browser using modern
          WebAssembly and client-side processing. Your images are{" "}
          <strong>never uploaded to a server</strong>, which means your photos
          stay private and the compression is fast, secure, and reliable even on
          slow connections.
        </p>
        <h3 className="text-base font-semibold text-slate-800 mt-4">
          When should you use ExactSize?
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Compress a <strong>CV or resume photo</strong> to 50KB.</li>
          <li>Prepare <strong>passport photos</strong> for online submission.</li>
          <li>Reduce <strong>visa photos</strong> to meet KB limits for DS-160 or Schengen forms.</li>
          <li>Optimize <strong>profile pictures</strong> for social media or apps with size caps.</li>
          <li>Speed up <strong>website loading</strong> by shrinking large images without losing clarity.</li>
        </ul>
        <p>
          You can also use the preset shortcuts at the bottom of the tool, such
          as <strong>10KB, 20KB, 50KB, 100KB, 200KB, 500KB, 1MB, and 2MB</strong>,
          or visit dedicated pages like <strong>JPG to 50KB</strong>,{" "}
          <strong>PNG to 50KB</strong>,{" "}
          <strong>Passport Photo Size</strong>, and{" "}
          <strong>Visa Photo Compressor</strong> for more specialized workflows.
        </p>
      </section>
    </>
  );
}
