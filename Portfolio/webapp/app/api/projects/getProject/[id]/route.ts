import { getProject } from "@innovative-integration/shared";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        let id = Number(params.id);
        const res = await getProject(id);
        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        )
    }
    catch (error) {
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500 }
        )
    }
}