import axios from "axios";

// create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
});

// ✅ this is the important part: default export
export default api;

