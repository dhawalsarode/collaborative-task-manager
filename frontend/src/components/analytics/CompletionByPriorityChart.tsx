import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";

import ChartCard from "../dashboard/ChartCard";

interface Props {
  data: {
    priority: string;
    rate: number;
  }[];
}

const colors = [
  "#22C55E",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
];

export default function CompletionByPriorityChart({
  data,
}: Props) {
  return (
    <ChartCard
      title="Completion by Priority"
      subtitle="Completion rate for each priority"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis dataKey="priority" />

          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
          />

          <Tooltip
            formatter={(v) => [`${v}%`, "Completion"]}
          />

          <Bar
            dataKey="rate"
            radius={[8, 8, 0, 0]}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={colors[i]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}