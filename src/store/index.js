import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

export const getClientStore = () => {
  const defaultState = window && window.context.store;
  return createStore(reducer, defaultState, applyMiddleware(thunk));
};

export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk));
};
