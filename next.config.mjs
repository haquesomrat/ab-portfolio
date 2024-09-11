/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.microlink.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
