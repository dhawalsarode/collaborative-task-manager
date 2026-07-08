import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "../api/client";
import { Task } from "../types/task";

const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export default function useDashboard() {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const dashboard = useMemo(() => {
    const now = new Date();

    const totalTasks = tasks.length;

    const completed = tasks.filter(
      (t) => t.status === "COMPLETED"
    ).length;

    const inProgress = tasks.filter(
      (t) => t.status === "IN_PROGRESS"
    ).length;

    const review = tasks.filter(
      (t) => t.status === "REVIEW"
    ).length;

    const todo = tasks.filter(
      (t) => t.status === "TODO"
    ).length;

    const overdue = tasks.filter((t) => {
      return (
        new Date(t.dueDate) < now &&
        t.status !== "COMPLETED"
      );
    }).length;

    const today = tasks.filter((t) => {
      const due = new Date(t.dueDate);

      return (
        due.getDate() === now.getDate() &&
        due.getMonth() === now.getMonth() &&
        due.getFullYear() === now.getFullYear()
      );
    }).length;

    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round((completed / totalTasks) * 100);

    const statusChart = [
      {
        name: "Todo",
        value: todo,
      },
      {
        name: "In Progress",
        value: inProgress,
      },
      {
        name: "Review",
        value: review,
      },
      {
        name: "Completed",
        value: completed,
      },
    ];

    const priorityChart = [
      {
        name: "Low",
        value: tasks.filter((t) => t.priority === "LOW").length,
      },
      {
        name: "Medium",
        value: tasks.filter((t) => t.priority === "MEDIUM").length,
      },
      {
        name: "High",
        value: tasks.filter((t) => t.priority === "HIGH").length,
      },
      {
        name: "Urgent",
        value: tasks.filter((t) => t.priority === "URGENT").length,
      },
    ];

    const recentTasks = [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      )
      .slice(0, 5);

    return {
      tasks,

      stats: {
        totalTasks,
        completed,
        inProgress,
        review,
        todo,
        overdue,
        today,
        completionRate,
      },

      statusChart,

      priorityChart,

      recentTasks,
    };
  }, [tasks]);

  return {
    loading: isLoading,
    ...dashboard,
  };
}