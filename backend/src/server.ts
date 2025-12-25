import { server } from "./sockets/socket.js";

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});