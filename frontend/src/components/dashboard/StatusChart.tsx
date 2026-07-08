import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import ChartCard from "./ChartCard";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#6366F1", // Todo
  "#0EA5E9", // In Progress
  "#F59E0B", // Review
  "#22C55E", // Completed
];

export default function StatusChart({ data }: Props) {
  return (
    <ChartCard
      title="Task Status"
      subtitle="Distribution of tasks by workflow stage"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            height={36}
          />

        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}