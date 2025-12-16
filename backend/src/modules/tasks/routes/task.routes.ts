import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, TaskController.createTask);
router.get("/", authenticate, TaskController.listMyTasks);
router.patch("/:taskId/status", authenticate, TaskController.updateTaskStatus);
router.delete("/:taskId", authenticate, TaskController.deleteTask);

export default router;
