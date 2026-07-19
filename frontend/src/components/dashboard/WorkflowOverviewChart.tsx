import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartCard from "./ChartCard";
import ChartTooltip from "../analytics/ChartTooltip";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function AnalyticsChart({ data }: Props) {
  return (
    <ChartCard
      title="Workflow Overview"
      subtitle="Task distribution across workflow"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="workflowGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#4F46E5"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="#4F46E5"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            content={<ChartTooltip />}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={3}
            fill="url(#workflowGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}