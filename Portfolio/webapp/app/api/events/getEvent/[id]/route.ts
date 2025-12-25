import { getEvent } from "@innovative-integration/shared";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const res = await getEvent(id);
        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        );
    }
    catch (error) {
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
