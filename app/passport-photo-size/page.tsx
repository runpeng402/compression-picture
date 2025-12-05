// app/passport-photo-size/page.tsx
import { Metadata } from "next"
import dynamic from "next/dynamic"

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Passport Photo Size Compressor | ExactSize",
  description:
    "Free online passport photo compressor. Adjust your passport photo to a specific KB size for online applications and government forms.",
}

export default function PassportPhotoSizePage() {
  return (
    <ImageCompressorTool
      initialTargetSize="100"
      titleOverride="Passport Photo Size Compressor"
    />
  )
}
