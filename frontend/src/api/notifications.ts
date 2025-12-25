import api from "./client";

export const fetchNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data.notifications;
};