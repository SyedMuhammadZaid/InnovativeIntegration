import { updateProjectSubCategory } from "@innovative-integration/shared";
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { id } = params;
        const subProjectId = Number(id);

        const { name, imageUrl, mainCategoryId } = body;
        if (!name || !imageUrl || !mainCategoryId) {
            return NextResponse.json(
                { error: "Missing Required Fields" },
                { status: 400 }
            )
        }

        const res = await updateProjectSubCategory({
            id: subProjectId,
            name,
            imageUrl,
            mainCategoryId
        });

        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        )
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}