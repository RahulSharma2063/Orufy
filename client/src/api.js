import axios from "axios";

export const api = axios.create({
  baseURL: "https://orufy-backend-s9ge.onrender.com/api"
});
