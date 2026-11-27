import { Metadata } from "next";
import ImageCompressorTool from "@/components/ImageCompressorTool";
import FaqSection, { FaqItem } from "@/components/FaqSection";
import { SITE_NAME, buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: `Visa Photo Compressor – Reduce Visa Photo to 240KB or Less | ${SITE_NAME}`,
  description:
    "Reduce a digital visa photo to the file size required by online visa forms, such as 240KB or less for the U.S. DS-160. Free, private and processed in your browser.",
  path: "/visa-photo-compressor",
  ogTitle: "Visa Photo Compressor",
  ogSize: "240KB or less",
});

const FAQ: FaqItem[] = [
  {
    q: "What is the file size limit for a U.S. DS-160 visa photo?",
    a: "The U.S. Department of State requires a JPEG file of 240KB or less, square, between 600×600 and 1200×1200 pixels. This page starts with a 200KB target so the file stays safely under the limit.",
  },
  {
    q: "Does this tool set the pixel dimensions too?",
    a: "No. It reduces the file size only and may lower the resolution to reach it. Check that the result still meets the required pixel dimensions, and crop your photo to the right shape before compressing.",
  },
  {
    q: "What about other countries' visa photos?",
    a: "Each country and visa portal publishes its own limits. Look up the official requirement, enter that size in KB in the tool, and download the result.",
  },
  {
    q: "Is my visa photo uploaded?",
    a: "No. Compression runs entirely in your browser and your photo never leaves your device.",
  },
];

export default function VisaPhotoPage() {
  return (
    <>
      <ImageCompressorTool
        initialTargetSize="200"
        titleOverride="Visa Photo Compressor"
        descriptionOverride="Reduce your visa photo to the file size the application form accepts, for example under 240KB for the U.S. DS-160."
      />
      <FaqSection items={FAQ} />
    </>
  );
}
