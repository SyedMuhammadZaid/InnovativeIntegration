export const dynamic = "force-dynamic";

import { createCaseStudy } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        const { title, clientName, description, imageUrl, challenge, solution, result, advantage } = body;
        if (!title || !clientName || !challenge || !solution || !result) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Call your Prisma helper
        const newCaseStudy = await createCaseStudy({
            title, clientName, description, imageUrl, challenge, solution, result, advantage
        });

        return NextResponse.json({ success: true, data: newCaseStudy }, { status: 201 });
    }
    catch (error) {
        console.error("Error creating casestudy:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
