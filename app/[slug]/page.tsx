import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// 同样，把组件改成动态加载，并关闭 SSR
const ImageCompressorTool = dynamic(
  () => import('@/components/ImageCompressorTool'),
  { ssr: false }
);

export function generateStaticParams() {
  const sizesKB = [10, 15, 20, 30, 40, 50, 60, 80, 100, 200, 300, 500];
  const sizesMB = [1, 2];

  const kbPaths = sizesKB.map((size) => ({ slug: `compress-to-${size}kb` }));
  const mbPaths = sizesMB.map((size) => ({ slug: `compress-to-${size}mb` }));
  const formatPaths = [
    { slug: 'jpg-to-50kb' },
    { slug: 'png-to-50kb' },
    { slug: 'passport-photo-size' },
    { slug: 'visa-photo-compressor' },
  ];

  return [...kbPaths, ...mbPaths, ...formatPaths];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const humanReadableSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  
  return {
    title: `${humanReadableSlug} - ExactSize Free Tool`,
    description: `Free online tool to ${humanReadableSlug.toLowerCase()}. Reduce image size to exactly ${slug.replace(/\D/g, '')}KB/MB without uploading to server.`,
  };
}

export default function DynamicCompressPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const match = slug.match(/(\d+)(kb|mb)/i);
  
  let initialSize = "";
  let titleOverride = "Compress Image to Exact Size";

  if (match) {
    const number = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    if (unit === 'mb') {
      initialSize = (number * 1024).toString();
      titleOverride = `Compress Image to ${number}MB`;
    } else {
      initialSize = number.toString();
      titleOverride = `Compress Image to ${number}KB`;
    }
  } else if (slug.includes('passport') || slug.includes('visa')) {
    initialSize = "200";
    titleOverride = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  return <ImageCompressorTool initialTargetSize={initialSize} titleOverride={titleOverride} />;
}
