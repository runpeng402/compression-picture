import type { Metadata } from 'next'
import Link from 'next/link'

// Next.js already adds <meta name="robots" content="noindex"> to 404 responses.
export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
      <p className="text-slate-500 mb-8">We couldn&apos;t find the page you were looking for. Try one of the popular sizes below.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        Go to the Image Compressor
      </Link>
    </main>
  )
}
