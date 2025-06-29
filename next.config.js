/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  turbopack: {
    resolveExtensions: [ '.ts', '.jsx', '.js',  '.json'],
  },
 webpack: (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    return config;
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




