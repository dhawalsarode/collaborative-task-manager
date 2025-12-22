import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("demo123", 10);

  await prisma.user.upsert({
    where: { email: "demo@taskapp.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@taskapp.com",
      password: passwordHash
    }
  });

  console.log("✅ Demo user created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
