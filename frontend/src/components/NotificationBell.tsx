import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../api/notifications";

import { socket } from "../socket/socket";

import { Toast } from "../lib/toast";

function timeAgo(date: string) {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  if (seconds < 60) return "Just now";
  if (seconds < 3600)
    return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400)
    return `${Math.floor(seconds / 3600)} hr ago`;
  if (seconds < 172800) return "Yesterday";

  const days = Math.floor(seconds / 86400);

    if (days <= 7) {
      return `${days} days ago`;
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  /* ================= SOCKET ================= */

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

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const unread = notifications.filter(
    (n) => !n.read
  ).length;

  return (
    <div
      ref={panelRef}
      className="relative"
    >
      {/* Bell */}

      <button
        onClick={() => setOpen((v) => !v)}
        className="
          h-11
          w-11
          rounded-xl
          border
          border-slate-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          flex
          items-center
          justify-center
          text-slate-700
          dark:text-slate-200
          hover:bg-slate-100
          dark:hover:bg-slate-800
          transition-colors
        "
      >
        <Bell
              size={19}
              className="text-slate-700 dark:text-slate-200"
            />

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
              font-semibold
              text-white
            "
          >
            {unread}
          </span>
        )}
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-96
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            shadow-2xl
            z-50
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-200
              dark:border-slate-700
              px-5
              py-4
            "
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Notifications
              {unread > 0 && (
                <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  {unread} new
                </span>
              )}
            </h3>

            {unread > 0 && (
              <button
              onClick={async () => {
                await markAllNotificationsRead();

                queryClient.invalidateQueries({
                  queryKey: ["notifications"],
                });

                Toast.success("All notifications marked as read.");

              }}
                className="
                  text-sm
                  font-medium
                  text-primary
                  hover:underline
                "
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications */}

          <div className="max-h-96 overflow-y-auto">

            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-10">

                <Bell
                  size={34}
                  className="mb-3 text-slate-300 dark:text-slate-600"
                />

                <p className="font-medium text-slate-700 dark:text-slate-200">
                  You're all caught up
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  No new notifications.
                </p>

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

                      Toast.success("Notification marked as read.");
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
                    transition-all
                    duration-200
                  hover:bg-slate-50
                    hover:translate-x-1
                    dark:hover:bg-slate-800/70
                    ${
                      !n.read
                        ? "bg-indigo-50 dark:bg-indigo-900/20"
                        : ""
                    }
                  `}
                >
              <div className="flex items-start gap-3">

                {!n.read && (
                  <span
                    className="
                      mt-2
                      h-2.5
                      w-2.5
                      flex-shrink-0
                      rounded-full
                      bg-indigo-600
                    "
                  />
                )}

                <div className="flex-1">

                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {n.message}
                  </p>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {timeAgo(n.createdAt)}
                  </p>

                </div>

              </div>
                </button>
              ))
            )}

          </div>
        </div>
      )}
    </div>
  );
}