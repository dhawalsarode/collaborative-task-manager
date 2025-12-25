import http from "http";
import { Server } from "socket.io";
import app from "../app.js";
import { socketAuth } from "./socketAuth.js";

let io: Server;

const server = http.createServer(app);

io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.use(socketAuth);

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);
});

export function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

export { server };