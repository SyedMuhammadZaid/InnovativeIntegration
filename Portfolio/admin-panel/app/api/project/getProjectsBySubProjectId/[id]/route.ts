export const dynamic = "force-dynamic";

import { getAllProjectsBySubProjectId } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const projectId = Number(id);
        const res = await getAllProjectsBySubProjectId(projectId);
        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        )
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}