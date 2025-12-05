// lib/compressionSizes.ts

// 单个尺寸的类型
export type PopularSize = {
  value: number;        // 数字，例如 50
  unit: "KB" | "MB";    // 单位
};

// ✅ 全站统一的尺寸列表（只改这里就够了）
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

  // 大图场景
  { value: 1, unit: "MB" },
  { value: 2, unit: "MB" },
  { value: 5, unit: "MB" },
  { value: 10, unit: "MB" },
];

// ✅ 提供给动态路由使用的 KB 尺寸（只包含 KB）
export const SIZES_KB: number[] = POPULAR_SIZES
  .filter((s) => s.unit === "KB")
  .map((s) => s.value);

// ✅ 工具函数：把尺寸拼成 "50KB" / "5MB" 这样的文案
export function formatSizeLabel(size: PopularSize): string {
  return `${size.value}${size.unit}`;
}

// ✅ 工具函数：生成对应的内链 URL
// 规则统一： /compress-to-50kb /compress-to-5mb
export function getSizeHref(size: PopularSize): string {
  const unitLower = size.unit.toLowerCase(); // "kb" / "mb"
  return `/compress-to-${size.value}${unitLower}`;
}
