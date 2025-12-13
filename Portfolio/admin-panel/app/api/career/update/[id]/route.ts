import { updateCareerPost } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { id } = params;
        let careerId = Number(id);

        const { title, tagline, description } = body;
        if (!title) {
            return NextResponse.json(
                { error: "Missing field" },
                { status: 400 }
            )
        }

        const updateCareer = await updateCareerPost({
            id: careerId,
            title, tagline,
            description
        });

        return NextResponse.json(
            { success: true, data: updateCareer },
            { status: 200 }
        )
    }
    catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}