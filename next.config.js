/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "reallifeinstitute.org",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.reallifeinstitute.org",
        pathname: "/wp-content/uploads/**",
      },
      {
        // Main-site CMS (blogs, policies, publications) — see API.main in lib/wp.ts.
        protocol: "https",
        hostname: "cms-programs.reallifeinstitute.org",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        pathname: "/avatar/**",
      },
    ],
  },
};

module.exports = nextConfig;
