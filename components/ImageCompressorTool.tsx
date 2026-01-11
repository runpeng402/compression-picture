"use client"

import React, { useState, useCallback, useEffect, memo, useRef } from "react"
// ✅ 性能优化：使用 lucide-react 图标库，减少 bundle 大小（tree-shaking 支持）
import { 
  Upload as UploadIcon, 
  Image as ImageIcon, 
  Zap as ZapIcon, 
  Target as TargetIcon, 
  Shield as ShieldIcon, 
  Download as DownloadIcon, 
  X as XIcon, 
  Check as CheckIcon, 
  Loader2 as LoaderIcon, 
  AlertCircle as AlertIcon,
  Trash2 as TrashIcon,
  RefreshCw as RefreshIcon,
  Archive as ArchiveIcon
} from "lucide-react"
import JSZip from "jszip"

// ✅ 性能优化：懒加载 browser-image-compression，减少初始 bundle 大小
let imageCompression: any = null
const loadImageCompression = async () => {
  if (!imageCompression) {
    imageCompression = (await import("browser-image-compression")).default
  }
  return imageCompression
}

// 常量定义
const MAX_CONCURRENT = 3 // 并发处理数量
const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
const MAX_FILES = 100 // 最多支持100张图片
const MIN_FILES_BATCH = 2 // 批量模式至少需要2张图片
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

// 处理模式类型
type ProcessingMode = "single" | "batch"

// 文件项状态类型
type FileStatus = "pending" | "processing" | "success" | "error" | "paused"

interface FileItem {
  id: string
  file: File
  preview?: string
  targetSize: number // KB
  status: FileStatus
  progress: number // 0-100
  compressedBlob?: Blob
  compressedSize?: number
  error?: string
  previewUrl?: string // 用于内存管理
}

interface ImageCompressorProps {
  initialTargetSize?: string
  titleOverride?: string
  descriptionOverride?: string
}

export default function ImageCompressorTool({
  initialTargetSize = "",
  titleOverride,
  descriptionOverride,
}: ImageCompressorProps) {
  // 处理模式：默认单张模式
  const [mode, setMode] = useState<ProcessingMode>("single")
  const [files, setFiles] = useState<FileItem[]>([])
  const [targetSize, setTargetSize] = useState(initialTargetSize)
  const [isDragging, setIsDragging] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [isGeneratingZip, setIsGeneratingZip] = useState(false)
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map())
  const processFileItemRef = useRef<((fileItem: FileItem) => Promise<void>) | null>(null)

  // 单张模式的单独状态（用于单张模式的简洁UI）
  const [singleFile, setSingleFile] = useState<FileItem | null>(null)

  useEffect(() => {
    if (initialTargetSize) setTargetSize(initialTargetSize)
  }, [initialTargetSize])

  // 修复：客户端解析 URL 并处理 MB
  useEffect(() => {
    if (initialTargetSize) return
    if (typeof window === "undefined") return
    const path = window.location.pathname
    const match = path.match(/compress-to-([0-9]+)(kb|mb)/i)
    if (match && match[1]) {
      const num = parseInt(match[1])
      const unit = match[2].toLowerCase()
      if (unit === 'mb') {
        setTargetSize((num * 1024).toString())
      } else {
        setTargetSize(match[1])
      }
    }
  }, [initialTargetSize])

  // 模式切换处理
  const handleModeChange = useCallback((newMode: ProcessingMode) => {
    if (newMode === mode) return

    // 切换模式时处理现有文件
    if (newMode === "single") {
      // 切换到单张模式：只保留第一个文件
      if (files.length > 0) {
        const firstFile = files[0]
        setSingleFile(firstFile)
        // 取消所有正在进行的处理
        abortControllersRef.current.forEach(controller => controller.abort())
        abortControllersRef.current.clear()
        setProcessingIds(new Set())
        // 清理其他文件的预览 URL
        files.slice(1).forEach(f => {
          if (f.previewUrl && f.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(f.previewUrl)
          }
        })
        // 确保 files 只包含第一个文件
        setFiles([firstFile])
      } else if (singleFile) {
        // 如果 files 为空但 singleFile 存在，同步到 files
        setFiles([singleFile])
      }
    } else {
      // 切换到批量模式：如果有单张文件但 files 为空，同步到 files
      if (singleFile && files.length === 0) {
        setFiles([singleFile])
      }
      // singleFile 保持，因为 files 已经包含了
    }

    setMode(newMode)
    setGlobalError(null)
  }, [mode, files, singleFile])

  // 跟踪上一次的目标大小，用于检测尺寸是否真的改变了
  const prevTargetSizeRef = useRef<string>(targetSize)
  
  // 当目标大小改变时，更新所有待处理文件的目标大小，如果文件已完成则重置状态
  useEffect(() => {
    // 如果目标大小没有改变，不执行
    if (prevTargetSizeRef.current === targetSize) return
    
    const newTargetSize = targetSize ? parseInt(targetSize) || 0 : 0
    
    if (mode === "batch") {
      setFiles(prev => prev.map(f => {
        // 如果状态是 success，改变尺寸后重置为 pending（清空旧结果）
        if (f.status === "success") {
          return {
            ...f,
            status: "pending" as FileStatus,
            targetSize: newTargetSize,
            compressedBlob: undefined,
            compressedSize: undefined,
            progress: 0,
            error: undefined
          }
        }
        // 如果状态是 pending 或 error，只更新目标大小
        if (f.status === "pending" || f.status === "error") {
          return { ...f, targetSize: newTargetSize }
        }
        // 如果正在处理中，不改变状态
        return f
      }))
    } else if (mode === "single") {
      // 单张模式：使用函数式更新避免依赖 singleFile，同时更新 files
      setFiles(prev => {
        if (prev.length === 0) return prev
        const file = prev[0]
        // 如果状态是 success，改变尺寸后重置为 pending
        if (file.status === "success") {
          const updated = {
            ...file,
            status: "pending" as FileStatus,
            targetSize: newTargetSize,
            compressedBlob: undefined,
            compressedSize: undefined,
            progress: 0,
            error: undefined
          }
          // 同步更新 singleFile
          setSingleFile(updated)
          return [updated]
        }
        // 如果状态是 pending 或 error，只更新目标大小
        if (file.status === "pending" || file.status === "error") {
          const updated = { ...file, targetSize: newTargetSize }
          // 同步更新 singleFile
          setSingleFile(updated)
          return [updated]
        }
        // 如果正在处理中，不改变状态
        return prev
      })
    }
    
    // 更新上一次的目标大小
    prevTargetSizeRef.current = targetSize
  }, [targetSize, mode])

  // 不再自动处理，改为手动点击"Compress Now"触发

  // --- 文案逻辑 ---
  const getIntroText = () => {
    if (descriptionOverride) return descriptionOverride;

    if (targetSize) {
      const sizeNum = parseInt(targetSize);
      const displaySize = sizeNum >= 1000 ? `${sizeNum / 1024}MB` : `${sizeNum}KB`;
      
      if (mode === "single") {
        return `Compress an image to exactly ${displaySize}? PixSize helps you reduce JPG/PNG file sizes for web uploads, exams, and forms while maintaining quality.`;
      } else {
        return `Batch compress images to exactly ${displaySize}? PixSize helps you reduce multiple JPG/PNG files at once (minimum ${MIN_FILES_BATCH} files) for web uploads, exams, and forms while maintaining quality.`;
      }
    }

    if (mode === "single") {
      return "Precise image compression powered by PixSize — reduce any image to an exact file size in KB or MB while keeping it clear and usable.";
    } else {
      return `Batch image compression powered by PixSize — compress multiple images (minimum ${MIN_FILES_BATCH} files) to an exact file size in KB or MB while keeping them clear and usable.`;
    }
  };

  // 文件验证
  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `File "${file.name}" is not a supported image type. Only JPG, PNG, and WEBP are allowed.`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File "${file.name}" is too large. Maximum file size is ${formatFileSize(MAX_FILE_SIZE)}.`
    }
    return null
  }

  // 添加文件到列表（根据模式处理）
  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles)
    
    if (mode === "single") {
      // 单张模式：只处理第一个文件
      if (fileArray.length === 0) return
      
      const file = fileArray[0]
      const error = validateFile(file)
      if (error) {
        setGlobalError(error)
        setTimeout(() => setGlobalError(null), 5000)
        return
      }

      // 如果已经有文件，先清理
      if (singleFile?.previewUrl && singleFile.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(singleFile.previewUrl)
      }
      if (files.length > 0 && files[0].previewUrl && files[0].previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(files[0].previewUrl)
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        
        const newFileItem: FileItem = {
          id,
          file,
          preview: previewUrl,
          previewUrl,
          targetSize: targetSize ? parseInt(targetSize) || 0 : 0,
          status: "pending",
          progress: 0,
        }
        
        setSingleFile(newFileItem)
        setFiles([newFileItem])
        setGlobalError(null)
      }
      reader.onerror = () => {
        setGlobalError(`Failed to read file "${file.name}"`)
        setTimeout(() => setGlobalError(null), 5000)
      }
      reader.readAsDataURL(file)
      return
    }

    // 批量模式：处理多个文件
    // 验证文件数量
    if (files.length + fileArray.length > MAX_FILES) {
      setGlobalError(`Maximum ${MAX_FILES} files allowed. You can add ${MAX_FILES - files.length} more files.`)
      setTimeout(() => setGlobalError(null), 5000)
      return
    }

    // 验证每个文件
    const errors: string[] = []

    fileArray.forEach(file => {
      const error = validateFile(file)
      if (error) {
        errors.push(error)
      } else {
        const reader = new FileReader()
        reader.onload = (e) => {
          const previewUrl = e.target?.result as string
          const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          
          setFiles(prev => [...prev, {
            id,
            file,
            preview: previewUrl,
            previewUrl,
            targetSize: targetSize ? parseInt(targetSize) || 0 : 0,
            status: "pending",
            progress: 0,
          }])
        }
        reader.onerror = () => {
          errors.push(`Failed to read file "${file.name}"`)
        }
        reader.readAsDataURL(file)
      }
    })

    if (errors.length > 0) {
      setGlobalError(errors.join("\n"))
      setTimeout(() => setGlobalError(null), 7000)
    }
  }, [files.length, targetSize, mode])

  // 处理拖拽
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles)
    }
  }, [addFiles])

  // 处理文件选择
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      addFiles(selectedFiles)
    }
    // 重置 input，允许选择相同文件
    e.target.value = ""
  }, [addFiles])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  // 移除文件（清理资源）
  const removeFile = useCallback((id: string) => {
    // 取消正在进行的处理
    const controller = abortControllersRef.current.get(id)
    if (controller) {
      controller.abort()
      abortControllersRef.current.delete(id)
    }

    setFiles(prev => {
      const file = prev.find(f => f.id === id)
      const newFiles = prev.filter(f => f.id !== id)
      
      // 清理预览 URL
      if (file?.previewUrl && file.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(file.previewUrl)
      }
      if (file?.compressedBlob) {
        // Blob 会在移除时自动清理
      }
      
      // 如果移除后文件数量少于批量模式最小值，取消所有正在进行的处理
      if (mode === "batch" && newFiles.length < MIN_FILES_BATCH) {
        abortControllersRef.current.forEach(controller => controller.abort())
        abortControllersRef.current.clear()
        // 将所有处理中的文件重置为待处理状态
        return newFiles.map(f => 
          f.status === "processing" ? { ...f, status: "pending" as FileStatus, progress: 0 } : f
        )
      }
      
      return newFiles
    })

    // 如果是单张模式，清空单张文件
    if (mode === "single" && singleFile?.id === id) {
      if (singleFile.previewUrl && singleFile.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(singleFile.previewUrl)
      }
      setSingleFile(null)
    }

    setProcessingIds(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [mode, singleFile])

  // 清空所有文件
  const clearAllFiles = useCallback(() => {
    // 取消所有正在进行的处理
    abortControllersRef.current.forEach(controller => controller.abort())
    abortControllersRef.current.clear()

    // 清理所有预览 URL
    files.forEach(file => {
      if (file.previewUrl && file.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(file.previewUrl)
      }
    })

    if (singleFile?.previewUrl && singleFile.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(singleFile.previewUrl)
    }

    setFiles([])
    setSingleFile(null)
    setProcessingIds(new Set())
    setGlobalError(null)
  }, [files, singleFile])

  // 单张模式下载
  const handleSingleDownload = useCallback(() => {
    if (!singleFile?.compressedBlob || !singleFile?.file) return
    
    const extension = singleFile.file.name.match(/\.[^/.]+$/)?.[0] || ".jpg"
    const baseName = singleFile.file.name.replace(/\.[^/.]+$/, "")
    const suffix = targetSize ? `-${targetSize}kb` : "_compressed"
    const url = URL.createObjectURL(singleFile.compressedBlob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${baseName}${suffix}${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [singleFile, targetSize])

  // 压缩单个图片（复用原有逻辑）
  const compressImage = async (
    file: File, 
    targetKB: number, 
    onProgress: (p: number) => void,
    signal?: AbortSignal
  ) => {
    const targetSizeBytes = targetKB * 1024
    if (file.size <= targetSizeBytes) { 
      onProgress(100); 
      return { blob: file, compressedSize: file.size } 
    }
    
    // ✅ 性能优化：懒加载 browser-image-compression，只在需要时加载
    const compression = await loadImageCompression()
    
    if (signal?.aborted) throw new Error("Aborted")
    
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
      fileType: file.type 
    }
    
    let minQ = 0
    let maxQ = 1
    let currentBlob: Blob = file
    let iteration = 0
    
    while (iteration < 6) {
      if (signal?.aborted) throw new Error("Aborted")
      
      onProgress((iteration / 6) * 100)
      try { 
        currentBlob = await compression(file, options) 
      } catch (e) { 
        if (signal?.aborted) throw new Error("Aborted")
        console.error(e); 
        throw e 
      }
      
      if (currentBlob.size <= targetSizeBytes && currentBlob.size > targetSizeBytes * 0.85) break
      
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
    
    if (signal?.aborted) throw new Error("Aborted")
    
    onProgress(100)
    return { blob: currentBlob, compressedSize: currentBlob.size }
  }

  // 处理单个文件
  const processFileItem = useCallback(async (fileItem: FileItem) => {
    if (fileItem.status !== "pending" || !fileItem.targetSize || fileItem.targetSize <= 0) {
      return
    }

    // 创建 AbortController
    const controller = new AbortController()
    abortControllersRef.current.set(fileItem.id, controller)

    // 更新状态为处理中
    setFiles(prev => prev.map(f => 
      f.id === fileItem.id 
        ? { ...f, status: "processing" as FileStatus, progress: 0, error: undefined }
        : f
    ))
    setProcessingIds(prev => new Set(prev).add(fileItem.id))

    try {
      const result = await compressImage(
        fileItem.file,
        fileItem.targetSize,
        (progress) => {
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id ? { ...f, progress } : f
          ))
        },
        controller.signal
      )

      // 成功
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id 
          ? { 
              ...f, 
              status: "success" as FileStatus, 
              progress: 100, 
              compressedBlob: result.blob,
              compressedSize: result.compressedSize 
            }
          : f
      ))
    } catch (error: any) {
      // 如果是取消操作，不显示错误
      if (error?.message === "Aborted") {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: "pending" as FileStatus, progress: 0 }
            : f
        ))
        return
      }

      // 错误处理
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id 
          ? { 
              ...f, 
              status: "error" as FileStatus, 
              error: error?.message || "Failed to compress image. Please try again.",
              progress: 0
            }
          : f
      ))
    } finally {
      // 清理 AbortController
      abortControllersRef.current.delete(fileItem.id)
      setProcessingIds(prev => {
        const next = new Set(prev)
        next.delete(fileItem.id)
        
        // 处理完成后，继续处理队列（批量模式）- 使用 ref 避免依赖循环
        if (mode === "batch") {
          setTimeout(() => {
            // 检查是否还有待处理的文件
            setFiles(currentFiles => {
              const pendingFiles = currentFiles.filter(f => f.status === "pending" && f.targetSize > 0)
              if (pendingFiles.length > 0) {
                // 检查当前并发数量
                const currentProcessingCount = abortControllersRef.current.size
                if (currentProcessingCount < MAX_CONCURRENT && processFileItemRef.current) {
                  // 继续处理下一个批次
                  const needToProcess = Math.min(MAX_CONCURRENT - currentProcessingCount, pendingFiles.length)
                  for (let i = 0; i < needToProcess; i++) {
                    processFileItemRef.current(pendingFiles[i])
                  }
                }
              }
              return currentFiles
            })
          }, 50)
        }
        
        return next
      })
    }
  }, [mode])

  // 更新 ref，使 processFileItem 可以通过 ref 调用自己（避免依赖循环）
  useEffect(() => {
    processFileItemRef.current = processFileItem
  }, [processFileItem])


  // 手动触发批量处理（点击"Compress Now"按钮）
  const handleBatchCompress = useCallback(async () => {
    if (mode !== "batch") return
    if (!targetSize || parseInt(targetSize) <= 0) {
      setGlobalError("Please enter a valid target size")
      setTimeout(() => setGlobalError(null), 5000)
      return
    }

    // 验证最小文件数量
    const totalFiles = files.length
    if (totalFiles < MIN_FILES_BATCH) {
      setGlobalError(`Please add at least ${MIN_FILES_BATCH} files to start batch processing. Currently you have ${totalFiles} file(s).`)
      setTimeout(() => setGlobalError(null), 5000)
      return
    }

    // 重置所有错误状态的文件为待处理状态，并更新目标大小
    setFiles(prev => prev.map(f => {
      if (f.status === "error") {
        return { ...f, status: "pending" as FileStatus, error: undefined, progress: 0, targetSize: parseInt(targetSize) || 0 }
      }
      if (f.status === "pending") {
        return { ...f, targetSize: parseInt(targetSize) || 0 }
      }
      return f
    }))

    // 延迟一小段时间确保状态更新完成，然后开始处理第一批文件
    setTimeout(() => {
      setFiles(currentFiles => {
        const pendingFiles = currentFiles.filter(f => f.status === "pending" && f.targetSize > 0)
        if (pendingFiles.length > 0 && processFileItemRef.current) {
          const processingCount = abortControllersRef.current.size
          const needToProcess = Math.min(MAX_CONCURRENT - processingCount, pendingFiles.length)
          for (let i = 0; i < needToProcess; i++) {
            processFileItemRef.current(pendingFiles[i])
          }
        }
        return currentFiles
      })
    }, 100)
  }, [mode, targetSize, files])

  // 单张模式处理
  const handleSingleCompress = useCallback(async () => {
    if (!singleFile || !targetSize) return
    const target = parseInt(targetSize)
    if (isNaN(target) || target <= 0) {
      setGlobalError("Please enter a valid target size")
      setTimeout(() => setGlobalError(null), 5000)
      return
    }

    if (singleFile.status === "processing") return // 正在处理中

    // 更新状态
    setSingleFile(prev => prev ? { ...prev, status: "processing" as FileStatus, progress: 0, error: undefined } : null)
    setFiles(prev => prev.map(f => 
      f.id === singleFile.id 
        ? { ...f, status: "processing" as FileStatus, progress: 0, error: undefined }
        : f
    ))

    try {
      const result = await compressImage(
        singleFile.file,
        target,
        (progress) => {
          setSingleFile(prev => prev ? { ...prev, progress } : null)
          setFiles(prev => prev.map(f => 
            f.id === singleFile.id ? { ...f, progress } : f
          ))
        }
      )

      // 成功
      setSingleFile(prev => prev ? {
        ...prev,
        status: "success" as FileStatus,
        progress: 100,
        compressedBlob: result.blob,
        compressedSize: result.compressedSize
      } : null)
      setFiles(prev => prev.map(f => 
        f.id === singleFile.id 
          ? { 
              ...f, 
              status: "success" as FileStatus, 
              progress: 100, 
              compressedBlob: result.blob,
              compressedSize: result.compressedSize 
            }
          : f
      ))
    } catch (error: any) {
      setSingleFile(prev => prev ? {
        ...prev,
        status: "error" as FileStatus,
        error: error?.message || "Failed to compress image. Please try again.",
        progress: 0
      } : null)
      setFiles(prev => prev.map(f => 
        f.id === singleFile.id 
          ? { 
              ...f, 
              status: "error" as FileStatus, 
              error: error?.message || "Failed to compress image. Please try again.",
              progress: 0
            }
          : f
      ))
    }
  }, [singleFile, targetSize])

  // 重试单个文件
  const retryFile = useCallback((id: string) => {
    setFiles(prev => prev.map(f => 
      f.id === id 
        ? { ...f, status: "pending" as FileStatus, error: undefined, progress: 0 }
        : f
    ))
  }, [])

  // 批量下载 ZIP
  const handleBatchDownload = useCallback(async () => {
    const successFiles = files.filter(f => f.status === "success" && f.compressedBlob)
    
    if (successFiles.length === 0) {
      setGlobalError("No compressed files available for download.")
      setTimeout(() => setGlobalError(null), 3000)
      return
    }

    setIsGeneratingZip(true)
    setGlobalError(null)

    try {
      const zip = new JSZip()
      const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '')

      // 添加文件到 ZIP
      for (const fileItem of successFiles) {
        if (!fileItem.compressedBlob) continue
        
        const extension = fileItem.file.name.match(/\.[^/.]+$/)?.[0] || ".jpg"
        const baseName = fileItem.file.name.replace(/\.[^/.]+$/, "")
        const suffix = targetSize ? `-${targetSize}kb` : "_compressed"
        const fileName = `${baseName}${suffix}${extension}`
        
        zip.file(fileName, fileItem.compressedBlob)
      }

      // 生成 ZIP blob
      const zipBlob = await zip.generateAsync({ type: "blob" })
      
      // 下载
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `compressed-images-${dateStr}.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error: any) {
      console.error("Batch download error:", error)
      setGlobalError("Failed to generate ZIP file. Please try again.")
      setTimeout(() => setGlobalError(null), 5000)
    } finally {
      setIsGeneratingZip(false)
    }
  }, [files, targetSize])

  // 计算统计信息
  const stats = {
    total: files.length,
    success: files.filter(f => f.status === "success").length,
    failed: files.filter(f => f.status === "error").length,
    processing: files.filter(f => f.status === "processing").length,
    pending: files.filter(f => f.status === "pending").length,
    totalSaved: files
      .filter(f => f.status === "success" && f.compressedSize && f.file.size)
      .reduce((sum, f) => sum + (f.file.size - (f.compressedSize || 0)), 0),
  }

  const quickSizes = [
    { value: 20, label: "20 KB" }, 
    { value: 50, label: "50 KB" }, 
    { value: 100, label: "100 KB" }, 
    { value: 200, label: "200 KB" }, 
    { value: 300, label: "300 KB" }, 
    { value: 500, label: "500 KB" }, 
    { value: 1024, label: "1 MB" }, 
    { value: 2048, label: "2 MB" }
  ]

  const features = mode === "single" ? [
    { icon: TargetIcon, title: "Exact Size Control", desc: "Set a precise KB/MB target" },
    { icon: ZapIcon, title: "Lightning Fast", desc: "Compress in just a few seconds" },
    { icon: ShieldIcon, title: "100% Private", desc: "Processing happens in your browser" },
    { icon: DownloadIcon, title: "Instant Download", desc: "No signup, no waiting" }
  ] : [
    { icon: TargetIcon, title: "Batch Processing", desc: "Process multiple images at once" },
    { icon: ZapIcon, title: "Lightning Fast", desc: "Concurrent processing (3 files)" },
    { icon: ShieldIcon, title: "100% Private", desc: "Processing happens in your browser" },
    { icon: ArchiveIcon, title: "Batch Download", desc: "Download all as ZIP" }
  ]

  const canStartProcessing = mode === "single" 
    ? (singleFile && targetSize && parseInt(targetSize) > 0 && singleFile.status !== "processing")
    : (files.length >= MIN_FILES_BATCH && targetSize && parseInt(targetSize) > 0)
  const hasSuccessFiles = mode === "single"
    ? (singleFile?.status === "success")
    : (stats.success > 0)
  
  // 批量模式：是否有待处理的文件（包括错误状态的文件）
  const hasPendingOrErrorFiles = mode === "batch" && files.length > 0 && files.some(f => f.status === "pending" || f.status === "error")
  
  // 批量模式：是否可以开始处理（有文件、有目标大小、不在处理中）
  const canStartBatchProcessing = mode === "batch" && 
    files.length >= MIN_FILES_BATCH && 
    hasPendingOrErrorFiles && 
    targetSize && 
    parseInt(targetSize) > 0 && 
    processingIds.size === 0

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
            {mode === "single" ? "Image Compression" : "Batch Image Compression"}
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
            {titleOverride || (mode === "single" ? "Compress Images to Exact Size (KB or MB)" : "Batch Compress Images to Exact Size (KB or MB)")}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto mb-6">
            {getIntroText()}
          </p>

          {/* 模式切换器 */}
          <div className="inline-flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => handleModeChange("single")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "single"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              aria-label="Switch to single image mode"
              aria-pressed={mode === "single"}
            >
              Single Image
            </button>
            <button
              onClick={() => handleModeChange("batch")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "batch"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              aria-label="Switch to batch processing mode"
              aria-pressed={mode === "batch"}
            >
              Batch Processing
            </button>
          </div>
        </div>

        {globalError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3" role="alert" aria-live="assertive">
            <AlertIcon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-red-800 whitespace-pre-line">{globalError}</p>
          </div>
        )}

        {mode === "batch" && files.length > 0 && files.length < MIN_FILES_BATCH && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3" role="alert">
            <AlertIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-amber-800">
              Please add at least {MIN_FILES_BATCH} files to start batch processing. Currently you have {files.length} file(s).
            </p>
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
                  data-upload-area
                  className={`relative rounded-xl border-2 border-dashed transition-all duration-150 cursor-pointer overflow-hidden ${
                    mode === "single" ? "h-[280px] sm:h-[320px]" : "h-[200px] sm:h-[240px]"
                  } flex items-center justify-center ${
                    isDragging
                      ? "border-blue-500 bg-blue-50/80"
                      : (mode === "single" ? singleFile : files.length > 0)
                      ? "border-slate-200 bg-slate-50/50"
                      : "border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 group"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    multiple={mode === "batch"}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isGeneratingZip || (mode === "single" && singleFile?.status === "processing")}
                    aria-label={mode === "single" ? "Upload image file" : "Upload image files"}
                    aria-describedby="upload-description"
                  />
                  <span id="upload-description" className="sr-only">
                    {mode === "single" 
                      ? `Upload JPG, PNG, or WEBP image file (max ${formatFileSize(MAX_FILE_SIZE)})`
                      : `Upload multiple JPG, PNG, or WEBP image files (minimum ${MIN_FILES_BATCH} files, up to ${MAX_FILES} files, ${formatFileSize(MAX_FILE_SIZE)} each)`
                    }
                  </span>
                  
                  {mode === "single" && singleFile ? (
                    <div className="p-4 w-full h-full flex flex-col">
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(singleFile.id) }} 
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors z-10" 
                        disabled={singleFile.status === "processing"}
                        aria-label="Remove uploaded image"
                      >
                        <XIcon className="w-5 h-5" />
                      </button>
                      <div className="flex-1 flex items-center justify-center p-2">
                        <img 
                          src={singleFile.preview} 
                          alt={`Preview of ${singleFile.file.name}`} 
                          className="max-w-full max-h-[160px] sm:max-h-[200px] object-contain rounded-lg shadow-md" 
                          loading="eager"
                          decoding="async"
                          width="400"
                          height="300"
                          style={{ aspectRatio: '4/3' }}
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 mt-2">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <ImageIcon className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">{singleFile.file.name}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-slate-400">{formatFileSize(singleFile.file.size)}</span>
                            {singleFile.status === "success" && singleFile.compressedSize && (
                              <>
                                <span className="text-slate-300">→</span>
                                <span className="text-green-600 font-medium">{formatFileSize(singleFile.compressedSize)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {singleFile.status === "processing" && (
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-3">
                          <div
                            className="h-full bg-blue-500 transition-all duration-150 ease-out"
                            style={{ width: `${singleFile.progress}%` }}
                          />
                        </div>
                      )}
                      {singleFile.error && (
                        <p className="text-xs text-red-600 mt-2">{singleFile.error}</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-all duration-150 ${
                        isDragging ? "bg-blue-500 text-white scale-110" : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500"
                      }`}>
                        <UploadIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <p className="font-semibold text-slate-800 mb-1">
                        {isDragging
                          ? "Drop it here!"
                          : mode === "single"
                            ? "Drop your image here"
                            : files.length > 0
                              ? `${files.length} file(s) selected`
                              : "Drop your images here"
                        }
                      </p>
                      <p className="text-sm text-slate-400 mb-2">or click to browse</p>
                      <p className="text-xs text-slate-300">
                        {mode === "single"
                          ? `JPG, PNG, WEBP (Max ${formatFileSize(MAX_FILE_SIZE)})`
                          : `JPG, PNG, WEBP (Min ${MIN_FILES_BATCH} files, Max ${formatFileSize(MAX_FILE_SIZE)} each, up to ${MAX_FILES} files)`
                        }
                      </p>

                      {/* 灰色占位提示框 */}
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-slate-300" />
                          <p className="text-xs text-slate-400">example-image.jpg</p>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 ml-6">KB → KB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Settings Panel */}
              <div className="flex-1 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-3">
                    Target Size{mode === "batch" ? " (applied to all files)" : ""}
                  </label>
                  <div className="relative mb-3">
                    <input
                      type="number"
                      placeholder="Enter size"
                      value={targetSize}
                      onChange={(e) => setTargetSize(e.target.value)}
                      className="w-full h-12 px-4 pr-14 rounded-xl border-2 border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-150"
                      disabled={isGeneratingZip || (mode === "single" && singleFile?.status === "processing")}
                      aria-label="Target file size in KB"
                      aria-describedby="target-size-description"
                      min="1"
                      step="1"
                    />
                    <span id="target-size-description" className="sr-only">
                      {mode === "single" ? "Enter the target file size in kilobytes (KB)" : "Enter the target file size in kilobytes (KB) for all files"}
                    </span>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">
                      KB
                    </span>
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
                            disabled={isGeneratingZip || (mode === "single" && singleFile?.status === "processing")} 
                            className={`relative px-2 py-2 rounded-lg text-sm font-medium transition-all duration-100 ${
                              isSelected ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            } disabled:opacity-50`}
                            aria-label={`Set target size to ${size.label}`}
                            aria-pressed={isSelected}
                          >
                            {isSelected && (
                              <span className="absolute top-1 right-1" aria-hidden="true">
                                <CheckIcon className="w-2.5 h-2.5" />
                              </span>
                            )}
                            {size.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* 单张模式操作按钮 */}
                {mode === "single" && singleFile && (
                  <button
                    onClick={singleFile.status === "success" ? handleSingleDownload : handleSingleCompress}
                    disabled={!canStartProcessing && singleFile.status !== "success"}
                    className={`mt-auto h-14 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-all duration-150 relative overflow-hidden ${
                      canStartProcessing || singleFile.status === "success"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                    aria-label={singleFile.status === "success" ? "Download compressed image" : singleFile.status === "processing" ? `Compressing image, ${singleFile.progress}% complete` : "Compress image to target size"}
                    aria-busy={singleFile.status === "processing"}
                  >
                    {singleFile.status === "processing" && (
                      <div
                        className="absolute inset-0 bg-blue-700/30 transition-all duration-100 ease-out"
                        style={{ width: `${singleFile.progress}%` }}
                      />
                    )}
                    <span className="relative flex items-center gap-2.5">
                      {singleFile.status === "processing" ? (
                        <>
                          <LoaderIcon className="w-5 h-5 animate-spin" />
                          <span>Compressing... {singleFile.progress}%</span>
                        </>
                      ) : singleFile.status === "success" ? (
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
                )}

                {/* 批量模式操作按钮 */}
                {mode === "batch" && files.length > 0 && (
                  <>
                    {/* 批量模式的主按钮：Compress Now 或 Download All */}
                    {/* 如果所有文件都处理完成，显示 Download 按钮；否则显示 Compress Now 按钮 */}
                    {hasPendingOrErrorFiles ? (
                      // 有待处理的文件：显示 Compress Now 按钮
                      <button
                        onClick={handleBatchCompress}
                        disabled={!canStartBatchProcessing}
                        className={`mt-auto h-14 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-all duration-150 relative overflow-hidden ${
                          canStartBatchProcessing
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                        aria-label={processingIds.size > 0 ? `Processing ${processingIds.size} files...` : canStartBatchProcessing ? "Start batch compression" : "Cannot start batch compression"}
                        aria-busy={processingIds.size > 0}
                      >
                        {processingIds.size > 0 && files.length > 0 && (
                          <div
                            className="absolute inset-0 bg-blue-700/30 transition-all duration-100 ease-out"
                            style={{ width: `${files.length > 0 ? (stats.processing / files.length) * 100 : 0}%` }}
                          />
                        )}
                        <span className="relative flex items-center gap-2.5">
                          {processingIds.size > 0 ? (
                            <>
                              <LoaderIcon className="w-5 h-5 animate-spin" />
                              <span>Processing... ({stats.processing}/{files.length})</span>
                            </>
                          ) : (
                            <>
                              <ZapIcon className="w-5 h-5" />
                              <span>Compress Now</span>
                            </>
                          )}
                        </span>
                      </button>
                    ) : hasSuccessFiles ? (
                      // 所有文件都处理完成：显示 Download All 按钮
                      <button
                        onClick={handleBatchDownload}
                        disabled={isGeneratingZip || processingIds.size > 0}
                        className={`mt-auto h-14 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-all duration-150 relative overflow-hidden ${
                          !isGeneratingZip && processingIds.size === 0
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 active:scale-[0.98]"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                        aria-label="Download all compressed images as ZIP"
                        aria-busy={isGeneratingZip}
                      >
                        <span className="relative flex items-center gap-2.5">
                          {isGeneratingZip ? (
                            <>
                              <LoaderIcon className="w-5 h-5 animate-spin" />
                              <span>Generating ZIP...</span>
                            </>
                          ) : (
                            <>
                              <DownloadIcon className="w-5 h-5" />
                              <span>Download All ({stats.success} files)</span>
                            </>
                          )}
                        </span>
                      </button>
                    ) : null}

                    {/* 批量模式的辅助按钮：清空所有 */}
                    {files.length > 0 && (
                      <button
                        onClick={clearAllFiles}
                        disabled={isGeneratingZip || processingIds.size > 0}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span>Clear All</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 批量模式：统计信息 */}
            {mode === "batch" && files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl my-6">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Total</p>
                  <p className="text-lg font-semibold text-slate-900">{stats.total}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Success</p>
                  <p className="text-lg font-semibold text-green-600">{stats.success}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Processing</p>
                  <p className="text-lg font-semibold text-blue-600">{stats.processing}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Saved</p>
                  <p className="text-lg font-semibold text-slate-900">{formatFileSize(stats.totalSaved)}</p>
                </div>
              </div>
            )}

            {/* 批量模式：文件列表 */}
            {mode === "batch" && files.length > 0 && (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {files.map((fileItem) => (
                  <FileItemCard
                    key={fileItem.id}
                    fileItem={fileItem}
                    onRemove={() => removeFile(fileItem.id)}
                    onRetry={() => retryFile(fileItem.id)}
                    formatFileSize={formatFileSize}
                    targetSize={targetSize}
                  />
                ))}
              </div>
            )}


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

      {/* ✅ 性能优化：延迟加载 Popular Compressions 部分，减少初始 CLS */}
      <LazyPopularCompressions />

      <footer className="border-t border-slate-100 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-slate-400">
          © 2025 PixSize — Exact Size Image Compression Tools.
        </div>
      </footer>
    </div>
  )
}

// 文件项卡片组件
const FileItemCard = memo(({ 
  fileItem, 
  onRemove, 
  onRetry, 
  formatFileSize,
  targetSize 
}: {
  fileItem: FileItem
  onRemove: () => void
  onRetry: () => void
  formatFileSize: (bytes: number) => string
  targetSize: string
}) => {
  const getStatusIcon = () => {
    switch (fileItem.status) {
      case "success":
        return <CheckIcon className="w-4 h-4 text-green-600" />
      case "processing":
        return <LoaderIcon className="w-4 h-4 text-blue-600 animate-spin" />
      case "error":
        return <AlertIcon className="w-4 h-4 text-red-600" />
      default:
        return <ImageIcon className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusText = () => {
    switch (fileItem.status) {
      case "success":
        return "Completed"
      case "processing":
        return `Processing... ${fileItem.progress}%`
      case "error":
        return "Failed"
      case "paused":
        return "Paused"
      default:
        return "Pending"
    }
  }

  return (
    <div className={`p-4 rounded-xl border-2 transition-all duration-150 ${
      fileItem.status === "success" 
        ? "border-green-200 bg-green-50/50" 
        : fileItem.status === "error"
        ? "border-red-200 bg-red-50/50"
        : fileItem.status === "processing"
        ? "border-blue-200 bg-blue-50/50"
        : "border-slate-200 bg-slate-50/50"
    }`}>
      <div className="flex items-start gap-4">
        {/* 预览图 */}
        <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
          {fileItem.preview ? (
            <img
              src={fileItem.preview}
              alt={fileItem.file.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-400" />
          )}
        </div>

        {/* 文件信息 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {getStatusIcon()}
            <p className="text-sm font-medium text-slate-800 truncate">{fileItem.file.name}</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
            <span>{formatFileSize(fileItem.file.size)}</span>
            {fileItem.status === "success" && fileItem.compressedSize && (
              <>
                <span className="text-slate-300">→</span>
                <span className="text-green-600 font-medium">{formatFileSize(fileItem.compressedSize)}</span>
              </>
            )}
          </div>

          {fileItem.status === "processing" && (
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-blue-500 transition-all duration-150 ease-out"
                style={{ width: `${fileItem.progress}%` }}
              />
            </div>
          )}

          {fileItem.error && (
            <p className="text-xs text-red-600 mb-2">{fileItem.error}</p>
          )}

          <p className="text-xs text-slate-400">{getStatusText()}</p>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center gap-2 shrink-0">
          {fileItem.status === "error" && (
            <button
              onClick={onRetry}
              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              aria-label="Retry compression"
            >
              <RefreshIcon className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onRemove}
            disabled={fileItem.status === "processing"}
            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Remove file"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
})

FileItemCard.displayName = "FileItemCard"

// ✅ 性能优化：延迟加载 Popular Compressions 部分，减少初始 CLS
function LazyPopularCompressions() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' } // 提前 100px 开始加载
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : '200px' }}>
      {isVisible ? (
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
                {[
                  "5KB", "8KB", "10KB", "15KB", "20KB", "30KB", "40KB", "50KB",
                  "60KB", "70KB", "80KB", "90KB", "100KB", "150KB", "200KB", "250KB",
                  "300KB", "400KB", "500KB", "600KB", "800KB", "900KB", "1MB", "2MB",
                  "5MB", "10MB",
                ].map((size, index, arr) => {
                  const numericPart = parseInt(size)
                  const unit = size.toLowerCase().includes("mb") ? "mb" : "kb"
                  const href = `/compress-to-${numericPart}${unit}`

                  return (
                    <span key={size} className="inline-flex items-center">
                      <a
                        href={href}
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {size}
                      </a>
                      {index < arr.length - 1 && (
                        <span className="text-slate-300 mx-1.5">|</span>
                      )}
                    </span>
                  )
                })}
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
      ) : null}
    </div>
  )
}