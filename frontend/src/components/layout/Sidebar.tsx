import {
  LayoutDashboard,
  KanbanSquare,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";

import logo from "../../assets/logo.png";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Tasks",
    icon: KanbanSquare,
    path: "/tasks",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside
      className="
        w-[270px]
        shrink-0
        border-r
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-900
        flex
        flex-col
      "
    >
      {/* Logo */}

      <div className="px-7 py-7 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Syncora"
            className="w-11 h-11 object-contain"
          />

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Syncora
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Collaborative Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <p className="px-3 mb-3 text-xs uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <div className="space-y-2">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
                  `
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* User */}

      <div className="border-t border-slate-200 dark:border-slate-800 p-5">

        <div className="mb-4">

          <p className="text-xs uppercase tracking-wider text-slate-400">
            Logged in as
          </p>

          <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">
            {user?.name}
          </h3>

          <p className="text-sm text-slate-500 truncate">
            {user?.email}
          </p>

        </div>

        <button
          onClick={logout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-500
            hover:bg-red-600
            text-white
            py-3
            font-medium
            transition
          "
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>
    </aside>
  );
}