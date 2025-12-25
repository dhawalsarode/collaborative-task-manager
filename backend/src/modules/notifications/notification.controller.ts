import { Request, Response } from "express";
import { prisma } from "../../prisma.js";

export class NotificationsController {
  static async list(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ notifications });
  }

  static async markRead(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    res.json({ success: true });
  }
}