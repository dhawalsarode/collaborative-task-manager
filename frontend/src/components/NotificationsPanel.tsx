import { useQuery } from "@tanstack/react-query";
import api from "../api/client";

const fetchNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data.notifications || [];
};

const NotificationsPanel = ({ notifications }: { notifications: any[] }) => {
  if (!Array.isArray(notifications)) return null;

  return (
    <div className="space-y-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="bg-white dark:bg-gray-800 border rounded p-3"
        >
          <p className="text-sm text-gray-900 dark:text-gray-100">
            You were assigned <b>{n.taskTitle}</b> by{" "}
            <b>{n.fromUserName}</b>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(n.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPanel;