import { getAllCaseStudies } from "@innovative-integration/shared";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get("limit");
        const offset = searchParams.get("offset");
        let params = {
            limit: Number(limit),
            offset: Number(offset)
        };
        const res = await getAllCaseStudies(params);
        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error fetching caseStudies:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
