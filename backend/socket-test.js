const { io } = require("socket.io-client");
const axios = require("axios");

const loginAndConnect = async () => {
  const loginResponse = await axios.post(
    "http://localhost:5000/api/auth/login",
    {
      email: "test@example.com",
      password: "password123"
    },
    {
      withCredentials: true,
      validateStatus: () => true
    }
  );

  const cookies = loginResponse.headers["set-cookie"];

  const socket = io("http://localhost:5000", {
    extraHeaders: {
      Cookie: cookies.join("; ")
    }
  });

  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  socket.on("task:created", (task) => {
    console.log("REALTIME → task created:", task.id);
  });

  socket.on("task:updated", (task) => {
    console.log("REALTIME → task updated:", task.id, task.status);
  });

  socket.on("task:deleted", (data) => {
    console.log("REALTIME → task deleted:", data.taskId);
  });
};

loginAndConnect();
