import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.36', '192.168.1.6', '0.0.0.0', '192.168.1.3'],
};

export default nextConfig;
