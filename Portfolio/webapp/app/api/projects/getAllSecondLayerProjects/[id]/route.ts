import { getAllSubCategoriesProjectsByFirstLayer } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const res = await getAllSubCategoriesProjectsByFirstLayer(id);
        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        )
    }
}