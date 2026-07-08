export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "REVIEW"
  | "COMPLETED";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Notification {
  id: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export interface Task {
  id: string;

  title: string;
  description: string;

  dueDate: string;
  createdAt: string;
  updatedAt: string;

  priority: TaskPriority;
  status: TaskStatus;

  creatorId: string;
  assignedToId?: string | null;

  creator?: User | null;
  assignee?: User | null;
}