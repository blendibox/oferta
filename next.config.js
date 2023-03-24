/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  experimental: {
    amp: {
      skipValidation: true
    }
  },
    webpack: (config, { isServer }) => {
      if (isServer) {
        //require('./scripts/getpages')
      }
  
      return config
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

         {
          source: "/googleMerchant.xml",
          destination: "/api/feed/googleMerchant",
        },

      ];
    },
}

module.exports = nextConfig




