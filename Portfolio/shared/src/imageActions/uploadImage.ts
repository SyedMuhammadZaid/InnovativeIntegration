// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // Find real absolute path to shared package root
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// export const uploadDir = process.env.UPLOADS_DIR || path.join(__dirname, "../../uploads");


// // Ensure directory exists
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// export async function uploadImage(file: File) {
//     if (!file) {
//         return { success: false, message: "No file provided" };
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const fileName = `${Date.now()}-${file.name}`;
//     const filePath = path.join(uploadDir, fileName);

//     fs.writeFileSync(filePath, buffer);

//     const url = `/uploads/${fileName}`;
//     return { success: true, filename: fileName, url };
// }
