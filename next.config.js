/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'noc.social',
        port: '',
        pathname: '/system/media_attachments/files/**',
      },
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
