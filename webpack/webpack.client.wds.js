const path = require("path");

const { devHost, wdsPort } = require("./buildConfig/index");

const resolvePath = (pathstr) => path.resolve(__dirname, pathstr);

module.exports = {
  devServer: {
    host: devHost,
    port: wdsPort,
    static: {
      directory: resolvePath("./../build/client"), //告诉服务器从哪个目录中提供内容
      publicPath: "/",
      watch: {
        ignored: /node_modules/,
        usePolling: false,
      },
    },
    hot: true, //启用 webpack 的模块热替换特性
    client: {
      overlay: {
        errors: true, // 显示错误
        warnings: true, // 显示警告
      },
      progress: true, // 打开进度条，不至于焦虑
    },
    open: false, // 不需要自动打开
    compress: true,
    // 在 3000 端口 向 8080 端口发起请求获取热更新模块时，会报跨越，搞个头允许一下
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
