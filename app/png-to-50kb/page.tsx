// app/png-to-50kb/page.tsx
import { Metadata } from "next"
import dynamic from "next/dynamic"

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Compress PNG to 50KB Online | ExactSize",
  description:
    "Free online PNG compressor to shrink your PNG images to exactly 50KB while keeping good quality. Ideal for resumes, forms and web uploads.",
}

export default function PngTo50kbPage() {
  return (
    <ImageCompressorTool
      initialTargetSize="50"
      titleOverride="Compress PNG to 50KB"
    />
  )
}
