import prisma from "../prisma";
import { eventStatus } from "../utils/constants";

interface createEvent {
    title: string
    description: string
    imageUrl?: string
    eventDate: string
    eventTime: string
    location: string
    status: eventStatus
}

interface updateEvent {
    id: number,
    title?: string
    description?: string
    imageUrl?: string
    eventDate?: string,
    eventTime?: string,
    location?: string
    status?: eventStatus
    detailedContent?: any
}

interface createEventRegistration {
    eventId: number
    firstName: string
    lastName: string
    email: string
    phoneNo: string
}

// for creating event
export const createEvent = async (data: createEvent) => {
    console.log(data)
    return await prisma.event.create({
        data: {
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            eventDate: data.eventDate,
            eventTime: data.eventTime,
            location: data.location,
            status: data.status
        }
    });
}

// for updating event
export const updateEvent = async (data: updateEvent) => {
    const { id, ...rest } = data;
    return await prisma.event.update({
        where: { id },
        data: {
            ...rest
        }
    });
}

// for deleting event
export const deleteEvent = async (id: number) => {
    return await prisma.event.delete({
        where: { id }
    });
}

// for getting all the events
export const getAllEvents = async () => {
    return await prisma.event.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

// for getting a single event
export const getEvent = async (id: number) => {
    return await prisma.event.findFirst({
        where: { id }
    });
}

// for creating a registration against any event from an app.
export const createEventRegistration = async (data: createEventRegistration) => {
    return await prisma.eventRegistration.create({
        data: {
            eventId: data.eventId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNo: data.phoneNo
        }
    });
}