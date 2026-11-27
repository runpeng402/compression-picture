type LegalPageProps = {
  title: string;
  updated?: string;
  children: React.ReactNode;
};

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{title}</h1>
      {updated && <p className="text-xs text-slate-400 mb-8">Last updated: {updated}</p>}
      <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-800 [&_h2]:mt-8 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-blue-600 [&_a:hover]:underline">
        {children}
      </div>
    </main>
  );
}
