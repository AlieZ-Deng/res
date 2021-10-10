import manifestJson from "@client/manifest.json";

const isProd = process.env.NODE_ENV === "production";

// js 加载需要按顺序，先加载第三方库
const entryJs = ["runtime.js", "libs.js", "index.js"];
const entryCss = ["index.css"];

// 数组转换方法
const entryHandler = (store, isProd) => {
  entryCss.forEach((item) => {
    const linkVal = isProd ? manifestJson[item] : `/css/${item}`;
    const link = `<link rel="stylesheet" type="text/css" href="${linkVal}">`;
    store.cssFiles.push(link);
  });
  entryJs.forEach((item) => {
    const scVal = isProd ? manifestJson[item] : `/js/${item}`;
    const sc = `<script src="${scVal}"></script>`;
    store.jsFiles.push(sc);
  });
};

const getConfig = () => {
  const store = {
    cssFiles: [],
    jsFiles: [],
  };

  if (isProd) {
    entryHandler(store, true);
  } else {
    entryHandler(store);
  }
  return store;
};

export default getConfig;
