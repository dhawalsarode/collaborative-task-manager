import { PrismaClient } from "@prisma/client";
import { getIO } from "../../../utils/socket.js";
const prisma = new PrismaClient();
export class TaskService {
    static async createTask(input) {
        const task = await prisma.task.create({ data: input });
        const io = getIO();
        io.to(input.creatorId).emit("task:created", task);
        io.to(input.assignedToId).emit("task:created", task);
        return task;
    }
    static async listUserTasks(userId) {
        return prisma.task.findMany({
            where: {
                OR: [{ creatorId: userId }, { assignedToId: userId }]
            },
            orderBy: { createdAt: "desc" }
        });
    }
    static async updateTaskStatus(taskId, userId, status) {
        const task = await prisma.task.findUnique({ where: { id: taskId } });
        if (!task)
            throw new Error("TASK_NOT_FOUND");
        if (task.creatorId !== userId && task.assignedToId !== userId) {
            throw new Error("FORBIDDEN");
        }
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { status }
        });
        const io = getIO();
        io.to(updatedTask.creatorId).emit("task:updated", updatedTask);
        io.to(updatedTask.assignedToId).emit("task:updated", updatedTask);
        return updatedTask;
    }
    static async deleteTask(taskId, userId) {
        const task = await prisma.task.findUnique({ where: { id: taskId } });
        if (!task)
            throw new Error("TASK_NOT_FOUND");
        if (task.creatorId !== userId) {
            throw new Error("FORBIDDEN");
        }
        await prisma.task.delete({ where: { id: taskId } });
        const io = getIO();
        io.to(task.creatorId).emit("task:deleted", { taskId });
        io.to(task.assignedToId).emit("task:deleted", { taskId });
    }
}
