// app/compress-image-to-[size]kb/page.tsx

import { Metadata } from "next";
import dynamic from "next/dynamic";
import { SIZES_KB } from "@/lib/compressionSizes";

// 动态加载客户端组件
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
// 动态 Metadata（核心 SEO 强化：PixSize + Exact Size）
// ------------------------------
export async function generateMetadata({
  params,
}: {
  params: { size: string };
}): Promise<Metadata> {
  const size = params.size;

  // Title 结构：关键词在前 + Exact Size 功能 + 品牌 PixSize
  const title = `Compress Image to ${size}KB (Exact Size) – PixSize`;
  const description = `PixSize is an online image compression tool that lets you compress JPG or PNG images to exactly ${size}KB while preserving clarity. Ideal for online forms, job portals, passports, and visa uploads that require strict file size limits.`;

  const url = `https://compresstokb.com/compress-to-${size}kb`;

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
          url: `https://compresstokb.com/api/og?title=Compress+to+${size}KB&subtitle=Exact+Size+Image+Compression&size=${size}KB`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// ------------------------------
// 页面主体
// ------------------------------
export default function DynamicCompressPage({
  params,
}: {
  params: { size: string };
}) {
  const size = params.size;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Compress Image to ${size}KB – PixSize`,
    url: `https://compresstokb.com/compress-to-${size}kb`,
    description: `Use PixSize to compress an image to exactly ${size}KB. Precise, browser-based image compression for strict KB limits.`,
    potentialAction: {
      "@type": "Action",
      name: "Compress Image to Exact Size",
      target: `https://compresstokb.com/compress-to-${size}kb`,
    },
  };

  return (
    <>
      {/* JSON-LD 结构化数据：保留 + 品牌注入 + Exact Size 语义 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 压缩工具渲染：继续用初始 size & 标题覆盖 */}
      <ImageCompressorTool
        initialTargetSize={size}
        titleOverride={`Compress Image to ${size}KB (Exact Size)`}
      />
    </>
  );
}
