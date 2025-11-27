//Login Api and register Api

import axios from "./axiosInstance";

export const loginApi = (email, password) =>
  axios.post("/auth/login", { email, password });

export const registerApi = (firstname, lastname, email, password) =>
  axios.post("/auth/register", { firstname, lastname, email, password });
