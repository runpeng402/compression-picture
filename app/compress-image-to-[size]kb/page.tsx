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
// 动态 Metadata（核心 SEO 强化）
// ------------------------------
export async function generateMetadata({
  params,
}: {
  params: { size: string };
}): Promise<Metadata> {
  const size = params.size;

  const title = `Compress Image to ${size}KB – Exact JPG/PNG Compressor`;
  const description = `Free online tool to compress JPG or PNG images to exactly ${size}KB. Perfect for forms, online submissions, passports, and visa uploads.`;

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
          url: `https://compresstokb.com/api/og?title=Compress+to+${size}KB&subtitle=Exact+Size+Image+Compressor&size=${size}KB`,
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
    name: `Compress Image to ${size}KB`,
    url: `https://compresstokb.com/compress-to-${size}kb`,
    description: `Online tool to compress an image to exactly ${size}KB.`,
    potentialAction: {
      "@type": "Action",
      name: "Compress Image",
      target: `https://compresstokb.com/compress-to-${size}kb`,
    },
  };

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 压缩工具渲染 */}
      <ImageCompressorTool
        initialTargetSize={size}
        titleOverride={`Compress Image to ${size}KB`}
      />
    </>
  );
}
