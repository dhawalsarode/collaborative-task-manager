import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import AnalyticsCard from "./AnalyticsCard";

interface WeeklyAssignedVsCreatedData {
  day: string;
  assigned: number;
  created: number;
}

interface Props {
  data: WeeklyAssignedVsCreatedData[];
}

const AssignedDot = (props: any) => {
  const { cx, cy, payload } = props;

  if (cx == null || cy == null) return null;

  const overlap = payload.assigned === payload.created;

  return (
    <circle
      cx={overlap ? cx - 4 : cx}
      cy={cy}
      r={5}
      fill="#10B981"
      stroke="white"
      strokeWidth={2}
    />
  );
};

const CreatedDot = (props: any) => {
  const { cx, cy, payload } = props;

  if (cx == null || cy == null) return null;

  const overlap = payload.assigned === payload.created;

  return (
    <circle
      cx={overlap ? cx + 4 : cx}
      cy={cy}
      r={5}
      fill="#6366F1"
      stroke="white"
      strokeWidth={2}
    />
  );
};

export default function WeeklyAssignedVsCreated({
  data,
  }: Props) {
  return (
    <AnalyticsCard
      title="Weekly Performance"
      subtitle="Completed tasks during the last 7 days"
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="assigned"
              stroke="#10B981"
              strokeWidth={3}
              dot={<AssignedDot />}
              activeDot={{ r: 7 }}
              name="Assigned"
            />

            <Line
              type="monotone"
              dataKey="created"
              stroke="#6366F1"
              strokeWidth={3}
              dot={<CreatedDot />}
              activeDot={{ r: 7 }}
              name="Created"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}