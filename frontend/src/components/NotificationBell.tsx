import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotifications } from "../api/notifications";
import { socket } from "../socket/socket";
import { useEffect } from "react";

const NotificationBell = () => {
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  useEffect(() => {
    socket.on("notification:new", () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      socket.off("notification:new");
    };
  }, []);

  return (
    <div className="relative">
      <button className="relative text-xl">
        🔔
        {data.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
            {data.length}
          </span>
        )}
      </button>

      <div className="absolute right-0 mt-2 w-64 bg-white shadow rounded p-2 z-50">
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications</p>
        ) : (
          data.map((n) => (
            <div key={n.id} className="text-sm border-b py-1">
              {n.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationBell;