import { NextResponse } from "next/server";
import { signIn } from "@innovative-integration/shared";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = await signIn(body)
        if (response.error) {
            return NextResponse.json({ error: response.error }, { status: 401 });
        }
        return NextResponse.json(
            { success: true, data: response },
            { status: 200 }
        );
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}
