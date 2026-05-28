import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "space-z.ai",
    "chatglm.site",
    "sdasms.com",
    "www.sdasms.com",
  ],
};

export default nextConfig;
