import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
