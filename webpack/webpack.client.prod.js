// 前端代码-生产环境-配置

const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const baseConfig = require("./webpack.base.js");
const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

// 生产环境下的 babel 配置仍然使用 development
process.env.BABEL_ENV = "development"; //指定 babel 编译环境

const clientProdConfig = {
  // 入口文件
  entry: {
    index: resolvePath("../src/client/index.js"),
  },
  // 生产环境，不开启 source-map
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
    // 抽离 css
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
    // 打包前先清理一波旧目录
    new CleanWebpackPlugin(),
    // 生成文件清单
    new WebpackManifestPlugin({}),
  ],
  optimization: {
    // 分离 webpack 本身的 runtime 代码
    runtimeChunk: {
      name: "runtime",
    },
    minimizer: [
      // 生产环境下对 js css 进行压缩
      //压缩 js
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          // 压缩代码时，删除没有用到的代码不输出警告
          warnings: false,
          ie8: false,
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有注释
            comments: false,
          },
        },
        // 使用多进程并行运行来提高构建速度
        parallel: true,
        cache: true,
        sourceMap: false,
      }),
      //压缩 css 去除一些空行还有空格
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  // 打包完成后输出到 build/client 目录
  output: {
    filename: "js/[name].[chunkhash:8].js",
    path: resolvePath("../build/client"),
    publicPath: "/",
  },
};

module.exports = merge(baseConfig, clientProdConfig);
