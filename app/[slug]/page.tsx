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
  const sizesMB = [1, 2, 5, 10];
  
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

  // A. 如果是 VIP 页面，用配置的 Meta
  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      alternates: { canonical: `/${params.slug}` }
    }
  }

  // B. 如果是通用数字页，自动生成 Meta
  const humanReadableSlug = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: `${humanReadableSlug} - PixSize Free Tool`,
    description: `Free online tool by PixSize to ${humanReadableSlug.toLowerCase()}. Reduce image size to exactly ${params.slug.replace(/\D/g, '')} without uploading.`,
    alternates: { canonical: `/${params.slug}` }
  }
}

export default function SlugPage({ params }: PageProps) {
  const seo = getSeoPageConfig(params.slug)

  // A. VIP 页面 (Visa, Passport...)
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

        <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-10 mt-12 text-slate-700">
           {/* 这里假设 seo.intro 包含在 descriptionOverride 里了，或者你可以这里单独渲染。为了不重复，这里只渲染 FAQ 和 标题 */}
           <h2 className="text-xl font-bold mb-4">{seo.h1} Guide</h2>
           <p className="mb-8 leading-relaxed">{seo.intro}</p>

           {seo.faqs && (
             <>
               <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
               <div className="grid md:grid-cols-2 gap-8">
                 {seo.faqs.map((faq, idx) => (
                   <div key={idx}>
                     <p className="font-medium text-slate-900 mb-2">{faq.question}</p>
                     <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                   </div>
                 ))}
               </div>
             </>
           )}
        </section>
      </>
    )
  }

  // B. 通用数字页面 (compress-to-5mb...)
  const match = params.slug.match(/(\d+)(kb|mb)/i);
  let initialSize = "";
  let unit = "KB";
  let titleOverride = "Compress Image";

  if (match) {
    const number = parseInt(match[1]);
    unit = match[2].toUpperCase();
    
    // 5MB 修复逻辑
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