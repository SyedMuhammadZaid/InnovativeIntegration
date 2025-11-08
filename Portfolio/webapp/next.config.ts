/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
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
