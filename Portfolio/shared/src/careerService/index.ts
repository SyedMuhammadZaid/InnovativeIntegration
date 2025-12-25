import { getPrisma } from "../prisma";

interface CreateCareerPost {
    title: string
    tagline: string
    description: string
}

interface UpdateCareerPost {
    id: number,
    title?: string
    tagline?: string
    description?: string
}

// for creating a career post
export const createCareerPost = async (data: CreateCareerPost) => {
    const prisma = getPrisma();
    return await prisma.career.create({
        data: {
            title: data.title,
            tagline: data.tagline,
            description: data.description
        }
    });
}

// for updating a career post
export const updateCareerPost = async (data: UpdateCareerPost) => {
    const prisma = getPrisma();
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
    const prisma = getPrisma();
    return await prisma.career.delete({
        where: { id }
    });
}

// for getting all career posts
export const getAllCareerPosts = async () => {
    const prisma = getPrisma();
    return await prisma.career.findMany({
        orderBy: { updatedAt: 'desc' }
    });
}