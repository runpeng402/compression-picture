import { Metadata } from "next";
import ImageCompressorTool from "@/components/ImageCompressorTool";
import FaqSection, { FaqItem } from "@/components/FaqSection";
import { SITE_NAME, buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Passport Photo Compressor – Reduce Photo File Size in KB | ${SITE_NAME}`,
  description:
    "Reduce a digital passport photo to the file size your online application requires. Free, runs in your browser and never uploads your photo.",
  path: "/passport-photo-size",
  ogTitle: "Passport Photo Compressor",
  ogSize: "Reduce to the required KB",
});

const FAQ: FaqItem[] = [
  {
    q: "What file size does a digital passport photo need?",
    a: "It depends on the country and the application system, so always check the official instructions. For example, the U.S. Department of State asks for a photo file between 54KB and 10MB when you renew a passport online. Other portals set a maximum such as 100KB, 200KB or 500KB.",
  },
  {
    q: "What does this tool change?",
    a: "It reduces the file size (KB) of your photo while keeping the format. It does not crop the photo, change the background or check biometric rules such as head size and position, so start from a photo that already meets your country's photo requirements.",
  },
  {
    q: "Why does my passport photo get rejected?",
    a: "Common reasons are a file that is too large or too small, wrong pixel dimensions, an unsuitable background, shadows, glasses, or edits and filters. Fixing the file size solves only the first of these.",
  },
  {
    q: "Is my passport photo uploaded anywhere?",
    a: "No. The photo is compressed in your browser on your own device and is never sent to our servers.",
  },
];

export default function PassportPhotoPage() {
  return (
    <>
      <ImageCompressorTool
        initialTargetSize="200"
        titleOverride="Passport Photo Compressor"
        descriptionOverride="Reduce your digital passport photo to the file size your application asks for. Enter the limit from the official instructions, or start with 200KB."
      />
      <FaqSection items={FAQ} />
    </>
  );
}
