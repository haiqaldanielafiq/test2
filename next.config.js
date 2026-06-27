/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add your image domains if needed
  },
  // For Vercel deployment
  trailingSlash: false,
  generateEtags: true,
}

module.exports = nextConfig
