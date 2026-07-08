import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import CreateTaskModal from "../components/CreateTaskModal";
import { useTasks } from "../hooks/useTasks";
import TaskCard from "../components/tasks/TaskCard";

export default function TasksPage() {
  const { data: tasks = [], isLoading } = useTasks();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

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

            <p className="text-sm font-medium text-primary">
              Tasks
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Manage your workspace
            </h1>

            <p className="mt-2 text-sm text-secondary">
              Create, organize and track all tasks.
            </p>

          </div>

          <button
            onClick={() => setShowModal(true)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-primary
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

        <div className="relative">

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

        <div className="grid gap-6 xl:grid-cols-4 md:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">
              To Do
            </h2>

            <div className="space-y-4">
              {filteredTasks
                .filter((t) => t.status === "TODO")
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={(task) => {
                      setSelectedTask(task);
                      setShowModal(true);
                    }}
                    onDelete={(id) => {
                      console.log("Delete:", id);
                    }}
                  />
                ))}
                {filteredTasks.filter((t) => t.status === "TODO").length === 0 && (
                  <div className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-sm text-slate-400">
                    No tasks
                  </div>
                )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">
              In Progress
            </h2>

            <div className="space-y-4">
              {filteredTasks
                .filter((t) => t.status === "IN_PROGRESS")
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={(task) => {
                      setSelectedTask(task);
                      setShowModal(true);
                    }}
                    onDelete={(id) => {
                      console.log("Delete:", id);
                    }}
                  />
                ))}
                {filteredTasks.filter((t) => t.status === "IN_PROGRESS").length === 0 && (
                  <div className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-sm text-slate-400">
                    No tasks
                  </div>
                )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Review
            </h2>

            <div className="space-y-4">
              {filteredTasks
                .filter((t) => t.status === "REVIEW")
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={(task) => {
                      setSelectedTask(task);
                      setShowModal(true);
                    }}
                    onDelete={(id) => {
                      console.log("Delete:", id);
                    }}
                  />
                ))}
                {filteredTasks.filter((t) => t.status === "REVIEW").length === 0 && (
                  <div className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-sm text-slate-400">
                    No tasks
                  </div>
                )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Completed
            </h2>

            <div className="space-y-4">
              {filteredTasks
                .filter((t) => t.status === "COMPLETED")
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={(task) => {
                      setSelectedTask(task);
                      setShowModal(true);
                    }}
                    onDelete={(id) => {
                      console.log("Delete:", id);
                    }}
                  />
                ))}
                {filteredTasks.filter((t) => t.status === "COMPLETED").length === 0 && (
                  <div className="flex h-32 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-sm text-slate-400">
                    No tasks
                  </div>
                )}
            </div>
          </div>

        </div>

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