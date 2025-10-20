// src/api/axiosInstance.ts
import axios, { AxiosError, AxiosInstance } from "axios";

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        process.env.NEXT_API_BASE_URL ||
        "http://localhost:3000/api",
    timeout: 10000, // 10 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

// // ✅ Request Interceptor (optional, e.g. add token)
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // ✅ Response Interceptor
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError) => {
//         if (error.response) {
//             console.error(
//                 `[Axios Error] ${error.response.status}:`,
//                 error.response.data
//             );
//         } else {
//             console.error("[Axios Error] No response:", error.message);
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
