import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress-1591595-6226930.cloudwaysapps.com',
        pathname: '/**',
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;
