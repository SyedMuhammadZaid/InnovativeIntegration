import { updateCaseStudy } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {

        const body = await request.json();
        const { id } = params;
        let caseStudyId = Number(id);

        const { title, clientName, description, imageUrl, challenge, solution, result, advantage } = body;
        if (!title || !clientName || !challenge || !solution || !result) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        const updateCase = await updateCaseStudy({
            id: caseStudyId,
            title, clientName, description, imageUrl, challenge, solution, result, advantage
        });

        return NextResponse.json({ success: true, data: updateCase }, { status: 200 });

    }
    catch (error) {
        console.error("Error updating case study:", error);
        return NextResponse.json(
            { error: "Interal Server Error" },
            { status: 500 }
        )
    }
} 