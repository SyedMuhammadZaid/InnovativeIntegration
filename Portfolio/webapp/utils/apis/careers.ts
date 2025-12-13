import { apiClient } from "../apiCaller";

export const getCareers = () => apiClient.get(`/careers/getAllCareers`)
