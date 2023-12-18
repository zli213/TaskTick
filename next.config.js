/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    sassOptions: {
      includePaths: [path.join(__dirname, "src/styles/scss")],
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      });
    }

    return config;
  },
  // temporary, will be removed when the images are hosted on a local server
  images: {
    // domains: ["i.postimg.cc"], old config
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
  },
};

module.exports = nextConfig;
