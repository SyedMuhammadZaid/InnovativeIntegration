import prisma from "../prisma";

interface CreateProjectSubCategory {
    name: string,
    imageUrl?: string,
    mainCategoryId: string
}

interface UpdateProjectSubCategory {
    id: number,
    name?: string,
    imageUrl?: string,
    mainCategoryId?: string
}

interface CreateProject {
    name: string
    imageUrl?: string
    clientName: string
    challenge: string
    solution: string
    approach: string[]
    result: string
    impact: string[]
    projectSubCategoryId: number
}

interface UpdateProject {
    id: number,
    name?: string
    imageUrl?: string
    clientName?: string
    challenge?: string
    solution?: string
    approach?: string[]
    result?: string
    impact?: string[]
    projectSubCategoryId?: number
}

// for getting all the mainPorjectCategories (first layer)
// export const getAllMainProjectCategories = async () => {
//     return await prisma.projectMainCategory.findMany()
// }

// for creating project sub categories (second layer)
export const createProjectSubCategory = async (data: CreateProjectSubCategory) => {
    return await prisma.projectSubCategory.create({
        data: {
            name: data.name,
            imageUrl: data.imageUrl,
            mainCategoryId: data.mainCategoryId
        }
    });
}

// for updating project sub categories (second layer)
export const updateProjectSubCategory = async (data: UpdateProjectSubCategory) => {
    const { id, ...rest } = data;
    return await prisma.projectSubCategory.update({
        where: { id },
        data: {
            ...rest
        }
    });
}

// for deleting project sub categories (second layer)
export const deletingProjectSubCategory = async (id: number) => {
    return await prisma.projectSubCategory.delete({
        where: { id }
    });
}

// for getting all project sub categories (second layer)
export const getAllProjectSubCategories = async () => {
    return await prisma.projectSubCategory.findMany(
        { orderBy: { createdAt: 'desc' } }
    )
}


// for creating a project
export const createProject = async (data: CreateProject) => {
    return await prisma.project.create({
        data: {
            name: data.name,
            imageUrl: data.imageUrl,
            clientName: data.clientName,
            challenge: data.challenge,
            solution: data.solution,
            approach: data.approach,
            result: data.result,
            impact: data.impact,
            projectSubCategoryId: data.projectSubCategoryId
        }
    });
}

// for updating a project
export const updateProject = async (data: UpdateProject) => {
    const { id, ...rest } = data;
    return await prisma.project.update({
        where: { id },
        data: {
            ...rest
        }
    });
}

// for deleting a project
export const deleteProject = async (id: number) => {
    return await prisma.project.delete({
        where: { id }
    });
}

// for getting all projects
export const getAllProjects = async () => {
    return await prisma.project.findMany(
        { orderBy: { createdAt: 'desc' } }
    );
}

// for getting a single project
export const getProject = async (id: number) => {
    return await prisma.project.findFirst({ where: { id } });
}

// for getting all projects belong to sub project by id
export const getAllProjectsBySubProjectId = async (id: number) => {
    return await prisma.project.findMany(
        { where: { projectSubCategoryId: { equals: id } }, include: { projectSubCategory: true } },
    )
}