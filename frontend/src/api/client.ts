
import axios from "axios";

const api = axios.create({
  baseURL: "https://collaborative-task-manager-backend-gve1.onrender.com/api",
  withCredentials: true
});

export default api;
