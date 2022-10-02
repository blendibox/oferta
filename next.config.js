/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized :true
  },
  async rewrites() {
      return [
        {
          source: "/feed.xml",
          destination: "/api/feed/rss",
        },
        {
          // The /:slug part is a generic parameter handler to catch all other cases
          source: "/feed/:slug",
          destination: "/api/feed/rss/:slug",
        },

      ];
    },
}

module.exports = nextConfig
