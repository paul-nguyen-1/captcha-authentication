/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "/",
    unoptimized: true,
  },
};

const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});
module.exports = nextConfig;
