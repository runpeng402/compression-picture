// app/jpg-to-50kb/page.tsx
import { Metadata } from "next"
import dynamic from "next/dynamic"

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Compress JPG to 50KB Online | ExactSize",
  description:
    "Free online JPG compressor to reduce your JPEG images to exactly 50KB. Perfect for forms, online submissions and size-limited uploads.",
}

export default function JpgTo50kbPage() {
  return (
    <ImageCompressorTool
      initialTargetSize="50"
      titleOverride="Compress JPG to 50KB"
    />
  )
}
