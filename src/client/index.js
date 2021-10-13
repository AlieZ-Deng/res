import React from "react";
import { render, hydrate } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader/root";

import routes from "./../routes";
import { getClientStore } from "./../store";

const renderClient = () => {
  const RouteWrap = () => {
    return <div className="wrap">{renderRoutes(routes)}</div>;
  };

  const HotWrap = hot(RouteWrap);

  const App = () => {
    return (
      <Provider store={getClientStore()}>
        <BrowserRouter>
          <HotWrap />
        </BrowserRouter>
      </Provider>
    );
  };

  hydrate(<App />, document.getElementById("root"));
};

renderClient();

//开发环境才会开启
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}
