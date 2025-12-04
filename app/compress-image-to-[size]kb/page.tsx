import { Metadata } from 'next';
import { ImageIcon } from 'lucide-react';
import { ImageCompressor } from '@/components/ImageCompressor';

const STATIC_SIZES = [10, 20, 50, 100, 200, 500, 1024];

export async function generateStaticParams() {
  return STATIC_SIZES.map((size) => ({
    size: size.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { size: string } }): Promise<Metadata> {
  const size = params.size;

  return {
    title: `Compress Image to ${size}KB - Free Online Image Compressor | ExactSize`,
    description: `Compress your images to exactly ${size}KB with our free online tool. Fast, accurate, and easy-to-use image compression with binary search algorithm for precise file size control.`,
    keywords: `compress image to ${size}kb, image compressor, resize image to ${size}kb, reduce image size, ${size}kb image compressor`,
    openGraph: {
      title: `Compress Image to ${size}KB - ExactSize`,
      description: `Free online tool to compress images to exactly ${size}KB. No upload required, works in your browser.`,
      type: 'website',
    },
  };
}

export default function CompressImagePage({ params }: { params: { size: string } }) {
  const targetSize = parseInt(params.size);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ImageIcon className="h-7 w-7 text-slate-800" strokeWidth={2.5} />
              <span className="text-2xl font-bold text-slate-900">ExactSize</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Dynamic Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
              Compress Image to{' '}
              <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                {targetSize}KB
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Free online tool to compress your images to exactly {targetSize}KB with precision and ease
            </p>
          </div>

          {/* Image Compressor Component */}
          <ImageCompressor defaultTargetSize={targetSize} showHero={false} />

          {/* SEO Content Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                How to Compress Image to {targetSize}KB
              </h2>

              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-700 mb-6">
                  Compressing images to exactly {targetSize}KB has never been easier. Our free online tool uses advanced
                  binary search algorithms to achieve precise file size targets without compromising image quality more
                  than necessary.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
                  Step-by-Step Guide
                </h3>
                <ol className="space-y-3 text-slate-700">
                  <li className="flex gap-3">
                    <span className="font-semibold text-slate-900 min-w-[24px]">1.</span>
                    <span>Click or drag your image into the upload area above</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-slate-900 min-w-[24px]">2.</span>
                    <span>The target size is automatically set to {targetSize}KB for this page</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-slate-900 min-w-[24px]">3.</span>
                    <span>Click the "Compress" button and wait for the processing to complete</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-slate-900 min-w-[24px]">4.</span>
                    <span>Download your perfectly compressed {targetSize}KB image</span>
                  </li>
                </ol>

                <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
                  Why Compress to {targetSize}KB?
                </h3>
                <p className="text-slate-700 mb-4">
                  Different platforms and use cases have specific file size requirements:
                </p>
                <ul className="space-y-2 text-slate-700 mb-6">
                  {targetSize <= 20 && (
                    <li className="flex gap-3">
                      <span className="text-slate-900">•</span>
                      <span>Perfect for profile pictures and avatars on social media platforms</span>
                    </li>
                  )}
                  {targetSize >= 20 && targetSize <= 100 && (
                    <li className="flex gap-3">
                      <span className="text-slate-900">•</span>
                      <span>Ideal for email attachments and quick-loading web images</span>
                    </li>
                  )}
                  {targetSize >= 50 && targetSize <= 200 && (
                    <li className="flex gap-3">
                      <span className="text-slate-900">•</span>
                      <span>Great balance between quality and file size for blog posts and articles</span>
                    </li>
                  )}
                  {targetSize >= 100 && (
                    <li className="flex gap-3">
                      <span className="text-slate-900">•</span>
                      <span>Suitable for detailed images while maintaining reasonable file sizes</span>
                    </li>
                  )}
                  <li className="flex gap-3">
                    <span className="text-slate-900">•</span>
                    <span>Reduces bandwidth usage and improves website loading speed</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-900">•</span>
                    <span>Meets specific file size requirements for online forms and applications</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
                  Features of Our {targetSize}KB Image Compressor
                </h3>
                <ul className="space-y-2 text-slate-700 mb-6">
                  <li className="flex gap-3">
                    <span className="text-slate-900">•</span>
                    <span><strong>100% Client-Side Processing:</strong> Your images never leave your device, ensuring complete privacy</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-900">•</span>
                    <span><strong>Binary Search Algorithm:</strong> Intelligently finds the optimal compression level to hit exactly {targetSize}KB</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-900">•</span>
                    <span><strong>Multiple Format Support:</strong> Works with JPG, PNG, WebP, and GIF images</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-900">•</span>
                    <span><strong>Real-Time Preview:</strong> See your original and compressed images side-by-side</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-900">•</span>
                    <span><strong>Free & Unlimited:</strong> No registration, no watermarks, no limits</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">
                  Understanding Image Compression
                </h3>
                <p className="text-slate-700 mb-4">
                  Image compression reduces file size by removing unnecessary data while attempting to preserve visual quality.
                  Our tool uses lossy compression techniques that are optimized to achieve your target of {targetSize}KB while
                  maintaining the best possible image quality.
                </p>
                <p className="text-slate-700">
                  The binary search algorithm runs multiple compression passes with different quality settings to find the
                  sweet spot that gets you as close to {targetSize}KB as possible without exceeding it. This ensures your
                  image always meets file size requirements while looking its best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ExactSize. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
