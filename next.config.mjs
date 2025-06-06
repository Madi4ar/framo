/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.bizdin.ai'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
