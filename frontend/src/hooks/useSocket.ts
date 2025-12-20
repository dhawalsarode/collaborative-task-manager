import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const useSocket = (
  onCreated: (task: any) => void,
  onUpdated: (task: any) => void,
  onDeleted: (taskId: string) => void
) => {
  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:5000", {
        withCredentials: true
      });
    }

    socket.on("task:created", onCreated);
    socket.on("task:updated", onUpdated);
    socket.on("task:deleted", ({ taskId }) => onDeleted(taskId));

    return () => {
      socket?.off("task:created", onCreated);
      socket?.off("task:updated", onUpdated);
      socket?.off("task:deleted");
    };
  }, []);
};
