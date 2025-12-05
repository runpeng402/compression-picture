// app/passport-photo-size/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

// 动态引入主工具组件（关闭 SSR，避免 browser-image-compression 报错）
const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// ✅ SEO：护照照片压缩页 Meta
export const metadata: Metadata = {
  title: "Passport Photo Size – Compress Passport Photo to Exact KB",
  description:
    "Free online tool to compress your passport photo to the exact KB size required by online applications and government portals.",
  openGraph: {
    title: "Passport Photo Size – Compress Passport Photo to Exact KB",
    description:
      "Upload your passport photo (JPG or PNG) and compress it to the exact KB size required for passport or ID applications.",
    url: "https://compresstokb.com/passport-photo-size",
    siteName: "ExactSize",
    type: "website",
  },
};

// ✅ 页面组件
export default function PassportPhotoSizePage() {
  return (
    <ImageCompressorTool
      // 👇 这里控制默认护照照片大小，240 表示默认 240KB
      // 如果你更想用 200KB，改成 "200" 即可
      initialTargetSize="240"
      titleOverride="Passport Photo Size"
    />
  );
}
