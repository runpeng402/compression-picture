import Link from "next/link";
import {
  FORMAT_PAGES,
  POPULAR_SIZES,
  formatSizeLabel,
  getSizeHref,
} from "@/lib/compressionSizes";
import { SITE_FORMER_NAME, SITE_NAME } from "@/lib/site";

const LEGAL_LINKS = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto">
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12" aria-labelledby="popular-compressions">
        <h2 id="popular-compressions" className="text-lg font-semibold text-slate-800 mb-6">
          Popular Compressions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <nav aria-label="Compress to a specific size">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Popular Sizes (Exact KB / MB)</h3>
            <ul className="flex flex-wrap items-center gap-x-1 gap-y-1.5 text-sm">
              {POPULAR_SIZES.map((size, index) => (
                <li key={getSizeHref(size)} className="inline-flex items-center">
                  <Link href={getSizeHref(size)} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    {formatSizeLabel(size)}
                  </Link>
                  {index < POPULAR_SIZES.length - 1 && (
                    <span className="text-slate-300 mx-1.5" aria-hidden="true">|</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Popular formats and documents">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Popular Formats</h3>
            <ul className="flex flex-wrap items-center gap-x-1 gap-y-1.5 text-sm">
              {FORMAT_PAGES.map((item, index) => (
                <li key={item.href} className="inline-flex items-center">
                  <Link href={item.href} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    {item.label}
                  </Link>
                  {index < FORMAT_PAGES.length - 1 && (
                    <span className="text-slate-300 mx-1.5" aria-hidden="true">|</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <div className="border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {SITE_NAME} (formerly {SITE_FORMER_NAME}). Images are processed in your browser.</p>
          <nav aria-label="Site information">
            <ul className="flex flex-wrap items-center gap-4">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-slate-600 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
