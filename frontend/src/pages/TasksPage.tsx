import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import CreateTaskModal from "../components/CreateTaskModal";
import { useTasks } from "../hooks/useTasks";

import KanbanColumn from "../components/tasks/KanbanColumn";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useDeleteTask } from "../hooks/useDeleteTask";

export default function TasksPage() {
  const { data: tasks = [], isLoading } = useTasks();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const from = result.source.droppableId;
    const to = result.destination.droppableId;

    if (from === to) return;

    updateTask.mutate({
      id: result.draggableId,
      data: {
        status: to as any,
      },
    });
  };

  const filteredTasks = useMemo(() => {
    const query = search.toLowerCase();

    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    });
  }, [tasks, search]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">

        <div className="flex items-end justify-between">

          <div>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Manage your workspace
            </h1>

            <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
              Create, organize and track all tasks.
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="
              flex
              items-center
              gap-4
              rounded-xl
              bg-indigo-600
              px-5
              py-3
              font-medium
              text-white
              shadow-md
              transition
              hover:opacity-90
            "
          >
            <Plus size={18} />
            New Task
          </button>

        </div>

        <div className="relative mb-6">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              pl-11
              pr-4
              outline-none
              dark:border-slate-700
              dark:bg-slate-900
            "
          />

        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mt-6"></div>
      <div className="
                      grid
                      gap-8
                      2xl:grid-cols-4
                      xl:grid-cols-2
                      md:grid-cols-2
                      grid-cols-1
                      ">

        <KanbanColumn
          status="TODO"
          title="To Do"
          tasks={filteredTasks.filter(
            (t) => t.status === "TODO"
          )}
          onEdit={(task) => {
            setSelectedTask(task);
            setShowModal(true);
          }}
          onDelete={(id) => {
            if (window.confirm("Delete this task?")) {
              deleteTask.mutate(id);
            }
          }}
        />

        <KanbanColumn
          status="IN_PROGRESS"
          title="In Progress"
          tasks={filteredTasks.filter(
            (t) => t.status === "IN_PROGRESS"
          )}
          onEdit={(task) => {
            setSelectedTask(task);
            setShowModal(true);
          }}
          onDelete={(id) => {
            if (window.confirm("Delete this task?")) {
              deleteTask.mutate(id);
            }
          }}
        />

        <KanbanColumn
          status="REVIEW"
          title="Review"
          tasks={filteredTasks.filter(
            (t) => t.status === "REVIEW"
          )}
          onEdit={(task) => {
            setSelectedTask(task);
            setShowModal(true);
          }}
          onDelete={(id) => {
            if (window.confirm("Delete this task?")) {
              deleteTask.mutate(id);
            }
          }}
        />

        <KanbanColumn
          status="COMPLETED"
          title="Completed"
          tasks={filteredTasks.filter(
            (t) => t.status === "COMPLETED"
          )}
          onEdit={(task) => {
            setSelectedTask(task);
            setShowModal(true);
          }}
          onDelete={(id) => {
            if (window.confirm("Delete this task?")) {
              deleteTask.mutate(id);
            }
          }}
        />

      </div>
    </DragDropContext>

      {showModal && (
        <CreateTaskModal
          task={selectedTask ?? undefined}
          onClose={() => {
            setSelectedTask(null);
            setShowModal(false);
          }}
        />
      )}
  </>
  );
}