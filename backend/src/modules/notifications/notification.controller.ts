import { Request, Response } from "express";
import { NotificationService } from "./notification.service.js";

export class NotificationsController {
  static async list(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notifications = await NotificationService.getForUser(userId);
    res.json(notifications); 
  }

  static async markRead(req: Request, res: Response) {
    const { id } = req.params;
    await NotificationService.markRead(id);
    res.json({ success: true });
  }
}