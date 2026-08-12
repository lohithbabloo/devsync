import axios from "axios";

const aiBaseUrl = axios.create({
  baseURL: "http://localhost:8081/ai/chat",
  headers: {
    "Content-Type": "application/json",
  },
});

export default aiBaseUrl;
