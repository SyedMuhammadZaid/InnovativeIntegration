export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // ensures Node.js environment for fs and logging

// ✅ FIX: point explicitly to the admin-panel's public/uploads folder
const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
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
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        fs.writeFileSync(filePath, buffer);

        console.log("Saving file to:", filePath);

        // ✅ Return static public URL
        const url = `/api/uploads/${fileName}`;
        return NextResponse.json({ success: true, url }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Failed to upload image" },
            { status: 500 }
        );
    }
}
