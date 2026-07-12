import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "../api/client";
import { Task } from "../types/task";

const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export default function useAnalytics() {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const analytics = useMemo(() => {
    const now = new Date();

    const completedTasks = tasks.filter(
      (task) => task.completedAt
    );

    const completedThisWeek = completedTasks.filter((task) => {
      const completed = new Date(task.completedAt!);

      return (
        now.getTime() - completed.getTime() <=
        7 * 24 * 60 * 60 * 1000
      );
    }).length;

    const overdue = tasks.filter((task) => {
      return (
        new Date(task.dueDate) < now &&
        task.status !== "COMPLETED"
      );
    }).length;

    const completionRate =
      tasks.length === 0
        ? 0
        : Math.round(
            (completedTasks.length / tasks.length) * 100
          );

    const overdueRate =
      tasks.length === 0
        ? 0
        : Math.round((overdue / tasks.length) * 100);

    const productivityScore =
      Math.max(
        0,
        Math.round(completionRate - overdueRate * 0.5)
      );

    const productivityLabel =
      productivityScore >= 90
        ? "Excellent"
        : productivityScore >= 75
        ? "Good"
        : productivityScore >= 50
        ? "Fair"
        : "Needs Attention";

    const averageCompletionTime =
      completedTasks.length === 0
        ? 0
        : Math.round(
            completedTasks.reduce((sum, task) => {
              const created = new Date(task.createdAt!);
              const completed = new Date(task.completedAt!);

              return (
                sum +
                (completed.getTime() - created.getTime()) /
                  (1000 * 60 * 60 * 24)
              );
            }, 0) / completedTasks.length
          );

    const weeklyCompletion = Array.from(
      { length: 7 },
      (_, i) => {
        const day = new Date();

        day.setDate(now.getDate() - (6 - i));

        return {
          day: day.toLocaleDateString("en-US", {
            weekday: "short",
          }),

          completed: completedTasks.filter((task) => {
            const completed = new Date(
              task.completedAt!
            );

            return (
              completed.getDate() === day.getDate() &&
              completed.getMonth() === day.getMonth() &&
              completed.getFullYear() ===
                day.getFullYear()
            );
          }).length,
        };
      }
    );

    const priorityChart = [
      {
        name: "Low",
        value: tasks.filter(
          (t) => t.priority === "LOW"
        ).length,
      },
      {
        name: "Medium",
        value: tasks.filter(
          (t) => t.priority === "MEDIUM"
        ).length,
      },
      {
        name: "High",
        value: tasks.filter(
          (t) => t.priority === "HIGH"
        ).length,
      },
      {
        name: "Urgent",
        value: tasks.filter(
          (t) => t.priority === "URGENT"
        ).length,
      },
    ];

    const statusChart = [
      {
        name: "Todo",
        value: tasks.filter(
          (t) => t.status === "TODO"
        ).length,
      },
      {
        name: "Progress",
        value: tasks.filter(
          (t) => t.status === "IN_PROGRESS"
        ).length,
      },
      {
        name: "Review",
        value: tasks.filter(
          (t) => t.status === "REVIEW"
        ).length,
      },
      {
        name: "Completed",
        value: completedTasks.length,
      },
    ];

    return {
      productivityScore,
      productivityLabel,
      averageCompletionTime,
      completedThisWeek,
      overdueRate,
      weeklyCompletion,
      priorityChart,
      statusChart,
    };
  }, [tasks]);

  return {
    loading: isLoading,
    ...analytics,
  };
}