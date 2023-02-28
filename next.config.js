/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    trailingSlash: true,
    path: "",
    unoptimized: true,
  },
};

const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },
});
module.exports = nextConfig;
