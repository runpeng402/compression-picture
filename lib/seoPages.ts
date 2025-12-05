// lib/seoPages.ts

export type SeoSlug =
  | "jpg-to-50kb"
  | "png-to-50kb"
  | "passport-photo-size"
  | "visa-photo-compressor"

export interface FaqItem {
  question: string
  answer: string
}

export interface SeoPageConfig {
  slug: SeoSlug
  path: string
  title: string
  description: string
  h1: string
  intro: string
  keywords: string[]
  faqs: FaqItem[]
  /** 页面的默认目标大小（比如 50KB），传给 ImageCompressorTool */
  defaultTargetSize?: string
}

export const SEO_PAGES: Record<SeoSlug, SeoPageConfig> = {
  "jpg-to-50kb": {
    slug: "jpg-to-50kb",
    path: "/jpg-to-50kb",
    title: "Compress JPG to 50KB Online – Exact 50KB JPG Compressor (Free & Fast)",
    description:
      "Compress JPG image to exactly 50KB online for free. Perfect for job applications, online forms, email attachments, and document uploads. No signup, instant processing.",
    h1: "Compress JPG to 50KB",
    intro:
      "Need to reduce your JPG photo to exactly 50KB? This tool compresses any JPG image to a precise file size while keeping the best possible quality. Ideal for resumes, online forms, school portals, and email submissions.",
    keywords: [
      "jpg compressor to 50kb",
      "reduce jpg size to 50kb",
      "jpg resize to 50kb",
      "compress photo for job application",
      "compress jpg for online form"
    ],
    defaultTargetSize: "50",
    faqs: [
      {
        question: "How do I compress a JPG to 50KB?",
        answer:
          "Upload your JPG image, enter 50KB as the target size, and click Compress. You can download the optimized 50KB JPG instantly."
      },
      {
        question: "Will the JPG quality remain good after compression?",
        answer:
          "Yes. This tool uses smart quality adjustment and dimension optimization to achieve 50KB while keeping the image as clear as possible."
      }
    ]
  },

  "png-to-50kb": {
    slug: "png-to-50kb",
    path: "/png-to-50kb",
    title: "Compress PNG to 50KB Online – Free 50KB PNG Compressor",
    description:
      "Free online tool to compress PNG images to exactly 50KB. Maintain transparency and high clarity while reducing file size. No signup required.",
    h1: "Compress PNG to 50KB",
    intro:
      "This tool compresses PNG images to a precise target size, including transparent PNGs. Ideal for website uploads, documents, and online forms requiring a 50KB PNG limit.",
    keywords: [
      "compress transparent png to 50kb",
      "png reduce size online",
      "png 50kb converter",
      "png for website upload"
    ],
    defaultTargetSize: "50",
    faqs: [
      {
        question: "Does this tool work with transparent PNGs?",
        answer:
          "Yes. The compressor fully supports transparent PNG images and preserves transparency during compression."
      },
      {
        question: "Is the PNG compression lossless?",
        answer:
          "The tool uses smart optimization. Some images may undergo mild lossy compression to reach the exact 50KB target while maintaining quality."
      }
    ]
  },

  "passport-photo-size": {
    slug: "passport-photo-size",
    path: "/passport-photo-size",
    title: "Passport Photo Size Compressor – Resize & Compress Passport Photos Online",
    description:
      "Compress and resize passport photos to the required file size and dimensions. Supports US, UK, India, China, and EU passport photo standards. Free and instant.",
    h1: "Passport Photo Size Tool",
    intro:
      "Upload your passport photo to automatically compress and resize it to meet official requirements. Supports US passport photos (2x2 inch), UK digital passport guidelines, India passport size (35x45mm), and more.",
    keywords: [
      "passport photo compressor",
      "passport photo size online tool",
      "resize passport photo to required size",
      "passport photo kb reduce",
      "us passport photo 2x2",
      "uk passport photo size requirement"
    ],
    defaultTargetSize: "100", // 可以按需改，比如 50 / 200
    faqs: [
      {
        question: "Does this tool support official passport photo sizes?",
        answer:
          "Yes. It supports major passport photo size requirements including US (2x2 inch), UK digital passport specifications, India (35x45mm), China ID photo size, and EU size formats."
      },
      {
        question: "Can I compress my passport photo to meet the file size limit?",
        answer:
          "Yes. Many countries require passport photos under a specific KB size. This tool lets you enter an exact file size such as 50KB, 100KB, or 200KB."
      }
    ]
  },

  "visa-photo-compressor": {
    slug: "visa-photo-compressor",
    path: "/visa-photo-compressor",
    title: "Visa Photo Compressor – Reduce Visa Photo Size Online (KB & Dimensions)",
    description:
      "Compress your visa photo to the required file size and dimensions for US Visa, Schengen Visa, UK Visa, India Visa, and more. Free online tool.",
    h1: "Visa Photo Compressor",
    intro:
      "Easily compress and resize visa photos to match official file size and resolution requirements. Supports US Visa DS-160 photo rules, Schengen visa photo sizes, UK visa specifications, and more.",
    keywords: [
      "visa photo compressor",
      "reduce visa photo kb",
      "ds-160 photo size kb limit",
      "schengen visa photo requirements",
      "india visa photo compression"
    ],
    defaultTargetSize: "100",
    faqs: [
      {
        question: "Does this tool support visa photo requirements?",
        answer:
          "Yes. It supports US Visa (DS-160), Schengen, UK, India, and China visa photo specifications including file size, dimensions, and aspect ratio."
      },
      {
        question: "Can I reduce my visa photo file size?",
        answer:
          "Yes. Enter the target file size such as 50KB, 100KB, or 200KB to compress your visa photo instantly."
      }
    ]
  }
}

/** 通过 slug 获取配置；找不到时返回 null，页面用作兜底 */
export function getSeoPageConfig(slug: string): SeoPageConfig | null {
  if ((SEO_PAGES as any)[slug]) {
    return (SEO_PAGES as any)[slug] as SeoPageConfig
  }
  return null
}
