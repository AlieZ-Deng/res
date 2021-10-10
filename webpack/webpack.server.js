const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base.js");
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

process.env.BABEL_ENV = "node"; // 设置 babel 的运行环境

const serverConfig = {
  target: "node",
  entry: resolvePath("../src/server/index.js"),
  resolve: {
    alias: {
      //定义dist 目录别名，方便导入模块
      "@client": resolvePath('./../build/client'),
    },
  },
  externals: [nodeExternals()],
  output: {
    filename: "index.js",
    path: resolvePath("../build/server"),
  },
};

module.exports = merge(baseConfig, serverConfig);
