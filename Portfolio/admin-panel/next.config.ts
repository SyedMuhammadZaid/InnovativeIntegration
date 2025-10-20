import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  webpack: (config) => {
    config.resolve.alias["@uploads"] = path.resolve(
      process.cwd(),
      "../shared/uploads"
    );
    return config;
  },
};

export default nextConfig;
