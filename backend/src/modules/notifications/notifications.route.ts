import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { NotificationsController } from "./notification.controller.js";

const router = Router();

router.get("/", authenticate, NotificationsController.list);
router.patch("/:id/read", authenticate, NotificationsController.markRead);

export default router;