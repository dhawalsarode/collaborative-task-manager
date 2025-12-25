import { prisma } from "../../prisma.js";

export class NotificationService {
  static async create(userId: string, message: string) {
    return prisma.notification.create({
      data: {
        userId,
        message,
      },
    });
  }

  static async getForUser(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async markRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }
}