// 引入 Next.js 的动态加载功能
import dynamic from 'next/dynamic';

// 关键操作：使用 dynamic 引入组件，并强制关闭 SSR (ssr: false)
// 这告诉服务器："你别碰这个组件，留给浏览器去加载"
const ImageCompressorTool = dynamic(
  () => import('@/components/ImageCompressorTool'),
  { ssr: false }
);

export default function HomePage() {
  return <ImageCompressorTool />;
}
