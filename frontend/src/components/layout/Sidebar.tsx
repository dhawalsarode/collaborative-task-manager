import {
  LayoutDashboard,
  KanbanSquare,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

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

  type SidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  };

  export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
  }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <aside
      className={`
                  fixed
                  inset-y-0
                  left-0
                  z-50
                  w-[270px]
                  border-r
                  border-slate-200
                  dark:border-slate-800
                  bg-white
                  dark:bg-slate-900
                  flex
                  flex-col
                  transform
                  transition-transform
                  duration-300
                  ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }
                  lg:static
                  lg:translate-x-0
                  lg:shrink-0
                `}
    >
      {/* Logo */}

      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <img
              src={logo}
              alt="Syncora"
              className="h-10 w-10 object-contain shrink-0"
            />

          <div>
            <h1
              className=" text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Syncora
            </h1>

            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Collaborative Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-5">

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
                onClick={() => setSidebarOpen(false)}
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

      <div className="border-t border-slate-200 dark:border-slate-800 p-4">

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
            py-2.5
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