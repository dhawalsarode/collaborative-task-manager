import { prisma } from "../../prisma.js";
import { getIO } from "../../sockets/socket.js";

export class NotificationService {
  static async create(userId: string, message: string) {
    const notification = await prisma.notification.create({
      data: {
        userId,
        message,
      },
    });

    getIO()
      .to(userId)
      .emit("notification:new", notification);

    return notification;
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

  static async markAllRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });
  }
}