import prisma from "../prisma";

interface createCaseStudy {
    title: string
    clientName: string
    description?: string
    imageUrl?: string
    challenge: string
    solution: string
    result: any
    advantage?: string
}

interface updateCaseStudy {
    id: number,
    title?: string
    clientName?: string
    description?: string
    imageUrl?: string
    challenge?: string
    solution?: string
    result?: any
    advantage?: string
}

// for creating case study
export const createCaseStudy = async (data: createCaseStudy) => {
    return await prisma.caseStudy.create({
        data: {
            title: data.title,
            clientName: data.clientName,
            description: data.description,
            imageUrl: data.imageUrl,
            challenge: data.challenge,
            solution: data.solution,
            result: data.result,
            advantage: data.advantage
        }
    });
}

// for updating case study
export const updateCaseStudy = async (data: updateCaseStudy) => {
    const { id, ...rest } = data;
    return await prisma.caseStudy.update({
        where: { id },
        data: {
            ...rest
        }
    });
}

// for deleting case study
export const deleteCaseStudy = async (id: number) => {
    return await prisma.caseStudy.delete({
        where: { id }
    });
}

// for getting all case studies
export const getAllCaseStudies = async () => {
    return await prisma.caseStudy.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
}

// to get a single case study
export const getCaseStudy = async (id: number) => {
    return await prisma.caseStudy.findFirst({
        where: { id }
    });
}