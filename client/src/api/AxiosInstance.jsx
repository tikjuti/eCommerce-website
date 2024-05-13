import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import Cookies from "js-cookie";

const BASEURL = "http://localhost:8000/api/v1/";

// let accessToken = Cookies.get("token") || "";

const authTokens = Cookies.get("token")
  ? JSON.parse(Cookies.get("token"))
  : null;
const accessToken = authTokens ? authTokens.access : "";

const AxiosInstance = axios.create({
  baseURL: BASEURL,
  // "Content-Type": "application/json",
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  },
});

AxiosInstance.interceptors.request.use(
  async (req) => {
    let authTokens = Cookies.get("token") || "";
    const accessToken = authTokens ? JSON.parse(authTokens).access : "";
    const refreshToken = authTokens ? JSON.parse(authTokens).refresh : "";

    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
      const tokenExp = jwtDecode(accessToken);
      const isExpired = dayjs.unix(tokenExp.exp).diff(dayjs()) < 1;
      if (!isExpired) return req;

      const refreshExp = jwtDecode(refreshToken).exp;
      if (dayjs.unix(refreshExp).diff(dayjs()) < 1) {
        // For example, redirect user to login page
        // Cookies.remove("token");
        window.location.href = "/login";
        return;
      }
      const resp = await axios.post(`${BASEURL}auth/token/refresh/`, {
        refresh: refreshToken,
      });
      Cookies.set("token", JSON.stringify(resp.data));
      req.headers.Authorization = `Bearer ${resp.data.access}`;
      return req;
    } else {
      return req;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
