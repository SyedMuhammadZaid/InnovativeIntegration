import { getPrisma } from "../prisma";

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
    const prisma = getPrisma();
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
    const prisma = getPrisma();
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
    const prisma = getPrisma();
    return await prisma.blog.delete({
        where: { id }
    });
}

// for getting all blogs
export const getAllBlogs = async (params?: BlogQueryParams) => {
    const prisma = getPrisma();
    const limit = params?.limit ?? undefined; // if not passed, Prisma fetches all
    const offset = params?.offset ?? 0;       // default skip is 0
    const count = await prisma.blog.count();
    const blogs = await prisma.blog.findMany({
        orderBy: {
            createdAt: "desc"
        },
        skip: offset || 0,
        take: limit,
    });
    return {
        count,
        blogs,
    };
}

// to get a single blog
export const getBlog = async (id: number) => {
    const prisma = getPrisma();
    return await prisma.blog.findFirst({
        where: { id }
    })
}

