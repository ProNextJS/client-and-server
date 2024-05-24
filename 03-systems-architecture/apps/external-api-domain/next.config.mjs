/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverActions: {
      allowedOrigins: ["mycompany.com"],
    },
  },
};

export default nextConfig;
