import api from "./client";

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const fetchNotifications = async (): Promise<Notification[]> => {
  const res = await api.get("/notifications");
  return res.data;
};

export const markNotificationRead = (id: string) =>
  api.patch(`/notifications/${id}/read`);

export const markAllNotificationsRead = () =>
  api.patch("/notifications/read-all");