import { Metadata } from "next";
import dynamic from "next/dynamic";

// 动态加载压缩工具
const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "PNG to 50KB – Free Online Exact Size PNG Compressor",
  description:
    "Compress a PNG image to exactly 50KB using this free online PNG compressor. Perfect for portals, forms, email uploads, and websites that require strict file-size limits.",
};

export default function PNG50KBPage() {
  return (
    <>
      {/* 工具本体 */}
      <ImageCompressorTool
        initialTargetSize="50"
        titleOverride="PNG to 50KB – Exact Size Compressor"
      />

      {/* SEO 文案部分 */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-6 text-sm text-slate-600 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Why compress a PNG image to 50KB?
        </h2>

        <p>
          PNG images are known for their sharp quality and transparency support,
          but they can be significantly larger than JPG files. Many websites and
          online forms reject PNG files that exceed strict size limits.
          Compressing a PNG to <strong>50KB</strong> helps keep your uploads
          fast and compatible with most platforms.
        </p>

        <p>
          This tool reduces your PNG to exactly 50KB without requiring Photoshop
          or plugins. Simply upload your file, and download a precisely optimized
          PNG instantly.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          When do you need a 50KB PNG?
        </h3>

        <ul className="list-disc list-inside space-y-1">
          <li>Online school or university submission portals</li>
          <li>Government or visa application forms requiring strict limits</li>
          <li>Web uploads where transparency must be preserved</li>
          <li>Email attachments that must remain under a certain size</li>
          <li>Profile images for apps or software portals</li>
        </ul>

        <p>
          A 50KB PNG offers a great balance between sharp clarity and efficient
          size, especially for icons, logos, signatures, and screenshots.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          How does the PNG to 50KB compressor work?
        </h3>

        <p>This tool automatically:</p>

        <ol className="list-decimal list-inside space-y-1">
          <li>Optimizes PNG color depth and compression level</li>
          <li>Reduces image dimensions only when necessary</li>
          <li>Uses powerful client-side compression technology</li>
          <li>Keeps processing fully offline for privacy and speed</li>
        </ol>

        <p>
          Just upload your PNG and instantly download a clean, optimized
          50KB version that preserves clarity as much as possible.
        </p>
      </section>
    </>
  );
}
