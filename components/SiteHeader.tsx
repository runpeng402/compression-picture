import Link from "next/link";
import { Target as TargetIcon } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE_NAME} home`}>
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <TargetIcon className="w-4 h-4 text-white" aria-hidden="true" />
          </span>
          <span className="font-semibold text-slate-900">{SITE_NAME}</span>
        </Link>
        <span className="text-xs text-slate-400 font-medium hidden sm:block">
          Exact Size Image Compressor
        </span>
      </div>
    </header>
  );
}
