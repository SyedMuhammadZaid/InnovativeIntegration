import { getPrisma } from "../prisma";
import bcrypt from "bcryptjs";

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.error("Usage: node createAdmin <email> <password>");
    process.exit(1);
}

async function main() {
    const prisma = getPrisma();

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
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((err) => {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
});
