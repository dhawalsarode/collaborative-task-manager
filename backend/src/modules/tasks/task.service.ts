import { prisma } from "../../prisma.js";
import { Server } from "socket.io";
import { NotificationService } from "../notifications/notification.service.js";

export class TaskService {
  /* ================= CREATE ================= */
  static async create(
    data: {
      title: string;
      description: string;
      dueDate: string;
      priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
      assignedToId: string | null;
      creatorId: string;
    },
    io?: Server
  ) { 
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: new Date(data.dueDate),
        assignedToId: data.assignedToId,
        creatorId: data.creatorId,
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
    if (
      task.assignedToId &&
      task.assignedToId !== task.creatorId
    ) {
      console.log("Creating notification for:", task.assignedToId);
      await NotificationService.create(
        task.assignedToId,
        `${task.creator.name} assigned you a task: "${task.title}"`
      );
    }
    if (io) {
      io.emit("task:created", task);
    }

    return task;
  }

  /* ================= LIST ================= */
  static async list(userId: string) {
    return prisma.task.findMany({
  where: {
    OR: [
      { creatorId: userId },
      { assignedToId: userId },
    ],
  },
  orderBy: { createdAt: "desc" },
  include: {
    assignee: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
    creator: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },
  },
});}

  /* ================= UPDATE ================= */
  static async update(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
      priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
      assignedToId: string | null;
      dueDate: string;
    }>,
    io?: Server
  ) {
    const updateData: Record<string, any> = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.assignedToId !== undefined)
      updateData.assignedToId = data.assignedToId;
    if (data.dueDate !== undefined)
      updateData.dueDate = new Date(data.dueDate);

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        creator: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    if (
        task.assignedToId &&
        task.assignedToId !== task.creatorId
      ) {
        await NotificationService.create(
          task.assignedToId,
          `${task.creator.name} assigned you a task: "${task.title}"`
        );
      }
    if (io) {
      io.emit("task:updated", task);
    }

    return task;
  }

  /* ================= DELETE ================= */
  static async remove(id: string, io?: Server) {
    await prisma.task.delete({ where: { id } });

    if (io) {
      io.emit("task:deleted", { id });
    }
  }
}