import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// ✅ 修正引用：使用 ImageCompressorTool
const ImageCompressorTool = dynamic(
  () => import('@/components/ImageCompressorTool'),
  { ssr: false }
);

export function generateStaticParams() {
  const sizesKB = [10, 15, 20, 30, 40, 50, 60, 80, 100, 200, 300, 500];
  const sizesMB = [1, 2];

  // 注意：因为你的文件夹叫 compress-image-to-[size]kb
  // Next.js 会匹配 [size] 这个参数，而不是整个 slug
  
  const kbPaths = sizesKB.map((size) => ({ size: `${size}` }));
  
  // 对于 MB 单位，目前的文件结构可能无法完美匹配，我们先保证 KB 能用
  // 为了简单起见，我们先返回 KB 的路径
  return kbPaths;
}

export async function generateMetadata({ params }: { params: { size: string } }): Promise<Metadata> {
  const size = params.size;
  return {
    title: `Compress Image to ${size}KB - ExactSize Free Tool`,
    description: `Free online tool to compress image to exactly ${size}KB.`,
  };
}

export default function DynamicCompressPage({ params }: { params: { size: string } }) {
  const size = params.size;
  
  // 构造初始值
  let initialSize = size;
  let titleOverride = `Compress Image to ${size}KB`;

  return <ImageCompressorTool initialTargetSize={initialSize} titleOverride={titleOverride} />;
}
