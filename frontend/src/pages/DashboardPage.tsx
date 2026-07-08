import useDashboard from "../hooks/useDashboard";

import StatsGrid from "../components/dashboard/StatsGrid";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import ProgressChart from "../components/dashboard/ProgressChart";

const DashboardPage = () => {
  const {
    loading,
    stats,
    statusChart,
    priorityChart,
    recentTasks,
  } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-slate-500 text-lg">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <section className="flex items-end justify-between">

        <div>
          <p className="text-sm font-medium text-indigo-600">
            Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Good Evening, Ramesh 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening across your workspace today.
          </p>
        </div>

      </section>

      <StatsGrid stats={stats} />

      {/* Charts */}

      <section className="grid gap-6 xl:grid-cols-2">

      <AnalyticsChart
        data={statusChart}
      />

      <ProgressChart
        percentage={stats.completionRate}
      />

      </section>

      {/* Recent */}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          shadow-sm
        "
      >

        <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-5">

          <h2 className="text-lg font-semibold">
            Recent Tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest created tasks
          </p>

        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">

          {recentTasks.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No tasks yet.
            </div>
          ) : (
            recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <h3 className="font-medium">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {task.assignee?.name ?? "Unassigned"}
                  </p>
                </div>

                <div className="text-right">

                  <div className="text-sm font-medium">
                    {task.status.replace("_", " ")}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>

                </div>

              </div>
            ))
          )}

        </div>

      </section>

    </div>
  );
};

export default DashboardPage;