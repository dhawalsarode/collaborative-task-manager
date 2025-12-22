import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const SOCKET_URL = import.meta.env.PROD
  ? "https://collaborative-task-manager-backend-gve1.onrender.com"
  : "http://localhost:5000";

export const useSocket = (
  onCreated?: (task: any) => void,
  onUpdated?: (task: any) => void,
  onDeleted?: (taskId: string) => void
) => {
  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"]
      });
    }

    if (onCreated) socket.on("task:created", onCreated);
    if (onUpdated) socket.on("task:updated", onUpdated);
    if (onDeleted)
      socket.on("task:deleted", ({ taskId }) => onDeleted(taskId));

    return () => {
      if (!socket) return;

      if (onCreated) socket.off("task:created", onCreated);
      if (onUpdated) socket.off("task:updated", onUpdated);
      if (onDeleted) socket.off("task:deleted");
    };
  }, []);
};
