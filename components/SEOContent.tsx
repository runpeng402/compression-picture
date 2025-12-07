"use client"

import React from 'react';

interface SEOContentProps {
  size: string;
  unit: string;
}

export default function SEOContent({ size, unit }: SEOContentProps) {
  const displaySize = `${size}${unit}`;
  
  const getUsageContext = () => {
    const num = parseInt(size);
    if (unit === 'MB') return "high-quality printing, Discord uploads, and photography portfolios";
    if (num <= 20) return "digital signatures in online exams (SSC, UPSC, IBPS)";
    if (num <= 50) return "passport photos, driver's licenses, and government application forms";
    if (num <= 100) return "standard web profiles, ID photos, and thumbnails";
    if (num <= 200) return "US Visa (DS-160), Schengen Visa, and job application documents";
    if (num <= 500) return "PDF document scans, university applications, and e-commerce product photos";
    return "email attachments, storage optimization, and social media sharing";
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-12 border-t border-slate-100 pt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        How to Compress Image to {displaySize} with PixSize?
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <ol className="list-decimal list-inside space-y-3 text-sm text-slate-600 bg-slate-50 p-6 rounded-2xl">
          <li>Upload your image to the <strong>PixSize</strong> tool above.</li>
          <li>The target size is automatically set to <strong>{displaySize}</strong>.</li>
          <li>Wait a second for our smart algorithm to process the image.</li>
          <li>Click <strong>Download</strong> to save your optimized file.</li>
        </ol>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-1">🎯 Exact Size Control</h3>
            <p className="text-xs text-slate-500">PixSize ensures your file size stays strictly under {displaySize}, perfect for {getUsageContext()}.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-1">🔒 100% Private</h3>
            <p className="text-xs text-slate-500">Unlike other tools, PixSize processes images locally in your browser. No server uploads.</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-6">FAQ about {displaySize} Compression</h2>
      <div className="space-y-6 text-sm text-slate-600">
        <div>
          <p className="font-medium text-slate-800 mb-1">Will reducing to {displaySize} lose quality?</p>
          <p>PixSize uses advanced compression to keep the highest possible quality while strictly adhering to the {displaySize} limit. Text and faces usually remain clear.</p>
        </div>
        <div>
          <p className="font-medium text-slate-800 mb-1">Is PixSize free to use?</p>
          <p>Yes, PixSize is completely free. You can compress unlimited images to {displaySize} without watermarks or registration.</p>
        </div>
      </div>
    </div>
  );
}