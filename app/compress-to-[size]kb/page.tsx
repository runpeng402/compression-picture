// app/compress-to-[size]kb/page.tsx

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
  // 只用 KB 尺寸生成静态路径，比如 /compress-to-10kb
  return SIZES_KB.map((size) => ({
    size: String(size),
  }));
}

// 一个小工具：保证 size 是合理的数字字符串
function normalizeSizeParam(raw: string | undefined): string {
  if (!raw) return "";
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return "";
  return String(Math.round(n));
}

// ------------------------------
// 动态 Metadata（核心 SEO 强化）
// ------------------------------
export async function generateMetadata({
  params,
}: {
  params: { size: string };
}): Promise<Metadata> {
  const normalized = normalizeSizeParam(params.size);
  const displaySize = normalized || params.size || "KB";

  const title = `Compress Image to ${displaySize}KB – Exact Size JPG/PNG Compressor | PixSize`;
  const description = `Free online tool by PixSize to compress JPG or PNG images to exactly ${displaySize}KB. Perfect for forms, online submissions, passports, and visa uploads.`;

  const url = `https://compresstokb.com/compress-to-${displaySize}kb`;

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
          url: `https://compresstokb.com/api/og?title=Compress+to+${displaySize}KB&subtitle=Exact+Size+Image+Compressor&size=${displaySize}KB`,
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
  const normalized = normalizeSizeParam(params.size);
  const effectiveSize = normalized || ""; // 传给组件用作默认值

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Compress Image to ${normalized || params.size}KB`,
    url: `https://compresstokb.com/compress-to-${normalized || params.size}kb`,
    description: `Online tool to compress an image to exactly ${
      normalized || params.size
    }KB.`,
    potentialAction: {
      "@type": "Action",
      name: "Compress Image",
      target: `https://compresstokb.com/compress-to-${normalized || params.size}kb`,
    },
  };

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 工具主体：这里会把 size 作为默认值填进输入框 */}
      <ImageCompressorTool
        initialTargetSize={effectiveSize}
        titleOverride={`Compress Image to ${normalized || params.size}KB`}
      />
    </>
  );
}
