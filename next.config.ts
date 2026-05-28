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
    "preview-chat-1a822a6b-d8d7-4687-9c73-65ed9a769548.space-z.ai",
    "sdasms.com",
    "www.sdasms.com",
  ],
};

export default nextConfig;
