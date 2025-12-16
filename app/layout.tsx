import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// ✅ 性能优化：字体加载优化 - 减少 CLS 和 FCP
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // 避免 FOIT (Flash of Invisible Text)
  preload: true,   // 预加载字体文件
  variable: '--font-inter', // 使用 CSS 变量
});

export const metadata: Metadata = {
  title: 'ExactSize - Compress Image to Specific Size (KB) | Free Online Tool',
  description: 'Free online image compression tool. Compress images to exact file sizes (KB) with precision. Supports JPG, PNG, WebP, GIF. No upload required, works in your browser.',
  keywords: 'image compressor, compress image, reduce image size, image optimization, resize image, compress to kb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ 性能优化：DNS 预解析和预连接 - 优化字体加载 */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${inter.className}`}>{children}</body>
    </html>
  );
}
