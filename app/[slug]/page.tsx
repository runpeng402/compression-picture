// app/[slug]/page.tsx

import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getSeoPageConfig } from "@/lib/seoPages"

// 动态加载压缩工具（关闭 SSR）
const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
)

type PageProps = {
  params: {
    slug: string
  }
}

// 统一用配置生成每个专题页的 <title> / <meta description>
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const seo = getSeoPageConfig(params.slug)

  if (!seo) {
    // 兜底：非专题 slug，走通用的
    return {
      title: "Compress Image to Exact Size – ExactSize Free Online Tool",
      description:
        "Free online tool to compress images to an exact file size in KB or MB. Supports JPG, PNG, WEBP. No signup, instant compression."
    }
  }

  return {
    title: seo.title,
    description: seo.description
  }
}

export default function SlugPage({ params }: PageProps) {
  const seo = getSeoPageConfig(params.slug)

  // 决定默认目标大小
  const initialTargetSize = seo?.defaultTargetSize ?? ""

  // FAQ 结构化数据（只有配置了 faqs 的页面才注入）
  const faqJsonLd =
    seo && seo.faqs && seo.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: seo.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer
            }
          }))
        }
      : null

  return (
    <>
      {/* FAQ Schema：只对 4 个专题页生效，帮助 Google 出“常见问题”的富结果 */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* 主工具：标题用 h1 配置，targetSize 用 defaultTargetSize 配置 */}
      <ImageCompressorTool
        initialTargetSize={initialTargetSize}
        titleOverride={seo?.h1 ?? "Compress Image to Exact Size"}
      />

      {/* 可选：在工具后面追加一小段介绍文案，增强页面正文里的关键词密度 */}
      {seo && (
        <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-10 mt-4 text-sm text-slate-600">
          <p>{seo.intro}</p>
        </section>
      )}
    </>
  )
}
