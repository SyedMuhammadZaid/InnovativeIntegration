import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      {
        source: "/uploads/:path*", // ✅ make it simpler (not /api/uploads)
        destination: "/Portfolio/admin-panel/public/uploads/:path*", // ✅ actual location
      },
    ];
  },

  webpack: (config) => {
    config.resolve.alias["@uploads"] = path.resolve(
      process.cwd(),
      "public/uploads"
    );
    return config;
  },
};

export default nextConfig;
