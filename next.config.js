const removeImports = require("next-remove-imports")();

module.exports = (phase) => {
  return removeImports({
    reactStrictMode: true,
    images: {
      domains: ["res.cloudinary.com"],
    },
  });
};
