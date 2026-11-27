import { Metadata } from "next";
import ImageCompressorTool from "@/components/ImageCompressorTool";
import FaqSection, { FaqItem } from "@/components/FaqSection";
import { SITE_NAME, buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Compress JPG to 50KB Online – Free, Exact Size | ${SITE_NAME}`,
  description:
    "Compress JPG and JPEG images to 50KB or less for job portals, exam forms and online applications. Free, runs in your browser, no upload or signup.",
  path: "/jpg-to-50kb",
  ogTitle: "JPG to 50KB",
  ogSize: "50KB",
});

const FAQ: FaqItem[] = [
  {
    q: "How do I compress a JPG to 50KB?",
    a: "Upload your JPG, keep the target at 50KB and click Compress Now. The tool lowers JPEG quality and, if needed, the image dimensions until the file is 50KB or less, then you can download it.",
  },
  {
    q: "Why do forms ask for JPG files under 50KB?",
    a: "Job portals, exam registrations and government forms often limit photo and signature uploads to keep their systems fast and storage predictable. 50KB is one of the most common limits.",
  },
  {
    q: "Will compressing to 50KB reduce quality?",
    a: "Some detail is lost, but the tool keeps the best quality that fits. For a passport-style photo or a signature, 50KB is usually enough to stay clear.",
  },
  {
    q: "Is my image uploaded?",
    a: "No. Compression runs in your browser and the image never leaves your device.",
  },
];

export default function JpgTo50kbPage() {
  return (
    <>
      <ImageCompressorTool initialTargetSize="50" titleOverride="Compress JPG to 50KB" />
      <FaqSection items={FAQ} />
    </>
  );
}
