// import axios from "axios";
import clientRequest from "./../../../client/requeset";
import serverRequest from "./../../../server/request";
import { CHNAGE_JOKE } from "./const";

// 获取段子列表的 url
// https://api.apiopen.top/getJoke?page=1&count=12&type=video
// const jokeUrl = "/api/getJoke?page=1&count=12&type=video";

const changeJoke = (data) => ({
  type: CHNAGE_JOKE,
  data,
});

export const getJokeList = (isserver) => {
  const request = isserver ? serverRequest : clientRequest;
  // const url = isserver ? "/" : "/api/";
  return (dispatch) => {
    return request
      .get("/getJoke?page=1&count=12&type=video")
      .then((res) => {
        dispatch(changeJoke(res.data.result));
      });
  };
};
