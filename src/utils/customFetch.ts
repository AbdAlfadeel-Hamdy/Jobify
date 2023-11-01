import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://jobify-e5da.onrender.com/api/v1",
});

export default customFetch;
