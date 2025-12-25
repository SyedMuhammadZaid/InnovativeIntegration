import { createEventRegistration } from "@innovative-integration/shared";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phoneNo, eventId } = body;
        if (!firstName || !lastName || !email || !phoneNo || !eventId) {
            return NextResponse.json(
                { error: "Missing Required Fields" },
                { status: 400 }
            )
        }
        const newRegistration: any = await createEventRegistration({
            firstName,
            lastName,
            email,
            phoneNo,
            eventId
        });

        if (newRegistration?.message == 'Already registered') {
            return NextResponse.json({ error: "Already Registered" }, { status: 400 });
        }
        return NextResponse.json({ success: true, data: newRegistration }, { status: 201 });
    }
    catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}