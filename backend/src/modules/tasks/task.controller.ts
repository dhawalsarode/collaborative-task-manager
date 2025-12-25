import { Request, Response } from "express";
import { TaskService } from "./task.service.js";
import { getIO } from "../../sockets/socket.js";

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const io = getIO();
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const task = await TaskService.create(
        {
          ...req.body,
          creatorId: userId,
        },
        io
      );

      return res.status(201).json(task);
    } catch (err) {
      console.error("Create task error:", err);
      return res.status(400).json({ message: "Task creation failed" });
    }
  }

  static async list(req: Request, res: Response) {
    const tasks = await TaskService.list();
    return res.json(tasks);
  }

  static async update(req: Request, res: Response) {
    try {
      const io = getIO();
      const task = await TaskService.update(
        req.params.id,
        req.body,
        io
      );
      return res.json(task);
    } catch {
      return res.status(400).json({ message: "Update failed" });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const io = getIO();
      await TaskService.remove(req.params.id, io);
      return res.json({ success: true });
    } catch {
      return res.status(400).json({ message: "Delete failed" });
    }
  }
}