"use client"

import React, { useState, useCallback, useEffect, memo } from "react"
import imageCompression from "browser-image-compression"

// --- 图标组件 (内联样式防崩坏) ---
const UploadIcon = memo(({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    style={{ width: "24px", height: "24px" }}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m8 17 4-5 4 5" />
  </svg>
))
UploadIcon.displayName = "UploadIcon"

const ImageIcon = memo(({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    style={{ width: "20px", height: "20px" }}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
))
ImageIcon.displayName = "ImageIcon"

const ZapIcon = memo(({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    style={{ width: "16px", height: "16px" }}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
))
ZapIcon.displayName = "ZapIcon"

const TargetIcon = memo(({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    style={{ width: "16px", height: "16px" }}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
))
TargetIcon.displayName = "TargetIcon"

const ShieldIcon = memo(({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    style={{ width: "16px", height: "16px" }}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
))
ShieldIcon.displayName = "ShieldIcon"

const DownloadIcon = memo(({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    style={{ width: "16px", height: "16px" }}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
))
DownloadIcon.displayName = "DownloadIcon"

const XIcon = memo(({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    style={{ width: "16px", height: "16px" }}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
))
XIcon.displayName = "XIcon"

const CheckIcon = memo(({ className = "w-3 h-3" }: { className?: string }) => (
  <svg
    style={{ width: "12px", height: "12px" }}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
))
CheckIcon.displayName = "CheckIcon"

const LoaderIcon = memo(({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    style={{ width: "20px", height: "20px" }}
    className={`${className} animate-spin`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
))
LoaderIcon.displayName = "LoaderIcon"

const AlertIcon = memo(({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    style={{ width: "16px", height: "16px" }}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
))
AlertIcon.displayName = "AlertIcon"

type Status = "idle" | "uploading" | "compressing" | "done" | "error"

interface ImageCompressorProps {
  initialTargetSize?: string
  titleOverride?: string
}

export default function ImageCompressorTool({
  initialTargetSize = "",
  titleOverride,
}: ImageCompressorProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [targetSize, setTargetSize] = useState(initialTargetSize)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [progress, setProgress] = useState(0)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [compressedSize, setCompressedSize] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialTargetSize) setTargetSize(initialTargetSize)
  }, [initialTargetSize])

  useEffect(() => {
    if (status === "done" || compressedBlob) {
      setStatus("idle")
      setCompressedBlob(null)
      setCompressedSize(null)
    }
  }, [targetSize]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      processFile(droppedFile)
    }
  }, [])

  const processFile = useCallback((selectedFile: File) => {
    setStatus("uploading")
    setProgress(0)
    setError(null)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 50)

    const reader = new FileReader()
    reader.onload = (e) => {
      clearInterval(progressInterval)
      setProgress(100)
      setFile(selectedFile)
      setPreview(e.target?.result as string)
      setStatus("idle")
      setCompressedBlob(null)
      setCompressedSize(null)
    }
    reader.onerror = () => {
      setError("Error reading file")
      setStatus("idle")
    }
    reader.readAsDataURL(selectedFile)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setStatus("idle")
    setProgress(0)
    setCompressedBlob(null)
    setCompressedSize(null)
    setError(null)
  }

  // --- 内置压缩逻辑 ---
  const compressImage = async (
    file: File,
    targetKB: number,
    onProgress: (p: number) => void
  ) => {
    const targetSizeBytes = targetKB * 1024

    if (file.size <= targetSizeBytes) {
      onProgress(100)
      return { blob: file, compressedSize: file.size }
    }

    const sizeRatio = targetSizeBytes / file.size
    let startQuality = sizeRatio < 0.1 ? 0.2 : sizeRatio < 0.5 ? 0.5 : 0.8
    let maxWidthOrHeight = 1920
    if (targetKB < 50) maxWidthOrHeight = 800
    else if (targetKB < 100) maxWidthOrHeight = 1200
    else if (targetKB < 500) maxWidthOrHeight = 1600

    const options: any = {
      maxSizeMB: targetKB / 1024,
      maxWidthOrHeight,
      useWebWorker: true,
      initialQuality: startQuality,
      alwaysKeepResolution: false,
      fileType: file.type,
    }

    let minQ = 0
    let maxQ = 1
    let currentBlob: Blob = file
    let iteration = 0

    while (iteration < 6) {
      onProgress((iteration / 6) * 100)
      try {
        currentBlob = await imageCompression(file, options)
      } catch (e) {
        console.error("Compression Library Error:", e)
        throw e
      }

      if (
        currentBlob.size <= targetSizeBytes &&
        currentBlob.size > targetSizeBytes * 0.85
      ) {
        break
      }

      if (currentBlob.size < targetSizeBytes * 0.85) {
        minQ = options.initialQuality
        options.initialQuality = (minQ + maxQ) / 2
      } else {
        maxQ = options.initialQuality
        options.initialQuality = (minQ + maxQ) / 2
        if (options.initialQuality < 0.2 && currentBlob.size > targetSizeBytes) {
          options.maxWidthOrHeight = Math.floor(options.maxWidthOrHeight * 0.8)
        }
      }
      iteration++
    }

    onProgress(100)
    return { blob: currentBlob, compressedSize: currentBlob.size }
  }

  const handleCompress = useCallback(async () => {
    if (!file || !targetSize) return
    const target = parseInt(targetSize)
    if (isNaN(target) || target <= 0) {
      setError("Please enter a valid target size")
      setTimeout(() => setError(null), 5000)
      return
    }
    setStatus("compressing")
    setProgress(0)
    setError(null)

    try {
      const result = await compressImage(file, target, (val) =>
        setProgress(Math.round(val))
      )
      setCompressedBlob(result.blob)
      setCompressedSize(result.compressedSize)
      setStatus("done")
    } catch (error) {
      console.error("Handle Compress Error:", error)
      setError("Failed to compress image. Please try again.")
      setStatus("error")
      setTimeout(() => setError(null), 7000)
    }
  }, [file, targetSize])

  const handleDownload = useCallback(() => {
    if (!compressedBlob || !file) return
    const extension = file.name.match(/\.[^/.]+$/)?.[0] || ".jpg"
    const baseName = file.name.replace(/\.[^/.]+$/, "")
    const suffix = targetSize ? `-${targetSize}kb` : "_compressed"
    const url = URL.createObjectURL(compressedBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${baseName}${suffix}${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [compressedBlob, file, targetSize])

  const quickSizes = [
    { value: 20, label: "20 KB" },
    { value: 50, label: "50 KB" },
    { value: 100, label: "100 KB" },
    { value: 200, label: "200 KB" },
    { value: 300, label: "300 KB" },
    { value: 500, label: "500 KB" },
    { value: 1024, label: "1 MB" },
    { value: 2048, label: "2 MB" },
  ]

  // ✅ 覆盖截图里的所有热门尺寸
  const popularSizeLinks = [
    { label: "5KB", targetKB: 5 },
    { label: "8KB", targetKB: 8 },
    { label: "10KB", targetKB: 10 },
    { label: "15KB", targetKB: 15 },
    { label: "20KB", targetKB: 20 },
    { label: "30KB", targetKB: 30 },
    { label: "40KB", targetKB: 40 },
    { label: "50KB", targetKB: 50 },
    { label: "60KB", targetKB: 60 },
    { label: "70KB", targetKB: 70 },
    { label: "80KB", targetKB: 80 },
    { label: "90KB", targetKB: 90 },
    { label: "100KB", targetKB: 100 },
    { label: "150KB", targetKB: 150 },
    { label: "200KB", targetKB: 200 },
    { label: "250KB", targetKB: 250 },
    { label: "300KB", targetKB: 300 },
    { label: "400KB", targetKB: 400 },
    { label: "500KB", targetKB: 500 },
    { label: "600KB", targetKB: 600 },
    { label: "800KB", targetKB: 800 },
    { label: "900KB", targetKB: 900 },
    // MB 显示为 MB，路由用等价的 KB
    { label: "1MB", targetKB: 1024 },
    { label: "2MB", targetKB: 2048 },
    { label: "5MB", targetKB: 5120 },
    { label: "10MB", targetKB: 10240 },
  ]

  const features = [
    { icon: TargetIcon, title: "Exact Size Control", desc: "Set a precise KB/MB target" },
    { icon: ZapIcon, title: "Lightning Fast", desc: "Compress in just a few seconds" },
    {
      icon: ShieldIcon,
      title: "100% Private",
      desc: "Processing happens in your browser",
    },
    {
      icon: DownloadIcon,
      title: "Instant Download",
      desc: "No signup, no waiting",
    },
  ]

  const canCompress =
    file && targetSize && status !== "compressing" && status !== "uploading"

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <TargetIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900">PixSize</span>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:block">
            Exact Size Image Compression
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium mb-4">
            <ZapIcon className="w-3 h-3" />
            No signup required
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            {titleOverride || "Compress Images to Exact Size (KB or MB)"}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
            Precise image compression powered by PixSize — reduce any image to an exact file size in KB or MB while keeping it clear and usable for passports, forms, job portals and more.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertIcon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Upload Area */}
              <div className="flex-1 lg:flex-[1.2]">
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  className={`relative rounded-xl border-2 border-dashed transition-all duration-150 cursor-pointer overflow-hidden min-h-[220px] sm:min-h-[280px] flex items-center justify-center ${
                    isDragging
                      ? "border-blue-500 bg-blue-50/80"
                      : file
                      ? "border-slate-200 bg-slate-50/50"
                      : "border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 group"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={status === "compressing" || status === "uploading"}
                  />
                  {status === "uploading" && (
                    <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-10">
                      <LoaderIcon className="w-8 h-8 text-blue-500 mb-3" />
                      <p className="text-sm font-medium text-slate-700 mb-2">
                        Processing...
                      </p>
                      <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-150 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {preview ? (
                    <div className="p-4 w-full h-full flex flex-col">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          clearFile()
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors z-10"
                        disabled={status === "compressing"}
                      >
                        <XIcon />
                      </button>
                      <div className="flex-1 flex items-center justify-center p-2">
                        <img
                          src={preview}
                          alt="Preview"
                          className="max-w-full max-h-[160px] sm:max-h-[200px] object-contain rounded-lg shadow-md"
                          loading="eager"
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 mt-2">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <ImageIcon className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">
                            {file?.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-slate-400">
                              {formatFileSize(file?.size || 0)}
                            </span>
                            {status === "done" && compressedSize && (
                              <>
                                <span className="text-slate-300">→</span>
                                <span className="text-green-600 font-medium">
                                  {formatFileSize(compressedSize)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-all duration-150 ${
                          isDragging
                            ? "bg-blue-500 text-white scale-110"
                            : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500"
                        }`}
                      >
                        <UploadIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <p className="font-semibold text-slate-800 mb-1">
                        {isDragging ? "Drop it here!" : "Drop your image here"}
                      </p>
                      <p className="text-sm text-slate-400 mb-2">
                        or click to browse
                      </p>
                      <p className="text-xs text-slate-300">JPG, PNG, WEBP</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Settings Panel */}
              <div className="flex-1 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Target Size
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter size"
                      value={targetSize}
                      onChange={(e) => setTargetSize(e.target.value)}
                      className="w-full h-12 px-4 pr-14 rounded-xl border-2 border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-150"
                      disabled={status === "compressing"}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">
                      KB
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Quick Select
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickSizes.map((size) => {
                      const isSelected = targetSize === String(size.value)
                      return (
                        <button
                          key={size.value}
                          onClick={() => setTargetSize(String(size.value))}
                          disabled={status === "compressing"}
                          className={`relative px-2 py-2 rounded-lg text-sm font-medium transition-all duration-100 ${
                            isSelected
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          } disabled:opacity-50`}
                        >
                          {isSelected && (
                            <span className="absolute top-1 right-1">
                              <CheckIcon className="w-2.5 h-2.5" />
                            </span>
                          )}
                          {size.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <button
                  onClick={status === "done" ? handleDownload : handleCompress}
                  disabled={!canCompress && status !== "done"}
                  className={`mt-auto h-14 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-all duration-150 relative overflow-hidden ${
                    canCompress || status === "done"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {status === "compressing" && (
                    <div
                      className="absolute inset-0 bg-blue-700/30 transition-all duration-100 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  <span className="relative flex items-center gap-2.5">
                    {status === "compressing" ? (
                      <>
                        <LoaderIcon className="w-5 h-5" />
                        <span>Compressing... {progress}%</span>
                      </>
                    ) : status === "done" ? (
                      <>
                        <DownloadIcon className="w-5 h-5" />
                        <span>Download Result</span>
                      </>
                    ) : (
                      <>
                        <ZapIcon className="w-5 h-5" />
                        <span>Compress Now</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 border-t border-slate-100 px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/60"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <feature.icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate">
                      {feature.title}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate hidden sm:block">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Popular Compressions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Popular Sizes (Exact KB / MB)
            </h3>
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5 text-sm">
              {popularSizeLinks.map((item, index, arr) => (
                <span key={item.label} className="inline-flex items-center">
                  <a
                    href={`/compress-to-${item.targetKB}kb`}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {item.label}
                  </a>
                  {index < arr.length - 1 && (
                    <span className="text-slate-300 mx-1.5">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Popular Formats
            </h3>
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5 text-sm">
              {[
                { label: "JPG to 50KB", href: "/jpg-to-50kb" },
                { label: "PNG to 50KB", href: "/png-to-50kb" },
                { label: "Passport Photo Size", href: "/passport-photo-size" },
                { label: "Visa Photo Compressor", href: "/visa-photo-compressor" },
              ].map((item, index, arr) => (
                <span key={item.label} className="inline-flex items-center">
                  <a
                    href={item.href}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {item.label}
                  </a>
                  {index < arr.length - 1 && (
                    <span className="text-slate-300 mx-1.5">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-slate-400">
          © 2025 PixSize — Exact Size Image Compression Tools.
        </div>
      </footer>
    </div>
  )
}
