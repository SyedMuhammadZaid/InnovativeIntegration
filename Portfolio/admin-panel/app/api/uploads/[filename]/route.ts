export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { UPLOAD_DIR } from "@/Utils/upload-config";

export async function GET(
    req: NextRequest,
    { params }: { params: { filename: string } }
) {
    try {
        // Sanitize filename
        const filename = params.filename.replace(/\.\./g, ''); // Prevent directory traversal

        const filePath = path.join(UPLOAD_DIR, filename);

        if (!fs.existsSync(filePath)) {
            console.log(`❌ File not found: ${filePath}`);
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const file = fs.readFileSync(filePath);
        const ext = path.extname(filename).toLowerCase();

        // Determine MIME type
        let mime = "application/octet-stream";
        const mimeTypes: Record<string, string> = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
        };

        if (mimeTypes[ext]) {
            mime = mimeTypes[ext];
        }

        // Set cache headers for better performance
        return new NextResponse(file, {
            headers: {
                "Content-Type": mime,
                "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    } catch (error: any) {
        console.error("❌ Error serving upload:", error);
        return NextResponse.json({ error: `Failed to load file: ${error.message}` }, { status: 500 });
    }
}