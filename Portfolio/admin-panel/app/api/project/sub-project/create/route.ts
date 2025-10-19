import { createProjectSubCategory } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        let body = await request.json();
        const { name, imageUrl, mainCategoryId } = body;
        if (!name || !imageUrl || !mainCategoryId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        let res = await createProjectSubCategory({
            name,
            imageUrl,
            mainCategoryId
        })

        return NextResponse.json(
            { success: true, data: res },
            { status: 201 }
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