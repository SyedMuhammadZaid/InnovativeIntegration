export const dynamic = "force-dynamic";

import { updateBlog } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { id } = params; // ✅ Retrieve ID from the URL
        let blogId = Number(id)

        // Validate required fields
        const { previewHeading, description, previewImageUrl } = body;

        if (!previewHeading) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Call your Prisma helper
        const newBlog = await updateBlog({
            id: blogId,
            previewHeading,
            previewImageUrl,
            description,
        });

        return NextResponse.json({ success: true, data: newBlog }, { status: 200 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
