import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  header: {
    "Content-Type": "application/json",
  },
});

baseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "http://localhost:3000/";
    }
  },
);

export default baseUrl;
