import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

baseUrl.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const requestId = config.headers["X-Request-ID"] || crypto.randomUUID();

  config.headers["X-Request-ID"] = requestId;

  // CSRF token
  const xsrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  if (xsrfToken) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
  }

  return config;
});

baseUrl.interceptors.response.use(
  (response) => {
    const requestId = response.headers["x-request-id"];

    console.info("API request successful", {
      requestId,
      url: response.config.url,
      status: response.status,
    });

    return response;
  },

  (error) => {
    const requestId = error.config?.headers?.["X-Request-ID"];

    console.error("API request failed", {
      requestId,
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });

    return Promise.reject(error);
  },
);

export default baseUrl;
