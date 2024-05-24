/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  rewrites: async () => {
    return [
      {
        source: "/rest/:path*",
        destination: "http://localhost:5001/:path*",
      },
    ];
  },
};

export default nextConfig;
