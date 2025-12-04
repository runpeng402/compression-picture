"use client";

import { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, Download, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { compressToTargetSize, formatFileSize } from '@/lib/imageCompression';

interface ImageCompressorProps {
  defaultTargetSize: number;
  showHero?: boolean;
}

export function ImageCompressor({ defaultTargetSize, showHero = true }: ImageCompressorProps) {
  const [targetSize, setTargetSize] = useState(defaultTargetSize.toString());
  const [dragActive, setDragActive] = useState(false);
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTargetSize(defaultTargetSize.toString());
  }, [defaultTargetSize]);

  useEffect(() => {
    setCompressedImage(null);
    setCompressedPreview(null);
    setCompressedSize(0);
  }, [targetSize]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFile(file);
      }
    };
    input.click();
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      setTimeout(() => setError(null), 5000);
      return;
    }

    setOriginalImage(file);
    setOriginalSize(file.size);
    setCompressedImage(null);
    setCompressedPreview(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCompress = async () => {
    if (!originalImage) return;

    const target = parseInt(targetSize);
    if (isNaN(target) || target <= 0) {
      setError('Please enter a valid target size');
      setTimeout(() => setError(null), 5000);
      return;
    }

    const targetBytes = target * 1024;
    const compressionRatio = targetBytes / originalSize;

    if (compressionRatio < 0.05) {
      setError('Target size is too small for this image. Please try a larger size (at least 5% of original size).');
      setTimeout(() => setError(null), 7000);
      return;
    }

    if (targetBytes >= originalSize) {
      setError('Target size is larger than the original image. No compression needed.');
      setTimeout(() => setError(null), 5000);
      return;
    }

    setIsCompressing(true);
    setCompressionProgress(0);
    setError(null);

    try {
      const result = await compressToTargetSize(
        originalImage,
        target,
        (progress) => setCompressionProgress(progress)
      );

      setCompressedImage(result.blob);
      setCompressedSize(result.compressedSize);

      const reader = new FileReader();
      reader.onload = (e) => {
        setCompressedPreview(e.target?.result as string);
      };
      reader.readAsDataURL(result.blob);
    } catch (error) {
      console.error('Compression error:', error);
      setError('Failed to compress image. The target size might be too small or the image is too complex. Please try a larger size.');
      setTimeout(() => setError(null), 7000);
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };

  const handleDownload = () => {
    if (!compressedImage || !originalImage) return;

    const fileNameWithoutExt = originalImage.name.replace(/\.[^/.]+$/, '');
    const extension = originalImage.name.match(/\.[^/.]+$/)?.[0] || '.jpg';
    const newFileName = `${fileNameWithoutExt}-${targetSize}kb${extension}`;

    const url = URL.createObjectURL(compressedImage);
    const a = document.createElement('a');
    a.href = url;
    a.download = newFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalPreview(null);
    setCompressedImage(null);
    setCompressedPreview(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setError(null);
  };

  return (
    <>
      {/* Hero Section */}
      {showHero && !originalImage && (
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight px-4">
            Compress Image to
            <br />
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Specific Size (KB)
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Resize and compress your images to an exact file size with precision and ease
          </p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Upload Area or Image Preview */}
      {!originalImage ? (
        <>
          <div className="mb-6 sm:mb-8">
            <div
              onClick={handleClick}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                relative border-3 border-dashed rounded-xl sm:rounded-2xl
                p-8 sm:p-12 md:p-16 lg:p-20
                transition-all duration-300 cursor-pointer
                hover:border-slate-400 hover:bg-slate-50/50
                ${dragActive
                  ? 'border-slate-500 bg-slate-50 scale-[1.02]'
                  : 'border-slate-300 bg-white'
                }
              `}
            >
              <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                <div className={`
                  p-4 sm:p-6 rounded-full transition-all duration-300
                  ${dragActive ? 'bg-slate-200 scale-110' : 'bg-slate-100'}
                `}>
                  <Upload className={`
                    h-10 w-10 sm:h-12 sm:w-12 transition-colors duration-300
                    ${dragActive ? 'text-slate-700' : 'text-slate-500'}
                  `} strokeWidth={2} />
                </div>
                <div className="text-center px-4">
                  <p className="text-lg sm:text-xl font-semibold text-slate-700 mb-1 sm:mb-2">
                    Click or Drag image here
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Supports JPG, PNG, WebP, and GIF formats
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
              <label
                htmlFor="targetSize"
                className="block text-sm font-semibold text-slate-700 mb-3"
              >
                Target Size (KB)
              </label>
              <Input
                id="targetSize"
                type="number"
                value={targetSize}
                onChange={(e) => setTargetSize(e.target.value)}
                className="text-lg h-11 sm:h-12"
                placeholder={defaultTargetSize.toString()}
                min="1"
              />
              <p className="text-xs text-slate-500 mt-2">
                Set your desired file size in kilobytes
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6 sm:space-y-8 relative">
          {/* Loading Overlay */}
          {isCompressing && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 text-center">
                <Loader2 className="h-16 w-16 animate-spin text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Compressing Image
                </h3>
                <p className="text-slate-600 mb-4">
                  Please wait while we optimize your image...
                </p>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-slate-700 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.round(compressionProgress)}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 mt-2 font-semibold">
                  {Math.round(compressionProgress)}%
                </p>
              </div>
            </div>
          )}

          {/* Control Bar - Top */}
          <div className="flex flex-col gap-4 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex-1 max-w-[200px]">
                <label
                  htmlFor="targetSizeActive"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Target Size (KB)
                </label>
                <Input
                  id="targetSizeActive"
                  type="number"
                  value={targetSize}
                  onChange={(e) => setTargetSize(e.target.value)}
                  className="text-lg h-11 sm:h-12"
                  placeholder={defaultTargetSize.toString()}
                  min="1"
                  disabled={isCompressing}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  onClick={handleCompress}
                  disabled={isCompressing}
                  className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-base font-semibold order-1"
                >
                  {isCompressing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    'Compress'
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={isCompressing}
                  className="w-full sm:w-auto h-11 sm:h-12 px-6 order-2"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Image Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Original Image */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">
                Original Image
              </h3>
              <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-3 sm:mb-4 flex items-center justify-center">
                {originalPreview && (
                  <img
                    src={originalPreview}
                    alt="Original"
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-slate-600">
                  <span className="font-semibold">Size:</span> {formatFileSize(originalSize)}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 truncate">
                  <span className="font-semibold">Name:</span> {originalImage.name}
                </p>
              </div>
            </div>

            {/* Compressed Image */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">
                Compressed Image
              </h3>
              <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-3 sm:mb-4 flex items-center justify-center">
                {compressedPreview ? (
                  <img
                    src={compressedPreview}
                    alt="Compressed"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-4 sm:p-6">
                    <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mx-auto mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-slate-500">
                      Click "Compress" to process
                    </p>
                  </div>
                )}
              </div>
              {compressedImage ? (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-slate-600">
                      <span className="font-semibold">Size:</span> {formatFileSize(compressedSize)}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-green-600">
                      Reduced by {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <Button
                    onClick={handleDownload}
                    className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold"
                  >
                    <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Download Result
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="h-[44px]" />
                  <Button
                    onClick={handleCompress}
                    disabled={isCompressing}
                    className="w-full h-10 sm:h-11 text-sm sm:text-base font-semibold"
                  >
                    {isCompressing ? 'Compressing...' : 'Compress now'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
