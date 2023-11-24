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
};

module.exports = nextConfig;
