import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async rewrites() {
    const backend = process.env.BACKEND_URL ?? "http://localhost:5000";
    return [
      {
        source: "/api/orders/:path*",
        destination: `${backend}/api/orders/:path*`,
      },
    ];
  },
};

export default nextConfig;
