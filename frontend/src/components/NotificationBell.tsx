import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
} from "lucide-react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchNotifications,
  markNotificationRead,
} from "../api/notifications";
import { socket } from "../socket/socket";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  useEffect(() => {
    const refresh = () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    };

    socket.on("notification:new", refresh);

    return () => {
      socket.off("notification:new", refresh);
    };
  }, [queryClient]);

  const unread = notifications.filter(
    (n) => !n.read
  ).length;

  return (
    <div className="relative">

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        <Bell size={20} />

        {unread > 0 && (
          <span
            className="
              absolute
              -top-1
              -right-1
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-[10px]
              text-white
              font-semibold
            "
          >
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-96
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            shadow-2xl
            overflow-hidden
            z-50
          "
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-5 py-4">
            <h3 className="font-semibold">
              Notifications
            </h3>

            <CheckCheck size={18} />
          </div>

          <div className="max-h-96 overflow-y-auto">

            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No notifications
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={async () => {
                    if (!n.read) {
                      await markNotificationRead(n.id);

                      queryClient.invalidateQueries({
                        queryKey: ["notifications"],
                      });
                    }
                  }}
                  className={`
                    w-full
                    border-b
                    border-slate-100
                    dark:border-slate-800
                    px-5
                    py-4
                    text-left
                    transition
                    hover:bg-slate-50
                    dark:hover:bg-slate-800
                    ${!n.read ? "bg-blue-50 dark:bg-blue-950/30" : ""}
                  `}
                >
                  <p className="text-sm">
                    {n.message}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(
                      n.createdAt
                    ).toLocaleString()}
                  </p>
                </button>
              ))
            )}

          </div>

        </div>
      )}

    </div>
  );
}