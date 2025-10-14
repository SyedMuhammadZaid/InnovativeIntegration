import { getAllCaseStudies } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);
        const someParam = searchParams.get("someParam");

        const res = await getAllCaseStudies();
        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        );
    }
    catch (error) {
        console.log("Error fetching case studies: ", error);
        return NextResponse.json(
            { success: false, res: "Internal Server Error" },
            { status: 500 }
        )
    }
}