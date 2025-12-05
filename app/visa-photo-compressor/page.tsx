import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Visa Photo Compressor – Reduce Image for Visa Applications",
  description:
    "Compress your visa photo to the exact required size for DS-160, Schengen, Canada, Australia, and other visa systems.",
};

export default function VisaPhotoCompressorPage() {
  return (
    <>
      <ImageCompressorTool
        initialTargetSize="100"
        titleOverride="Visa Photo Compressor"
      />

      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-6 text-sm text-slate-600 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Why compress a visa photo?
        </h2>

        <p>
          Visa application systems often enforce strict file-size restrictions
          for photo uploads. For example, the U.S. DS-160 system requires images
          under 240KB, while other countries may limit photos to 100KB or less.
        </p>

        <p>
          This visa photo compressor allows you to set an exact target size
          (such as 100KB) and generate a perfectly optimized image suitable for
          digital visa submissions.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          Supported visa systems
        </h3>

        <ul className="list-disc list-inside space-y-1">
          <li>U.S. DS-160 (under 240KB)</li>
          <li>Schengen visa portals</li>
          <li>Canadian eVisa systems</li>
          <li>Australia immigration uploads</li>
          <li>UK visa & identity submission portals</li>
        </ul>

        <p>
          If your image is too large, the system may reject your application.
          Compressing your visa photo ensures a smooth submission process.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          How does this visa photo compressor work?
        </h3>

        <p>
          Our compressor intelligently reduces file size by:
        </p>

        <ol className="list-decimal list-inside space-y-1">
          <li>Adjusting compression levels dynamically</li>
          <li>Resizing dimensions only when necessary</li>
          <li>Preserving facial detail required for biometric recognition</li>
          <li>Running fully client-side for privacy and speed</li>
        </ol>

        <p>
          Upload your visa photo above and select a target size. A perfectly
          optimized version will be ready for download immediately.
        </p>
      </section>
    </>
  );
}
