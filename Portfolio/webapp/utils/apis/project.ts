import { apiClient } from "../apiCaller";

const getSubProjects = ({ id }: { id: number }) => apiClient.get(`/projects/getAllSecondLayerProjects/${id}`);
const getProjects = ({ id }: { id: number }) => apiClient.get(`/projects/getAllProjects/${id}`);
const getProject = ({ id }: { id: number }) => apiClient.get(`/projects/getProject/${id}`)

export {
    getSubProjects,
    getProjects,
    getProject
}