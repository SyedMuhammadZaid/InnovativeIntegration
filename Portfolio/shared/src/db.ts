import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("hello its running")
    return
}

main()
    .catch((e) => console.log(e))
    .finally(async () => await prisma.$disconnect())