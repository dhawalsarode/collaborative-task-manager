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
        rounded-2xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-800
        p-3.5
        shadow-sm
        transition-shadow
        duration-200
        hover:shadow-xl
        cursor-grab
        active:cursor-grabbing
        "
    >
      {/* Header */}

      <div className="flex justify-between items-start gap-3">
        <h3 className="font-semibold text-slate-900 dark:text-white text-[15px] leading-tight line-clamp-2">
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
              text-slate-600 dark:text-slate-300
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
              text-slate-500
              hover:text-red-600
              dark:text-slate-400
              dark:hover:text-red-400
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

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
        {task.description}
      </p>

      {/* Users */}

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <User size={13} />
            Assigned
          </div>

          <div className="mt-1 font-medium text-slate-900 dark:text-slate-200">
            {task.assignee?.name ?? "Unassigned"}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <UserRound size={13} />
            Created
          </div>

          <div className="mt-1 font-medium text-slate-900 dark:text-slate-200">
            {task.creator?.name}
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between">
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
            !text-current
          `}
        >
          <Flag size={12} />
          {task.priority}
        </span>

        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
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