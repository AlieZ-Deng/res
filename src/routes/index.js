import { Route } from "react-router";
import React from "react";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Header from "../components/Header";
import App from "../App";
import NotFound from "../Page/NotFound";
import NotLogin from "../Page/NotLogin";

// export default () => {
//     return <div>
//         <Header ></Header>
//         <Route path="/" exact component={Home} />
//         <Route path="/login" exact component={Login} />
//     </div>
// }

const routes = [
  {
    path: "/",
    component: App,
    routes: [
      {
        path: "/",
        component: Home,
        loadData: Home.loadData,
        exact: true,
        key: "home",
      },
      {
        path: "/login",
        component: Login,
        loadData: Login.loadData,
        exact: true,
        key: "login",
      },
      {
        path: "/notlogin",
        component: NotLogin,
      },
      {
        component: NotFound,
        staticName: "NOT_FOUND",
      },
    ],
  },
];

export default routes;
