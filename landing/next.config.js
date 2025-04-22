/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify is removed as it's no longer needed in Next.js 15
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;