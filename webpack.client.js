const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

const clientConfig = {
  entry: "./src/client/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public/client"),
  },
};

module.exports = merge(baseConfig, clientConfig);