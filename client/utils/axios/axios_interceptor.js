import axios from "axios";
import isExpired from "./isExpired";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axios_interceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios_interceptor.interceptors.request.use(
  async (req) => {
    const access_token =
      localStorage.getItem("access_token") &&
      JSON.parse(localStorage.getItem("access_token"));

    if (access_token) {
      const expired = isExpired(access_token);
      if (expired) {
        try {
          const refresh_token =
            localStorage.getItem("refresh_token") &&
            JSON.parse(localStorage.getItem("refresh_token"));
          const { data } = await instance.post("/api/v1/user/token/refresh", {
            refresh_token,
          });

          localStorage.setItem(
            "access_token",
            JSON.stringify(data.access_token)
          );
          localStorage.setItem(
            "refresh_token",
            JSON.stringify(data.refresh_token)
          );
          localStorage.setItem("info", JSON.stringify(data.info));
          req.headers.Authorization = `Bearer ${data.access_token}`;

          if (req.url === "/api/v1/user/logout") {
            req.data = `{"refresh_token":"${data.refresh_token}"}`;
          }
          return req;
        } catch (error) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("info");
        }
      }
    }

    const access_tokenAgin =
      localStorage.getItem("access_token") &&
      JSON.parse(localStorage.getItem("access_token"));

    req.headers.Authorization = `Bearer ${access_tokenAgin}`;

    return req;
  },
  (err) => Promise.reject(err)
);

export default axios_interceptor;
