import { prisma } from "../../prisma.js";
import { TaskStatus } from "@prisma/client";

export class TaskRepository {
  static async findAll() {
    return prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        creator: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  static async findOverdue() {
    return prisma.task.findMany({
      where: {
        status: { not: TaskStatus.COMPLETED },
        dueDate: { lt: new Date() },
      },
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        creator: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }
}