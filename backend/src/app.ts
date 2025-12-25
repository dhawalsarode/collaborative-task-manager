import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import notificationRoutes from "./modules/notifications/notifications.route.js";

const app = express();

/* ================= CORS CONFIG ================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://collaborative-task-manager-ll1q.vercel.app",
  "https://collaborative-task-manager-l-git-f71fd9-dhawal-sarodes-projects.vercel.app",
  "https://collaborative-task-manager-ll1q-fdxhfqvie.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */

app.use(express.json());
app.use(cookieParser());

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);

/* ================= HEALTH CHECK (OPTIONAL BUT RECOMMENDED) ================= */

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;