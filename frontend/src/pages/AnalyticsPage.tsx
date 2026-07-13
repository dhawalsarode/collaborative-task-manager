import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
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
    priorityChart,
    completionByPriority,
  } = useAnalytics();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <p className="text-sm font-medium text-primary">
          Analytics
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Workspace Insights
        </h1>

        <p className="mt-2 text-sm text-secondary">
          Historical trends and productivity metrics.
        </p>

      </div>

      {/* Summary Cards */}

      <AnalyticsSummary
        productivityScore={productivityScore}
        productivityLabel={productivityLabel}
        averageCompletionTime={averageCompletionTime}
        completedThisWeek={completedThisWeek}
        overdueRate={overdueRate}
      />

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-2">

        <WeeklyProductivityChart
          data={weeklyCompletion}
        />

        <PriorityChart
          data={priorityChart}
        />

      </div>

      {/* Completion by Priority */}

      <div className="grid gap-6">

        <CompletionByPriorityChart
          data={completionByPriority}
        />

      </div>

    </div>
  );
}