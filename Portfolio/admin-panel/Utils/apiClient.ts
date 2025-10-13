// src/api/apiClient.ts
import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";

export const apiClient = {
    get: async <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> => {
        const res = await axiosInstance.get<T>(url, { params, ...config });
        return res.data;
    },

    post: async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
        const res = await axiosInstance.post<T>(url, data, config);
        return res.data;
    },

    put: async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
        const res = await axiosInstance.put<T>(url, data, config);
        return res.data;
    },

    patch: async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
        const res = await axiosInstance.patch<T>(url, data, config);
        return res.data;
    },

    delete: async <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> => {
        const res = await axiosInstance.delete<T>(url, { params, ...config });
        return res.data;
    },
};
