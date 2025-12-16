import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/routes/auth.routes";
import taskRoutes from "./modules/tasks/routes/task.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
