// lib/compressionSizes.ts

// 单个尺寸的类型
export type PopularSize = {
  value: number;        // 数字，例如 50
  unit: "KB" | "MB";    // 单位
};

// ✅ 全站统一的尺寸列表（首页 / 工具底部展示用）
export const POPULAR_SIZES: PopularSize[] = [
  // 超小体积 & 表单上传常用
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

  // 大图场景（展示为 MB）
  { value: 1, unit: "MB" },
  { value: 2, unit: "MB" },
  { value: 5, unit: "MB" },
  { value: 10, unit: "MB" },
];

// ✅ 提供给动态路由使用的“精确 KB 尺寸列表”
// 注意：这里要和 app/sitemap.ts 里的 SIZES_KB 保持完全一致
// MB 需要换算成 KB：1MB=1024KB, 2MB=2048KB, 5MB=5120KB, 10MB=10240KB
export const SIZES_KB: number[] = [
  5,
  8,
  10,
  15,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  150,
  200,
  250,
  300,
  400,
  500,
  600,
  800,
  900,
  1024,   // 1MB
  2048,   // 2MB
  5120,   // 5MB
  10240,  // 10MB
];

// ✅ 工具函数：把尺寸拼成 "50KB" / "5MB" 这样的文案
export function formatSizeLabel(size: PopularSize): string {
  return `${size.value}${size.unit}`;
}

// ✅ 工具函数：生成对应的内链 URL
// 规则统一： /compress-to-50kb /compress-to-5mb
// （注意：目前 KB 路由是 /compress-to-XXkb，MB 如果未来要做专门路由，可以复用这个）
export function getSizeHref(size: PopularSize): string {
  const unitLower = size.unit.toLowerCase(); // "kb" / "mb"
  return `/compress-to-${size.value}${unitLower}`;
}
