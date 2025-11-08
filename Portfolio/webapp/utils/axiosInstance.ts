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

export default axiosInstance;
