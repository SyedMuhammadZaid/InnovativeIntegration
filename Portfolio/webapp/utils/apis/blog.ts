import { apiClient } from "../apiCaller";

const getBlogs = ({ limit, offset }: { limit?: number, offset?: number }) => apiClient.get(`/blog/getAllBlogs?limit=${limit}&offset=${offset}`)
const getBlog = ({ id }: { id: number }) => apiClient.get(`/blog/getBlog/${id}`)

export {
    getBlogs,
    getBlog
}