const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = require("./webpack.base.js");
const wdsConfig = require("./webpack.client.wds.js");

const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

const clientConfig = {
  entry: {
    // index: resolvePath("../src/client/index.js"),
    index: ["react-hot-loader/patch", resolvePath("../src/client/index.js")],
  },
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].chunk.css",
    }),
  ],
  resolve: {
    alias: {
      // 开发环境下， wds 与 react-hot-loader ，react-dom 使用补丁替换
      "react-dom": "@hot-loader/react-dom",
    },
  },
  output: {
    filename: "js/[name].js",
    path: resolvePath("../build/client"),
    // publicPath: "/",
    publicPath: "http://localhost:8080/",
  },
};

module.exports = merge(baseConfig, wdsConfig, clientConfig);
