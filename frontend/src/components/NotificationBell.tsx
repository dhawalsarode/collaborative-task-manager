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

  return `${Math.floor(seconds / 86400)} days ago`;
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
          relative
          h-11
          w-11
          rounded-xl
          border
          border-slate-200
          dark:border-slate-700
          flex
          items-center
          justify-center
          hover:bg-slate-100
          dark:hover:bg-slate-800
          transition
        "
      >
        <Bell size={19} />

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
            <h3 className="font-semibold">
              Notifications
            </h3>

            {unread > 0 && (
              <button
              onClick={async () => {
                await markAllNotificationsRead();

                queryClient.invalidateQueries({
                  queryKey: ["notifications"],
                });

                Toast.success("All notifications marked as read.");

                setOpen(false);
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
                    transition
                    hover:bg-slate-50
                    dark:hover:bg-slate-800
                    ${
                      !n.read
                        ? "bg-blue-50 dark:bg-blue-950/30"
                        : ""
                    }
                  `}
                >
                  <p className="text-sm font-medium">
                    {n.message}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {timeAgo(n.createdAt)}
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