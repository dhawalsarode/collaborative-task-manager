import StatsGrid from "../components/dashboard/StatsGrid";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import PriorityChart from "../components/dashboard/PriorityChart";
import ProgressChart from "../components/dashboard/ProgressChart";
import useDashboard from "../hooks/useDashboard";

export default function AnalyticsPage() {
  const {
    loading,
    stats,
    statusChart,
    priorityChart,
  } = useDashboard();

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
          Visual overview of project performance.
        </p>

      </div>

      <StatsGrid stats={stats} />

      <div className="grid gap-6 xl:grid-cols-2">

        <AnalyticsChart
          data={statusChart}
        />

        <PriorityChart
          data={priorityChart}
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <ProgressChart
          percentage={stats.completionRate}
        />

      </div>

    </div>
  );
}