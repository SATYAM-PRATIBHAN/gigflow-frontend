// Temporary debugging utility - Add to frontend
// Place this in src/services/api.js temporarily to debug

import axios from "axios";
import store from "../store";
import {
  startColdStartDetection,
  detectColdStart,
  completeColdStart,
} from "../store/slices/coldStartSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to track request start time
api.interceptors.request.use(
  (config) => {
    // DEBUG: Log request details
    console.log("🔵 API Request:", {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      withCredentials: config.withCredentials,
      headers: config.headers,
    });

    // Start tracking the request
    store.dispatch(startColdStartDetection());

    // Set a timeout to detect cold start after 3 seconds
    config.metadata = { startTime: Date.now() };
    config.coldStartTimer = setTimeout(() => {
      store.dispatch(detectColdStart());
    }, 3000);

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    store.dispatch(completeColdStart());
    return Promise.reject(error);
  }
);

// Response interceptor to clear cold start state
api.interceptors.response.use(
  (response) => {
    // DEBUG: Log successful response
    console.log("✅ API Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
      headers: response.headers,
    });

    // Clear the cold start timer
    if (response.config.coldStartTimer) {
      clearTimeout(response.config.coldStartTimer);
    }

    // Complete the cold start detection
    store.dispatch(completeColdStart());
    return response;
  },
  (error) => {
    // DEBUG: Log error details
    console.error("❌ API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      message: error.message,
    });

    // Clear the cold start timer
    if (error.config?.coldStartTimer) {
      clearTimeout(error.config.coldStartTimer);
    }

    // Complete the cold start detection
    store.dispatch(completeColdStart());
    return Promise.reject(error);
  }
);

export default api;
