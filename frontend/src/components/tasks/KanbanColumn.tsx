import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

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

export default function KanbanColumn({
  status,
  title,
  tasks,
  onEdit,
  onDelete,
}: Props) {
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
            border-slate-200/70
            dark:border-slate-700/70
            bg-white/75
            dark:bg-slate-900/75
            backdrop-blur-xl
            shadow-lg
            hover:shadow-xl
            transition-all
            duration-300
            overflow-hidden
            min-h-[520px]
          "
        >
          {/* Column Header */}
          <div
            className="
              flex
              items-center
              justify-between
              px-5
              py-4
              border-b
              border-slate-200/70
              dark:border-slate-700/70
              bg-white/40
              dark:bg-slate-900/40
              backdrop-blur
            "
          >
            <h2 className="text-base font-semibold tracking-tight">
              {title}
            </h2>

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-slate-100
                dark:bg-slate-800
                text-xs
                font-semibold
                text-secondary
              "
            >
              {tasks.length}
            </span>
          </div>

          {/* Tasks */}
          <div className="flex-1 p-4 space-y-4">
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
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.95 : 1,
                          transform: provided.draggableProps.style?.transform,
                        }}
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
              <div className="flex h-40 items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-sm text-secondary">
                Drop tasks here
              </div>
            )}

            {p.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}