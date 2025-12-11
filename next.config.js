const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true, // allow builds to pass without TypeScript checking
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "_variables.scss";`,
  },
};

module.exports = nextConfig;
