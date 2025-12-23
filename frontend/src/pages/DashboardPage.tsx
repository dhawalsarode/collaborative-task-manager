import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

import api from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { useSocket } from "../hooks/useSocket";
import { useTheme } from "../theme/ThemeContext";

type Status = "TODO" | "IN_PROGRESS" | "DONE";
type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
}

const columns: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

const labels: Record<Status, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done"
};

const DashboardPage = () => {
  const { user } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 FILTER & SORT STATE (NEW)
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "ALL">("ALL");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  // 🔹 SOCKET UPDATES (UNCHANGED)
  useSocket(
    (task) =>
      setTasks((prev) =>
        prev.some((t) => t.id === task.id) ? prev : [task, ...prev]
      ),
    (updated) =>
      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      ),
    (id) => setTasks((prev) => prev.filter((t) => t.id !== id))
  );

  // 🔹 LOAD TASKS WITH FILTERS + SORT
  const loadTasks = async () => {
    setLoading(true);

    const params: any = {};
    if (statusFilter !== "ALL") params.status = statusFilter;
    if (priorityFilter !== "ALL") params.priority = priorityFilter;

    params.sortBy = "dueDate";
    params.order = sortOrder;

    const res = await api.get<{ tasks: Task[] }>("/tasks", { params });
    setTasks(res.data.tasks);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, [statusFilter, priorityFilter, sortOrder]);

  // 🔹 CREATE TASK
  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await api.post("/tasks", {
      title,
      description,
      dueDate: new Date().toISOString(),
      priority: "MEDIUM",
      assignedToId: user.id
    });

    setTitle("");
    setDescription("");
  };

  // 🔹 UPDATE STATUS
  const updateStatus = async (id: string, status: Status) => {
    await api.patch(`/tasks/${id}/status`, { status });
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    await updateStatus(
      result.draggableId,
      result.destination.droppableId as Status
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:opacity-80"
          >
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border px-3 py-2 rounded"
          >
            <option value="ALL">All Status</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="border px-3 py-2 rounded"
          >
            <option value="ALL">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="border px-3 py-2 rounded"
          >
            <option value="ASC">Due Date ↑</option>
            <option value="DESC">Due Date ↓</option>
          </select>
        </div>

        {/* CREATE TASK */}
        <form
          onSubmit={createTask}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 flex gap-4"
        >
          <input
            className="flex-1 border dark:border-gray-600 bg-transparent px-3 py-2 rounded"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="flex-1 border dark:border-gray-600 bg-transparent px-3 py-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700">
            Create
          </button>
        </form>

        {/* TASK BOARD */}
        {loading ? (
          <p className="text-center text-gray-400">Loading tasks…</p>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {columns.map((col) => (
                <Droppable droppableId={col} key={col}>
                  {(p) => (
                    <div
                      ref={p.innerRef}
                      {...p.droppableProps}
                      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow min-h-[400px]"
                    >
                      <h2 className="text-center font-semibold mb-4">
                        {labels[col]}
                      </h2>

                      {tasks.filter((t) => t.status === col).length === 0 ? (
                        <p className="text-sm text-gray-400 text-center">
                          Drag tasks here
                        </p>
                      ) : (
                        tasks
                          .filter((t) => t.status === col)
                          .map((task, i) => (
                            <Draggable
                              draggableId={task.id}
                              index={i}
                              key={task.id}
                            >
                              {(p) => (
                                <div
                                  ref={p.innerRef}
                                  {...p.draggableProps}
                                  {...p.dragHandleProps}
                                  className="bg-white dark:bg-gray-700 p-4 mb-3 rounded shadow border dark:border-gray-600"
                                >
                                  <h3 className="font-semibold">
                                    {task.title}
                                  </h3>
                                  <p className="text-sm opacity-80">
                                    {task.description}
                                  </p>
                                  <p className="text-xs mt-1 opacity-60">
                                    Priority: {task.priority}
                                  </p>
                                </div>
                              )}
                            </Draggable>
                          ))
                      )}

                      {p.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
