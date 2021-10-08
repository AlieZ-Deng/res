const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "node_modules"),
        // loader: "babel-loader",
        // use: ["babel-loader"],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["react", "stage-0", "env"],
              plugins: [
                [
                  "transform-runtime",
                  {
                    helpers: false,
                    polyfill: false,
                    regenerator: true,
                    moduleName: "babel-runtime",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.scss|css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "common.css",
    }),
  ],
};
