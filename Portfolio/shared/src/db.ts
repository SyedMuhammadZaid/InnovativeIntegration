// Portfolio/shared/src/db.ts
import { PrismaClient } from '@prisma/client';

// Prisma 7 reads DATABASE_URL from environment automatically
const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

async function main() {
  console.log("🚀 Testing Prisma 7 database connection...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");
  
  try {
    await prisma.$connect();
    console.log("✅ Successfully connected to database!");
    
    // Test query
    const userCount = await prisma.users.count();
    console.log(`📊 Total users: ${userCount}`);
    
    // Show admin user if exists
    const admin = await prisma.users.findUnique({
      where: { email: 'admin@innovativeintegration.net' }
    });
    
    if (admin) {
      console.log("✅ Admin user found:");
      console.log(`   ID: ${admin.id}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Created: ${admin.createdAt}`);
    } else {
      console.log("⚠️ Admin user not found");
    }
    
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    console.error("Error code:", error.code);
    
    if (error.code === 'P1012') {
      console.log("\n💡 Run: npx prisma generate");
    } else if (error.code === 'P1001') {
      console.log("\n💡 Cannot connect. Check DATABASE_URL");
      console.log("Current DATABASE_URL:", process.env.DATABASE_URL);
    }
  } finally {
    await prisma.$disconnect();
    console.log("🔒 Database connection closed");
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default prisma;