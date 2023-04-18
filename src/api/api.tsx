import axios from "axios";

const api = axios.create({
  baseURL: "https://projeto-libras-server.vercel.app",
});

api.interceptors.request.use(
  async (config) => {
    const json = localStorage.getItem("loggedInUser");
    const loggedInUser = JSON.parse(json || '""');

    if (loggedInUser) {
      config.headers.Authorization = `Bearer ${loggedInUser.token}`;
      //cross origin
      config.headers["Access-Control-Allow-Origin"] = "*";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
