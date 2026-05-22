import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

export default nextConfig;
