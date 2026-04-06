import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "africa-programs.reallifeinstitute.org",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "reallifeinstitute.org",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
