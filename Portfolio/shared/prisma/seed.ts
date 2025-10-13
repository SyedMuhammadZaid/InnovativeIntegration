import prisma from "../src/prisma";

async function main() {

    // seeding ProjectMainCategory
    const projectCategories = [
        { id: 1, name: "Cybersecurity & Network Security Projects" },
        { id: 2, name: "Backup and Recovery Projects" },
        { id: 3, name: "Enterprise Storage Projects (NetApp)" },
        { id: 4, name: "Datacenter Projects" },
        { id: 5, name: "Local Traffic Load-Balancing" },
        { id: 6, name: "Global Server Load-Balancing" },
    ];

    for (const category of projectCategories) {
        await prisma.projectMainCategory.upsert({
            where: { id: category.id, name: category.name }, // avoid duplicates
            update: {},
            create: category,
        });
    }

    console.log("✅ ProjectMainCategory seeded successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

