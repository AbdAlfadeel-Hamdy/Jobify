import axios from "axios";

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // withCredentials: import.meta.env.PROD,
});

export default customFetch;
