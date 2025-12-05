// app/visa-photo-compressor/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

// 动态引入主工具组件（关闭 SSR，避免 browser-image-compression 报错）
const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// ✅ SEO：签证照片压缩页 Meta
export const metadata: Metadata = {
  title: "Visa Photo Compressor – Compress Visa Photo to Exact Size Online",
  description:
    "Free online visa photo compressor. Upload your visa photo (JPG or PNG) and compress it to the exact KB size required by embassies or consulates.",
  openGraph: {
    title: "Visa Photo Compressor – Compress Visa Photo to Exact Size Online",
    description:
      "Compress your visa photo to the exact KB size required. Perfect for online visa applications and embassy photo requirements.",
    url: "https://compresstokb.com/visa-photo-compressor",
    siteName: "ExactSize",
    type: "website",
  },
};

// ✅ 页面组件
export default function VisaPhotoCompressorPage() {
  return (
    <ImageCompressorTool
      // 👇 这里就是默认值，改成 "200" 就是 200KB
      initialTargetSize="200"
      titleOverride="Visa Photo Compressor"
    />
  );
}
