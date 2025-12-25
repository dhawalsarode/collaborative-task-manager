import { PrismaClient, TaskPriority, TaskStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("demo123", 10);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@taskapp.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@taskapp.com",
      password,
    },
  });

  const secondUser = await prisma.user.upsert({
    where: { email: "user2@taskapp.com" },
    update: {},
    create: {
      name: "Second User",
      email: "user2@taskapp.com",
      password,
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Initial Task",
        description: "Assigned task demo",
        dueDate: new Date(Date.now() + 86400000),
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
        creatorId: demoUser.id,
        assignedToId: secondUser.id,
      },
      {
        title: "Overdue Task",
        description: "This task is overdue",
        dueDate: new Date(Date.now() - 86400000),
        priority: TaskPriority.URGENT,
        status: TaskStatus.IN_PROGRESS,
        creatorId: secondUser.id,
        assignedToId: demoUser.id,
      },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());