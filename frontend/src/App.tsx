import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";

import ProtectedRoute from "./auth/ProtectedRoute";

import AppShell from "./components/layout/AppShell";

const App = () => {
  return (
    <Routes>

      {/* Public */}

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected */}

      <Route element={<ProtectedRoute />}>

        <Route element={<AppShell />}>

          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/tasks"
            element={<TasksPage />}
          />

          {/* Future */}

          <Route
            path="/analytics"
            element={<div className="p-8">Analytics</div>}
          />

          <Route
            path="/settings"
            element={<div className="p-8">Settings</div>}
          />

        </Route>

      </Route>

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
};

export default App;