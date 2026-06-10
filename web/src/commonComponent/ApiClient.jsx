import axios from "axios";
const baseUrl = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  header: {
    "Content-Type": "application/json",
  },
});

baseUrl.interceptors.request.use((request) => {
  const xsrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
  request.headers["X-XSRF-TOKEN"] = xsrfToken;
  return request;
});

baseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // window.location.href = "http://localhost:3001/";
    }
  },
);

export default baseUrl;
