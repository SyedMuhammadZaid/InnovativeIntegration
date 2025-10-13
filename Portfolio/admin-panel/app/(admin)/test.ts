// "use client";
// import React from "react";

// const Test = () => {
//     const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         try {
//             const formData = new FormData();
//             formData.append("file", file);

//             // Call your API route (adjust path if needed)
//             const res = await fetch("/api/image/create", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!res.ok) throw new Error("Upload failed");

//             const data = await res.json();
//             console.log("✅ Upload successful:", data);
//             alert("Image uploaded successfully!");
//         } catch (err) {
//             console.error("❌ Upload error:", err);
//             alert("Upload failed");
//         }
//     };

//     return (
//         <div style={{ padding: 20 }}>
//             <p>Upload image</p>
//             <input type="file" onChange={fileChangeHandler} />
//         </div>
//     );
// };

// export default Test;
