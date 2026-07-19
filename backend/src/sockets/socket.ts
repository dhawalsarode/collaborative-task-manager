import http from "http";
import { Server } from "socket.io";
import app from "../app.js";
import { socketAuth } from "./socketAuth.js";

let io: Server;

const server = http.createServer(app);

const allowedOrigins: string[] = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.use(socketAuth);

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  const userId = socket.data.user.id;

  socket.join(userId);

  console.log(`User ${userId} joined room ${userId}`);

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

export function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

export { server };