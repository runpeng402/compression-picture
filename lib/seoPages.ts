export type FaqItem = {
  question: string
  answer: string
}

export type SeoPageConfig = {
  slug: string
  title: string
  description: string
  h1: string
  intro: string
  defaultTargetSize: string
  faqs: FaqItem[]
}

// 这里是数据配置，不是界面组件！
const seoPagesDatabase: Record<string, SeoPageConfig> = {
  "passport-photo-size": {
    slug: "passport-photo-size",
    title: "Passport Photo Size Compressor – Resize Image for Passport Online",
    description: "Compress and resize images for passport applications online. Ensure your photo meets the file size requirements (e.g. 50KB-200KB) for US, UK, India, and other passports.",
    h1: "Passport Photo Size Compressor",
    intro: "Preparing a digital photo for a passport application can be tricky. Most government portals (like US Department of State, UK HM Passport Office, or India Seva) have strict file size limits, often rejecting photos over 200KB or under 50KB. PixSize helps you compress your high-resolution photo to the exact required size without losing facial clarity.",
    defaultTargetSize: "200",
    faqs: [
      {
        question: "What is the standard file size for passport photos?",
        answer: "While dimensions vary (2x2 inch or 35x45mm), the file size is usually required to be between 50KB and 200KB (or up to 240KB for US forms). PixSize allows you to target this exact range."
      },
      {
        question: "Will compressing my passport photo affect acceptance?",
        answer: "No, as long as the face remains clear and not pixelated. PixSize uses smart compression to reduce file size (bytes) while maintaining visual quality suitable for biometric scanning."
      }
    ]
  },
  "visa-photo-compressor": {
    slug: "visa-photo-compressor",
    title: "Visa Photo Compressor – Resize Image for Visa Application",
    description: "Online Visa photo compressor for US DS-160, Schengen, Canada, and Australia visas. Reduce image size to meet strict upload limits (e.g. 240KB) instantly.",
    h1: "Visa Photo Compressor",
    intro: "Applying for a Visa online usually requires uploading a digital photo that adheres to strict technical specifications. If your file is too large (e.g., >240KB for US DS-160 form), the system will reject it. Use PixSize to securely compress your Visa photo to the exact target size required by the embassy's portal.",
    defaultTargetSize: "200",
    faqs: [
      {
        question: "What is the size limit for US DS-160 Visa photos?",
        answer: "The digital photo for the US DS-160 form must be less than 240 KB (kilobytes). We recommend setting the target to 200KB to be safe."
      },
      {
        question: "Can I use this for Schengen or Canada Visa photos?",
        answer: "Yes. Most online visa systems require JPEGs under a certain size (often 200KB or 500KB). Simply check the requirement and enter that number into PixSize."
      }
    ]
  },
  "jpg-to-50kb": {
    slug: "jpg-to-50kb",
    title: "Compress JPG to 50KB – Online Image Reducer",
    description: "Free tool to compress JPG images to exactly 50KB. Perfect for government forms, ID cards, and websites with strict 50KB upload limits.",
    h1: "Compress JPG to 50KB",
    intro: "Many websites, especially government portals (like SSC, UPSC in India) and older systems, strictly require JPG images to be exactly or under 50KB. PixSize is specialized in hitting this low target size while keeping the text and signature inside the image readable.",
    defaultTargetSize: "50",
    faqs: [
      {
        question: "How do I reduce a JPG to 50KB without losing quality?",
        answer: "Upload your JPG, set the target to 50KB, and let our algorithm adjust the quality and resolution automatically to fit the limit."
      },
      {
        question: "Is 50KB too small for a photo?",
        answer: "For printing, yes. But for web uploads (signatures, thumbnails, ID cards), 50KB is standard and sufficient."
      }
    ]
  },
  "png-to-50kb": {
    slug: "png-to-50kb",
    title: "Compress PNG to 50KB – Reduce PNG Size Online",
    description: "Compress PNG images to 50KB online. Reduce file size while handling transparency. Ideal for logos, icons, and web graphics.",
    h1: "Compress PNG to 50KB",
    intro: "PNG files are often large due to lossless quality. When you need to compress a PNG to 50KB for a website logo, icon, or specific form, standard tools might fail. PixSize effectively reduces PNG size to your target 50KB limit.",
    defaultTargetSize: "50",
    faqs: [
      {
        question: "Will I lose transparency if I compress PNG to 50KB?",
        answer: "PixSize attempts to preserve transparency. However, aggressive compression to 50KB may sometimes require converting complex transparent areas. We recommend checking the preview."
      }
    ]
  }
}

export function getSeoPageConfig(slug: string): SeoPageConfig | undefined {
  return seoPagesDatabase[slug]
}