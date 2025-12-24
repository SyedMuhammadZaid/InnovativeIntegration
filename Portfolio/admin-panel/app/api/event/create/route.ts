export const dynamic = "force-dynamic";

import { createEvent } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        const { title, description, imageUrl, eventDate, eventTime, location, status } = body;
        if (!title || !description || !imageUrl || !eventDate || !location || !status || !eventTime) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Call your Prisma helper
        const newEvent = await createEvent({
            title,
            description,
            imageUrl,
            eventDate,
            eventTime,
            location,
            status,
        });

        return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
