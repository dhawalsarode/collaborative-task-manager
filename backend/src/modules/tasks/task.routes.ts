import { Router } from "express";
import { TaskController } from "./task.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, TaskController.list);
router.post("/", authenticate, TaskController.create);
router.patch("/:id", authenticate, TaskController.update);
router.delete("/:id", authenticate, TaskController.remove);

export default router;