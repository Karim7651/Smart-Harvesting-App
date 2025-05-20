/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smart-harvesting-aast-bucket-2025.s3.eu-central-1.amazonaws.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
