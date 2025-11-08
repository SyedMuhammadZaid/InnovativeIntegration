import { getAllBlogs } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get("limit");
        const offset = searchParams.get("offset");
        let params = {
            limit: Number(limit),
            offset: Number(offset)
        };
        const res = await getAllBlogs(params);
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
