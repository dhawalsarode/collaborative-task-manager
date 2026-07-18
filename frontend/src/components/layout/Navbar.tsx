import {
  Menu,
  Moon,
  Sun,
  Search,
} from "lucide-react";

import { useTheme } from "../../theme/ThemeContext";
import NotificationBell from "../NotificationBell";
import type { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";

  type NavbarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  };

export default function Navbar({
    setSidebarOpen,
  }: NavbarProps) {

  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/tasks": "Tasks",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  const pageTitle = pageTitles[pathname] ?? "Syncora";
  
  return (
      <header
        className="
          bg-white
          dark:bg-slate-900
          border-b
          border-slate-200
          dark:border-slate-800
          px-4
          md:px-6
          py-3
        "
      >
  <div className="flex items-center justify-between gap-4">

    {/* Left */}

    <div className="flex items-center gap-3">

      <button
        onClick={() => setSidebarOpen(true)}
        className="
          lg:hidden
          h-10
          w-10
          rounded-lg
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
        <Menu size={22} />
      </button>

    <div className="flex items-center gap-3">
      <span className="h-7 w-1 rounded-full bg-indigo-600" />

      <h1
        className="
          text-2xl
          font-extrabold
          tracking-tight
          text-slate-900
          dark:text-white
        "
      >
        {pageTitle}
      </h1>
    </div>

    </div>

    {/* Right */}

    <div className="flex items-center gap-4">

  {/* Desktop Search */}

  <div className="relative hidden md:block">

    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
    />

    <input
      placeholder="Search..."
      className="
        w-72
        rounded-xl
        border
        border-slate-200
        dark:border-slate-700
        bg-slate-50
        dark:bg-slate-800
        pl-11
        pr-4
        py-2.5
        outline-none
        focus:ring-2
        focus:ring-indigo-300
      "
    />

  </div>

  <NotificationBell />

  <button
    onClick={toggleTheme}
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
        {theme === "dark" ? (
          <Sun size={19} className="text-amber-400" />
        ) : (
          <Moon size={19} className="text-slate-700 dark:text-slate-200" />
        )}
      </button>

    </div>

  </div>

  <div className="mt-4 md:hidden">

    <div className="relative">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        placeholder="Search..."
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          dark:border-slate-700
          bg-slate-50
          dark:bg-slate-800
          pl-11
          pr-4
          py-2.5
          outline-none
          focus:ring-2
          focus:ring-indigo-300
        "
      />

      </div>
    </div>
  </header>
  );
}