import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";
import { socket } from "../socket/socket";
import { Toast } from "../lib/toast";

/* ================= TYPES ================= */

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  logout: () => Promise<void>;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  logout: async () => {},
});

/* ================= PROVIDER ================= */

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH CURRENT USER ---------- */
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user); 
        if (!socket.connected) {
        socket.connect();
      }
      })
      .catch(() => {
        setUser(null);
        socket.disconnect();
      })
      .finally(() => setLoading(false));
  }, []);

  /* ---------- LOGOUT ---------- */
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore backend failure
    } finally {
      setUser(null);
      socket.disconnect();
      Toast.success("Task deleted.");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuth = () => useContext(AuthContext);