import { Metadata } from "next";
import dynamic from "next/dynamic";

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Passport Photo Size Compressor – Reduce Image for Online Submission",
  description:
    "Compress your passport photo to meet strict file-size requirements for online submissions. Supports JPG, PNG, and WEBP formats.",
};

export default function PassportPhotoSizePage() {
  return (
    <>
      <ImageCompressorTool
        initialTargetSize="100"
        titleOverride="Passport Photo Size Compressor"
      />

      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-6 text-sm text-slate-600 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Why compress a passport photo for online submission?
        </h2>

        <p>
          Many government and immigration portals enforce strict file-size
          limits for passport photo uploads. A typical requirement ranges from{" "}
          <strong>50KB to 200KB</strong>, depending on the platform. If your
          passport photo is too large, the system will reject the upload.
        </p>

        <p>
          This tool helps you reduce your passport photo to the exact required
          size without losing essential clarity. Simply upload your image and
          choose a target value like 100KB, 150KB, or any size required by the
          submission portal.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          Which platforms require compressed passport photos?
        </h3>

        <ul className="list-disc list-inside space-y-1">
          <li>Online passport renewal systems</li>
          <li>Government identity verification portals</li>
          <li>Immigration and visa application websites</li>
          <li>University and scholarship submission platforms</li>
          <li>Digital onboarding and KYC processes</li>
        </ul>

        <p>
          A properly compressed passport photo ensures a smooth submission
          process and prevents rejection due to oversized files.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          How do we compress passport photos effectively?
        </h3>

        <p>This tool ensures:</p>

        <ol className="list-decimal list-inside space-y-1">
          <li>Facial clarity is preserved during compression</li>
          <li>Dimensions remain within required guidelines</li>
          <li>File-size limits (KB/MB) are met precisely</li>
          <li>All processing stays inside your browser for privacy</li>
        </ol>

        <p>
          Upload your passport photo and select a target size. You’ll receive a
          clean, optimized version ready for online submission.
        </p>
      </section>
    </>
  );
}
