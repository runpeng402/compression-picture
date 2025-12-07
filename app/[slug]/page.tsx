import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getSeoPageConfig } from "@/lib/seoPages"
import SEOContent from "@/components/SEOContent"

const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
)

export function generateStaticParams() {
  const sizesKB = [10, 15, 20, 30, 40, 50, 60, 80, 100, 200, 300, 500];
  const sizesMB = [1, 2, 5, 10]; // 确保包含 5MB, 10MB
  
  const kbPaths = sizesKB.map((size) => ({ slug: `compress-to-${size}kb` }));
  const mbPaths = sizesMB.map((size) => ({ slug: `compress-to-${size}mb` }));
  
  const formatPaths = [
    { slug: 'jpg-to-50kb' },
    { slug: 'png-to-50kb' },
    { slug: 'passport-photo-size' },
    { slug: 'visa-photo-compressor' },
  ];

  return [...kbPaths, ...mbPaths, ...formatPaths];
}

type PageProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const seo = getSeoPageConfig(params.slug)
  if (seo) {
    return {
      title: seo.title,
      description: seo.description
    }
  }
  const humanReadableSlug = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: `${humanReadableSlug} - ExactSize Free Tool`,
    description: `Free online tool to ${humanReadableSlug.toLowerCase()}. Reduce image size accurately without uploading to server.`
  }
}

export default function SlugPage({ params }: PageProps) {
  const seo = getSeoPageConfig(params.slug)

  // A. 特殊页面
  if (seo) {
    const faqJsonLd = seo.faqs && seo.faqs.length > 0 ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: seo.faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) } : null

    return (
      <>
        {faqJsonLd && (<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />)}
        <ImageCompressorTool
          initialTargetSize={seo.defaultTargetSize ?? ""}
          titleOverride={seo.h1 ?? "Compress Image to Exact Size"}
          descriptionOverride={seo.intro} 
        />
        <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-10 mt-4 text-sm text-slate-600">
          <p>{seo.intro}</p>
        </section>
        {seo.faqs && (
          <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-16">
            <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {seo.faqs.map((faq, idx) => (
                <div key={idx}><p className="font-medium text-slate-900 mb-1">{faq.question}</p><p className="text-sm text-slate-600">{faq.answer}</p></div>
              ))}
            </div>
          </section>
        )}
      </>
    )
  }

  // B. 通用数字页面 (核心修复在这里！)
  const match = params.slug.match(/(\d+)(kb|mb)/i);
  let initialSize = "";
  let unit = "KB";
  let titleOverride = "Compress Image";

  if (match) {
    const number = parseInt(match[1]);
    unit = match[2].toUpperCase(); // 这里拿到单位，比如 MB
    
    // ✅ 修复逻辑：如果是 MB，乘以 1024 换算成 KB
    if (unit === 'MB') {
      initialSize = (number * 1024).toString(); 
      titleOverride = `Compress Image to ${number}MB`;
    } else {
      initialSize = number.toString();
      titleOverride = `Compress Image to ${number}KB`;
    }
  }

  return (
    <>
      <ImageCompressorTool 
        initialTargetSize={initialSize} 
        titleOverride={titleOverride} 
      />
      <SEOContent size={match ? match[1] : ""} unit={unit} />
    </>
  )
}