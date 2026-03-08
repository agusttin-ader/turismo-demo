/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    /** Cache de imágenes optimizadas (externas): menos refetch, carga más rápida en revisitas */
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 año
  },
};

module.exports = nextConfig;
