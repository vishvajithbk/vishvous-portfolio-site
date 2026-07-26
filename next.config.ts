import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/research",
      destination: "/work",
      permanent: true,
    },
  ],
};

export default nextConfig;
