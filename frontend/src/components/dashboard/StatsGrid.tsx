import {
  ClipboardList,
  CircleCheckBig,
  LoaderCircle,
  TriangleAlert,
  Clock3,
  TrendingUp,
} from "lucide-react";

import KPICard from "./KPICard";

interface Stats {
  totalTasks: number;
  completed: number;
  inProgress: number;
  review: number;
  todo: number;
  overdue: number;
  today: number;
  completionRate: number;
}

interface Props {
  stats: Stats;
}

export default function StatsGrid({ stats }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

      <KPICard
        title="Total Tasks"
        value={stats.totalTasks}
        subtitle="All active tasks"
        icon={ClipboardList}
        color="bg-indigo-600"
      />

      <KPICard
        title="Completed"
        value={stats.completed}
        subtitle="Finished successfully"
        icon={CircleCheckBig}
        color="bg-emerald-600"
      />

      <KPICard
        title="In Progress"
        value={stats.inProgress}
        subtitle="Currently being worked on"
        icon={LoaderCircle}
        color="bg-sky-600"
      />

      <KPICard
        title="Overdue"
        value={stats.overdue}
        subtitle="Require attention"
        icon={TriangleAlert}
        color="bg-red-600"
      />

      <KPICard
        title="Due Today"
        value={stats.today}
        subtitle="Today's schedule"
        icon={Clock3}
        color="bg-amber-500"
      />

      <KPICard
        title="Completion"
        value={`${stats.completionRate}%`}
        subtitle="Overall progress"
        icon={TrendingUp}
        color="bg-violet-600"
      />

    </div>
  );
}