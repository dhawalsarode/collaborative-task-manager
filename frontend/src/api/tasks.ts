import api from "./client";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
  creatorId: string;
  assignedToId: string;
}

export const fetchTasks = async () => {
  const res = await api.get("/tasks");
  return res.data.tasks;
};

export const createTask = (data: any) =>
  api.post("/tasks", data);

export const updateTask = (id: string, data: any) =>
  api.patch(`/tasks/${id}`, data);