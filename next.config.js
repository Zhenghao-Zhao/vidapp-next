/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'cloud-test.zhenghao-zhao.workers.dev'
      },
      {
        protocol: 'https',
        hostname: 'pub-4533b9aa90cd45179e8d6c3683151f32.r2.dev'
      }
    ]
  },
}

module.exports = nextConfig
