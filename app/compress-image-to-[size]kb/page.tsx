import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// 动态加载压缩工具（关闭 SSR）
const ImageCompressorTool = dynamic(
  () => import('@/components/ImageCompressorTool'),
  { ssr: false }
);

// ✅ 统一维护所有要做静态页的 KB 长尾
export const SIZES_KB = [
  5, 8,                            // 超小体积
  10, 15, 20, 30, 40, 50, 60, 70, 80, 90,
  100, 150, 200, 250, 300, 400, 500,
  600, 800, 900,
  // 后面想再加可以继续往这个数组塞
];

export function generateStaticParams() {
  // 生成类似 { size: '10' } 的参数，用于 /compress-image-to-10kb 之类的路由
  return SIZES_KB.map((size) => ({ size: String(size) }));
}

export async function generateMetadata(
  { params }: { params: { size: string } }
): Promise<Metadata> {
  const size = params.size;

  return {
    title: `Compress Image to ${size}KB Online – ExactSize JPG/PNG Tool`,
    description: `Free online image compressor to make your JPG or PNG photo exactly ${size}KB. Perfect for forms, emails and online uploads.`,
  };
}

export default function DynamicCompressPage(
  { params }: { params: { size: string } }
) {
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
