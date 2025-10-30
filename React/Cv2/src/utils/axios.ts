import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
});

// Request interceptor: add token / log requests
api.interceptors.request.use(
  (config) => {
    // Example: attach a fake token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[REQ] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[RES ERROR]", error?.response?.status, error?.message);
    // Optionally handle 401/403, refresh token, etc.
    if(error.response?.status === 401) {
      // e.g., redirect to login
      console.log("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;