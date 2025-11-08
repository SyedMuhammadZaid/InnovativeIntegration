import prisma from "../prisma"

interface CreateBlogPost {
    previewHeading: string
    previewImageUrl?: string
    description?: any
}

interface UpdateBlogPost {
    id: number,
    previewHeading?: string
    previewImageUrl?: string
    description?: any
}

interface BlogQueryParams {
    limit?: number;
    offset?: number;
}

// for creating blog
export const createBlog = async (data: CreateBlogPost) => {
    return await prisma.blog.create({
        data: {
            previewHeading: data.previewHeading,
            previewImageUrl: data.previewImageUrl,
            description: data.description
        }
    });
}

// for updating blog
export const updateBlog = async (data: UpdateBlogPost) => {
    const { id, ...rest } = data;
    return await prisma.blog.update({
        where: { id },
        data: {
            ...rest
        }
    });
}

// for deleting blog
export const deleteBlog = async (id: number) => {
    return await prisma.blog.delete({
        where: { id }
    });
}

// for getting all blogs
export const getAllBlogs = async (params?: BlogQueryParams) => {
    const limit = params?.limit ?? undefined; // if not passed, Prisma fetches all
    const offset = params?.offset ?? 0;       // default skip is 0
    return await prisma.blog.findMany({
        orderBy: {
            createdAt: "desc"
        },
        skip: offset || 0,
        take: limit
    });
}

// to get a single blog
export const getBlog = async (id: number) => {
    return await prisma.blog.findFirst({
        where: { id }
    })
}

