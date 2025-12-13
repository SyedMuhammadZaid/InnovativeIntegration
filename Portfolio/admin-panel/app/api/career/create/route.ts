import { createCareerPost } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, tagline, description } = body;
        if (!title) {
            return NextResponse.json(
                { error: "Missing required field" },
                { status: 400 }
            );
        }
        const newCareer = await createCareerPost({
            title, tagline, description
        });
        return NextResponse.json(
            { success: true, data: newCareer }, { status: 201 }
        )
    }
    catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}