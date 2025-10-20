import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ✅ Disable lint & type errors during production build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Keep your image rewrite for uploaded files
  async rewrites() {
    return [
      {
        source: "/api/uploads/:path*", // public access path
        destination: "/Portfolio/shared/uploads/:path*", // actual local folder
      },
    ];
  },

  // ✅ Keep alias config (unchanged)
  webpack: (config) => {
    config.resolve.alias["@uploads"] = path.resolve(
      process.cwd(),
      "../shared/uploads"
    );
    return config;
  },
};

export default nextConfig;
