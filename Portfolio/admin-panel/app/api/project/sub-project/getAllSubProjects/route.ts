export const dynamic = "force-dynamic";

import { getAllProjectSubCategories } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const searchParam = searchParams.get("someparams")
        let res = await getAllProjectSubCategories();
        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        )
    }
    catch (error) {
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        )
    }
}