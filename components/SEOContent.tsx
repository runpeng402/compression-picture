import { PopularSize, formatSizeLabel } from "@/lib/compressionSizes";
import { SITE_NAME } from "@/lib/site";

type Faq = { q: string; a: string };

function getUsageContext(size: PopularSize): string {
  if (size.unit === "MB") return "email attachments, website uploads, chat apps and cloud storage limits";
  if (size.value <= 20) return "scanned signatures and small photos on exam and job application forms";
  if (size.value <= 50) return "photos on job portals, exam registrations and government application forms";
  if (size.value <= 100) return "profile pictures, ID photos and thumbnails";
  if (size.value <= 250) return "visa and application photos, and document images on online portals";
  if (size.value <= 500) return "document scans, university applications and product photos";
  return "email attachments, website images and social media sharing";
}

export function getSizeFaqs(size: PopularSize): Faq[] {
  const label = formatSizeLabel(size);
  return [
    {
      q: `Will reducing an image to ${label} lose quality?`,
      a: `${SITE_NAME} keeps the highest quality that still fits under ${label}. If quality alone is not enough, it also lowers the image dimensions. Text and faces usually remain clear${
        size.unit === "KB" && size.value <= 20 ? ", but at very small sizes the image will be noticeably smaller" : ""
      }.`,
    },
    {
      q: `Will the file be exactly ${label}?`,
      a: `The result is always at or below ${label}, usually just under it. Upload forms reject files above the limit, so the tool never goes over it. If the original file is already smaller than ${label}, it is returned unchanged.`,
    },
    {
      q: `Is it free to compress images to ${label}?`,
      a: `Yes. ${SITE_NAME} is free, needs no registration and adds no watermark. Images are processed in your browser and never uploaded.`,
    },
  ];
}

type SEOContentProps = {
  size: PopularSize;
  faqs: Faq[];
};

export default function SEOContent({ size, faqs }: SEOContentProps) {
  const label = formatSizeLabel(size);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-12 border-t border-slate-100 pt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-6">How to Compress an Image to {label}</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <ol className="list-decimal list-inside space-y-3 text-sm text-slate-600 bg-slate-50 p-6 rounded-2xl">
          <li>Upload your JPG, PNG or WebP image in the tool above.</li>
          <li>The target size is already set to <strong>{label}</strong>.</li>
          <li>Click <strong>Compress Now</strong> and wait a few seconds.</li>
          <li>Click <strong>Download Result</strong> to save the compressed file.</li>
        </ol>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-1">Stays under {label}</h3>
            <p className="text-xs text-slate-500">
              The compressed file never exceeds {label}, which suits {getUsageContext(size)}.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-1">Private by design</h3>
            <p className="text-xs text-slate-500">
              Images are processed locally in your browser and are never uploaded to a server.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-6">FAQ about {label} Compression</h2>
      <div className="space-y-6 text-sm text-slate-600">
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="font-medium text-slate-800 mb-1">{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
