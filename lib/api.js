import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  console.log(token)
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});

const getToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };


export default api;
