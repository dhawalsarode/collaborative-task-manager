import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

import AnalyticsCard from "./AnalyticsCard";

interface AssignedStatusData {
  status: string;
  tasks: number;
}

interface Props {
  data: AssignedStatusData[];
}

export default function AssignedStatusChart({ data }: Props) {
  return (
    <AnalyticsCard
      title="Assigned Tasks"
      subtitle="Tasks assigned to you by status"
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
                dataKey="status"
                tick={{ fontSize: 12 }}
                interval={0}
            />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="tasks"
              fill="#10B981" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}