import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Correct rewrite: map /uploads/* to public/uploads/
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",      // this is the public URL
        destination: "/public/uploads/:path*", // serve directly from admin-panel/public/uploads
      },
    ];
  },

  // ✅ Keep your alias config (unchanged)
  webpack: (config) => {
    config.resolve.alias["@uploads"] = path.resolve(
      process.cwd(),
      "../shared/uploads"
    );
    return config;
  },
};

export default nextConfig;
