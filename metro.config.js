const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// You can add custom configurations here, but avoid using unknown or unsupported options
module.exports = withNativeWind(config, { input: "./global.css" });
