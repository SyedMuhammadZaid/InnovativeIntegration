// Portfolio/shared/src/scripts/createAdmin.ts
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// Prisma 7 reads DATABASE_URL from environment
const prisma = new PrismaClient();

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.error("Usage: tsx createAdmin.ts <email> <password>");
    process.exit(1);
}

async function main() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    try {
        const existing = await prisma.users.findUnique({
            where: { email },
        });

        if (existing) {
            console.log("Admin already exists:", email);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        console.log("✅ Admin created successfully!");
    } catch (error: any) {
        console.error("❌ Error creating admin:", error.message);
        console.error("Error code:", error.code);
    } finally {
        await prisma.$disconnect();
    }
}

main();