import axios from "axios";

export const API_URL = axios.create({
  baseURL: "https://localhost:7220/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, //60 seconds timeout
});
