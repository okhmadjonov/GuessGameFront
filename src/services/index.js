import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    console.log(token);
    config.baseURL = "https://localhost:7025/api";
    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
