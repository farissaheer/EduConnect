import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;

