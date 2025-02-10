import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Fix canvas dependency issues
      canvas: false,
      encoding: false
    };
    return config;
  }
};

export default nextConfig;
