export const dynamic = "force-dynamic";

import { deleteCareerPost } from "@innovative-integration/shared";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {

        const { id } = params;
        let careerId = Number(id);

        const updateCareer = await deleteCareerPost(careerId);

        return NextResponse.json(
            { success: true, data: updateCareer },
            { status: 200 }
        )
    }
    catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}