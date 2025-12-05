import { Metadata } from "next";
import dynamic from "next/dynamic";
import { SIZES_KB } from "@/lib/compressionSizes";

// 动态加载工具组件
const ImageCompressorTool = dynamic(
  () => import("@/components/ImageCompressorTool"),
  { ssr: false }
);

// 生成静态路径
export function generateStaticParams() {
  return SIZES_KB.map((size) => ({ size: String(size) }));
}

// 自动生成简短 FAQ
function generateFAQ(size: string) {
  return [
    {
      question: `What does a ${size}KB image mean?`,
      answer: `A ${size}KB image is optimized for lightweight uploading and fast loading. It is commonly used for online forms, job portals, and websites with strict file-size limits.`,
    },
    {
      question: `Why compress an image to exactly ${size}KB?`,
      answer: `Some systems require images to be below a certain size. Compressing to exactly ${size}KB ensures compatibility, reduces upload errors, and improves performance.`,
    },
    {
      question: `Is a ${size}KB image good quality?`,
      answer: `Quality depends on resolution and content. For documents and web forms, ${size}KB usually provides adequate clarity while keeping the file efficient.`,
    },
    {
      question: `How do I reduce an image to ${size}KB?`,
      answer: `Use the ExactSize image compressor on this page. Upload your image, enter ${size}KB, and download a perfectly optimized version instantly.`,
    },
  ];
}

// 构建 FAQ JSON-LD Schema（Google 结构化数据）
function buildFAQSchema(size: string) {
  const faqList = generateFAQ(size);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

// Metadata
export async function generateMetadata({
  params,
}: {
  params: { size: string };
}): Promise<Metadata> {
  const size = params.size;

  return {
    title: `Compress Image to ${size}KB – Free Online Exact Size Compressor`,
    description: `Compress your image to exactly ${size}KB using this free online tool. Ideal for portals, forms, job applications, and optimized uploads.`,
  };
}

export default function DynamicCompressPage({ params }: { params: { size: string } }) {
  const size = params.size;
  const faqSchema = JSON.stringify(buildFAQSchema(size));

  // 自动生成长文介绍（与之前一致）
  const intro =
    Number(size) <= 20
      ? `Compressing an image to ${size}KB is ideal for ultra-lightweight usage, such as avatars or thumbnails.`
      : Number(size) <= 50
      ? `A ${size}KB image is perfect for online forms and resume uploads, balancing clarity and efficiency.`
      : Number(size) <= 100
      ? `Images compressed to around ${size}KB are widely accepted for portals, HR systems, and government forms.`
      : `${size}KB images maintain strong clarity while significantly reducing file size.`;

  return (
    <>
      {/* 注入 JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      {/* 工具本体 */}
      <ImageCompressorTool
        initialTargetSize={size}
        titleOverride={`Compress Image to ${size}KB`}
      />

      {/* SEO 介绍区块 */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-10 mt-6 text-sm text-slate-600 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          What does a {size}KB image mean?
        </h2>

        <p>{intro}</p>

        <p>
          This tool compresses JPG, PNG, and WEBP images to exactly{" "}
          <strong>{size}KB</strong>, ensuring compatibility with any upload
          system that enforces strict file limits.
        </p>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          Why compress an image to {size}KB?
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Meet strict file-size rules for online submission forms</li>
          <li>Reduce upload time on slow networks</li>
          <li>Improve website loading performance</li>
          <li>Avoid errors in portals that reject large files</li>
        </ul>

        <h3 className="text-base font-semibold text-slate-800 mt-4">
          Frequently Asked Questions
        </h3>

        <ul className="list-disc list-inside space-y-1">
          {generateFAQ(size).map((faq, i) => (
            <li key={i}>
              <strong>{faq.question}</strong>
              <br />
              {faq.answer}
            </li>
          ))}
        </ul>

        <p className="pt-3">
          Upload your image above and download a perfectly optimized version at{" "}
          <strong>{size}KB</strong> in seconds.
        </p>
      </section>
    </>
  );
}
