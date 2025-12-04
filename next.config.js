/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 重新开启静态导出 (这是解决 Netlify 404 的关键)
  output: 'export',
  
  // 2. 关闭 Next.js 自带的图片优化 (静态导出模式下必须关闭，否则报错)
  images: {
    unoptimized: true,
  },

  // 3. 保持之前的宽松检查配置
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;