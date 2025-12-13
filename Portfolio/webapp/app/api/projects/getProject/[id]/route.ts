import { getProject } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        let id = params.id;
        const res = await getProject(Number(id));
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