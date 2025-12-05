// app/visa-photo-compressor/page.tsx
import { Metadata } from "next"
import dynamic from "next/dynamic"

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Visa Photo Compressor Online | ExactSize",
  description:
    "Free online visa photo compressor. Reduce your visa photo to an exact KB size that meets online application requirements.",
}

export default function VisaPhotoCompressorPage() {
  return (
    <ImageCompressorTool
      initialTargetSize="100"
      titleOverride="Visa Photo Compressor"
    />
  )
}
