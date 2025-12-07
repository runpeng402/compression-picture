// app/compress-to-[size]kb/page.tsx

import { Metadata } from "next";
import dynamic from "next/dynamic";
import { SIZES_KB } from "@/lib/compressionSizes";

// 客户端组件
const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// ------------------------------
// 生成所有静态路径
// ------------------------------
export function generateStaticParams() {
  return SIZES_KB.map((size) => ({
    size: String(size),
  }));
}

// ------------------------------
// 动态 Metadata（带 PixSize & Exact Size）
// ------------------------------
export async function generateMetadata({
  params,
}: {
  params: { size: string };
}): Promise<Metadata> {
  // 保险起见，把非数字去掉（防止将来有特殊格式）
  const rawSize = params.size;
  const sizeKB = rawSize.replace(/\D/g, "") || rawSize;

  const title = `Compress Image to ${sizeKB}KB – Exact Size Online Compressor | PixSize`;
  const description = `Use PixSize to compress JPG or PNG images to exactly ${sizeKB}KB. Perfect for online forms, job portals, passport and visa submissions, and email attachments.`;

  const url = `https://compresstokb.com/compress-to-${sizeKB}kb`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: `https://compresstokb.com/api/og?title=Compress+to+${sizeKB}KB&subtitle=Exact+Size+Image+Compressor&size=${sizeKB}KB`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// ------------------------------
// 页面主体：这里才是“自动填好输入框”的关键
// ------------------------------
export default function DynamicCompressPage({
  params,
}: {
  params: { size: string };
}) {
  const rawSize = params.size;
  const sizeKB = rawSize.replace(/\D/g, "") || rawSize;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Compress Image to ${sizeKB}KB`,
    url: `https://compresstokb.com/compress-to-${sizeKB}kb`,
    description: `Online tool by PixSize to compress an image to exactly ${sizeKB}KB.`,
    potentialAction: {
      "@type": "Action",
      name: "Compress Image",
      target: `https://compresstokb.com/compress-to-${sizeKB}kb`,
    },
  };

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 关键：把 sizeKB 作为 initialTargetSize 传给工具 */}
      <ImageCompressorTool
        initialTargetSize={sizeKB}
        titleOverride={`Compress Image to ${sizeKB}KB`}
      />
    </>
  );
}
