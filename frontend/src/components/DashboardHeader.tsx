import { useState } from "react";
import NotificationsPanel from "./NotificationsPanel";
import { useAuth } from "../auth/AuthContext";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="relative flex gap-3 items-center">
      <button onClick={() => setOpen(!open)}>🔔</button>
      {open && <NotificationsPanel onClose={() => setOpen(false)} />}

      <button
        onClick={logout}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardHeader;