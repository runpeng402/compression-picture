export type PopularSize = {
  value: number;
  unit: "KB" | "MB";
};

// Single source of truth for size landing pages: routes, sitemap and internal links all derive from this list.
export const POPULAR_SIZES: PopularSize[] = [
  { value: 5, unit: "KB" },
  { value: 8, unit: "KB" },
  { value: 10, unit: "KB" },
  { value: 15, unit: "KB" },
  { value: 20, unit: "KB" },
  { value: 30, unit: "KB" },
  { value: 40, unit: "KB" },
  { value: 50, unit: "KB" },
  { value: 60, unit: "KB" },
  { value: 70, unit: "KB" },
  { value: 80, unit: "KB" },
  { value: 90, unit: "KB" },
  { value: 100, unit: "KB" },
  { value: 150, unit: "KB" },
  { value: 200, unit: "KB" },
  { value: 250, unit: "KB" },
  { value: 300, unit: "KB" },
  { value: 400, unit: "KB" },
  { value: 500, unit: "KB" },
  { value: 600, unit: "KB" },
  { value: 800, unit: "KB" },
  { value: 900, unit: "KB" },
  { value: 1, unit: "MB" },
  { value: 2, unit: "MB" },
  { value: 5, unit: "MB" },
  { value: 10, unit: "MB" },
];

export const FORMAT_PAGES: { label: string; href: string }[] = [
  { label: "JPG to 50KB", href: "/jpg-to-50kb" },
  { label: "PNG to 50KB", href: "/png-to-50kb" },
  { label: "Passport Photo Compressor", href: "/passport-photo-size" },
  { label: "Visa Photo Compressor", href: "/visa-photo-compressor" },
];

export function formatSizeLabel(size: PopularSize): string {
  return `${size.value}${size.unit}`;
}

export function getSizeSlug(size: PopularSize): string {
  return `compress-to-${size.value}${size.unit.toLowerCase()}`;
}

export function getSizeHref(size: PopularSize): string {
  return `/${getSizeSlug(size)}`;
}

export function sizeToKB(size: PopularSize): number {
  return size.unit === "MB" ? size.value * 1024 : size.value;
}

export function findSizeBySlug(slug: string): PopularSize | undefined {
  return POPULAR_SIZES.find((size) => getSizeSlug(size) === slug);
}
