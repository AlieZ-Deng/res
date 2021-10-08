import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.apiopen.top",
});

export default instance;
