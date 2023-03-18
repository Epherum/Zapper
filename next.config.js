/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

const path = require("path");

module.exports = nextConfig;

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "_variables.scss";`,
  },
};
