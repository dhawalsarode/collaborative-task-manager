import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../../../middleware/auth.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/me", authenticate, (req, res) => {
  return res.status(200).json({
    message: "Authenticated user",
    user: req.user
  });
});

export default router;
