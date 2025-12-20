import http from "http";
import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { Server as SocketIOServer } from "socket.io";

import app from "./app.js";
import { initSocket } from "./utils/socket.js";
import { socketAuth } from "./sockets/socketAuth.js";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

/* =====================================
   DEMO USER AUTO-CREATION (CRITICAL FIX)
===================================== */
async function ensureDemoUser() {
  const email = "demo@taskapp.com";
  const password = "demo123";

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (!existing) {
    const hash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: "Demo User",
        email,
        password: hash,
      },
    });

    console.log("✅ Demo user created");
  } else {
    console.log("ℹ️ Demo user already exists");
  }
}

/* =====================================
   START SERVER AFTER DB CHECK
===================================== */
async function startServer() {
  await ensureDemoUser();

  const httpServer = http.createServer(app);

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  initSocket(io);

  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("Authenticated socket connected:", socket.id);
    socket.join(socket.data.userId);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Server failed to start", err);
});
