const path = require("path");

const { devHost, wdsPort } = require("./buildConfig/index");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode: mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "../node_modules"),
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name:
                process.env.NODE_ENV === "production"
                  ? "img/[name].[hash:8].[ext]"
                  : "img/[name].[ext]",
              publicPath:
                process.env.NODE_ENV === "production"
                  ? "/"
                  : `http://${devHost}:${wdsPort}/`,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      /* 
        代码分割： 
            第三方库 - libs
            公共模块 - common
            异步加载 - async - TODO
     */
      cacheGroups: {
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "libs",
          chunks: "initial",
          priority: -10,
        },
        common: {
          minChunks: 2,
          name: "common",
          chunks: "initial",
          priority: -20,
        }
      },
    },
  },
};
