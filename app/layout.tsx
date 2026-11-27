import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { SITE_NAME, SITE_URL } from '@/lib/site';

// ✅ 性能优化：字体加载优化 - 减少 CLS 和 FCP
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // 避免 FOIT (Flash of Invisible Text) - 关键：减少 CLS
  preload: true,   // 预加载字体文件
  variable: '--font-inter', // 使用 CSS 变量
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'], // 字体回退链
  adjustFontFallback: true, // 自动调整字体回退
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} – Compress Image to Exact Size in KB or MB`,
  description: 'Free online tool to compress JPG, PNG and WebP images to an exact file size in KB or MB. Works in your browser, no upload or signup required.',
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
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
        
        {/* ✅ 性能优化：关键 CSS 内联 - 减少渲染阻塞和 CLS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 防止布局偏移 - 关键样式 */
            * { box-sizing: border-box; }
            html, body { 
              margin: 0; 
              padding: 0; 
              width: 100%;
              overflow-x: hidden;
            }
            
            /* ✅ 关键：防止 body 元素导致的 CLS - 设置固定尺寸 */
            body {
              min-height: 100vh;
              font-family: var(--font-inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif);
            }
            
            /* 防止图片导致的布局偏移 */
            img { 
              max-width: 100%; 
              height: auto; 
              display: block;
            }
            
            /* 防止动态内容导致的布局偏移 */
            [data-upload-area] {
              min-height: 280px;
              height: 280px;
            }
            @media (min-width: 640px) {
              [data-upload-area] {
                min-height: 320px;
                height: 320px;
              }
            }
            
            /* 防止按钮和输入框导致的布局偏移 */
            button, input, textarea, select {
              font-family: inherit;
            }
            
            /* 防止动画导致的布局偏移 */
            @media (prefers-reduced-motion: reduce) {
              *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }

          `
        }} />
      </head>
      <body className={`${inter.variable} ${inter.className}`}>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
          <SiteHeader />
          <div className="flex-1 flex flex-col">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
