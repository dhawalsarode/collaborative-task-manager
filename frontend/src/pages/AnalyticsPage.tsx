import AnalyticsSummary from "../components/analytics/AnalyticsSummary";
import WeeklyProductivityChart from "../components/analytics/WeeklyProductivityChart";

import AnalyticsChart from "../components/dashboard/AnalyticsChart";
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
    statusChart,
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

      <AnalyticsSummary
        productivityScore={productivityScore}
        productivityLabel={productivityLabel}
        averageCompletionTime={averageCompletionTime}
        completedThisWeek={completedThisWeek}
        overdueRate={overdueRate}
      />

      <div className="grid gap-6 xl:grid-cols-2">

        <WeeklyProductivityChart
          data={weeklyCompletion}
        />

        <PriorityChart
          data={priorityChart}
        />

      </div>

      <div>

        <AnalyticsChart
          data={statusChart}
        />

      </div>

    </div>
  );
}