import { devHost, wdsPort } from "./../../webpack/buildConfig";

// js 加载需要按顺序，先加载第三方库
const entryJs = [__IS_PROD__ ? "runtime.js" : "", "libs.js", "index.js"];
const entryCss = ["index.css"];

const getConfig = () => {
  const store = {
    cssFiles: [],
    jsFiles: [],
  };

  // 数组转换方法
  const entryHandler = (store, isProd = false, manifestJson = {}) => {
    entryCss.forEach((item) => {
      const linkVal = isProd
        ? manifestJson[item]
        : `http://${devHost}:${wdsPort}/css/${item}`;
      const link = `<link rel="stylesheet" type="text/css" href="${linkVal}">`;
      store.cssFiles.push(link);
    });
    entryJs.forEach((item) => {
      if (item) {
        const scVal = isProd
          ? manifestJson[item]
          : `http://${devHost}:${wdsPort}/js/${item}`;
        const sc = `<script src="${scVal}"></script>`;
        store.jsFiles.push(sc);
      }
    });
  };

  if (__IS_PROD__) {
    const manifestJson = require("@client/manifest.json");
    entryHandler(store, true, manifestJson);
  } else {
    entryHandler(store);
  }
  return store;
};

export default getConfig;
