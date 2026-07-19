import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import AnalyticsCard from "../analytics/AnalyticsCard";
import ChartTooltip from "../analytics/ChartTooltip";

import { CHART_CONFIG } from "../../constants/chart";
import { getYAxisConfig } from "../../utils/chartUtils";

interface TodayAssignedVsCreatedData {
  hour: string;
  assigned: number;
  created: number;
}

interface Props {
  data: TodayAssignedVsCreatedData[];
}

export default function TodayAssignedVsCreated({
  data,
}: Props) {
  const yAxis = getYAxisConfig([
    ...data.map((d) => d.assigned),
    ...data.map((d) => d.created),
  ]);

  return (
    <AnalyticsCard
      title="Today's Performance"
      subtitle="Assigned vs created tasks during the last 24 hours"
    >
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={CHART_CONFIG.margin}
          >
            <CartesianGrid {...CHART_CONFIG.grid} />

            <XAxis
              dataKey="hour"
              tick={CHART_CONFIG.tick}
            />

            <YAxis
              domain={yAxis.domain}
              ticks={yAxis.ticks}
              allowDecimals={false}
              tick={CHART_CONFIG.tick}
            />

            <Tooltip content={<ChartTooltip />} />

            <Legend />

            <Bar
              dataKey="assigned"
              name="Assigned"
              fill="#10B981"
              radius={CHART_CONFIG.bar.radius}
              animationDuration={CHART_CONFIG.animation.duration}
            />

            <Bar
              dataKey="created"
              name="Created"
              fill="#6366F1"
              radius={CHART_CONFIG.bar.radius}
              animationDuration={CHART_CONFIG.animation.duration}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}