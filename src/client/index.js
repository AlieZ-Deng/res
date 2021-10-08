import React from "react";
import { render, hydrate } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./../routes";
import {getClientStore} from "./../store";
import { Provider } from "react-redux";

const RouteWrap = () => {
  return (
    <div className="wrap">
      {renderRoutes(routes)}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={getClientStore()}>
      <BrowserRouter>
        <RouteWrap />
      </BrowserRouter>
    </Provider>
  );
};

hydrate(<App />, document.getElementById("root"));
