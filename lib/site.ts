import type { Metadata } from "next";

export const SITE_URL = "https://compresstokb.com";
export const SITE_NAME = "CompressToKB";
// Previous brand name; kept visible so people who search for it still find the site.
export const SITE_FORMER_NAME = "PixSize";
export const SITE_TAGLINE = "Compress images to an exact file size in KB or MB";

// Shown on the Contact and Privacy pages; must be a mailbox that actually receives mail.
export const CONTACT_EMAIL = "runpeng402@gmail.com";

// Bump when page content changes; used as sitemap lastModified so crawlers see real update dates.
export const CONTENT_UPDATED = "2026-11-27";

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogImageUrl(title: string, size: string): string {
  const params = new URLSearchParams({ title, subtitle: "Exact Size Image Compressor", size });
  return `${SITE_URL}/api/og?${params.toString()}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogSize?: string;
};

export function buildPageMetadata({ title, description, path, ogTitle, ogSize }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const image = ogImageUrl(ogTitle ?? SITE_NAME, ogSize ?? "Free Online Tool");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
