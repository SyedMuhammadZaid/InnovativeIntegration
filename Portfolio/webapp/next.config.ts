/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Railway (production)
      {
        protocol: "https",
        hostname: "admin-panel-production-62fb.up.railway.app",
        pathname: "/api/uploads/**",
      },

      // Local admin panel
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
