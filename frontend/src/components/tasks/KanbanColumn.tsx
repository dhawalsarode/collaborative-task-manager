import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import {
  ClipboardList,
  PlayCircle,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";

import TaskCard from "./TaskCard";
import {
  Task,
  TaskStatus,
} from "../../types/task";

interface Props {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const columnStyles: Record<
  TaskStatus,
  {
    accent: string;
    badge: string;
    icon: React.ElementType;
    iconColor: string;
  }
> = {
  TODO: {
    accent: "bg-slate-500",
    badge:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    icon: ClipboardList,
    iconColor: "text-slate-500",
  },

  IN_PROGRESS: {
    accent: "bg-blue-500",
    badge:
      "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    icon: PlayCircle,
    iconColor: "text-blue-500",
  },

  REVIEW: {
    accent: "bg-amber-500",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    icon: ClipboardCheck,
    iconColor: "text-amber-500",
  },

  COMPLETED: {
    accent: "bg-emerald-500",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
};

export default function KanbanColumn({
  status,
  title,
  tasks,
  onEdit,
  onDelete,
}: Props) {
  const style = columnStyles[status];

  const Icon = style.icon;

  return (
    <Droppable droppableId={status}>
      {(p) => (
        <div
            ref={p.innerRef}
            {...p.droppableProps}
            className="
              flex
              flex-col
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white/80
              dark:bg-slate-900/80
              shadow-lg
              hover:shadow-xl
              transition-all
              duration-300
              overflow-hidden
              min-h-[540px]
            "
          >

            <div
              className={`
                h-1.5
                w-full
                ${style.accent}
              `}
            />
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              px-6
              py-5
              border-b
              border-slate-200
              dark:border-slate-700
              bg-white/40
              dark:bg-slate-900/40
              backdrop-blur
            "
          >
            <div className="flex items-center gap-3">

              <Icon
                size={21}
                className={style.iconColor}
              />

              <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h2>

            </div>

            <span
              className={`
                flex
                h-9
                min-w-[36px]
                items-center
                justify-center
                rounded-full
                px-3
                text-sm
                font-semibold
                ${style.badge}
              `}
            >
              {tasks.length}
            </span>
          </div>

          {/* Tasks */}

          <div className="flex-1 space-y-5 p-5">

            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {tasks.length === 0 && (
              <div
                className="
                  flex
                  h-44
                  flex-col
                  items-center
                  justify-center
                  rounded-3xl
                  border-2
                  border-dashed
                  border-slate-300
                  dark:border-slate-700
                  bg-slate-50/50
                  dark:bg-slate-950/20
                  text-center
                  transition-colors
                "
              >
                <ClipboardList
                  size={42}
                  className="text-slate-400"
                />

                <p className="mt-4 text-base font-semibold text-slate-700 dark:text-slate-300">
                  No tasks
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Drag a task here
                </p>
              </div>
            )}

            {p.placeholder}

          </div>
        </div>
      )}
    </Droppable>
  );
}