export const dynamic = "force-dynamic";

import { createProject } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, imageUrl, clientName, challenge, solution, approach, result, impact, projectSubCategoryId } = body;
        if (!name || !clientName || !challenge || !solution || !approach || !result || !impact || !projectSubCategoryId) {
            return NextResponse.json(
                { error: "Missing Required Fields" },
                { status: 400 }
            )
        }
        const res = await createProject({
            name,
            imageUrl,
            clientName,
            challenge,
            solution,
            approach,
            result,
            impact,
            projectSubCategoryId
        })
        return NextResponse.json(
            { success: true, data: res },
            { status: 201 }
        )
    }
    catch (error) {
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        )
    }
}