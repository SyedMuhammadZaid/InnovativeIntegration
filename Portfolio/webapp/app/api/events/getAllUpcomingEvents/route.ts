import { getAllUpcomingEvents } from "@innovative-integration/shared";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const res = await getAllUpcomingEvents();
        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
