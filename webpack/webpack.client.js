const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const baseConfig = require("./webpack.base.js");
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

const clientConfig = {
  entry: {
    index: resolvePath("../src/client/index.js"),
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
    }),
    // 生成文件清单
    new WebpackManifestPlugin(),
  ],
  output: {
    filename: "js/[name].js",
    path: resolvePath("../build/client"),
    publicPath: "/",
  },
};

module.exports = merge(baseConfig, clientConfig);
