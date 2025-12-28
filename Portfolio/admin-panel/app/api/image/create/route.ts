export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { UPLOAD_DIR } from "@/Utils/upload-config";

// Ensure directory exists on server start
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    console.log(`📁 Created upload directory: ${UPLOAD_DIR}`);
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        // Ensure directory exists (in case of cold start)
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(filePath, buffer);

        console.log("✅ File saved to:", filePath);

        // Return the URL - This will be accessible via your /api/uploads/[filename] route
        const url = `/api/uploads/${fileName}`;
        return NextResponse.json({ success: true, url }, { status: 201 });
    } catch (err: any) {
        console.error("❌ Upload error:", err);
        return NextResponse.json(
            { success: false, message: `Failed to upload image: ${err.message}` },
            { status: 500 }
        );
    }
}