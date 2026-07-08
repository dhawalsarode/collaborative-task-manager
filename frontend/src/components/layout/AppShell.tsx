import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppShell() {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950">

      {/* Sidebar */}

      <Sidebar />

      {/* Right Side */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navigation */}

        <Navbar />

        {/* Main Content */}

        <main
          className="
            flex-1
            overflow-y-auto
            bg-slate-100
            dark:bg-slate-950
            p-6
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}