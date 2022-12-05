const removeImports = require("next-remove-imports")();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = removeImports({});
