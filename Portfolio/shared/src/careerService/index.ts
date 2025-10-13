import prisma from "../prisma";

interface CreateCareerPost {
    title: string
    tagline?: string
}

interface UpdateCareerPost {
    id: number,
    title?: string
    tagline?: string
}

// for creating a career post
export const createCareerPost = async (data: CreateCareerPost) => {
    return await prisma.career.create({
        data: {
            title: data.title,
            tagline: data.tagline
        }
    });
}

// for updating a career post
export const updateCareerPost = async (data: UpdateCareerPost) => {
    const { id, ...rest } = data;
    return await prisma.career.update({
        where: { id },
        data: {
            ...rest
        }
    });
}

// for deleting a career post
export const deleteCareerPost = async (id: number) => {
    return await prisma.career.delete({
        where: { id }
    });
}

// for getting all career posts
export const getAllCareerPosts = async () => {
    return await prisma.career.findMany({
        orderBy: { updatedAt: 'desc' }
    });
}
