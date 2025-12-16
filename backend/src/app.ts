import express from "express";
import cors from "cors";

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running"
  });
});

export default app;
