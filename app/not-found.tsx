import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <h2 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h2>
      <p className="text-slate-500 mb-8">We couldn't find the compression tool you were looking for.</p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  )
}