import { apiClient } from "../apiCaller";

interface createEventRegistration {
    eventId: number
    firstName: string
    lastName: string
    email: string
    phoneNo: string
}

const getEvents = ({ limit, offset }: { limit?: number, offset?: number }) => apiClient.get(`/events/getAllEvents?limit=${limit}&offset=${offset}`)
const getEvent = ({ id }: { id: number }) => apiClient.get(`/events/getEvent/${id}`)
const getUpcomingEvents = () => apiClient.get('/events/getAllUpcomingEvents');
const createEventRegister = (data: createEventRegistration) => apiClient.post('/events/eventRegistration', data);
const getCompletedEvents = ({ limit, offset }: { limit?: number, offset?: number }) => apiClient.get(`/events/getAllCompletedEvents?limit=${limit}&offset=${offset}`)

export {
    getEvents,
    getEvent,
    getUpcomingEvents,
    createEventRegister,
    getCompletedEvents
}