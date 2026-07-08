import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function PriorityChart({ data }: Props) {
  return (
    <ChartCard
      title="Priority Distribution"
      subtitle="Tasks grouped by priority"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 10,
          }}
        >
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

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            fill="#5B5FEF"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}