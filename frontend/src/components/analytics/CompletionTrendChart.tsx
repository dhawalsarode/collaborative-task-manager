import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import ChartCard from "../dashboard/ChartCard";

interface Props {
  data: {
    day: string;
    completed: number;
  }[];
}

export default function CompletionTrendChart({
  data,
}: Props) {
  return (
    <ChartCard
      title="Completion Trend"
      subtitle="Tasks completed during the last 7 days"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="completed"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#4F46E5",
            }}
            activeDot={{
              r: 7,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}