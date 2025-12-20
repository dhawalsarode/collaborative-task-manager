import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";
import { authenticate } from "../../../middleware/auth.middleware.js";
const router = Router();
// All task routes require authentication
router.use(authenticate);
// Create a task
router.post("/", TaskController.createTask);
// List tasks for logged-in user
router.get("/", TaskController.listMyTasks);
// Update task status
router.patch("/:taskId/status", TaskController.updateTaskStatus);
// Delete a task
router.delete("/:taskId", TaskController.deleteTask);
export default router;
