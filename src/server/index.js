import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Route } from "react-router";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Provider } from "react-redux";
import proxy from "express-http-proxy";
import { Helmet } from "react-helmet";

import routes from "./../routes/index";
import { getStore } from "../store";
import staticConfig from "./staticConfig";

const app = express();
app.use(express.static("./build/client"));

// 使用代理中转请求
app.use(
  "/api",
  proxy("https://api.apiopen.top/", {
    proxyReqPathResolver: function (req) {
      return req.url;
    },
  })
);

const RouteWrap = () => {
  return (
    <div className="wrap">
      {/* {routes.map((route) => {
        return <Route {...route} />;
      })} */}
      {renderRoutes(routes)}
    </div>
  );
};

app.get("*", async (req, res) => {
  try {
    const promises = [];
    const store = getStore();

    const matchs = matchRoutes(routes, req.path);
    matchs.forEach((item) => {
      if (item.route.loadData) {
        // 不管异步请求是否成功，都要等到数据请求回来或者请求失败，尽可能多的渲染数据
        const p = new Promise((resolve, reject) => {
          item.route.loadData(store).then(resolve).catch(resolve);
        });
        promises.push(p);
      }
    });

    // 判断路由是否加载到了 404 页面
    const isNotFound = matchs.some((item) => item.route.staticName);

    const context = {};
    const App = () => {
      // 在写 StaticRouter 的时候，要写一个 context 主要是用于数据的传输
      /* 
      StaticRouter 不像 BroswerRouter 一样，后者是运行是运行在浏览器上的，可以知道当前的 location 路径
      StaticRouter 是运行在服务器上的，所以无法感知，我们要手动传参 location
      */
      return (
        <Provider store={store}>
          <StaticRouter location={req.path} context={context}>
            <RouteWrap />
          </StaticRouter>
        </Provider>
      );
    };

    await Promise.all(promises);

    const content = renderToString(<App />);

    const helmet = Helmet.renderStatic();

    const sources = staticConfig();

    const target = `<html>
          <head>
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              <link  href="https://g.csdnimg.cn/static/logo/favicon32.ico"  rel="shortcut icon" type="image/x-icon" />
              ${sources.cssFiles.join("")}
          </head>
          <body>
              <h1>this is a tag</h1>
              <h2>this is a tag2</h2>
              <h2>this is a tag3</h2>
              <div id="root">${content}</div>
          </body>
          <script>
            window.context = {
              store : ${JSON.stringify(store.getState())}
            }
          </script>
          ${sources.jsFiles.join("")}
      </html>`;

    // 判断页面不存在的时候，还需要修改状态码
    isNotFound && res.status(404);
    // 判断是客户端的重定向，修改为服务器端的重定向
    context.action === "REPLACE"
      ? res.redirect(301, context.url)
      : res.send(target);
  } catch (err) {
    res.send("err");
  }
});

app.listen(3000, () => {
  console.log("listen in 3000");
});
