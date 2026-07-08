import {
  Pencil,
  Trash2,
  CalendarDays,
  User,
  UserRound,
  Flag,
} from "lucide-react";

import { Task } from "../../types/task";

const PRIORITY_COLORS = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-800
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        hover:scale-[1.015]
        transition-all
        duration-300
        p-4
      "
    >
      {/* Header */}

      <div className="flex justify-between items-start gap-3">
        <h3 className="font-semibold text-base leading-tight line-clamp-2">
          {task.title}
        </h3>

        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="
              rounded-xl
              p-2
              opacity-60
              group-hover:opacity-100
              hover:bg-slate-100
              dark:hover:bg-slate-700
              transition-all
            "
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="
              rounded-xl
              p-2
              opacity-60
              group-hover:opacity-100
              hover:bg-red-50
              dark:hover:bg-red-900/30
              transition-all
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Description */}

      <p className="mt-3 text-sm text-secondary line-clamp-2">
        {task.description}
      </p>

      {/* Users */}

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="flex items-center gap-1 text-secondary">
            <User size={13} />
            Assigned
          </div>

          <div className="mt-1 font-medium">
            {task.assignee?.name ?? "Unassigned"}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-secondary">
            <UserRound size={13} />
            Created
          </div>

          <div className="mt-1 font-medium">
            {task.creator?.name}
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between">
        <span
          className={`
            flex
            items-center
            gap-1
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${PRIORITY_COLORS[task.priority]}
          `}
        >
          <Flag size={12} />
          {task.priority}
        </span>

        <span className="flex items-center gap-1 text-xs text-secondary">
          <CalendarDays size={13} />
          {new Date(task.dueDate).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
    </div>
  );
}