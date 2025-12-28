/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow build even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: isProd
      ? [
          // Production: Point to your Railway admin-panel
          {
            protocol: "https",
            hostname: "innovativeintegration-production-0f11.up.railway.app",
            pathname: "/api/uploads/**",
          },
          // Optional: Add your custom domain if you have one
          {
            protocol: "https",
            hostname: "admin.yourdomain.com", // If you have custom domain
            pathname: "/api/uploads/**",
          },
        ]
      : [
          // Development: Point to your local admin-panel
          {
            protocol: "http",
            hostname: "localhost",
            port: "3000", // Default Next.js port
            pathname: "/api/uploads/**",
          },
          // Also allow localhost:3001 if admin-panel runs on different port
          {
            protocol: "http",
            hostname: "localhost",
            port: "3001",
            pathname: "/api/uploads/**",
          },
        ],
  }
};

module.exports = nextConfig;
