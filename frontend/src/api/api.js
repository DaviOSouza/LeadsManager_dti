import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5039/api",
  timeout: 10000
});

export default api;
