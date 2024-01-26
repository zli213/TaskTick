/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    sassOptions: {
      includePaths: [path.join(__dirname, "src/styles/scss")],
    },
  },
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    // Use @svgr/webpack Handle SVG file
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // For other picture resourse, use asset/resource
    if (!isServer) {
      config.module.rules.push({
        test: /\.(png|jpg|jpeg|gif)$/i, // notice: not include svg
        type: "asset/resource",
      });
    }

    // 添加禁用 JSX 命名空间的插件配置
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["next/babel"], // 使用 Next.js 默认的 Babel 预设
          plugins: [
            // 在这里添加插件配置
            [
              "@babel/plugin-transform-react-jsx",
              {
                throwIfNamespace: false, // 禁用命名空间
              },
            ],
          ],
        },
      },
    });
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
