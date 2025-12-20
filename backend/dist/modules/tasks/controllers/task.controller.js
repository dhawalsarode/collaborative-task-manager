import { TaskPriority, TaskStatus } from "@prisma/client";
import { TaskService } from "../services/task.service.js";
export class TaskController {
    static async createTask(req, res) {
        try {
            const { title, description, dueDate, priority, assignedToId } = req.body;
            if (!title || !description || !dueDate || !priority || !assignedToId) {
                return res.status(400).json({ message: "All fields are required" });
            }
            if (!Object.values(TaskPriority).includes(priority)) {
                return res.status(400).json({ message: "Invalid task priority" });
            }
            const task = await TaskService.createTask({
                title,
                description,
                dueDate: new Date(dueDate),
                priority,
                creatorId: req.user.id,
                assignedToId
            });
            return res.status(201).json({ message: "Task created", task });
        }
        catch {
            return res.status(500).json({ message: "Failed to create task" });
        }
    }
    static async listMyTasks(req, res) {
        try {
            const tasks = await TaskService.listUserTasks(req.user.id);
            return res.status(200).json({ tasks });
        }
        catch {
            return res.status(500).json({ message: "Failed to fetch tasks" });
        }
    }
    static async updateTaskStatus(req, res) {
        try {
            const { taskId } = req.params;
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ message: "Status is required" });
            }
            if (!Object.values(TaskStatus).includes(status)) {
                return res.status(400).json({ message: "Invalid task status" });
            }
            const task = await TaskService.updateTaskStatus(taskId, req.user.id, status);
            return res.status(200).json({ message: "Task status updated", task });
        }
        catch (error) {
            if (error.message === "TASK_NOT_FOUND") {
                return res.status(404).json({ message: "Task not found" });
            }
            if (error.message === "FORBIDDEN") {
                return res.status(403).json({ message: "Not allowed to update this task" });
            }
            return res.status(500).json({ message: "Failed to update task status" });
        }
    }
    static async deleteTask(req, res) {
        try {
            const { taskId } = req.params;
            await TaskService.deleteTask(taskId, req.user.id);
            return res.status(204).send();
        }
        catch (error) {
            if (error.message === "TASK_NOT_FOUND") {
                return res.status(404).json({ message: "Task not found" });
            }
            if (error.message === "FORBIDDEN") {
                return res.status(403).json({ message: "Not allowed to delete this task" });
            }
            return res.status(500).json({ message: "Failed to delete task" });
        }
    }
}
