import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const uploadDir = path.join(process.cwd(), "public/uploads");

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    let fileName = searchParams.get("file");

    if (!fileName) {
        return NextResponse.json(
            { success: false, message: "File name missing" },
            { status: 400 }
        );
    }

    if (fileName.startsWith('/uploads')) {
        fileName = fileName?.replace('/uploads/', '/');
    }

    const filePath = path.join(uploadDir, fileName);
    if (!fs.existsSync(filePath)) {
        return NextResponse.json(
            { success: false, message: "File not found" },
            { status: 404 }
        );
    }

    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true, message: "Deleted" });
}
