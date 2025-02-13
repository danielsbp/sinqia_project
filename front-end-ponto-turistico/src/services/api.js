import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7059/api/", 
  timeout: 10000,                     
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;