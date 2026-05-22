import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 腾讯云 EdgeOne Pages 兼容配置
  output: 'standalone',

  // 禁用压缩（EdgeOne CDN 层处理）
  compress: false,

  // 图片优化（EdgeOne 自带图片处理）
  images: {
    unoptimized: true,
  },

  // 严格模式
  reactStrictMode: true,

  // 页面扩展
  pageExtensions: ['ts', 'tsx'],
};

export default nextConfig;
