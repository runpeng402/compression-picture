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
    if (unit === 'MB') return "high-quality printing and discord uploads";
    if (num <= 20) return "signatures in online exams (SSC, UPSC)";
    if (num <= 50) return "passport photos and government forms";
    if (num <= 200) return "visa applications and job portals";
    return "email attachments and storage optimization";
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-12 mt-12 border-t border-slate-100 pt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        How to Compress Image to {displaySize}?
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <ol className="list-decimal list-inside space-y-3 text-sm text-slate-600 bg-slate-50 p-6 rounded-2xl">
          <li>Upload your image to the box above.</li>
          <li>The tool automatically targets <strong>{displaySize}</strong>.</li>
          <li>Wait for the compression to finish.</li>
          <li>Click <strong>Download</strong> to save your optimized image.</li>
        </ol>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-1">🎯 Exact {displaySize} Target</h3>
            <p className="text-xs text-slate-500">Perfect for {getUsageContext()}. We ensure the file size stays strictly under the limit.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-1">🔒 Client-side Secure</h3>
            <p className="text-xs text-slate-500">Your photos never leave your device. Processing happens locally in your browser.</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-6">FAQ about {displaySize} Compression</h2>
      <div className="space-y-6 text-sm text-slate-600">
        <div>
          <p className="font-medium text-slate-800 mb-1">Will reducing to {displaySize} lose quality?</p>
          <p>PixSize uses smart algorithms to balance quality and size. For {displaySize}, the image remains clear enough for web use and printing.</p>
        </div>
        <div>
          <p className="font-medium text-slate-800 mb-1">Is this tool free?</p>
          <p>Yes, you can compress as many images as you want to {displaySize} for free, with no watermarks.</p>
        </div>
      </div>
    </div>
  );
}