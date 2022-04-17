/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'saqara.com',
      'images.pexels.com',
      'raw.githubusercontent.com',
      'github.com'
    ]
  }
};

module.exports = nextConfig;
