import { jsonLdScript } from "@/lib/site";

export type FaqItem = { q: string; a: string };

type FaqSectionProps = {
  items: FaqItem[];
  title?: string;
};

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export default function FaqSection({ items, title = "Frequently Asked Questions" }: FaqSectionProps) {
  return (
    <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(items))} />
      <h2 className="text-lg font-semibold text-slate-800 mb-4">{title}</h2>
      <div className="space-y-4 text-sm text-slate-600">
        {items.map((item) => (
          <div key={item.q}>
            <h3 className="font-medium text-slate-800">{item.q}</h3>
            <p className="mt-1">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
