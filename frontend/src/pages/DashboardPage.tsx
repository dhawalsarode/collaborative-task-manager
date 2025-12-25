// DashboardPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Bell, Sun, Moon, Trash2, Pencil } from "lucide-react";

import api from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { socket } from "../socket/socket";
import { useTheme } from "../theme/ThemeContext";
import CreateTaskModal from "../components/CreateTaskModal";

/* ================= TYPES ================= */

export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
type View = "ALL" | "ASSIGNED" | "CREATED" | "OVERDUE";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  creatorId: string;
  assignedToId?: string | null;
  creator?: User | null;
  assignedTo?: User | null;
}

/* ================= API ================= */

const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

const fetchNotifications = async (): Promise<Notification[]> => {
  const res = await api.get("/notifications");
  return Array.isArray(res.data) ? res.data : res.data.notifications ?? [];
};

/* ================= CONSTANTS ================= */

const STATUS_COLUMNS: TaskStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
];

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  COMPLETED: "Completed",
};

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  LOW: "bg-gray-200 text-gray-800",
  MEDIUM: "bg-blue-200 text-blue-800",
  HIGH: "bg-orange-200 text-orange-800",
  URGENT: "bg-red-200 text-red-800",
};

/* ================= COMPONENT ================= */

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();

  const [view, setView] = useState<View>("ALL");
  const [showCreate, setShowCreate] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  /* ================= SOCKET ================= */

  useEffect(() => {
    socket.on("task:created", () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", "notifications"] })
    );
    socket.on("task:updated", () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    );
    socket.on("task:deleted", () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    );

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [queryClient]);

  /* ================= FILTER ================= */

  const filteredTasks = useMemo(() => {
    const now = new Date();
    return tasks.filter((t) => {
      if (view === "ASSIGNED" && t.assignedToId !== user?.id) return false;
      if (view === "CREATED" && t.creatorId !== user?.id) return false;
      if (
        view === "OVERDUE" &&
        (new Date(t.dueDate) >= now || t.status === "COMPLETED")
      )
        return false;
      return true;
    });
  }, [tasks, view, user?.id]);

  /* ================= ACTIONS ================= */

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const status = result.destination.droppableId as TaskStatus;
    await api.patch(`/tasks/${result.draggableId}`, { status });
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4
                text-gray-900 dark:text-gray-100" style={{ zoom: "110%" }}>
      <div className="max-w-7xl mx-auto space-y-4">
        {/* HEADER */}
        <div className="flex justify-between items-center relative">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Dashboard
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Logged in as <b>{user?.name}</b>
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              + Create Task
            </button>

            <button
              onClick={() => setShowNotifications((s) => !s)}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700"
            >
              <Bell size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={logout}
              className="px-3 py-2 bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </div>

          {/* NOTIFICATIONS PANEL */}
          {showNotifications && (
            <div className="absolute right-0 top-14 w-80 bg-white dark:bg-gray-800 shadow-lg rounded p-3 z-50">
              <h3 className="font-semibold mb-2">Notifications</h3>
              {notifications.length === 0 && (
                <p className="text-sm text-gray-500">No notifications</p>
              )}
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {Array.isArray(notifications) &&
                notifications.map((n) => (
                  <li
                    key={n.id}
                    className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded"
                  >
                    <div>{n.message}</div>
                    <div className="text-xs opacity-70">
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* VIEW FILTER */}
        <div className="flex gap-2">
          {["ALL", "ASSIGNED", "CREATED", "OVERDUE"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as View)}
              className={`px-3 py-1 rounded ${
                view === v
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* KANBAN */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {STATUS_COLUMNS.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(p) => (
                  <div
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className="bg-gray-200 dark:bg-gray-800 p-3 rounded min-h-[400px]"
                  >
                    <h2 className="text-center font-semibold mb-3
                    text-gray-900 dark:text-gray-100">
                      {STATUS_LABELS[status]}
                    </h2>

                    {filteredTasks
                      .filter((t) => t.status === status)
                      .map((t, i) => (
                        <Draggable draggableId={t.id} index={i} key={t.id}>
                          {(d) => (
                            <div
                              ref={d.innerRef}
                              {...d.draggableProps}
                              {...d.dragHandleProps}
                              className="bg-white dark:bg-gray-700 p-3 mb-2 rounded shadow
                              text-gray-900 dark:text-gray-100">
                              <div className="flex justify-between items-center">
                                <h3 className="font-semibold">{t.title}</h3>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setEditTask(t)}
                                    className="text-blue-600"
                                  >
                                    <Pencil size={16} />
                                  </button>
                                  <button
                                    onClick={() => deleteTask(t.id)}
                                    className="text-red-600"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>

                              <p className="text-sm opacity-80">
                                {t.description}
                              </p>

                              <div className="text-xs mt-2">
                                Assigned to:{" "}
                                <b>{t.assignedTo?.name ?? "Unassigned"}</b>
                              </div>

                              <div className="flex gap-2 mt-2 text-xs">
                                <span
                                  className={`px-2 py-1 rounded ${PRIORITY_COLORS[t.priority]}`}
                                >
                                  {t.priority}
                                </span>
                                <span>
                                  {new Date(t.dueDate).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {p.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* MODALS */}
      {showCreate && (
        <CreateTaskModal onClose={() => setShowCreate(false)} />
      )}
      {editTask && (
        <CreateTaskModal task={editTask} onClose={() => setEditTask(null)} />
      )}
    </div>
  );
};

export default DashboardPage;