/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "links.papareact.com",
      "lh3.googleusercontent.com",
      "cloudflare-ipfs.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
