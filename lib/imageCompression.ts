import imageCompression from 'browser-image-compression';

export interface CompressionResult {
  blob: Blob;
  compressedSize: number;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export async function compressToTargetSize(
  file: File,
  targetSizeKB: number,
  onProgress?: (progress: number) => void
): Promise<CompressionResult> {
  const targetSizeBytes = targetSizeKB * 1024;
  const originalSize = file.size;

  if (originalSize <= targetSizeBytes) {
    onProgress?.(100);
    return { blob: file, compressedSize: originalSize };
  }

  const sizeRatio = targetSizeBytes / originalSize;
  let startQuality = sizeRatio < 0.1 ? 0.2 : sizeRatio < 0.5 ? 0.5 : 0.8;
  
  let maxWidthOrHeight = 1920; 
  if (targetSizeKB < 50) maxWidthOrHeight = 800;
  else if (targetSizeKB < 100) maxWidthOrHeight = 1200;
  else if (targetSizeKB < 500) maxWidthOrHeight = 1600;

  let options = {
    maxSizeMB: targetSizeKB / 1024,
    maxWidthOrHeight: maxWidthOrHeight,
    useWebWorker: true,
    initialQuality: startQuality,
    alwaysKeepResolution: false,
    fileType: file.type as string,
  };

  let minQ = 0;
  let maxQ = 1;
  let currentBlob = file;
  let iteration = 0;
  const MAX_ITERATIONS = 6; 

  while (iteration < MAX_ITERATIONS) {
    onProgress?.((iteration / MAX_ITERATIONS) * 100); 

    try {
      currentBlob = await imageCompression(file, options);
    } catch (e) {
      console.error("Compression failed", e);
      throw e;
    }

    const currentSize = currentBlob.size;

    if (currentSize <= targetSizeBytes && currentSize > targetSizeBytes * 0.85) {
      break; 
    }

    if (currentSize < targetSizeBytes * 0.85) {
      minQ = options.initialQuality;
      options.initialQuality = (minQ + maxQ) / 2;
    } 
    else {
      maxQ = options.initialQuality;
      options.initialQuality = (minQ + maxQ) / 2;
      if (options.initialQuality < 0.2 && currentSize > targetSizeBytes) {
        options.maxWidthOrHeight = Math.floor(options.maxWidthOrHeight * 0.8);
      }
    }
    iteration++;
  }

  onProgress?.(100);
  return { blob: currentBlob, compressedSize: currentBlob.size };
}