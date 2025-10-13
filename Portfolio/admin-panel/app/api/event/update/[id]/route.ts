import { updateEvent } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { id } = params; // ✅ Retrieve ID from the URL
        let eventId = Number(id)

        // Validate required fields
        const { title, description, imageUrl, eventDate, eventTime, location, status, detailedContent } = body;
        if (!title || !imageUrl || !eventDate || !location || !status || !eventTime) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Call your Prisma helper
        const newEvent = await updateEvent({
            id: eventId,
            title,
            description,
            imageUrl,
            eventDate,
            eventTime,
            location,
            status,
            detailedContent
        });

        return NextResponse.json({ success: true, data: newEvent }, { status: 200 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
