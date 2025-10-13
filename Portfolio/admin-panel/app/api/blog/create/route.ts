import { createBlog, createEvent } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        const { previewHeading, previewImageUrl, description } = body;
        if (!previewHeading) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Call your Prisma helper
        const newBlog = await createBlog({
            previewHeading,
            description,
            previewImageUrl,
        });

        return NextResponse.json({ success: true, data: newBlog }, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
