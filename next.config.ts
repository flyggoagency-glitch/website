import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.1.36', '192.168.1.6', '0.0.0.0', '192.168.1.3'],
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
