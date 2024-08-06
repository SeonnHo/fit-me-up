/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't1.kakaocdn.net',
        port: '',
        pathname: '/kakaocorp/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: process.env.AWS_CLOUD_FRONT_HOST_NAME,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
