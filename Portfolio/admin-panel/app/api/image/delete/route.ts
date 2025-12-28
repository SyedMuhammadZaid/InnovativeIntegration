export const dynamic = "force-dynamic";

import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { UPLOAD_DIR } from "@/Utils/upload-config";

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        let fileName = searchParams.get("file");

        if (!fileName) {
            return NextResponse.json(
                { success: false, message: "File name missing" },
                { status: 400 }
            );
        }

        // ✅ Handle different URL formats
        fileName = fileName
            .replace(/^\/api\/uploads\//, "")
            .replace(/^\/uploads\//, "")
            .replace(/^\//, ""); // Remove leading slash

        const filePath = path.join(UPLOAD_DIR, fileName);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { success: false, message: "File not found" },
                { status: 404 }
            );
        }

        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted file: ${filePath}`);

        return NextResponse.json({
            success: true,
            message: `Deleted ${fileName}`,
        });
    } catch (error: any) {
        console.error("❌ Delete error:", error);
        return NextResponse.json(
            { success: false, message: `Failed to delete file: ${error.message}` },
            { status: 500 }
        );
    }
}