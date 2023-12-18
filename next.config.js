/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    sassOptions: {
      includePaths: [path.join(__dirname, "src/styles/scss")],
    },
  },
  webpack: (config, { isServer }) => {
    // use @svgr/webpack Handle SVG file
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    // For other picture resourse, use asset/resource
    if (!isServer) {
      config.module.rules.push({
        test: /\.(png|jpg|jpeg|gif)$/i, // notice: not includ svg
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
