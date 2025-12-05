// app/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";

// -------------------------------------------
// 首页 SEO（新增 metadata）
// -------------------------------------------

export const metadata: Metadata = {
  title: "Compress Image to Exact Size (KB or MB) – ExactSize",
  description:
    "Free online image compressor to reduce JPG, PNG, or WEBP files to an exact size in KB or MB. Perfect for forms, online submissions, passports, and visa photos.",
  alternates: {
    canonical: "https://compresstokb.com",
  },
  openGraph: {
    title: "Compress Image to Exact Size – JPG / PNG Compressor",
    description:
      "Free instant image compressor — reduce your photos to exact sizes such as 50KB, 100KB, 200KB, 1MB, and more.",
    type: "website",
    url: "https://compresstokb.com",
    images: [
      {
        url: "https://compresstokb.com/api/og?title=ExactSize&subtitle=Compress+Images+Online&size=Free+Tool",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// -------------------------------------------
// 原来的动态加载逻辑（保持不变）
// -------------------------------------------

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

export default function HomePage() {
  return <ImageCompressorTool />;
}
