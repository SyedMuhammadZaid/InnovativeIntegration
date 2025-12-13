import { apiClient } from "../apiCaller";

const getCaseStudies = ({ limit, offset }: { limit?: number, offset?: number }) => apiClient.get(`/caseStudies/getAllCaseStudies?limit=${limit}&offset=${offset}`);
const getCaseStudy = ({ id }: { id: number }) => apiClient.get(`/caseStudies/getCaseStudy/${id}`)

export {
    getCaseStudies,
    getCaseStudy
}