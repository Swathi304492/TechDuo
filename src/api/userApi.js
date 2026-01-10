import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getMyProfile = () => API.get("/users/me");
export const getMyStats = () => API.get("/users/me/stats");
