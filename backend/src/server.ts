import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import { socketAuth } from "./sockets/socketAuth";
import { initSocket } from "./utils/socket";

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

initSocket(io);

io.use(socketAuth);

io.on("connection", (socket) => {
  console.log("Authenticated socket connected:", socket.id);
  console.log("User ID:", socket.data.userId);

  socket.join(socket.data.userId);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
