/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: ['images.pexels.com', 'www.svgrepo.com', 'images.unsplash.com', 'localhost', '134.122.102.182'],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'http://134.122.102.182:8080',
    NEXT_PUBLIC_STRAPI_URL: 'http://134.122.102.182:8080',
    NEXT_PUBLIC_IMAGE_BASE_URL: 'http://134.122.102.182:8080',
    NEXT_PUBLIC_STORE_API_URL: 'http://134.122.102.182:3001/api',
    NEXT_PUBLIC_ELITE_API: 'http://134.122.102.182:3001/api',
    NEXT_PUBLIC_GRAPHQL_URL: 'http://134.122.102.182/graphql',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    return config;
  },
}

module.exports = nextConfig
