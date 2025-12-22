import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/routes/auth.routes.js";
import taskRoutes from "./modules/tasks/routes/task.routes.js";

const app = express();

const allowedOrigins = [
  "https://collaborative-task-manager-ll1q.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
