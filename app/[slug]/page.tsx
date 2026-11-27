import { Metadata } from "next";
import { notFound } from "next/navigation";
import ImageCompressorTool from "@/components/ImageCompressorTool";
import SEOContent, { getSizeFaqs } from "@/components/SEOContent";
import {
  POPULAR_SIZES,
  findSizeBySlug,
  formatSizeLabel,
  getSizeHref,
  getSizeSlug,
  sizeToKB,
} from "@/lib/compressionSizes";
import { SITE_NAME, absoluteUrl, buildPageMetadata, jsonLdScript } from "@/lib/site";

// Only the sizes listed in POPULAR_SIZES exist; every other path must return a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return POPULAR_SIZES.map((size) => ({ slug: getSizeSlug(size) }));
}

type PageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const size = findSizeBySlug(params.slug);
  if (!size) return {};
  const label = formatSizeLabel(size);
  return buildPageMetadata({
    title: `Compress Image to ${label} Online – Free, Exact Size | ${SITE_NAME}`,
    description: `Compress JPG, PNG or WebP images to ${label} or less in seconds. Free online tool that runs in your browser – no upload, no signup, no watermark.`,
    path: getSizeHref(size),
    ogTitle: `Compress to ${label}`,
    ogSize: label,
  });
}

export default function SizePage({ params }: PageProps) {
  const size = findSizeBySlug(params.slug);
  if (!size) notFound();

  const label = formatSizeLabel(size);
  const url = absoluteUrl(getSizeHref(size));
  const faqs = getSizeFaqs(size);

  const jsonLdPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Compress Image to ${label}`,
    url,
    description: `Online tool to compress an image to ${label} or less.`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: absoluteUrl("/") },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdPage)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLdFaq)} />
      <ImageCompressorTool
        initialTargetSize={String(sizeToKB(size))}
        titleOverride={`Compress Image to ${label}`}
      />
      <SEOContent size={size} faqs={faqs} />
    </>
  );
}
