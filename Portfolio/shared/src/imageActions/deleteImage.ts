// import fs from "fs";
// import path from "path";

// const uploadDir = path.join(process.cwd(), "Portfolio/shared/uploads");

// /**
//  * Deletes an image from /Portfolio/shared/uploads
//  * @param fileName The name of the file to delete
//  */
// export async function deleteImage(fileName: string) {
//     try {
//         if (!fileName) {
//             return Response.json(
//                 { success: false, message: "File name is required" },
//                 { status: 400 }
//             );
//         }

//         const filePath = path.join(uploadDir, fileName);

//         if (!fs.existsSync(filePath)) {
//             return Response.json(
//                 { success: false, message: "File not found" },
//                 { status: 404 }
//             );
//         }

//         fs.unlinkSync(filePath);

//         return Response.json({
//             success: true,
//             message: "File deleted successfully",
//             fileName,
//         });
//     } catch (error: any) {
//         console.error("Error deleting image:", error);
//         return Response.json(
//             { success: false, message: "Failed to delete image" },
//             { status: 500 }
//         );
//     }
// }
