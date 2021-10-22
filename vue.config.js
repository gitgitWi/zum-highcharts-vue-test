const path = require("path");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const configs = {
  configureWebpack: {
    resolve: {
      alias: {
        $assets: path.join(__dirname, "assets"),
      },
    },
  },
};

module.exports = configs;
