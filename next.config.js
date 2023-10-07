/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: ['./app'],
        prependData: `@import "./styles/variable.scss";`,
    }
};

module.exports = nextConfig;
