import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gonououqbpngivcrhtij.supabase.co", // User's supabase domain
      }
    ]
  }
};

export default nextConfig;
