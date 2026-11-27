import { Metadata } from "next";
import ImageCompressorTool from "@/components/ImageCompressorTool";
import FaqSection, { FaqItem } from "@/components/FaqSection";
import { SITE_NAME, buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Compress PNG to 50KB Online – Free, Exact Size | ${SITE_NAME}`,
  description:
    "Compress PNG images to 50KB or less for logos, icons, screenshots and upload forms. Free, runs in your browser, no upload or signup.",
  path: "/png-to-50kb",
  ogTitle: "PNG to 50KB",
  ogSize: "50KB",
});

const FAQ: FaqItem[] = [
  {
    q: "How do I compress a PNG to 50KB?",
    a: "Upload your PNG, keep the target at 50KB and click Compress Now. The tool reduces the PNG and, if needed, its dimensions until it is 50KB or less.",
  },
  {
    q: "Why is my PNG hard to get under 50KB?",
    a: "PNG is a lossless format, so photos saved as PNG are often very large. Large photo-like PNGs may need to be scaled down to reach 50KB. If the form accepts JPG, a JPG version will keep more detail at the same size.",
  },
  {
    q: "Is 50KB enough for logos or icons?",
    a: "Usually yes. Logos, icons, buttons and simple graphics fit comfortably in 50KB at typical web dimensions.",
  },
  {
    q: "Is my image uploaded?",
    a: "No. Compression runs in your browser and the image never leaves your device.",
  },
];

export default function PngTo50kbPage() {
  return (
    <>
      <ImageCompressorTool initialTargetSize="50" titleOverride="Compress PNG to 50KB" />
      <FaqSection items={FAQ} />
    </>
  );
}
