import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
};

module.exports = {
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
