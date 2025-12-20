import http from "http";
import app from "./app.js";
import "dotenv/config";
import { Server as SocketIOServer } from "socket.io";
import { initSocket } from "./utils/socket.js";
import { socketAuth } from "./sockets/socketAuth.js";

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
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
  console.log(`Server running on port ${PORT}`);
});
