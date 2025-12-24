export const dynamic = "force-dynamic";

import { updateProject } from "@innovative-integration/shared";
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { id } = params;
        const projectId = Number(id);

        const { name, imageUrl, clientName, challenge, solution, approach, result, impact, projectSubCategoryId } = body;
        if (!name || !clientName || !challenge || !solution || !approach || !result || !impact || !projectSubCategoryId) {
            return NextResponse.json(
                { error: "Missing Required Fields" },
                { status: 400 }
            )
        }

        const res = await updateProject({
            id: projectId,
            name,
            imageUrl,
            clientName,
            challenge,
            solution,
            approach,
            result,
            impact,
            projectSubCategoryId
        });

        return NextResponse.json(
            { success: true, data: res },
            { status: 200 }
        )
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        )
    }
}