import { prisma } from "../../prisma.js";

export class TaskRepository {
  static create(data: any) {
    return prisma.task.create({
      data,
      include: { creator: true, assignee: true }
    });
  }

  static findAll() {
    return prisma.task.findMany({
      orderBy: { dueDate: "asc" },
      include: { creator: true, assignee: true }
    });
  }

  static findAssigned(userId: string) {
    return prisma.task.findMany({
      where: { assignedToId: userId },
      orderBy: { dueDate: "asc" }
    });
  }

  static findCreated(userId: string) {
    return prisma.task.findMany({
      where: { creatorId: userId },
      orderBy: { dueDate: "asc" }
    });
  }

  static findOverdue(userId: string) {
    return prisma.task.findMany({
      where: {
        assignedToId: userId,
        dueDate: { lt: new Date() },
        status: { not: "COMPLETED" }
      }
    });
  }

  static findById(id: string) {
    return prisma.task.findUnique({ where: { id } });
  }

  static update(id: string, data: any) {
    return prisma.task.update({
      where: { id },
      data,
      include: { creator: true, assignee: true }
    });
  }

  static delete(id: string) {
    return prisma.task.delete({ where: { id } });
  }
}