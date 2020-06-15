import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3334/folders/"
});

export default api;
