import { Metadata } from "next";
import dynamic from "next/dynamic";

// 动态加载压缩工具
const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "JPG to 50KB – Free Online Exact Size JPG Compressor",
  description:
    "Free online JPG compressor that reduces your image to exactly 50KB. Perfect for job applications, online forms, portals, and email submissions.",
};

export default function JPG50KBPage() {
  return (
    <>
      {/* 工具本体 */}
      <ImageCompressorTool
        initialTargetSize="50"
        titleOverride="JPG to 50KB – Exact Size Compressor"
      />

      {/* SEO 文案部分 */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-6 text-sm text-slate-600 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Why compress a JPG image to exactly 50KB?
        </h2>

        <p>
          Many online platforms — including job application portals, university
          submission systems, and government forms — require images to be under
          a strict file-size limit. A <strong>50KB JPG</strong> is one of the
          most commonly requested sizes for profile photos, resume photos, and
          identity verification uploads.
        </p>

        <p>
          This tool automatically reduces your JPG file to exactly{" "}
          <strong>50KB</strong> without needing Photoshop, plugins, or repeated
          manual exports. Simply upload your image, and download the optimized
          version instantly.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          When do websites require a 50KB JPG?
        </h3>

        <ul className="list-disc list-inside space-y-1">
          <li>Online job application portals</li>
          <li>ATS (Applicant Tracking System) resume uploads</li>
          <li>University admission systems</li>
          <li>Online identity or KYC forms</li>
          <li>Government submission platforms</li>
          <li>Email attachments with strict limits</li>
        </ul>

        <p>
          A 50KB JPG offers a good balance between clarity and file size.
          High-resolution photos are automatically optimized to remain readable
          and visually clean for digital viewing.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          How does this JPG to 50KB compressor work?
        </h3>

        <p>
          This tool uses intelligent multi-step optimization to reach your exact
          file-size target:
        </p>

        <ol className="list-decimal list-inside space-y-1">
          <li>Adjusts JPG quality level dynamically</li>
          <li>Resizes image dimensions when needed</li>
          <li>Uses WebAssembly acceleration for fast processing</li>
          <li>Runs entirely in your browser — your image never leaves your device</li>
        </ol>

        <p>
          The result is a clean, well-balanced 50KB JPG that meets upload
          requirements for nearly all modern systems.
        </p>
      </section>
    </>
  );
}
