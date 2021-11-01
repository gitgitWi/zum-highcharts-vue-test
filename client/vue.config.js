// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const configs = {
  configureWebpack: {
    resolve: {
      alias: {
        "@/": path.join(__dirname, "src"),
        $assets: path.join(__dirname, "src", "assets"),
      },
    },
  },
};

module.exports = configs;
