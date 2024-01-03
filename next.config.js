/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    sassOptions: {
      includePaths: [path.join(__dirname, "src/styles/scss")],
    },
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
