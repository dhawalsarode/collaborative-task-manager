import { PrismaClient, TaskPriority, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  creatorId: string;
  assignedToId: string;
}

export class TaskService {
  static async createTask(input: CreateTaskInput) {
    return prisma.task.create({ data: input });
  }

  static async listUserTasks(userId: string) {
    return prisma.task.findMany({
      where: {
        OR: [{ creatorId: userId }, { assignedToId: userId }]
      },
      orderBy: { createdAt: "desc" }
    });
  }

  static async updateTaskStatus(
    taskId: string,
    userId: string,
    status: TaskStatus
  ) {
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) throw new Error("TASK_NOT_FOUND");

    if (task.creatorId !== userId && task.assignedToId !== userId) {
      throw new Error("FORBIDDEN");
    }

    return prisma.task.update({
      where: { id: taskId },
      data: { status }
    });
  }

  static async deleteTask(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) throw new Error("TASK_NOT_FOUND");

    if (task.creatorId !== userId) {
      throw new Error("FORBIDDEN");
    }

    await prisma.task.delete({ where: { id: taskId } });
  }
}
