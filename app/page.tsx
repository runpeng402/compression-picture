// app/page.tsx

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// ====== SEO：页面基础元数据 ======
export const metadata: Metadata = {
  // 页面标题
  title: 'Compress Image to Exact Size in KB | CompressToKB',

  // 页面描述（会显示在搜索结果摘要里）
  description:
    'Free online image compressor to reduce your JPG, PNG, or WEBP images to an exact size in KB. No signup required, runs in your browser, and keeps your files private.',

  // 一些辅助关键词（不会决定排名，但有利于语义）
  keywords: [
    'compress image to size',
    'compress image to exact KB',
    'image compressor online',
    'JPG to 100KB',
    'JPG to 200KB',
    'PNG compressor',
    'reduce image file size',
    'photo size converter',
  ],

  // Open Graph：用于微信、Twitter、Slack 等分享卡片
  openGraph: {
    title: 'Compress Image to Exact Size in KB | CompressToKB',
    description:
      'Precisely compress JPG, PNG, and WEBP images to a target size in KB. Fast, free, and privacy-friendly online image compressor.',
    url: 'https://compresstokb.com/',
    siteName: 'CompressToKB',
    type: 'website',
  },

  // Canonical，避免 / 和带参数版本互相抢权重
  alternates: {
    canonical: '/',
  },
};

// ====== 保持原来的动态加载逻辑（不改功能） ======
const ImageCompressorTool = dynamic(
  () => import('@/components/ImageCompressorTool'),
  { ssr: false } // 禁用 SSR，仍然由浏览器渲染工具组件
);

export default function HomePage() {
  // 不改结构，页面仍然完全由 ImageCompressorTool 渲染
  return <ImageCompressorTool />;
}
