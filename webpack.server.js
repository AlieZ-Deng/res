const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

const serverConfig = {
  target: "node",
  entry: "./src/server/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build/server"),
  },
  externals: [nodeExternals()],
};

module.exports = merge(baseConfig, serverConfig);
