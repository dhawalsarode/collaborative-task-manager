import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

import ChartCard from "./ChartCard";

interface Props {
  percentage: number;
}

export default function ProgressChart({
  percentage,
}: Props) {
  const data = [
    {
      name: "Progress",
      value: percentage,
      fill: "#4F46E5",
    },
  ];

  return (
    <ChartCard
      title="Completion Rate"
      subtitle="Overall task completion"
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={16}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />

          <RadialBar
            background
            dataKey="value"
            cornerRadius={20}
          />

          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-900 dark:fill-white"
            fontSize="36"
            fontWeight="600"
          >
            {percentage}%
          </text>

          <text
            x="50%"
            y="62%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-500"
            fontSize="14"
          >
            Completed
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}