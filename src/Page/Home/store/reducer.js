import { CHNAGE_JOKE } from "./const";

const defaultList = {
  jokeList: [], // 段子列表
};

const reducer = (state = defaultList, action) => {
  switch (action.type) {
    case CHNAGE_JOKE:
      return { ...state, jokeList: [...action.data] };
    default:
      return state;
  }
};

export default reducer;
