import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Allow serving uploaded images from shared/uploads
  async rewrites() {
    return [
      {
        source: "/api/uploads/:path*", // public access path
        destination:
          "/Portfolio/shared/uploads/:path*", // actual local folder
      },
    ];
  },

  webpack: (config) => {
    // Optional alias to reference uploads folder if needed
    config.resolve.alias["@uploads"] = path.resolve(
      process.cwd(),
      "../shared/uploads"
    );
    return config;
  },
};

export default nextConfig;
