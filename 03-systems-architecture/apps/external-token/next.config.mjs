/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  rewrites: async () => {
    return [
      {
        source: "/rest/:path*",
        destination: "http://localhost:5002/:path*",
      },
    ];
  },
};

export default nextConfig;
