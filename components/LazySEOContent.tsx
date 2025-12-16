"use client"

import { useState, useEffect, useRef } from "react"

interface FAQItem {
  q: string
  a: string
}

interface LazySEOContentProps {
  faqItems: FAQItem[]
}

// ✅ 性能优化：延迟加载 SEO 内容，减少初始 CLS
export default function LazySEOContent({ faqItems }: LazySEOContentProps) {
  const [showContent, setShowContent] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 延迟加载，减少初始 CLS
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContent(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // 提前 200px 开始加载
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={contentRef} data-lazy-content style={{ minHeight: showContent ? 'auto' : '400px' }}>
      {showContent && (
        <>
          {/* 品牌 + 长文 SEO 介绍 */}
          <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-10 mt-10">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              PixSize – Exact Size Image Compressor
            </h2>
            <p className="text-sm text-slate-600 mb-3">
              <strong>PixSize</strong> is a lightweight image compressor brand built
              on the <strong>ExactSize</strong> engine. It focuses on one thing
              only: helping you compress JPG or PNG files to an{" "}
              <strong>exact file size in KB or MB</strong>, instead of just giving
              you a rough "smaller file".
            </p>
            <p className="text-sm text-slate-600 mb-3">
              This makes PixSize especially suitable for{" "}
              <strong>online forms, job portals, passport and visa systems</strong>,
              education portals, and government websites that strictly require a
              maximum file size such as <strong>50KB, 100KB, 200KB, or 500KB</strong>
              . You can also use it to prepare profile photos, ID document scans,
              and attachments for email or messaging tools that enforce upload
              limits.
            </p>
            <p className="text-sm text-slate-600 mb-3">
              Unlike traditional "compress image" tools that only provide a
              percentage slider, PixSize lets you{" "}
              <strong>set a precise target</strong> in KB or MB. The ExactSize
              engine then automatically adjusts compression parameters and re-encodes
              your image so that the final file size is as close as possible to your
              target, while preserving visual clarity.
            </p>
            <p className="text-sm text-slate-600">
              All compression is performed in your browser. Your images are{" "}
              <strong>not stored on a server</strong>, which means your passport
              photos, ID documents, and personal images stay on your own device. You
              can use PixSize directly in the browser without registration, download
              the result instantly, and repeat the process as many times as needed.
            </p>
          </section>

          {/* FAQ 文本（与 JSON-LD 对应） */}
          <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-16">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Frequently Asked Questions about Exact Size Compression
            </h2>
            <div className="space-y-4 text-sm text-slate-600">
              {faqItems.map((item, idx) => (
                <div key={idx}>
                  <p className="font-medium text-slate-800">{item.q}</p>
                  <p className="mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

