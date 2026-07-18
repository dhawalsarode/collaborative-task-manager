import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
import AssignedStatusChart from "../components/analytics/AssignedStatusChart";
import CreatedStatusChart from "../components/analytics/CreatedStatusChart";
import WeeklyAssignedVsCreated from "../components/analytics/WeeklyAssignedVsCreated";
import WeeklyProductivityChart from "../components/analytics/WeeklyProductivityChart";
import CompletionByPriorityChart from "../components/analytics/CompletionByPriorityChart";
import PriorityChart from "../components/dashboard/PriorityChart";

import useAnalytics from "../hooks/useAnalytics";

export default function AnalyticsPage() {
  const {
    loading,
    productivityScore,
    productivityLabel,
    averageCompletionTime,
    completedThisWeek,
    overdueRate,
    weeklyCompletion,
    weeklyAssignedVsCreated,
    priorityChart,
    completionByPriority,
    assignedStatus,
    createdStatus,
  } = useAnalytics();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ================= My Analytics ================= */}

      <div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          My Analytics
        </h1>

        <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
          Your assigned and created task insights.
        </p>
      </div>

      <AnalyticsSummary
        productivityScore={productivityScore}
        productivityLabel={productivityLabel}
        averageCompletionTime={averageCompletionTime}
        completedThisWeek={completedThisWeek}
        overdueRate={overdueRate}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <AssignedStatusChart
          data={assignedStatus}
        />

        <WeeklyAssignedVsCreated
          data={weeklyAssignedVsCreated}
        />

        <CreatedStatusChart
          data={createdStatus}
        />
      </div>

      {/* ================= Workspace Analytics ================= */}

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Workspace Analytics
        </h2>

        <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
          Insights across your entire workspace.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <PriorityChart
          data={priorityChart}
        />

        <CompletionByPriorityChart
          data={completionByPriority}
        />

        <WeeklyProductivityChart
          data={weeklyCompletion}
        />
      </div>
    </div>
  );
}