export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // ensure filesystem access

export async function GET(
    req: NextRequest,
    { params }: { params: { filename: string } }
) {
    try {
        const filePath = path.join(process.cwd(), "public/uploads", params.filename);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const file = fs.readFileSync(filePath);
        const ext = path.extname(params.filename).toLowerCase();
        const mime =
            ext === ".png"
                ? "image/png"
                : ext === ".jpg" || ext === ".jpeg"
                    ? "image/jpeg"
                    : ext === ".gif"
                        ? "image/gif"
                        : "application/octet-stream";

        return new NextResponse(file, {
            headers: { "Content-Type": mime },
        });
    } catch (error) {
        console.error("❌ Error serving upload:", error);
        return NextResponse.json({ error: "Failed to load file" }, { status: 500 });
    }
}
