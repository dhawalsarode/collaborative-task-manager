import { prisma } from "../../prisma.js";
import { Server } from "socket.io";

export class TaskService {
  /* ================= CREATE ================= */
  static async create(
    data: {
      title: string;
      description: string;
      dueDate: string;
      priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
      assignedToId: string;
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

    if (io) {
      io.emit("task:created", task);
    }

    return task;
  }

  /* ================= LIST ================= */
  static async list() {
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

  /* ================= UPDATE ================= */
  static async update(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
      priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
      assignedToId: string;
      dueDate: string;
    }>,
    io?: Server
  ) {
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...data,
        ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
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