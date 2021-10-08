import { combineReducers } from "redux";
import { homeReducer } from "../Page/Home/store";

const initReducer = (state = { isMockInit: true },action) => {
  return state;
};
const reducer = combineReducers({
  initReducer,
  homeReducer
});

export default reducer;
