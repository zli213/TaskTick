/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    sassOptions: {
      includePaths: [path.join(__dirname, "src/styles/scss")],
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    }); // for SVG 

    return config;
  }
};

module.exports = nextConfig;
