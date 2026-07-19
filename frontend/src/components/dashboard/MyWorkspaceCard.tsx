import { Info } from "lucide-react";

type MyWorkspaceCardProps = {
  assigned: number;
  completed: number;
  created: number;
  closed: number;
};

export default function MyWorkspaceCard({
  assigned,
  completed,
  created,
  closed,
}: MyWorkspaceCardProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        shadow-sm
        overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-slate-200
          dark:border-slate-700
          px-7
          py-6
        "
      >
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          My Workspace
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your personal task activity
        </p>
      </div>

      {/* Body */}

      <div className="grid grid-cols-2">

        {/* Assigned */}

        <div className="border-r border-b border-slate-200 dark:border-slate-700 p-6">

          <div className="flex items-center gap-2">

            <p className="text-sm font-semibold text-emerald-600">
              Assigned
            </p>

            <div
                title="Tasks currently assigned to you."
                  className="
                        flex h-5 w-5 cursor-help items-center justify-center
                        rounded-full
                        bg-slate-100
                        text-slate-500
                        transition-colors
                        hover:bg-violet-100
                        hover:text-violet-600
                        dark:bg-slate-800
                        dark:text-slate-400
                        dark:hover:bg-violet-900/30
                        dark:hover:text-violet-400
                      "
                    >
                    <Info size={12} strokeWidth={2.25} />
             </div>

          </div>

          <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
            {assigned}
          </p>

        </div>

        {/* Completed */}

        <div className="border-b border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-2">

            <p className="text-sm font-semibold text-green-600">
                Completed
            </p>

            <div
                title="Tasks assigned to you that you have completed."
                  className="
                        flex h-5 w-5 cursor-help items-center justify-center
                        rounded-full
                        bg-slate-100
                        text-slate-500
                        transition-colors
                        hover:bg-violet-100
                        hover:text-violet-600
                        dark:bg-slate-800
                        dark:text-slate-400
                        dark:hover:bg-violet-900/30
                        dark:hover:text-violet-400
                      "
                    >
                    <Info size={12} strokeWidth={2.25} />
             </div>

            </div>

          <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
            {completed}
          </p>

        </div>

        {/* Created */}

        <div className="border-r border-slate-200 dark:border-slate-700 p-6">

          <div className="flex items-center gap-2">

            <p className="text-sm font-semibold text-violet-600">
              Created
            </p>

            <div
                title="Tasks created by you."
                  className="
                        flex h-5 w-5 cursor-help items-center justify-center
                        rounded-full
                        bg-slate-100
                        text-slate-500
                        transition-colors
                        hover:bg-violet-100
                        hover:text-violet-600
                        dark:bg-slate-800
                        dark:text-slate-400
                        dark:hover:bg-violet-900/30
                        dark:hover:text-violet-400
                      "
                    >
                    <Info size={12} strokeWidth={2.25} />
             </div>

          </div>

          <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
            {created}
          </p>

        </div>

        {/* Closed */}

        <div className="p-6">

          <div className="flex items-center gap-2">

            <p className="text-sm font-semibold text-indigo-600">
              Closed
            </p>

            <div
                title="Tasks created by you that have been completed by the assignee."
                  className="
                        flex h-5 w-5 cursor-help items-center justify-center
                        rounded-full
                        bg-slate-100
                        text-slate-500
                        transition-colors
                        hover:bg-violet-100
                        hover:text-violet-600
                        dark:bg-slate-800
                        dark:text-slate-400
                        dark:hover:bg-violet-900/30
                        dark:hover:text-violet-400
                      "
                    >
                    <Info size={12} strokeWidth={2.25} />
             </div>

          </div>

          <p className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
            {closed}
          </p>

        </div>

      </div>

    </section>
  );
}