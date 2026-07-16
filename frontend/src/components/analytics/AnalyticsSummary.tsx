import {
  Activity,
  CalendarCheck,
  Clock3,
  TriangleAlert,
} from "lucide-react";

interface Props {
  productivityScore: number;
  productivityLabel: string;
  averageCompletionTime: number;
  completedThisWeek: number;
  overdueRate: number;
}

const cards = (
  productivityScore: number,
  productivityLabel: string,
  averageCompletionTime: number,
  completedThisWeek: number,
  overdueRate: number
) => [
  {
    title: "Completion Rate",
    value: `${productivityScore}%`,
    subtitle: productivityLabel,
    icon: Activity,
    color: "bg-indigo-600",
  },
  {
    title: "Avg Completion",
    value: `${averageCompletionTime} Days`,
    subtitle: "Average task lifetime",
    icon: Clock3,
    color: "bg-emerald-600",
  },
  {
    title: "Completed",
    value: completedThisWeek,
    subtitle: "Last 7 days",
    icon: CalendarCheck,
    color: "bg-sky-600",
  },
  {
    title: "Overdue Rate",
    value: `${overdueRate}%`,
    subtitle: "Pending overdue",
    icon: TriangleAlert,
    color: "bg-red-600",
  },
];

export default function AnalyticsSummary(props: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      {cards(
        props.productivityScore,
        props.productivityLabel,
        props.averageCompletionTime,
        props.completedThisWeek,
        props.overdueRate
      ).map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              p-4
              shadow-sm
              transition
              hover:shadow-md
            "
          >
            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {card.subtitle}
                </p>

              </div>

              <div
                className={`
                  ${card.color}
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                `}
              >
                <Icon
                  size={22}
                  className="text-white"
                />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}