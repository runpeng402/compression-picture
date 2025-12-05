// app/compress-image-to-[size]kb/page.tsx

import { Metadata } from "next";
import dynamic from "next/dynamic";
import { SIZES_KB } from "@/lib/compressionSizes";

// 动态加载压缩工具（关闭 SSR）
const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// ✅ 使用统一的 KB 尺寸数组，生成静态路径
// /compress-image-to-10kb 里的 [size] = "10"
export function generateStaticParams() {
  return SIZES_KB.map((size) => ({
    size: String(size),
  }));
}

// ✅ 为每个长尾页生成独立的 meta
export async function generateMetadata({
  params,
}: {
  params: { size: string };
}): Promise<Metadata> {
  const size = params.size;

  return {
    title: `Compress Image to ${size}KB Online | ExactSize JPG/PNG Tool`,
    description: `Free online image compressor to make your JPG or PNG photo exactly ${size}KB. Perfect for forms, email attachments, and web uploads.`,
  };
}

// ✅ 页面组件
export default function DynamicCompressPage({
  params,
}: {
  params: { size: string };
}) {
  const size = params.size;

  const initialSize = size;
  const titleOverride = `Compress Image to ${size}KB`;

  return (
    <ImageCompressorTool
      initialTargetSize={initialSize}
      titleOverride={titleOverride}
    />
  );
}
