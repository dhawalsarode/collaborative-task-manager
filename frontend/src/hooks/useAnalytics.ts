import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { Task } from "../types/task";

const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

const PRIORITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
] as const;

const STATUSES = [
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
] as const;

const STATUS_LABELS = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  COMPLETED: "Completed",
} as const;

export default function useAnalytics() {
  const { user } = useAuth();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const analytics = useMemo(() => {
    const now = new Date();

    const isSameDay = (
      dateString: string | undefined,
      day: Date
    ) => {
      if (!dateString) return false;

      const date = new Date(dateString);

      return (
        date.getDate() === day.getDate() &&
        date.getMonth() === day.getMonth() &&
        date.getFullYear() === day.getFullYear()
      );
    };

    /* ================= Summary ================= */

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

    const overdue = tasks.filter(
      (task) =>
        new Date(task.dueDate) < now &&
        task.status !== "COMPLETED"
    ).length;

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

    const productivityScore = completionRate;

    const productivityLabel = `${completedTasks.length} of ${tasks.length} tasks completed`;

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

    /* ================= My Analytics ================= */

    const assignedStatus = STATUSES.map((status) => ({
      status: STATUS_LABELS[status],
      tasks: tasks.filter(
        (t) =>
          t.assignedToId === user?.id &&
          t.status === status
      ).length,
    }));

    const createdStatus = STATUSES.map((status) => ({
      status: STATUS_LABELS[status],
      tasks: tasks.filter(
        (t) =>
          t.creatorId === user?.id &&
          t.status === status
      ).length,
    }));

    const weeklyAssignedVsCreated = Array.from(
      { length: 7 },
      (_, i) => {
        const day = new Date();

        day.setDate(now.getDate() - (6 - i));

        return {
          day: day.toLocaleDateString("en-US", {
            weekday: "short",
          }),

          assigned: tasks.filter(
            (task) =>
              task.assignedToId === user?.id &&
              isSameDay(task.createdAt, day)
          ).length,

          created: tasks.filter(
            (task) =>
              task.creatorId === user?.id &&
              isSameDay(task.createdAt, day)
          ).length,
        };
      }
    );

    /* ================= Workspace Analytics ================= */

    const weeklyCompletion = Array.from(
      { length: 7 },
      (_, i) => {
        const day = new Date();

        day.setDate(now.getDate() - (6 - i));

        return {
          day: day.toLocaleDateString("en-US", {
            weekday: "short",
          }),

          completed: completedTasks.filter((task) =>
            isSameDay(task.completedAt!, day)
          ).length,
        };
      }
    );

    const priorityChart = PRIORITIES.map((priority) => ({
      name:
        priority.charAt(0) +
        priority.slice(1).toLowerCase(),

      value: tasks.filter(
        (t) => t.priority === priority
      ).length,
    }));

    const completionByPriority = PRIORITIES.map(
      (priority) => {
        const all = tasks.filter(
          (t) => t.priority === priority
        );

        const completed = all.filter(
          (t) => t.status === "COMPLETED"
        );

        return {
          priority:
            priority.charAt(0) +
            priority.slice(1).toLowerCase(),

          rate:
            all.length === 0
              ? 0
              : Math.round(
                  (completed.length / all.length) * 100
                ),
        };
      }
    );

    return {
      productivityScore,
      productivityLabel,
      averageCompletionTime,
      completedThisWeek,
      overdueRate,

      assignedStatus,
      createdStatus,
      weeklyAssignedVsCreated,

      weeklyCompletion,
      priorityChart,
      completionByPriority,
    };
  }, [tasks, user]);

  return {
    loading: isLoading,
    ...analytics,
  };
}