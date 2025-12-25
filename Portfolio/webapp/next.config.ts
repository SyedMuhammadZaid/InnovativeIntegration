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
        {
          protocol: "https",
          hostname: "api.myapp.com", // 🌐 your production API domain
          pathname: "/api/uploads/**",
        },
      ]
      : [
        {
          protocol: "http",
          hostname: "localhost",
          port: "3000",
          pathname: "/api/uploads/**",
        },
      ],
  },
};

module.exports = nextConfig;
